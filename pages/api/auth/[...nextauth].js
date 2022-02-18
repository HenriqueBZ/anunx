import axios from 'axios'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials) {
                const res = await axios.post(`${process.env.APP_URL}/api/auth/signin`, credentials)

                const user = res.data

                if (user) {
                  return user
                } else {
                  throw '/auth/signin?i=1'                    
                }
            }
        })
    ],

    session: {
      jwt: true,
    },

    jwt: {
      secret: process.env.JWT_TOKEN,
    },

    callbacks: {
      async jwt({ token, account }) {        
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      }
    },

    callbacks: {
      async session({ session, token, user }) {        
        session.accessToken = token.accessToken
        return session
      }
    },

    database: process.env.MONGODB_URI,
})