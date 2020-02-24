 package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type LoginController struct{
    session *mgo.Session
}

func NewLoginController(s *mgo.Session) *LoginController {
    return &LoginController{s}
}

func (lc LoginController) Login(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTION" {
        return
    }

    if req.Method == "POST" {
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        var x map[string]string
        var user map[string]interface{}
        json.Unmarshal(bs,&x)
        err = lc.session.DB("gallery").C("users").Find(bson.D{{"$or",[]bson.D{
            bson.D{{"email",x["username"]}},
            bson.D{{"username",x["username"]}}}}}).One(&user)
        if err != nil {
		http.Error(w, "invalid username or email", http.StatusUnauthorized)
		return
        }
        
        err = bcrypt.CompareHashAndPassword([]byte(user["password"].(string)),[]byte(x["password"]))
        if err != nil {
            http.Error(w,"wrong password",http.StatusUnauthorized)
            return
        }
        fmt.Println(user)

        c :=  map[string]interface{}{
            "accessToken": user["AccessToken"],
            "username": user["username"],
            "email": user["email"],
            "friends": user["friends"],
            "groups": user["groups"],
        }

        json.NewEncoder(w).Encode(c)
        fmt.Println("success")
    }
}

func (lc LoginController) Autologin(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    if req.Method == "OPTION" {
        return
    }
    if req.Method == "POST" {
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            http.Error(w,"Unable to read the request",http.StatusInternalServerError)
            return
        }
        var a map[string]interface{}
        err = json.Unmarshal(bs,&a)
        if err != nil {
            http.Error(w,"cannot unmarshal the request body",http.StatusInternalServerError)
            return
        }
        var user = make(map[string]interface{})
        fmt.Println(a["accessToken"])
        err = lc.session.DB("gallery").C("users").Find(bson.M{"AccessToken":a["accessToken"]}).One(&user)
        if err != nil {
            http.Error(w,"No user correspond",http.StatusUnauthorized)
            return
        }
        res := map[string]interface{}{
            "email" : user["email"],
            "username": user["username"],
            "groups": user["groups"],
            "friends": user["friends"],
        }
        fmt.Println(a)
        fmt.Println(user)
        json.NewEncoder(w).Encode(&res)
    }
}