import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme, isUnread) => ({
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
  previewTextUnread: {
    fontSize: 12,
    color: 'black',
    letterSpacing: -0.17,
    fontWeight: 'bold'
  },
  unreadBadge: {
    right: 20,
    top: 22,
  }
}));

const ChatContent = ({ conversation }) => {
  const classes = useStyles();
  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={conversation.isUnread? classes.previewTextUnread :classes.previewText} >
          {latestMessageText}
        </Typography>
      </Box>
      <Badge className={classes.unreadBadge} badgeContent={conversation.unreads} color="primary">
      </Badge>
    </Box>
  );
};

export default ChatContent;
