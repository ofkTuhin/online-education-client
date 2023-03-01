import { Axios } from "@lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const data = async (user, email) => {
  return await Axios.get(
    user === "admin" ? "admin" : user === "teacher" ? "teacher" : "student",
    {
      headers: {
        user: email,
      },
    }
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

        const res = await data(user, email);
        console.log(res);
        if (
          res.data.result.map((data) => data.email).includes(email) &&
          res.data.result.map((data) => data.password).includes(password)
        ) {
          return {
            user: {
              role: user,
              email: email,
              result: res.data.result,
            },
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      const sessionData = {
        ...session,
        user: {
          ...session.user,
          user: token.user,
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
