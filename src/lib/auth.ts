import {
  NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import Users from "@/dbconfig/dbconfig";

export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET!,
  providers: [
    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "abc@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials?.email as string;
        const password = credentials?.password as string;
        console.log(email, password);

        const user = await Users.findOne({ email });

        if (!user) {
          return null;
        }


        const vaildPassword = await bcryptjs.compare(password, user.password);
        console.log(vaildPassword);

        if (vaildPassword) {
          return user;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { id, email, image } = user;

          const users = await Users.findOne({ email: email });

          if (users === null) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword =await bcryptjs.hash(email!, salt);
            
        

            console.log("hashedPassword", hashedPassword);

            const newUser = {
              username: email,
              email,
              password: hashedPassword,
              imageUrl:image
                
            };
            const savedUser = await Users.insertOne(newUser);
            return savedUser;
          }

          return user;
        } catch (error: any) {
          console.log(error.response.data);
        }
      }
    },
  },
  session: {
    strategy: "jwt",
  },
};
