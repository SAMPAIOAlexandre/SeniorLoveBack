// import models with associations from association.js
import {
	sequelize,
	Admin,
	Users,
	Event,
	Tag,
	Message,
	Testimony,
} from "./association.js";

// export models to be used in controllers
export { sequelize, Admin, Users, Event, Tag, Message, Testimony };