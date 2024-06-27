import React, { useEffect } from 'react';
import { useBooks } from './BookContext';
import BookForm from './BookForm';

const BookList = () => {
    const { books, fetchBooks, deleteBook } = useBooks();

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Books</h2>
            <BookForm />
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => deleteBook(book.id)}>Delete</button>
                        <BookForm book={book} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;