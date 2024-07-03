'use server'

import { signOut } from "@/auth"

export default async function SignOut(){
    try{
        await signOut();
    }catch(error){
        return { error: 'Internal server error' };
    }
}