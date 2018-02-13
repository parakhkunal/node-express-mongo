const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')))

Genre = require('./models/genres');
Book = require('./models/books');

//connection to mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err) {
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	const genre = req.body;
	Genre.addGenres(genre, (err, genre) => {
		if(err) {
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id', (req, res) => {
	const id = req.params._id;
	const genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err) {
			throw err;
		}
		res.send(200);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	const id = req.params._id;
	Genre.deleteGenre(id, (err, genre) => {
		if(err) {
			throw err;
		}
		res.send(200);
	});
});


app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err) {
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err) {
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	const book = req.body;
	Book.addBook(book, (err, book) => {
		if(err) {
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	const id = req.params._id;
	const book = req.body;
	Book.updateBook(id, book, {}, (err) => {
		if(err) {
			throw err;
		}
		res.send(200);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	const id = req.params._id;
	Book.deleteBook(id, (err) => {
		if(err) {
			throw err;
		}
		res.send(200);
	});
});

app.listen(3010);
