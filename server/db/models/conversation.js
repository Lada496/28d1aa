const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (userIds) {
  const conversation = await Conversation.findOne({
    where: {
      userId: {
        [Op.in]: [...userIds],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
