# DOMINOSOFT
Domino Soft requiere una aplicación para llevar un registro del inventario del estado
de vacunación de los empleados.
La aplicación cuenta con 2 roles: Administrador y Empleado.

## Instalacion
``` npm i```
para instalar todas las librerias que se encuentran en el package.json

## Uso
```npm start```
El Administrador puede registrar, editar, listar y eliminar a los empleados
El Empleado solo puede editar algunos de sus datos


## Construccion
Cada ruta esta potegida por medio de sessiones para cada tipo de usuario soportado por el programa.
los datos de la cuenta adminnistracion vienen por defecto: 
user:admin@gmail.com 
pass:12345

se crea un archivo .env con las variables de entorno que seras clave para proteger los datos

se genera una contraseña para cada empleado creado con el valor: 12345 , para que puedan acceder al login 
con su cuenta de tipo empleado,esta contraseña puede ser cambiada por el mismo empleado

Se asigno a las variables de entorno una llamada TOKEN_SECRET, que es iguala a una palabra cualquiera, para asi
generar la cookie donde van a estar las sessiones

Para la base de datos se utlizo una variable de entorno denominada MONGODB_URI, la cual almacena 
el valor de URL de la base de datos de mongodb atlas https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/

## Estado del proyecto
En base a los conocimientos que tengo,en el momento (25 marzo de 2022), el software se encuentra en una fase
beta, debido a que hicieron falta algunas validaciones que necesitan realizarse desde el FRONT
