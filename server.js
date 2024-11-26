const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Conexión a SQLite
const db = new sqlite3.Database("./tasks.db", (err) => {
	if (err) {
		console.error("Error al conectar con la base de datos:", err);
	} else {
		console.log("Conexión exitosa a SQLite");
		db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NOT NULL,
                completed BOOLEAN NOT NULL DEFAULT 0
            )
        `);
	}
});

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
	db.all("SELECT * FROM tasks", (err, rows) => {
		if (err) {
			console.error("Error al obtener tareas:", err);
			return res.status(500).json({ error: "Error al obtener tareas" });
		}
		res.json(rows);
	});
});

// Agregar nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body;  // Esperando que se pase 'description'

  if (!description) {
      return res.status(400).json({ error: 'La descripción de la tarea es requerida' });
  }

  const query = 'INSERT INTO tasks (description, completed) VALUES (?, ?)';
  db.run(query, [description, false], function(err) {
      if (err) {
          console.error('Error al agregar la tarea:', err.message);
          return res.status(500).json({ error: 'Error al agregar la tarea' });
      }

      res.status(201).json({
          id: this.lastID,
          description: description,
          completed: false
      });
  });
});


// Actualizar estado de una tarea
app.put("/tasks/:id", (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;
	db.run("UPDATE tasks SET completed = ? WHERE id = ?", [completed, id], function (err) {
		if (err) {
			res.status(500).json({ error: "Error al actualizar tarea" });
		} else if (this.changes === 0) {
			res.status(404).json({ error: "Tarea no encontrada" });
		} else {
			res.status(200).json({ id, completed });
		}
	});
});

// Eliminar tarea
app.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;
	db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
		if (err) {
			res.status(500).json({ error: "Error al eliminar tarea" });
		} else if (this.changes === 0) {
			res.status(404).json({ error: "Tarea no encontrada" });
		} else {
			res.status(204).end();
		}
	});
});

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
