import { useEffect, useState } from 'react';
import { styled } from "styled-components";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StyledForm = styled.form`
    background-color: wheat;
    border-radius: 5px;
    padding: 16px;
`;

const StyledInput = styled.input`
    width: 90%;
    border-radius: 5px;
    border: 2px solid transparent;
    color: crimson;
    background-color: white;
    padding: 12px 16px;
    margin-bottom: 8px;
    outline: 0px;
    font-size: 1rem;
    transition: all .2s ease-in-out;
    &:focus {
        border-color: #00daff;
    }
`;

const Description = styled.textarea`
    width: 90%;
    border-radius: 5px;
    border: 2px solid transparent;
    color: crimson;
    background-color: white;
    padding: 12px 16px;
    margin-bottom: 8px;
    outline: 0px;
    font-size: 1rem;
    min-height: 100px;
    resize: none;
    transition: all .2s ease-in-out;
    &:focus {
        border-color: #00daff;
    }
`;

const StyledButton = styled.button`
    border: 3px solid crimson;
    color: crimson;
    background: none;
    padding: 12px 16px;
    border-radius: 5px;
    outline: 0px;
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
`;

const BookEdit = ({ isEdit }) => {
    const navigate = useNavigate();
    const params = useParams();

    const [formFields, setFormFields] = useState(null);
    const { id, title, price, description} = formFields || {};

    const updateForm = ({ name, value }) => {
        setFormFields({ ...formFields, [name]: value })
    };

    const createHandler = async () => {
        try {
            const response = await axios.post('/books/new', { book: formFields });
            navigate(`/admin/${response.data.id}`)
        } catch (err) {
            alert('Error Creating New Book!');
            console.warn('ERR', err)
        }
    };

    const deleteHandler = async () => {
        try {
            await axios.delete(`/books/${id}`);
            alert(`Deleted ${title}`)
            navigate(`/admin`)
        } catch (err) {
            alert('Error Deleting Book!');
            console.warn('ERR', err)
        }
    };

    const saveHandler = async () => {
        try {
            await axios.post(`/books/${id}`, { book: formFields });
            alert(`Saved the book, ${title}`)
            navigate(`/admin`)
        } catch (err) {
            alert('Error Saving Book!');
            console.warn('ERR', err)
        }
    };

    useEffect(() => {
        if(!isEdit) {
            setFormFields({
                id: "",
                title: "",
                price: 0,
                description: ""
            })
            return;
        }
        (
            async () => {
                try {
                    const response = await axios.get(`/books/${params.id}`)
                    setFormFields(response.data);
                } catch (e) {
                    console.warn('ERR', e);
                    navigate('/admin', { replace: true });
                }
            }
        )()
    }, []);

    return (
        <StyledForm>
            <StyledInput 
                aria-label="ID input"
                name="id"
                onChange={({target}) => updateForm(target)}
                placeholder="ID"
                type="text"
                value={id}
            />
            <StyledInput 
                aria-label="Title input"
                name="title"
                onChange={({target}) => updateForm(target)}
                placeholder="Title"
                type="text"
                value={title}
            />
            <StyledInput 
                aria-label="Price input"
                name="price"
                onChange={({target}) => updateForm({
                    name: target.name, price: Number(target.value)
                })}
                placeholder="Price"
                type="text"
                value={price}
            />
            <Description 
                name="description" 
                onChange={({target}) => updateForm(target)} 
                placeholder="Description"
                value={description}
            />
            {isEdit && (
                <StyledButton 
                    onClick={createHandler} 
                    type="button"
                >
                    Create
                </StyledButton>
            )}
            {isEdit && (
                <>
                    <StyledButton 
                        onClick={saveHandler} 
                        type="button"
                    >
                        Save
                    </StyledButton>
                    <StyledButton 
                        onClick={deleteHandler} 
                        type="button"
                    >
                        Delete
                    </StyledButton>
                </>
            )}
        </StyledForm>
    )
}

export default BookEdit;