'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import {z} from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import SignIndata from '@/app/actions/SignIn'


const schema = z.object({
  email: z.string().email('Invalid email address').refine(val => val.endsWith('@wisc.edu'), {
    message: 'Email must end with @wisc.edu',
  }),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export default function Page() {

  const route = useRouter();

  const { register, handleSubmit, formState: { errors, isValid }, reset, setError } = useForm({
    resolver: zodResolver(schema),
    mode:'onTouched'
  })

  const onSubmit = async (data) => {
    const { email, password } = data
    console.log('Form submitted')
    try{
      const result = await SignIndata({email, password})
      if(result.error){
        if(result.error === 'Internal server error'){
          setError('password', {
            type: 'manual',
            message: 'Invalid Details. Please try again later.'
          })
        }
      }else{
        route.push('/Rathskeller') 
        route.refresh()
        reset()
      }
    }catch(error) {
      setError('password', {
        type: 'manual',
        message: 'An unexpected error occurred. Please try again later.'
      });
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <h1>
        <title>Login Form</title>
      </h1>

      <main className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Log in to your account</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input 
            type="email" 
            placeholder="Email" 
            {...register('email')} 
          />
          {errors.email && <p className="text-red-500 text-sm font-semibold">{errors.email.message}</p>}
          <Input 
            type="password" 
            placeholder="Password" 
            {...register('password')}
          />
          {errors.password && <p className="text-red-500 text-sm font-semibold">{errors.password.message}</p>}
          <Button type='submit' className="bg-green-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-200" disabled={!isValid}> Sign In </Button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-6">
          Dont have an account?
          <Link href="/Register">
            <span className='text-blue-500 hover:underline&apos;'>Sign up</span>
          </Link>
        </p>
        <p className="text-gray-500 text-sm text-center mt-2">
          By clicking continue, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
        </p>
      </main>
    </div>
  )
}
