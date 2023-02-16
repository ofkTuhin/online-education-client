import { Axios } from "@lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const data = async (user) => {
  return await Axios.get(
    user === "admin" ? "admin" : user === "teacher" ? "teacher" : "student"
  );
};
export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",

      credentials: {},
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password, user } = credentials;

        const res = await data(user);

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (
          res.data.result.map((data) => data.email).includes(email) &&
          res.data.result.map((data) => data.password).includes(password)
        ) {
          return {
            email: email,
            user: user,

            // role: res.data.result[0].role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      const sessionData = {
        ...session,
        user: {
          ...session.user,
          // role: test,
        },
      };
      return sessionData;
    },
  },

  theme: {
    colorScheme: "light",
  },
};
process.env.NODE_ENV !== "production";
export default NextAuth(authOptions);
