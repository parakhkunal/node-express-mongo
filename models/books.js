const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
	googleBookId: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	authors: {
		type: Array,
		required: true
	},
	description: {
		type: String
	},
	publisher: {
		type: String
	},
	averageRating: {
		type: Number
	},
	maturityRating: {
		type: String
	},
	pageCount: {
		type: Number
	},
	link: {
		type: String
	},
	images: {
		type: Object
	},
	language: {
		type: String
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
});

const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	// Book.findById(id, callback);
	console.log(id);
    Book.findOne({ googleBookId : id }, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	console.log(book);return false;
	Book.create(book, callback);
}

// Add Book
module.exports.addBooks = (results, callback) => {
	results.forEach((book) => {
		const mongoBook = {
			'googleBookId': book.id,
			'title': book.title,
			'authors': book.authors,
			'description': book.description,
			'genre': 'Thriller',
			'publisher': book.publisher,
			'averageRating': book.averageRating,
			'maturityRating': book.maturityRating,
			'pageCount': book.pageCount,
			'link': book.link,
			'images': book.images,
			'language': book.language
		};
		Book.create(mongoBook, callback);
	});
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	const query = {_id: id};
	const update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	};
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.deleteBook = (id, callback) => {
	const query = {_id: id};
	Book.remove(query, callback);
}