import { Admin, Users, Event, Tag } from "../models/index.js";
import sanitizeHtml from "sanitize-html";

const adminController = {
  renderDashboard(req, res) {
    const sanitizedAdmin = {
      id: req.session.admin.id,
      userName: sanitizeHtml(req.session.admin.userName),
      picture: req.session.admin.picture,
    };
    res.render("dashboard", {
      admin: sanitizedAdmin,
    });
  },
  async getAllUsers(req, res) {
    const users = await Users.findAll({
      attributes: ["id", "userName", "email", "role", "gender", "age", "picture"],
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });

    const sanitizedUsers = users.map(user => ({
      id: user.id,
      userName: sanitizeHtml(user.userName),
      email: sanitizeHtml(user.email),
      role: sanitizeHtml(user.role),
      gender: sanitizeHtml(user.gender),
      age: user.age,
      picture: sanitizeHtml(user.picture),
      tags: user.tags.map(tag => ({
        id: tag.id,
        name: sanitizeHtml(tag.name),
      })),
    }));

    res.render("users", { users: sanitizedUsers });
  },
  async getOneUser(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  
    const user = await Users.findByPk(id, {
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    res.json(user);
  },
  async deleteOneUser(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
  
    const user = await Users.findByPk(id);
  
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  
    await user.destroy();
    res.json({ message: "User deleted" });
  },
  async getAllEvents(req, res) {
    const events = await Event.findAll({
      attributes: ["id", "title", "description", "location", "date", "picture"],
      include: {
        model: Users,
        as: "creator",
        attributes: ["id", "userName", "picture"],
      },
    });

    const sanitizedEvents = events.map(event => ({
      id: event.id,
      title: sanitizeHtml(event.title),
      description: sanitizeHtml(event.description),
      location: sanitizeHtml(event.location),
      date: event.date,
      picture: sanitizeHtml(event.picture),
      creator: {
        id: event.creator.id,
        userName: sanitizeHtml(event.creator.userName),
        picture: sanitizeHtml(event.creator.picture),
      },
    }));

    res.render("events", { events: sanitizedEvents });
  },
  async getOneEvent(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
  
    const event = await Event.findByPk(id, {
      include: {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });
  
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  
    res.json(event);
  },
  async deleteOneEvent(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
  
    const event = await Event.findByPk(id);
  
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  
    await event.destroy();
    res.json({ message: "Event deleted" });
  },
  async getAllAdmins(req, res) {
    const admins = await Admin.findAll();

    const sanitizedAdmins = admins.map(admin => ({
      id: admin.id,
      userName: sanitizeHtml(admin.userName),
      email: sanitizeHtml(admin.email),
    }));

    res.render("admins", { admins: sanitizedAdmins });
  },
  async deleteOneAdmin(req, res) {
    const id = Number.parseInt(req.params.id);
  
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }
  
    const admin = await Admin.findByPk(id);
  
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
  
    await admin.destroy();
    res.json({ message: "Admin deleted" });
  },
};

export default adminController;