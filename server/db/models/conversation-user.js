const Sequelize = require("sequelize");
const db = require("../db");

const ConversationUser = db.define("conversation-user", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = ConversationUser;
