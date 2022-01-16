import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

export const apiUrl = 'http://localhost:3001'

function App() {
  return (
    <div className="App">
      <Router>
        <Link to={'/'}>Home Page</Link>
        <Link to={'/createpost'}>Create Post</Link>
        <Switch>
          <Route path={'/'} exact component={Home} />
          <Route path={''} exact component={CreatePost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
