package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"gopkg.in/mgo.v2"
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
    defer nf.Close()
    nf.WriteString(string(bs))
    http.Redirect(w,req,"http://192.168.42.201:3000",http.StatusSeeOther)
}

func (uc UploadController) Expose(w http.ResponseWriter, req *http.Request) {
    setupResponse(&w,req)
    images,err := ioutil.ReadDir("./public/posts")
    if err != nil {
        http.Error(w,err.Error(),http.StatusInternalServerError)
        return
    }
    var posts = make([]interface{},len(images))
    for i,v := range images {
       posts[i] = map[string]string{
           "name": v.Name(),
       }
    }
    json.NewEncoder(w).Encode(&posts)
}

