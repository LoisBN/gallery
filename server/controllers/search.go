package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"gopkg.in/mgo.v2"
)

type SearchController struct{
    session *mgo.Session
}

func NewSearchController(s *mgo.Session) *SearchController {
    return &SearchController{s}
}

func (sc SearchController) Search(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    var hint map[string]interface{}
    bs,err := ioutil.ReadAll(req.Body)
    if err != nil {
        http.Error(w,"unable to read the request body",http.StatusInternalServerError)
        return
    } 
    r := json.Unmarshal(bs,&hint)
    fmt.Println(r)
    fmt.Fprintln(w,"successfully send")
}