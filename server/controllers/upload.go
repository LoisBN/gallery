package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type UploadController struct{
    session *mgo.Session
}

func NewUploadController(s *mgo.Session) *UploadController {
    return &UploadController{s}
}

func (uc UploadController) Upload(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    err := req.ParseForm()
    var fdb = make(map[string]interface{})
    
    f,h,err := req.FormFile("file")
    if err != nil {
        http.Error(w,"Cannot open the provided file",http.StatusInternalServerError)
        return
    }
    fmt.Println("*** File received ***")
    bs,err := ioutil.ReadAll(f)
    if err != nil {
        http.Error(w,"Cannot read the provided file",http.StatusInternalServerError)
        return
    }
    fmt.Println("*** File has been Read ***")
    nf,err := os.Create("./public/posts/"+h.Filename)
    if err != nil {
        http.Error(w,"cannot write the file",http.StatusInternalServerError)
        return
    }
    fmt.Println("*** File has benn wrote ***")
    fdb["title"] = req.FormValue("title")
    fdb["owner"] = req.FormValue("access_token")
    fdb["description"] = req.FormValue("description")
    fdb["file"] = h.Filename
    err = uc.session.DB("gallery").C("posts").Insert(&fdb)
    if err != nil {
        http.Error(w,"cannot write in database",http.StatusInternalServerError)
        return
    }
    defer nf.Close()
    nf.WriteString(string(bs))
    http.Redirect(w,req,"http://192.168.42.201:3000",http.StatusSeeOther)
}

func (uc UploadController) Expose(w http.ResponseWriter, req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTION" {
        return
    }
    if req.Method == "POST" {
        var u map[string]interface{}
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            http.Error(w,"cannot read the request body",http.StatusInternalServerError)
            return
        }
        fmt.Println("successfully read request body")
        err = json.Unmarshal(bs,&u)
        if err != nil {
            http.Error(w,"cannot unmarshal",http.StatusInternalServerError)
            return
        }
        fmt.Println("successfully unmarshal request body")
        var o []map[string]string
        err = uc.session.DB("gallery").C("posts").Find(bson.M{"owner":u["username"]}).All(&o)
        if err != nil {
            http.Error(w,"no posts found",http.StatusNotFound)
            return
        }
        if o == nil {
            json.NewEncoder(w).Encode([]map[string]string{})
            return
        }
        json.NewEncoder(w).Encode(&o)
    }
}

