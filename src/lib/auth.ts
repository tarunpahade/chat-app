import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "@/dbconfig/dbconfig";
import { useSession ,} from "next-auth/react";
import { redirect, useRouter} from "next/navigation";

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "abc@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
       
        if (!credentials || !credentials.email || !credentials.password) {
            return null; 
          }

        const email = credentials?.email as string;
        const password = credentials?.password as string;
console.log(email,password);

        
        const user = await Users.findOne({ email });

        if (!user) {
          return null;
        }
        console.log("user already exists", user, email);

        //check password is correct
        const vaildPassword = await bcryptjs.compare(password, user.password);
        console.log(vaildPassword);

        if (!vaildPassword) {
     

          return null;
        }
        console.log(user);

        //create token data
        const tokenData = {
          id: user._id,
          username: user.username,
          email: user.email,
        };
        console.log("this is token data", tokenData);

        // //create tokens
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        console.log(token, "this is token");

        // Return null if user data could not be retrieved
        if(vaildPassword){


            return tokenData
        }
      return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },
};

