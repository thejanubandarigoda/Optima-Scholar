const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ─── MySQL Database Connection ───────────────────────────────────────────────
const db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'password123',
    database: 'mydb'
});

db.connect(err => {
    if (err) {
        // Log the error instead of crashing the whole server
        console.error('Failed to connect to MySQL:', err.message);
        return;
    }
    console.log('MySQL Database Connected!');

    // Create the students table if it does not already exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id            INT AUTO_INCREMENT PRIMARY KEY,
            firstName     VARCHAR(100),
            lastName      VARCHAR(100),
            dob           DATE,
            gender        VARCHAR(20),
            studentId     VARCHAR(50),
            grade         VARCHAR(50),
            admissionDate DATE,
            section       VARCHAR(50),
            parentName    VARCHAR(100),
            phone         VARCHAR(15),
            email         VARCHAR(100),
            address       TEXT
        )
    `;
    db.query(createTableQuery, err => {
        if (err) {
            console.error('Failed to create students table:', err.message);
            return;
        }
        console.log('Students table is ready!');
    });
});

// ─── 1. Register a new student (POST) ────────────────────────────────────────
app.post('/api/students', (req, res) => {
    const { firstName, lastName, dob, gender, studentId,
            grade, admissionDate, section, parentName,
            phone, email, address } = req.body;

    // Use explicit column list to avoid injecting unexpected fields
    const sql = `
        INSERT INTO students
            (firstName, lastName, dob, gender, studentId,
             grade, admissionDate, section, parentName, phone, email, address)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [firstName, lastName, dob || null, gender, studentId,
                    grade, admissionDate || null, section, parentName,
                    phone, email, address];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Student registered successfully', id: result.insertId });
    });
});

// ─── 2. Fetch all students (GET) ─────────────────────────────────────────────
app.get('/api/students', (req, res) => {
    const sql = 'SELECT * FROM students ORDER BY id DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// ─── 3. Delete a student by ID (DELETE) ──────────────────────────────────────
app.delete('/api/students/:id', (req, res) => {
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    });
});

// ─── Start server ─────────────────────────────────────────────────────────────
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});