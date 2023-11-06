import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from "styled-components";

const Container = styled.div`
    background-color: wheat;
    border-radius: 5px;
    padding: 16px;
`;

const Header = styled.div`
    display: flex;
`;

const Image = styled.img`
    width: 60px;
    margin-right: 16px;
`;

const Title = styled.h1`
    font-weight: 700;
    font-size: 1.3rem;
    margin: 0;
`;

const Price = styled.p`
    color: #a12b27;
    font-weight: 700;
    font-size: 1rem;
    margin: 0;
`;

const Back = styled.button`
  border: 3px solid #a12b27;
  color: #a12b27;
  background: none;
  padding: 12px 14px;
  margin-right: 6px;
  border-radius: 5px;
  outline: 0;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
`;


const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        (
            async() => {
                try {
                    const response = await axios.get(`/books/${id}`);
                    setBook(response.data);
                } catch (err) {
                    console.warn('ERR', err);
                    navigate('/', {state: {id}});
                }
            }
        )()
    }, [id]);

    return book ? (
        <Container>
            <Header>
                <Image alt="" src={`/assets/images/books/${id}.png`} />
                <div>
                    <Title>{book.title}</Title>
                    <Price>{`$${book.price}`}</Price>
                </div>
            </Header>
            <p>{book.description}</p>
            <Back onClick={() => navigate(-1)}>Back</Back>
        </Container>
        ) : <h3>Loading...</h3>
};

export default Book;