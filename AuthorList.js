import React, { useEffect } from 'react';
import { useAuthors } from './AuthorContext';
import AuthorForm from './AuthorForm';

const AuthorList = () => {
    const { authors, fetchAuthors, deleteAuthor } = useAuthors();

    useEffect(() => {
        fetchAuthors();
    }, []);

    return (
        <div>
            <h2>Authors</h2>
            <AuthorForm />
            <ul>
                {authors.map(author => (
                    <li key={author.id}>
                        {author.name}
                        <button onClick={() => deleteAuthor(author.id)}>Delete</button>
                        <AuthorForm author={author} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorList;