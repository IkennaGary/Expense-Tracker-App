import User from "../model/users.model.js";
import bcrypt from "bcryptjs";

export const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      const { username, password, gender, name } = input;
      try {
        if (!username || !password || !gender || !name) {
          throw new Error("Please fill all the fields");
        }

        const validateUser = await User.findOne({ username });
        if (validateUser) {
          throw new Error("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const harshedPassword = await bcrypt.hash(password, salt);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          password: harshedPassword,
          gender,
          name,
          profilePicture:
            gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.log(`Error in sign up: ${error.message}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    signIn: async (_, { input }, context) => {
      const { username, password } = input;
      try {
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.log(`Error in sign in: ${error.message}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, _, context) => {
      context.logout();
      req.session.destroy((err) => {
        if (err) {
          throw err;
        }
        res.clearCookie("connect.sid");
      });
      return {
        message: "Logged out successfully",
      };
    },
  },
  Query: {
    authUser: async (_, _, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.log(`Error in authUser: ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById({ _id: userId });
        return user;
      } catch (error) {
        console.log(`Error in getting user ${error}`);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
};
