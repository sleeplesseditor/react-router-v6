import { 
  BrowserRouter as Router,
  Navigate,
  Routes, 
  Route 
} from 'react-router-dom';
import Admin from './components/Admin/admin';
import Books from './components/Books/books';
import Nav from './components/shared/nav';
import { styled } from "styled-components";

const AppContainer = styled.div`
  margin: 60px auto;
  width: 400px;
  background-color: red;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 28px;
`;


function App() {
  return (
    <>
      <AppContainer>
        <Router>
          <Content>
            <Nav />
            <Routes>
              <Route path="/" element={<Books />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Router>
      </AppContainer>
    </>
  );
}

export default App;
