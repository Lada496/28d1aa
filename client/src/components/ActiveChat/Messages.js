import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, readMessages } = props; 
  const [update, setUpdate] = useState(false) 

  useEffect(()=>{
    const onScroll = ()=>{
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);
        // when user reaches to the bottom
        if ((windowBottom >= docHeight) ) {
          setUpdate(true)
        }
    }
    window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener("scroll", onScroll);
  },[messages, readMessages])

  useEffect(()=>{
    if(messages.some(message=> (message.isRead === false) && (message.senderId !== userId))){
      if(update){
            const updateMessages = messages.filter(message=>(message.isRead === false) && (message.senderId !== userId))
          readMessages({messages: updateMessages})
      }
    }
  },[messages, update, readMessages, userId])

  
  useEffect(()=>{
    const body = document.body;
    // determine if user needs to scroll to read all messages or not
    if(body.scrollHeight < body.offsetHeight){
    setUpdate(true)
    }
  },[])

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
