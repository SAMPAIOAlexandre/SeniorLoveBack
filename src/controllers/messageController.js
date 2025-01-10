import { z } from 'zod';
import { Message, Users } from '../models/index.js';
import sequelize, { Op } from 'sequelize';
import sanitizeHtml from 'sanitize-html';


const schema = z.object({
  content: z.string(),
});

const messageController = {
  async createMessage (req, res) {

    const sender = parseInt(req.userId);
    const receiver = parseInt(req.params.receiverId);
  
    const { error } = schema.safeParse(req.body);
  
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    if (sender === receiver) {
      return res.status(400).json({ error: "Sender and receiver cannot be the same" });
    }

    const content = req.body.content;

    const sanitizedContent = sanitizeHtml(content);

    const newMessage = await Message.create({
      content: sanitizedContent,
      sender_id: sender,
      receiver_id: receiver,
    });

    res.status(201).json(newMessage);
  },
  async getContacts (req, res) {
    const sender = parseInt(req.userId);

    const contacts = await Message.findAll({
      where :{
        [Op.or]: [
          {sender_id: sender}, 
          {receiver_id: sender}
        ]
      },
      attributes: [
        [sequelize.literal(`
          CASE 
          WHEN sender_id = ${sender} THEN receiver_id
          WHEN receiver_id = ${sender} THEN sender_id
          END
          `), 'user_id']
      ],
      group: ['user_id', 'created_at'],
      distinct: true,
      raw:true,
      order: [['created_at', 'DESC']]
    });
    // console.log('contacts :>> ', contacts);
    const conversations = contacts.map((contact) => contact.user_id);
    // console.log('conversations :>> ', conversations);
    if(!conversations || !conversations.length) return res.status(404).json({error : "no conversation for this user."});
    
    const users = await Users.findAll({
      where: {
        id: conversations,
      },
      attributes:['id', 'userName', 'picture'],
      order: [
        [sequelize.literal(`array_position(array[${conversations.join(',')}], id)`), 'ASC']
      ]
    });

    users.forEach(user => {
      user.picture = sanitizeHtml(user.picture);
      user.userName = sanitizeHtml(user.userName);
    });

    // console.log('users :>> ', users);
    res.json(users)
  },
  async getMessages (req, res) {
    const sender = parseInt(req.userId);
    const receiver = parseInt(req.params.receiverId);

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {sender_id: sender, receiver_id: receiver}, 
          {sender_id: receiver, receiver_id: sender}
        ]
      },
      include: [
        {
          model: Users,
          as: "sender",
          attributes: ["id", "userName", "picture"],
        },
        {
          model: Users,
          as: "receiver",
          attributes: ["id", "userName", "picture"],
        },
      ],
    });

    if (messages.length === 0) {
      return res.status(404).json({ error: "No messages yet" });
    }

    messages.forEach(message => {
      message.content = sanitizeHtml(message.content);
    });

    res.status(200).json(messages);
  },
};

export default messageController;