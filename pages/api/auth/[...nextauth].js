import { Axios } from "@lib/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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
        const res = await Axios.get("admin");
        console.log(password, user);

        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        if (
          res.data.result.map((data) => data.email).includes(email) &&
          res.data.result
            .map((data) => data.password)
            .includes(Number(password))
        ) {
          console.log("data");
          return {
            email: email,

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
      const res = await Axios.get("admin");
      console.log(res);
      const role = res.data.result.find((d) => d.email === session.user?.email);
      const sessionData = {
        ...session,
        user: {
          ...session.user,
          role: role.role,
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
