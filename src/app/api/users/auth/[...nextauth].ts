import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
     clientId: process.env.GOOGLE_ID as string,
     clientSecret: process.env.GOOGLE_SECRET as string,
    }),
   ],
   session: {
    strategy: 'jwt',
   },
})