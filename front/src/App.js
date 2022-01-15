import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";

export const apiUrl = 'http://localhost:3001'

function App() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/posts`).then(response => {
      setListOfPosts(response.data);
    })
  }, []);

  return (
    <div className="App">
      {
        listOfPosts.map((post, key) => (
          <div key={key} className={'post'}>
            <div className={'title'}>{post.title}</div>
            <div className={'body'}>{post.postText}</div>
            <div className={'footer'}>{post.username}</div>
          </div>
        ))
      }
    </div>
  );
}

export default App;
