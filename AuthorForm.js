import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthors } from './AuthorContext';

const AuthorForm = ({ author }) => {
    const { addAuthor, updateAuthor } = useAuthors();

    const formik = useFormik({
        initialValues: {
            name: author ? author.name : '',
            birthDate: author ? author.birthDate : '',
            biography: author ? author.biography : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            birthDate: Yup.date().required('Required'),
            biography: Yup.string().required('Required')
        }),
        onSubmit: values => {
            if (author) {
                updateAuthor({ ...author, ...values });
            } else {
                addAuthor(values);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" onChange={formik.handleChange} value={formik.values.name} />
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>
            <div>
                <label>Birth Date</label>
                <input type="date" name="birthDate" onChange={formik.handleChange} value={formik.values.birthDate} />
                {formik.errors.birthDate ? <div>{formik.errors.birthDate}</div> : null}
            </div>
            <div>
                <label>Biography</label>
                <textarea name="biography" onChange={formik.handleChange} value={formik.values.biography} />
                {formik.errors.biography ? <div>{formik.errors.biography}</div> : null}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AuthorForm;