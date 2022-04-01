import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, readMessages, conversationId } = props;
  const lastMessage = messages[messages.length - 1] 
  const isMyLastMessageRead = lastMessage.isRead && lastMessage.senderId === userId
  useEffect(()=>{
    if(messages.some(message=> (message.isRead === false) && (message.senderId !== userId))){
      const updateMessages = messages.filter(message=>(message.isRead === false) && (message.senderId !== userId))
      readMessages({messages: updateMessages, conversationId })
    }
  },[conversationId,readMessages, userId, messages ])

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format('h:mm');
        const showAvatar = (messages.length - 1) === index && isMyLastMessageRead

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} showAvatar={showAvatar} otherUser={otherUser}/>
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
