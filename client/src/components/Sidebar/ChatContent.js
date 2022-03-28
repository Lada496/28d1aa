import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadBadge: {
    right: 20,
    top: 22,
  }
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();
  console.log(conversation)
  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;
  const unreadsNumber = conversation.messages.filter(message=>message.isRead === false).length
  console.log(unreadsNumber)

  return (
    <Box className={classes.root}>
      
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      <Badge className={classes.unreadBadge} badgeContent={unreadsNumber} color="primary">
      </Badge>
    </Box>
  );
};

export default ChatContent;
