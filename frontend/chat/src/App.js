
import './App.css';
import {useState,useEffect} from 'react';
import io from 'socket.io-client';


const socket = io("http://localhost:5001");

function App() {
  const[Message,setMesssage]=useState('');
  const[Chat,setChat]=useState([]);
 
  const sendMessage=(e)=>{
    e.preventDefault();
    socket.emit("chat",{Message});
    setMesssage("");
  }

  useEffect(()=>{ 
    socket.on("chat",(payload)=>{
      setChat([...Chat,payload]);
    })
  })
 
  return (
    <div className="App">
      <header className="App-header">
       <h1>Chat App</h1>
       {
         Chat.map((payload,index)=>{
           return (
             <p key={index} > {payload.Message}</p> 
           )
         })
       }
      <form onSubmit={sendMessage}>
         <input type="text" name="chat" placeholder="send message" value={Message} onChange={(e)=>{
           setMesssage(e.target.value);
         }}/>
         <button type="submit">Send</button>
       </form>
      </header>
    </div>
  );
}

export default App;
