const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { Op } = require("sequelize");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
        isRead: false,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isRead: false,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const { messages, conversationId } = req.body;

    if (!req.user) {
      return res.sendStatus(401);
    }

    const userId = req.user.id;

    const user = await User.findOne({ where: conversationId });
    const conversation = await Conversation.findOne({
      where: {
        id: conversationId,
      },
    });

    const isUserConversationUser =
      conversation.user1Id === userId || conversation.user2Id === userId;

    if (!user || !isUserConversationUser) {
      return res.sendStatus(403);
    }

    await Message.update(
      { isRead: true },
      {
        where: {
          [Op.or]: {
            id: [...messages.map((message) => message.id)],
          },
        },
      }
    );

    const newMessages = await Message.findAll({
      where: {
        [Op.or]: {
          id: [...messages.map((message) => message.id)],
        },
      },
    });

    res.json({ messages: newMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
