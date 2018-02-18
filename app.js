const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const booksSearch = require('google-books-search');
const winston = require('winston');
const expressWinston = require('express-winston');
const keys = require('./config/keys');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  dynamicMeta: (req) => ({"body": req.body}),
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}))

Genre = require('./models/genres');
Book = require('./models/books');

//connection to mongoose
mongoose.connect(keys.mongoose.uri);

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

app.get('/api/google/books/', (req, res) => {
	const name = req.query.searchTerm;
	booksSearch.search(name, (error, results) => {
		if (error) {
			console.log(error);
		}
		Book.addBooks(results);
		res.send(results);
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

app.get('/api/google/volume/', (req, res) => {
    const volumeId = req.query.id;
    booksSearch.lookup(volumeId, (error, results) => {
        if (error) {
            console.log(error);
        }
        res.send(results);
    });
});

app.listen(3010);
