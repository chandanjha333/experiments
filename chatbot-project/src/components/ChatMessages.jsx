import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import './ChatMessages.css'

export default function ChatMessages({chatMessages}) {
  const chatMessagesRef = useAutoScroll(chatMessages);
  
  function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {
      const containerElem = chatMessagesRef.current;
      if(containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, [dependencies]);

    return chatMessagesRef;
  }
  
  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.length == 0 && (
        <p className="welcome-note">
        Welcome to the Chatbot project! Send a message using the textbox below.
        </p>
      )}
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message = {chatMessage.message}
            sender = {chatMessage.sender}
            time = {chatMessage.time}
            key = {chatMessage.id}
          />
        );
      })}
    </div>
  );
}