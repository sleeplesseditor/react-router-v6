import { Link, Routes, Route } from "react-router-dom";
import BooksList from '../Books/booksList';
import BookEdit from '../Books/bookEdit';
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border: 3px solid crimson;
  border-radius: 5px;
  padding: 6px 12px;
  margin-left: auto;
  font-weight: 700;
  text-transform: uppercase;
  color: crimson;
`;

const Admin = () => {
  return(
    <>
      <Container>
        <h1>Admin</h1>
        <StyledLink to="new">
          New
        </StyledLink>
      </Container>
      <Routes>
        <Route path="/books" element={<BooksList />} />
        <Route path="/new" element={<BookEdit isEdit={false} />} />
        <Route path=":id" element={<BookEdit isEdit={true} />} />
      </Routes>
    </>
  )
}

export default Admin;