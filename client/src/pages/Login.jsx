import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { TextInput } from "../components";

import {TbWaterpolo} from "react-icons/tb"
//useForm is used to handle form validation and submission
const Login = () => {
  const { register, handleSubmit, formState: {errors}, } = useForm({
    mode: 'onChange'
  });
  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* Left Side */} 
        <div className='w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbWaterpolo />
            </div>
            <span className='text=2xl text-[#065ad8] font-semibold'>
              K9 Social Media
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
              Log in to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>
            Welcome back
          </span>
          <form className='py-8 flex flex-col gap-5'>
            <TextInput
              name='email' placeholder='email@example.com'
              label='Email Address' type='email'
              register={
                register("email", {
                  required: 'Email is required',
                })
              }
              styles='w-full rounded-full'
              labelStyles='mb-2'
              error = {errors.email ? errors.email.message : ''}
            />

            <TextInput
              name='password' placeholder='Password'
              label='Password' type='password'
              register={
                register("password", {
                  required: 'Password is required',
                })
              }
              styles='w-full rounded-full'
              labelStyles='mb-2'
              error = {errors.password ? errors.password.message : ''}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-blue font-semibold'
            >
              Forgot Password?
            </Link>
          </form>
        </div>
        {/* Right Side */}

      </div>
    </div>
  )
}

export default Login