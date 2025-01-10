import { Message } from "../index.js";
// Op is a Sequelize operator that allows you to perform complex queries
import { Op } from "sequelize";

// TEST COMMAND : node src/models/tests/message.model.test.js

// REQUEST TO GET ALL MESSAGES WITH SENDER_ID 1 AND RECEIVER_ID 2 OR
// REQUEST TO GET ALL MESSAGES WITH SENDER_ID 2 AND RECEIVER_ID 1
// const messages = await Message.findAll({
//   where: {
//     [Op.or]: [
//       {sender_id: 2, receiver_id: 1}, 
//       {sender_id: 1, receiver_id: 2}
//     ]
//   },
// });
// messages.forEach(message => {
//   console.log(message.content);
// });
