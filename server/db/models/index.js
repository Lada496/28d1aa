const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationUser = require("./conversation-user");

// associations

User.belongsToMany(Conversation, {
  through: ConversationUser,
  foreignKey: "userId",
  otherKey: "conversationId",
});
Conversation.belongsToMany(User, {
  through: ConversationUser,
  foreignKey: "userId",
  otherKey: "conversationId",
});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  ConversationUser,
};
