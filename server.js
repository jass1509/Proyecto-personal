const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./comentarios.db');

app.use(cors());
app.use(bodyParser.json());

// Crear tabla si no existe
db.run("CREATE TABLE IF NOT EXISTS comentarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, mensaje TEXT, fecha DATETIME DEFAULT CURRENT_TIMESTAMP)");

// Ruta para guardar comentario
app.post('/api/comentarios', (req, res) => {
    const { nombre, mensaje } = req.body;
    const query = `INSERT INTO comentarios (nombre, mensaje) VALUES (?, ?)`;
    
    db.run(query, [nombre, mensaje], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, status: "Comentario guardado" });
    });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));