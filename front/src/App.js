import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const apiUrl = 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Router>
        <div className={'navbar'}>
          <Link to={'/'}>Home Page</Link>
          <Link to={'/createpost'}>Create Post</Link>
          <Link to={'/login'}>Login</Link>
          <Link to={'/register'}>Register</Link>
        </div>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={'/createpost'} exact component={CreatePost} />
          <Route path={'/post/:id'} exact component={Post} />
          <Route path={'/login'} exact component={Login} />
          <Route path={'/register'} exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
