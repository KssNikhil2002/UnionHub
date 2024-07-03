import NextAuth from "next-auth"
import googleProvider from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials"
import  Login  from "@/app/actions/LoginAction"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials)=> {
            const { email, password } = credentials;
            try {
                const result = await Login({email, password});
                if (result.user) {
                    return result.user;
                }else{
                    return result.error;
                }
            } catch (error) {
                return { error: 'Internal server error' };
            }
        }
    }),
  ],
    pages: {
        signIn: "/login",
    },
    session:{
        strategy: "jwt",
    },
    callbacks:{
        async session({token, session}) {
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            return session;
        }
    }
})