'use server'
import { signIn } from "@/auth"
export default async function SignIndata(data){
    const { email, password } = data
    try{
        const result = await signIn('credentials', { 
            email: email, 
            password : password,
            redirect: false
        })
        return result;
    }catch(error){
        return { error: 'Internal server error' };
    }

}