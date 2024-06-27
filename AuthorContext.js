import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        const response = await axios.get('/api/authors');
        setAuthors(response.data);
    };

    const addAuthor = async (author) => {
        const response = await axios.post('/api/authors', author);
        setAuthors([...authors, response.data]);
    };

    const updateAuthor = async (author) => {
        const response = await axios.put(`/api/authors/${author.id}`, author);
        setAuthors(authors.map(a => a.id === author.id ? response.data : a));
    };

    const deleteAuthor = async (id) => {
        await axios.delete(`/api/authors/${id}`);
        setAuthors(authors.filter(a => a.id !== id));
    };

    return (
        <AuthorContext.Provider value={{ authors, fetchAuthors, addAuthor, updateAuthor, deleteAuthor }}>
            {children}
        </AuthorContext.Provider>
    );
};

export const useAuthors = () => useContext(AuthorContext);