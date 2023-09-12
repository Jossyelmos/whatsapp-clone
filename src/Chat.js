import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import Moment from 'react-moment';
import axios from './axios';

const Chat = ({ messages }) => {
  const [input, setInput] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: 'Demo APP',
      date: new Date(),
      received: false
    });

    setInput('');
  };

  return (
    <div className='chat'>
        <div className="chat__header">
          <Avatar />
          <div className="chat__headerInfo">
            <h3>Room name</h3>
            <p>Last seen at....</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${message.received && "chat__reciever"}`}>
            <span key={message.id} className="chat__name">{ message.name }</span>
            {message.message}
          <span className="chat__timestamp"><Moment format='h:mm:ss a'>{ message.date }</Moment></span>
          </p>
        ))}
        <div ref={messageEndRef} />
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Type a message' />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat