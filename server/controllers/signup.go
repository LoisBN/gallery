package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type SignupController struct{
    session *mgo.Session
}

type user struct{
    email interface{}
    username interface{}
    password interface{}
}

type friends []user

type groups []group

type group struct{
    name string
    members []user
    status string
}

func NewSignupController(s *mgo.Session) *SignupController {
    return &SignupController{
        session: s,
    }
}

func (sc SignupController) Signup(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w, req)
    if req.Method == "OPTION" {
        fmt.Println("options")
        return
    }
    if req.Method == "POST" {
        fmt.Println(req.Body)
        bs,err := ioutil.ReadAll(req.Body)
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        fmt.Println(string(bs))
        var x map[string]interface{}
        err = json.Unmarshal(bs,&x)
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }

        ps,err := bcrypt.GenerateFromPassword([]byte(string(x["password"].(string))),bcrypt.DefaultCost)
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        
        x["password"] = string(ps)
        x["friends"] = friends{user{"loisbibehenong@gmail.com","lolo","lolo"}}
        x["groups"] = groups{}
        emailErr := map[string]interface{}{
            "message": "email already in use",
            "status": 422,
        }
        err = sc.session.DB("gallery").C("users").Find(bson.M{"email":x["email"]}).One(nil)
        if err == nil {
            json.NewEncoder(w).Encode(&emailErr)
            return
        }

        usernameErr := map[string]interface{}{
            "message": "username already in use",
            "status": 422,
        }
        
        err = sc.session.DB("gallery").C("users").Find(bson.M{"username":x["username"]}).One(nil)
        if err == nil {
            json.NewEncoder(w).Encode(&usernameErr)
            return
        }
        uID,err := uuid.NewV4()
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        x["AccessToken"] = uID.String()
        err = sc.session.DB("gallery").C("users").Insert(bson.M(x))
        
        c := map[string]interface{}{
            "accessToken": uID.String(), 
            "username": x["username"],
            "email": x["email"],
            "friends": x["friends"],
            "groups": x["groups"],
        }

        json.NewEncoder(w).Encode(&c)
        fmt.Println(x)
    }
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}