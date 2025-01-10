import { Users, Tag } from "../index.js";

// TEST COMMAND : node src/models/tests/users.model.test.js

// REQUEST TO GET ALL USERS
// const users = await Users.findAll();
// console.log(users);

// REQUEST TO GET USERS WITH TAGS
// const usersHasTag = await Users.findAll({
//   include: {
//     model: Tag,
//     as: "tags"
//   }
// });
// console.log(usersHasTag);

// REQUEST TO GET ONE USER WITH ITS TAGS
// const user = await Users.findByPk(13, {
//   include: {
//     model: Tag,
//     as: "tags"
//   }
// });
// console.log(user.tags[0].name);

// REQUEST TO CREATE A NEW USER
// const newUser = await Users.create({
//   userName: 'ALEX',
//   gender: 'M',
//   role: 'member',
//   email: 'test',
//   password: "test",
//   age: 70
// });
// console.log(newUser);

// REQUEST TO DELETE A USER
// const deleteUser = await Users.destroy({
//   where: {
//     id: 13
//   }
// });
// console.log(deleteUser);