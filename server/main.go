package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	uuid "github.com/satori/go.uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const (
	hosts      = "mongodb:27017"
	database   = "db"
	username   = ""
	password   = ""
	collection = "jobs"
)

func main() {
	http.HandleFunc("/users/signup", Signup)
	http.HandleFunc("/users/login", Login)
	http.HandleFunc("/upload", Upload)
	http.HandleFunc("/expose", Expose)
	http.HandleFunc("/users/account", Autologin)
	http.HandleFunc("/search/",Search)
	http.Handle("/public/posts/", http.StripPrefix("/public/posts", http.FileServer(http.Dir("./public/posts/"))))
	http.ListenAndServe(":5000", nil)
}

func getSession() *mgo.Session {
	info := &mgo.DialInfo{
		Addrs:    []string{hosts},
		Timeout:  60 * time.Second,
		Database: database,
		Username: username,
		Password: password,
	}

	s, err := mgo.DialWithInfo(info)
	if err != nil {
		fmt.Println("erreur mongo")
	}
	return s
}

func Search(w http.ResponseWriter,req *http.Request) {
    setupResponse(&w,req)
    var hint map[string]interface{}
    bs,err := ioutil.ReadAll(req.Body)
    if err != nil {
        http.Error(w,"unable to read the request body",http.StatusInternalServerError)
        return
    } 
    err = json.Unmarshal(bs,&hint)
	fmt.Println("from search",hint)
	switch hint["section"] {
	case "all":
		var users []map[string]interface{}
		err = getSession().DB("gallery").C("users").Find(nil).All(&users)
		if err != nil {
			http.Error(w,"no user found",http.StatusNotFound)
			return
		}
		err = json.NewEncoder(w).Encode(&users)
		return
	case "friends":
		err = json.NewEncoder(w).Encode(hint["friends"])
		return
	}
    fmt.Fprintln(w,"successfully send")
}

func Signup(w http.ResponseWriter,req *http.Request) {
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
        x["friends"] = []map[string]interface{}{}
        x["groups"] = map[string]interface{}{}
        emailErr := map[string]interface{}{
            "message": "email already in use",
            "status": 422,
        }
        err = getSession().DB("gallery").C("users").Find(bson.M{"email":x["email"]}).One(nil)
        if err == nil {
            w.WriteHeader(422)
            json.NewEncoder(w).Encode(&emailErr)
            return
        }

        usernameErr := map[string]interface{}{
            "message": "username already in use",
            "status": 422,
        }
        
        err = getSession().DB("gallery").C("users").Find(bson.M{"username":x["username"]}).One(nil)
        if err == nil {
            w.WriteHeader(422)
            json.NewEncoder(w).Encode(&usernameErr)
            return
        }
        uID,err := uuid.NewV4()
        if err != nil {
            http.Error(w,err.Error(),http.StatusInternalServerError)
            return
        }
        x["AccessToken"] = uID.String()
        err = getSession().DB("gallery").C("users").Insert(bson.M(x))
        
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

func Login(w http.ResponseWriter,req *http.Request) {
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
        err = getSession().DB("gallery").C("users").Find(bson.D{{"$or",[]bson.D{
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

func Autologin(w http.ResponseWriter,req *http.Request) {
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
        err = getSession().DB("gallery").C("users").Find(bson.M{"AccessToken":a["accessToken"]}).One(&user)
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

func Upload(w http.ResponseWriter,req *http.Request) {
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
    err = getSession().DB("gallery").C("posts").Insert(&fdb)
    if err != nil {
        http.Error(w,"cannot write in database",http.StatusInternalServerError)
        return
    }
    defer nf.Close()
    nf.WriteString(string(bs))
    http.Redirect(w,req,"/",http.StatusSeeOther)
}

func Expose(w http.ResponseWriter, req *http.Request) {
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
        err = getSession().DB("gallery").C("posts").Find(bson.M{"owner":u["username"]}).All(&o)
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

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
    (*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    (*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}
