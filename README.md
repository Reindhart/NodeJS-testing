# NodeJS-testing

## Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- **git**
- **fnm** (package manager)
- **Node.js** (instalado en tu máquina)

## Uso

### Iniciar Servidor

1. **(Recomendado)** Crear un ambiente de desarrollo con el siguiente comando en PowerShell:

    ```powershell
    fnm env --use-on-cd | Out-String | Invoke-Expression
    ```

    **Nota:** Con cada nueva terminal que abras, es necesario ejecutar este comando para activar el ambiente.

2. Dentro de la carpeta del proyecto, ejecutar el siguiente comando para iniciar el servidor:

    ```bash
    node server.js
    ```

3. Una vez que el servidor esté en funcionamiento, abre tu navegador y dirígete a la siguiente URL:

    ```
    http://localhost:3000
    ```

### Crear / Eliminar / Completar Tareas

1. En la caja de texto, escribe una tarea y haz clic en el botón  <img src="AGREGAR.png" alt="Agregar" width="70" />.

2. Para marcar una tarea como completada, haz clic en el **checkbox** <img src="checkbox.png" alt="Agregar" width="20" /> junto a la tarea.

3. Para eliminar una tarea, haz clic en el botón <img src="public/img/msg_error-0.png" alt="Agregar" width="20" /> que aparece junto a la tarea.

### Cerrar Servidor

1. Para detener el servidor, ve a la consola donde está corriendo el servidor y presiona **CTRL + C**.
