import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@dou.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (email !== "admin@phonew.com" && password !== "Admin@Phonew") {
          return null;
        }
        return {
          id: "1",
          email: "admin@phonew.com",
          name: "Admin Phonew",
          image: "/avatar.png",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});
