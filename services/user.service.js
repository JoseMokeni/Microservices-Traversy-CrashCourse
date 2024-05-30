import { ServiceBroker } from "moleculer";

const broker = new ServiceBroker();

const generateId = () => Math.floor(Math.random() * 1000000).toString();

const users = [];

broker.createService({
  name: "user",
  actions: {
    async createUser(ctx) {
      const { username, email } = ctx.params;
      const newUser = { id: generateId(), username, email };
      users.push(newUser);
      return newUser;
    },
    async getUsers(ctx) {
      return users;
    },
    async findUsers(ctx) {
      const { username, email } = ctx.params;
      return (username !== null || email !== null) && users.length > 0
        ? users.filter(
            (user) =>
              user.username.includes(username || "") &&
              user.email.includes(email || "")
          )
        : users;
    },
  },
});

export default broker;
