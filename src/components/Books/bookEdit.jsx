import { useEffect, useState } from 'react';
import { styled } from "styled-components";
import axios from 'axios';

const StyledForm = styled.form`
    background-color: wheat;
    border-radius: 5px;
    padding: 16px;
`;

const BookEdit = () => {
    const [formFields, setFormFields] = useState(null);
    const { id, title, price, description} = formFields || {};

    const updateForm = ({ name, value }) => {
        setFormFields({ ...formFields, [name]: value })
    };

    const createHandler = async () => {
        try {
            await axios.post('/books/new', { book: formFields });
            alert('Book Created!');
        } catch (err) {
            console.warn('ERR', err)
        }
    };

    return (
        <StyledForm>
            <input 
                aria-label="ID input"
                name="id"
                onChange={({target}) => updateForm(target)}
                placeholder="ID"
                type="text"
                value={id}
            />
            <input 
                aria-label="Title input"
                name="title"
                onChange={({target}) => updateForm(target)}
                placeholder="Title"
                type="text"
                value={title}
            />
            <input 
                aria-label="Price input"
                name="price"
                onChange={({target}) => updateForm({
                    name: target.name, price: Number(target.value)
                })}
                placeholder="Price"
                type="text"
                value={price}
            />
            <textarea 
                name="description" 
                onChange={({target}) => updateForm(target)} 
                placeholder="Description"
                value={description}
            />
            <button 
                onClick={createHandler} 
                type="button"
            >
                Create
            </button>
        </StyledForm>
    )
}

export default BookEdit;