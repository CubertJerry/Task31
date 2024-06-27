import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('/api/books');
        setBooks(response.data);
    };

    const addBook = async (book) => {
        const response = await axios.post('/api/books', book);
        setBooks([...books, response.data]);
    };

    const updateBook = async (book) => {
        const response = await axios.put(`/api/books/${book.id}`, book);
        setBooks(books.map(b => b.id === book.id ? response.data : b));
    };

    const deleteBook = async (id) => {
        await axios.delete(`/api/books/${id}`);
        setBooks(books.filter(b => b.id !== id));
    };

    return (
        <BookContext.Provider value={{ books, fetchBooks, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => useContext(BookContext);