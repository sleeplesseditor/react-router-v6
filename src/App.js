import { 
  BrowserRouter as Router,
  Navigate,
  Routes, 
  Route 
} from 'react-router-dom';
import { useState } from 'react';
import Admin from './components/Admin/admin';
import Books from './components/Books/books';
import Nav from './components/shared/nav';
import { styled } from "styled-components";
import ProtectedRoute from './components/shared/protected-route';

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
  const [authenticated, setAuthenticated] = useState(true);

  return (
    <>
      <AppContainer>
        <Router>
          <Content>
            <Nav />
            <Routes>
              <Route path="/*" element={<Books />}/>
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute 
                    authenticated={authenticated} 
                    element={<Admin />} 
                    to={"/"} 
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Content>
        </Router>
      </AppContainer>
    </>
  );
}

export default App;
