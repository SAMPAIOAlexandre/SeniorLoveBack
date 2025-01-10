import { sequelize } from "./sequelize-client.js";
import { Users } from "./users.model.js";
import { Event } from "./event.model.js";
import { Message } from "./message.model.js";
import { Tag } from "./tag.model.js";
import { Testimony } from "./testimony.model.js";
import { Admin } from "./admin.model.js";

// A belongs to many B through C as <refersToB>, foreignKey A_id
// A has many B foreignKey A_id
// A belongs to B foreignKey B_id

// Define associations between models Users and Tags
Users.belongsToMany(Tag, {
	through: "user_has_tag",
	as: "tags",
	foreignKey: "user_id",
});
Tag.belongsToMany(Users, {
	through: "user_has_tag",
	as: "users",
	foreignKey: "tag_id",
});

// Define associations between models Events and Tags
Event.belongsToMany(Tag, {
	through: "event_has_tag",
	as: "tags",
	foreignKey: "event_id",
});
Tag.belongsToMany(Event, {
	through: "event_has_tag",
	as: "events",
	foreignKey: "tag_id",
});

// Define associations between models Users (as participants) and Events (as events)
Users.belongsToMany(Event, {
	through: "event_participants",
	as: "events",
	foreignKey: "user_id",
});
Event.belongsToMany(Users, {
	through: "event_participants",
	as: "attendees",
	foreignKey: "event_id",
});

// Define associations between models Events and Users (as creators)
Event.belongsTo(Users, {
	as: "creator",
	foreignKey: "creator_id",
});
Users.hasMany(Event, {
	as: "createdEvents",
	foreignKey: "creator_id",
});

// Define associations between models Users and Messages
Users.hasMany(Message, {
	foreignKey: "sender_id",
	as:'sended',
});
Users.hasMany(Message, {
	foreignKey: "receiver_id",
	as: "received"
});
Message.belongsTo(Users, {
	foreignKey: "sender_id",
	as: "sender",
});
Message.belongsTo(Users, {
	foreignKey: "receiver_id",
	as: "receiver",
});

Testimony.belongsTo(Users, {
	as: "user",
	foreignKey: "user_id",
});

// Export all models and associations to be used in src/models/index.js
export { sequelize, Admin, Users, Event, Tag, Message, Testimony };