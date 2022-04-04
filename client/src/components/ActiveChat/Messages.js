import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, readMessages, conversationId, showAvatar } = props;

  useEffect(()=>{
    if(messages.some(message=> (message.isRead === false) && (message.senderId !== userId))){
      const updateMessages = messages.filter(message=>(message.isRead === false) && (message.senderId !== userId))
      readMessages({messages: updateMessages, conversationId, readerId: userId })
    }
  },[conversationId,readMessages, userId, messages ])

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format('h:mm');
        let listMessageIndex = false;
        if(messages.length !== 0){
          if((messages.length - 1 )===index){
            listMessageIndex = true
          }
        }
        return message.senderId === userId ? (
          
          <SenderBubble key={message.id} text={message.text} time={time} showAvatar={showAvatar && listMessageIndex} otherUser={otherUser}/>
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
