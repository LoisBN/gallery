FROM golang:1.13.8

WORKDIR /go/src/app/server
COPY . .

RUN go get encoding/json
RUN go get github.com/satori/go.uuid
RUN go get golang.org/x/crypto/bcrypt
RUN go get gopkg.in/mgo.v2
RUN go get gopkg.in/mgo.v2/bson

EXPOSE 5000

CMD ["go","run","main.go"]