import React from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { TextInput, Loading, CustomButton } from "../components";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {TbWaterpolo} from "react-icons/tb"
//useForm is used to handle form validation and submission
const Login = () => {
  const { register, handleSubmit, formState: {errors}, } = useForm({
    mode: 'onChange'
  });

  const {theme} = useSelector((state) => state.theme);

  console.log(theme)

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
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
              // styles={theme === "dark" ? 'w-full rounded-full text-red-300' : 'w-full rounded-full text-pink-300'}
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

            {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status == "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                {errMsg?.message}
              </span>
            )}

            {
              isSubmitting ? <Loading/> : <CustomButton
              type="submit"
              containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
              title='Login'
              />
            }
          </form>

          <p className='text=ascent-2 text-sm text-center'>
            Don't have an account? 
            <Link to='/register' className='text-blue font-semibold ml-2 cursor-pointer'
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* Right Side */}
          
      </div>
    </div>
  )
}

export default Login