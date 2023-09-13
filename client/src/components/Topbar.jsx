import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TbBrandGraphql } from "react-icons/tb"
import { Link } from 'react-router-dom'
import {TextInput, CustomButton} from '../components'
import {  useForm } from "react-hook-form"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsMoon, BsSunFill } from "react-icons/bs"
import { setTheme } from '../redux/theme'
import { Logout } from '../redux/userSlice'

const Topbar = () => {
  const {user} = useSelector((state) => state.user);
  const {theme} = useSelector((state) => state.theme);
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: {errors}, } = useForm({})

  const handleSearch = async(data) => {}
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";
    dispatch(setTheme(themeValue));
  }

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
        <Link to="/" className="flex gap-2 items=center">
            <div className='p-1 md:p-2 bg-blue rounded text-white'>
                <TbBrandGraphql />
            </div>
            <span className='text-xl md:text-2xl text-blue font-semibold'>
                K9 Faze Buuk
            </span>
        </Link>

        <form className='hidden md:flex items-center justify-center' onSubmit={handleSubmit(handleSearch)}>
            <TextInput
               placeholder='Search...'
               styles='w-[35rem] lg:w=[38rem] rounded-l-full py-3'
               register={register("search")} 
            />
            <CustomButton
                title='Search'
                type='submit'
                containerStyles='bg-blue text-white px-6 py-2.5 mt-2 rounded-r-full'
            />
        </form>

        {/*ICON*/}
        <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'>
            <button onClick={()=> handleTheme()}>
                {theme ? <BsMoon /> : <BsSunFill /> }
            </button>
            <div className='hidden lg:flex'>
                <IoMdNotificationsOutline />
            </div>

            <div>
                <CustomButton
                    onClick={()=> dispatch(Logout())}
                    title='Logout'
                    containerStyles='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full'
                />
            </div>

        </div>
    </div>
  )
}

export default Topbar