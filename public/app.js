// Variables del documento
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Crear elementos de tarea
function addTaskElement(task) {
    const newTask = document.createElement('li');

    // Crear el label
    const label = document.createElement('label');
    label.classList.add('aesthetic-windows-95-checkbox');

    // Crear el checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id, checkbox.checked));

    // Crear el span de texto
    const taskText = document.createElement('span');
    taskText.textContent = task.description;

    // Crear el span de estilo
    const checkmark = document.createElement('span');
    checkmark.classList.add('aesthetic-windows-95-checkmark');

    // Añadir los elementos al label
    label.appendChild(taskText);
    label.appendChild(checkbox);
    label.appendChild(checkmark);

    // Añadir el label a la tarea
    newTask.appendChild(label);

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('aesthetic-windows-95-button-title-bar', 'delete-btn');
    deleteButton.innerHTML = '<img src="img/msg_error-0.png" alt="eliminar">';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    // Añadir el botón de eliminar a la tarea
    newTask.appendChild(deleteButton);

    return newTask;
}

// Añadir nueva tarea
async function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, escribe una tarea primero.");
        return;
    }

    try {
        // Realizar la solicitud POST al servidor
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: taskText })
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error al agregar la tarea');
        }

        // Ver el contenido de la respuesta en la consola
        const data = await response.json();
        console.log('Respuesta del servidor:', data);  // Depuración: contenido de la respuesta

        // Crear el elemento de tarea en la interfaz
        const taskElement = addTaskElement(data);
        taskList.appendChild(taskElement);

        // Limpiar el campo de entrada
        taskInput.value = "";
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar la tarea');
    }
}


// Cambiar estado de tarea
async function toggleTask(taskId, completed) {
    const response = await fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
        console.error('Error al actualizar tarea:', await response.text());
    }
}

// Eliminar tarea
async function deleteTask(taskId) {
    const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
    if (response.ok) {
        loadTasks();
    } else {
        console.error('Error al eliminar tarea:', await response.text());
    }
}

// Cargar tareas desde el backend
async function loadTasks() {
    try {
        const response = await fetch('/tasks');
        if (!response.ok) {
            throw new Error('Error al cargar las tareas');
        }

        const tasks = await response.json();
        taskList.innerHTML = ''; // Limpiar la lista antes de cargar

        tasks.forEach(task => {
            const taskElement = addTaskElement(task);
            taskList.appendChild(taskElement);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron cargar las tareas.');
    }
}



// Añadir evento para agregar tareas
addTaskBtn.addEventListener('click', addTask);

// Añadir tarea con tecla Enter
taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadTasks);

