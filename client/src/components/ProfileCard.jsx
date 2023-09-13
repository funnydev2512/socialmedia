import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { NoProfile } from '../assets'
import { LiaEditSolid } from "react-icons/lia"
import { updateProfile } from '../redux/userSlice'
import { CiLocationOn } from "react-icons/ci"
import { BsBriefcase, BsPersonFillAdd } from "react-icons/bs"
// import { user } from '../assets/data'

const ProfileCard = ({user}) => {
  const { user: data, edit } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <div>
        <div className='w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4'>
            <div className='w-full flex items-center justify-between border-b pb-5 border-black'>
                <Link to={'/profile/' + user?.id} className='flex gap-2'>
                    <img src={user?.profileUrl ?? NoProfile} alt={user?.email} className='w-14 h-14 object-cover rounded-full'/>
                    <div className='flex flex-col justify-center'>
                        <p className='text-lg font-medium text-ascent-1'>
                            {user?.firstName} {user?.lastName}
                        </p>
                        <span className='text-ascent-2'>{user?.profession ?? "No Profession"}</span>
                    </div>
                </Link>

                <div className=''>
                    {user?.id === data?.id ? (
                        <LiaEditSolid
                            size={22}
                            className='text-blue cursor-pointer'
                            onCick={()=> dispatch(updateProfile(true))}
                        />
                        ) : (
                            <button className='bg-[#0444a430] text-sm text-white p-1 rounded' onClick={()=> {}}>
                                <BsPersonFillAdd size={20} className='text-blue'/>
                            </button>
                        )}
                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <div className='flex gap-2 items-center text-ascent-2'>
                    <CiLocationOn className="text-xl text-ascent-1" />
                    <span>{user?.location ?? "Add Location"}</span>
                </div>

                <div className='flex gap-2 items-center text-ascent-2'>
                    <BsBriefcase className='text-lg text-ascent-1'/>
                    <span>{user?.profession ?? "Add Profession"}</span>
                </div>
            </div>

            <div className='w-full flex flex-col gap-2 py-4 border-b border-[#66666645]'>
                <p className='text-xl text-ascent-1 font-semibold'>
                    {user?.friends?.length} Friends
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProfileCard