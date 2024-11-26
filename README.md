# NodeJS-testing

POWERSHELL - Windows

Requisitos:

- git

- fnm package manager

- Node JS instalado

Uso:

    Iniciar Servidor

        (Recomendado)
        Crear un ambiente de desarrollo con: fnm env --use-on-cd | Out-String | Invoke-Expression
            
            Nota (Con cada nueva terminal se tiene que usar este comando)


        Dentro de la carpeta del proyecto ejecutar el comando: node server.js

        Dirijirse en un navegador a la dirección: localhost:3000

    Crear / Eliminar / Completar Tareas

        En la caja de texto escribir alguna tarea y dar click al botón "AGREGAR"

        Dar click en el checkbox para completar la tarea

        Dar click en el botón con forma de (X) para eliminar una tarea

    Cerrar Servidor

        En la consola que funciona el servidor pulsar: CTRL + C