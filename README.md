# REALTIME CHAT UTILIZANDO VUE + NODE + MONGODB + SOCKET.IO

## COMPILACIÓN


* para el directorio /server
```
npm run start
```

* para el directorio /client
```
npm run serve
```


### ENLACE EN PRODUCCIÓN
```
https://myrealchat.netlify.app/
```

### OBSERVACIONES

* El código del cliente esta comentado en español debido a que fue más sencillo para mi, explicar la lógica del contexto de búsqueda en este idioma en el archivo index.js de la carpeta /store (VUEX), sin embargo el código del servidor está comentado en inglás ya que son comentarios puntuales. Entiendo que el estandar es inglés, bajo cualquier circunstancia.

* Cuando se inicia la sesión, el username del usuario se almacena en el localstorage, de esta forma el servidor puede saber a cual cliente le pertenece el Id del socket cada vez que se renueva la conexión, (manteniendo al usuario conectado siempre, a menos de que él la cierre manualmente). 
Es por esto que se sugiere probar con navegadores distintos en lugar de pesatañas distintas, ya que, el localstorage almacena la inforaación por dominio.

* Para mayor comodidad, utilizé MongoDB Atlas para alojar la base de datos del chat ya que, suelo utilizar ese servicio para mis proyectos.
