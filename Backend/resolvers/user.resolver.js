import DB from "../dummyData/data.js";

export const userResolver = {
  Query: {
    // Get all users
    users: () => DB.users,
    // Get a single user
    user: (_, args) => DB.users.find((user) => user._id === args.userId),
    // Get authenticated users
    authUser: () => DB.users.find((user) => user),
  },
  Mutation: {
    signUp: (_, args) => {
      const user = {
        ...args.user,
        _id: Math.floor(Math.random() * 10000).toString(),
      };
      DB.users.push(user);
      return user;
    },
    signIn: (_, args) => {
      const user = DB.users.find(
        (user) =>
          user.username === args.user.username &&
          user.password === args.user.password
      );
      return user;
    },
    logout: (_, args) => args.message,
  },
};
