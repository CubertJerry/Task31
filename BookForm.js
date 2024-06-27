import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useBooks } from './BookContext';

const BookForm = ({ book }) => {
    const { addBook, updateBook } = useBooks();

    const formik = useFormik({
        initialValues: {
            title: book ? book.title : '',
            author: book ? book.author : '',
            isbn: book ? book.isbn : '',
            publicationDate: book ? book.publicationDate : ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Required'),
            author: Yup.string().required('Required'),
            isbn: Yup.string().required('Required'),
            publicationDate: Yup.date().required('Required')
        }),
        onSubmit: values => {
            if (book) {
                updateBook({ ...book, ...values });
            } else {
                addBook(values);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" name="title" onChange={formik.handleChange} value={formik.values.title} />
                {formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div>
            <div>
                <label>Author</label>
                <input type="text" name="author" onChange={formik.handleChange} value={formik.values.author} />
                {formik.errors.author ? <div>{formik.errors.author}</div> : null}
            </div>
            <div>
                <label>ISBN</label>
                <input type="text" name="isbn" onChange={formik.handleChange} value={formik.values.isbn} />
                {formik.errors.isbn ? <div>{formik.errors.isbn}</div> : null}
            </div>
            <div>
                <label>Publication Date</label>
                <input type="date" name="publicationDate" onChange={formik.handleChange} value={formik.values.publicationDate} />
                {formik.errors.publicationDate ? <div>{formik.errors.publicationDate}</div> : null}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default BookForm;