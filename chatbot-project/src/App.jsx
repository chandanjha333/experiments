import { useEffect, useState } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(() => {
    const data = localStorage.getItem('messages');
    return data ? JSON.parse(data) : [];
  });
  //const [chatMessages, setChatMessages] = array;
  //const chatMessages = array[0];
  //const setChatMessages = array[1];

  useEffect(() => {
    Chatbot.addResponses({
      "how is the weather" : "It is too hot",
      "Which state do i live in" : "Delhi, India"
    });
  });

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="app-container">
      <ChatMessages 
        chatMessages  = {chatMessages}
      />
      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
    </div>
  );
}

export default App
