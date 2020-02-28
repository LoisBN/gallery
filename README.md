# Gallery

Gallerie photos pour stocker/arranger/visualiser ses photos

# Dépendances

Avoir une version de go supérieure à go1.13.8, avoir une verision de node supérieur à la 8.12
Installer les packets suivants:

-github.com/satori/go.uuid
-golang.org/x/crypto/bcrypt
-gopkg.in/mgo.v2
-gopkg.in/mgo.v2/bson

Avec la command go get

Utiliser la commande npm install ou yarn pour installer les dépendances pour le serveur de développement react

Utiliser la command dep ensure pour automatiquement installer les dépendances du serveur go

# Installation

Faire un git clone puis installer les dépendances comme indiquer ci-dessus
lancer le serveur avec un go run main.go dans le dossier serveur ou la version compilé avec un ./main

### Avec Docker et Docker-Compose

faire la command docker-compose up dans le dossier racine du projet