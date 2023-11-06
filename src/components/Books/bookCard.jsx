import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
  width: 90%;
  height: 90px;
  display: flex;
  background-color: wheat;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 8px;
  text-decoration: none;
  color: black;
  transition: transform 0.1s ease-in-out, background 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translate(0, -3px);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.1);
  }
`;

const BookImage = styled.img`
  width: 60px;
  height: 90px;
  margin-right: 16px;
`;

const Title = styled.h2`
  font-size: 1.3rem;
`;

const Price = styled.p`
  font-size: 1rem;
`;

const BookCard = ({ book }) => {
  return (
    <>
      <StyledLink to={book.id}>
        <BookImage src={`/assets/images/books/${book.id}.png`} />

        <div>
          <Title>{book.title}</Title>
          <Price>{`$${book.price}`}</Price>
        </div>
      </StyledLink>
    </>
  );
};

export default BookCard;
