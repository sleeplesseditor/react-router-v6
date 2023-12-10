import { 
    BrowserRouter as Router,
    Navigate,
    useRoutes
  } from 'react-router-dom';
  import { useState } from 'react';
  import Admin from './components/Admin/admin';
  import Books from './components/Books/books';
  import Nav from './components/shared/nav';
  import { styled } from "styled-components";
  import ProtectedRoute from './components/shared/protected-route';
  import ScrollTop from './components/shared/ScrollTop';
  
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

  const App = () => {
    const [authenticated] = useState(true);
    const routes = useRoutes([
        {
            path: '/*',
            element: <Books />
        },
        {
            path: '/admin/*',
            element: authenticated ? <Admin /> : <Navigate to="/" />
        },
        {
            path: "*",
            element: <Navigate to="/" />
        }
    ]);

    return routes;
  };
  
    const AppWrapper = () => (
        <>
            <AppContainer>
                <Router>
                <ScrollTop />
                <Content>
                    <Nav />
                    <App />
                </Content>
                </Router>
            </AppContainer>
        </>
    );
  
  export default AppWrapper;
  