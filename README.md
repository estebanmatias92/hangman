# Hangman

Aplicacion web en NodeJS, HTML y Javascript para el AHORCADO.

La logica de la aplicacion consiste procesar los intentos de un determinado usuario, de adivinar palabras, computa los aciertos y actualiza el puntaje de ese usuario en la base de datos.

La comunicacion entre cliente y servidor es constante, por cada intento, el cliente se comunicara con el servidor para conocer si fue acierto o no, y poder reflejarlo en la pagina.

## Prerrequisitos

- Tener NodeJS instalado
- Tener base de datos corriendo (XAMPP o cualquier otro servidor de base de datos)

## Consideraciones

### Separacion de responsabilidades

#### Base de datos

Comunmente considerada parte como parte del Backend por usar servidores/interpretes o motores (como MySQL) para ejecutar las instrucciones SQL y al mismo tiempo administrar los datos guardados.

En este caso manejada a traves del server MySQL sobre Docker, pero lista para ser usada por MySQL a traves de XAMPP.

Para crear el esquema de la base de datos por primera vez (la database y table), se dispone de las instrucciones SQL en el fichero _**./db/init.sql**_

#### Server o Backend

##### Descripcion

Se encarga de la logica de la app (esta en _**./app.js**_).
Alli se encuentra definido el servidor HTTP, que, una vez ejecutado el proceso, se encargara de servir la pagina (_**./public/index.html**_) en [localhost:3000](localhost:3000)/index y de escuchar las interacciones que comunique el cliente.

##### Funcionamiento

Desde index, y gracias a la logica de _**./public/script.js**_ en el cliente, se enviaran mensajes a traves de HTTP al servidor (proceso de _**./app.js**_ corriendo):

- Por [locahost:3000](localhost:3000)/guess[POST] cada vez que se intente adivinar presionando el boton.
- Y se recibira por HTTP [localhost:3000](localhost:3000)/current-word[GET] los resultados de su intento de adivinar.

El fichero _**./app.js**_ declara un diccionario con las credenciales de conexion a la base de datos, modificar el USER, PASSWORD, HOST, PORT, y DATABASE, de acuerdo a la DB existente de XAMPP.

#### Cliente o Frontend

##### Descripcion

En el directorio _**./public/**_ se encuentra nuestro cliente, con una pequeña maqueta **HTML** (_**./public/index.html**__) y un script **JS** (_**./public/script.js**_) para poder procesar las interacciones del ususario y la comunicacion con nuestro "**APP**" server.

La maqueta consiste de un pequeño formulario para ingresar y adivinar (entre 4 o 5) palabras (las cuales se encuentran predefinidas en _**./app.js**_).

##### Funcionamiento

_**./public/index.html**_ es servido en [localhost:3000](localhost:3000) por el server **HTTP**. Tambien importa un documento **JS** para poder procesar interacciones y mandar peticiones **HTTP** y recibir respuestas **HTTP** del server.

Gracias a esto, los resultados son actualizados al instante y reflejan la cantidad de palabras adivinadas REGISTRADAS en la DB correspondientes al JUGADOR.

### Arranque de la Aplicacion

- Una vez creada la **DB** con el fichero _**.sql**_.
- Entrar en esta carpeta desde la terminal.
- Instalar las dependencias NodeJS con _`npm install`_ (las dependencias estan definidas en _**./package.json**_)... toma un tiempo.
- Una vez terminado, arrancar el server NodeJS de nuestra app con el comando _`npm start`_.

Esta aplicacion, primero intentara conectarse a la base de datos correctamente y luego aguardara comunicacion via **HTTP** en la ruta [localhost:3000](localhost:3000).
Happy Gaming!.
