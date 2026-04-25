import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css'

export default function ChatInput( {chatMessages, setChatMessages} ) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendUserMessages(event) {
    if(event.key === 'Enter') sendMessage();
    if(event.key === 'Escape') setInputText('');
  }

  async function sendMessage() {
    if(inputText === '') return;
    if(isLoading === true) return;

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setIsLoading(true);
    setChatMessages(newChatMessages);
    setInputText('');

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src={LoadingImage}/>,
        sender: 'robot',
        id:crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30"
        onChange = {saveInputText}
        value = {inputText}
        onKeyDown = {sendUserMessages}
        className="chat-input"
      />
      <button
        onClick = {sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick = {clearMessages}
        className="clear-button"
      >Clear</button>
    </div>
  );
}