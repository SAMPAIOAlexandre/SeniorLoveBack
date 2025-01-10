import { Event, Tag, Users } from "../index.js";

// TEST COMMAND : node src/models/tests/event.model.test.js

// REQUEST TO GET ALL EVENTS
// const events = await Event.findAll();
// console.log(events);

// REQUEST TO GET ONE EVENT
// const event = await Event.findByPk(4);
// console.log(event);

// REQUEST TO GET EVENTS OWNED BY USER 11
// const ownedEvent = await Event.findOne({
//   where: {
//     creator_id: 11
//   }
// });
// console.log(ownedEvent);

// REQUEST TO GET EVENTS WITH TAGS
const eventsHasTag = await Event.findAll({
  include: {
    model: Tag,
    as: "tags",
  },
});
console.log(eventsHasTag);

// REQUEST TO GET ONE EVENT WITH ITS PARTICIPANTS
// const eventWithParticipants = await Event.findByPk(1, {
//   include: {
//     model: Users,
//     as: "attendees",
//   },
// });
// console.log(eventWithParticipants.attendees);

// REQUEST TO DELETE AN EVENT
// const eventToDelete = await Event.findByPk(4, {
//   include: {
//     model: Tag,
//     as: "tags"
//   }
// });
// await eventToDelete.destroy();
// console.log(eventToDelete);
