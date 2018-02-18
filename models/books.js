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
    Book.findOne({ googleBookId : id }, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
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
		Book.findOne({ googleBookId : book.id }).then(existingBook => {
			if (existingBook) return;
			Book.create(mongoBook, callback);
		});
	});
}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	const query = {googleBookId: id};
	const update = {
		title: book.title,
		authors: book.authors,
		description: book.description,
		genre: 'Thriller',
		publisher: book.publisher,
		averageRating: book.averageRating,
		maturityRating: book.maturityRating,
		pageCount: book.pageCount,
		link: book.link,
		images: book.images,
		language: book.language
	};
	Book.findOneAndUpdate(query, update, options, callback);
}

// Delete Book
module.exports.deleteBook = (id, callback) => {
	const query = {googleBookId: id};
	Book.remove(query, callback);
}