# hangman

## Prerequisitos

- Tener NodeJS instalado
- Tener base de datos corriendo (XAMPP o cualquier otro servidor de base de datos)

## Consideraciones

### Separacion de responsabilidades

#### Base de datos

Es parte del Backend en este caso manejada por el server de XAMPP, debe utilizarte el fichero sql proporcionado en "./db/init.sql"

#### Server o Backend

Se encarga de la logica de la app (esta en ./app.js).
Alli se enciende el servidor, se sirve la pagina (localhost:3000/index) y se espera que el usuario interactua con el html+js.
La aplicacion a recibir intentos de adivininza que index.html+script.js le mandaran a traves de locahost:3000/guess[POST] y recibira resultados del server (app.js) a traves de la ruta localhost:3000/current-word (si adivina correctamente).

Este server guarda las credenciales de conexion a la base de datos, modificar el USER, PASSWORD, HOST, PORT, y DATABASE a conveniencia, de acuerdo a la DB existente de XAMPP.

#### Cliente o Frontend

Alli se muestra un pequeño formulario para adivinar entre 4 o 5 palabras (las cuales se encuentran definidas en la logica, osea en app.js, son predetermidas, dada la rapidez del proyecto). Los resultados son actualizados con la cantidad de palabras adivinadas.

### Arranque de la Aplicacion

- Una vez creada la DB con el fichero .sql.
- Entrar en esta carpeta desde la terminal
- Instalar las dependencias NodeJS con _`npm install`_ (las dependencias estan definidas en package.json), toma un tiempo
- Una vez terminado, arrancar el server NodeJS de nuestra app con el comando _`npm start`_

Segun la logica de nuestra apicacion, intentara conectarse a la base de datos correctamente y esperara en la ruta **_localhost:3000_** las interacciones del usuario con el frontend.
Happy Game!
