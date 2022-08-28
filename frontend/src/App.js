import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react'


function App() {

  const [launch, setLaunch] = useState([]);

  useEffect(()=>{
    axios.get('/api').then(response => setLaunch(response.data));
  }, []);

  return launch.map((p,index) => {
    return <p key={index}>Date: {p.date} <br/> Rocket Name: {p.name}<br/> Success: {p.success}<br/></p>
  }
  
  );
}

export default App;
