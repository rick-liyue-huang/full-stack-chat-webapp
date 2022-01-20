import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {AuthContext} from './tools/AuthContext';
import {useEffect, useState} from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";

export const apiUrl = 'http://localhost:3001'

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  });

  useEffect(() => {
    // if (localStorage.getItem('accessToken')) {
    //   setAuthState(true);
    // }
    axios.get(`${apiUrl}/auth/auth`, {
      headers: {
        accessToken: localStorage.getItem('accessToken')
      }
    }).then(response => {
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true
        })
      }
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({
      username: '',
      id: 0,
      status: false
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{
        authState, setAuthState
      }}>
        <Router>
          <div className={'navbar'}>
            <div className="links">
              {
                !authState.status ? (
                  <>
                    <Link to={'/login'}>Login</Link>
                    <Link to={'/register'}>Register</Link>
                  </>
                ) : (
                  <>
                    <Link to={'/'}>Home Page</Link>
                    <Link to={'/createpost'}>Create Post</Link>
                  </>
                )
              }
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username}</h1>
              {authState.status && <button onClick={handleLogout}>Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/createpost'} exact component={CreatePost} />
            <Route path={'/post/:id'} exact component={Post} />
            <Route path={'/login'} exact component={Login} />
            <Route path={'/register'} exact component={Register} />
            <Route path={'*'} exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
