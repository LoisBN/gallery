package main

import (
	"fmt"
	"net/http"

	"github.com/loisBN/projects/gallery/server/controllers"
	"gopkg.in/mgo.v2"
)

func main() {
	sc := controllers.NewSignupController(getSession())
	lc := controllers.NewLoginController(getSession())
	uc := controllers.NewUploadController(getSession())

	http.HandleFunc("/users/signup", sc.Signup)
	http.HandleFunc("/users/login", lc.Login)
	http.HandleFunc("/upload", uc.Upload)
	http.HandleFunc("/expose", uc.Expose)
	http.HandleFunc("/users/account", lc.Autologin)
	http.Handle("/public/posts/", http.StripPrefix("/public/posts", http.FileServer(http.Dir("./public/posts/"))))
	http.ListenAndServe(":5000", nil)
}

func getSession() *mgo.Session {
	s, err := mgo.Dial("mongodb://localhost")
	if err != nil {
		fmt.Println("erreur mongo")
	}
	return s
}
