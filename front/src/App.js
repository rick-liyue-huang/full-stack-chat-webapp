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

export const apiUrl = 'http://localhost:3001'

function App() {
  const [authState, setAuthState] = useState(false);

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
        setAuthState(false);
      } else {
        setAuthState(true)
      }
    });
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{
        authState, setAuthState
      }}>
        <Router>
          <div className={'navbar'}>
            <Link to={'/'}>Home Page</Link>
            <Link to={'/createpost'}>Create Post</Link>
            {
              !authState && (
                <>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'/register'}>Register</Link>
                </>
              )
            }
          </div>
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/createpost'} exact component={CreatePost} />
            <Route path={'/post/:id'} exact component={Post} />
            <Route path={'/login'} exact component={Login} />
            <Route path={'/register'} exact component={Register} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
