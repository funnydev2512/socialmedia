import React from 'react'
import { useSelector } from 'react-redux'
import { Topbar, ProfileCard, FriendCard, CustomButton } from '../components'
import { suggest, requests, posts } from "../assets/data"
import { Link } from 'react-router-dom'
import { NoProfile } from '../assets'
import { BsPersonFillAdd } from "react-icons/bs"
import { BiImages, BiSolidVideo } from "react-icons/bi"
import { BsFiletypeGif } from "react-icons/bs"
import { TextInput, Loading, Postcard } from '../components'
import {  useForm } from "react-hook-form"
import { useState } from 'react'

const Home = () => {
  const {user} = useSelector((state) => state.user)
  const [friendRequest, setFriendRequest] = React.useState(requests)
  const [suggestedFriend, setSuggestedFriend] = React.useState(suggest)
  const [file, setFile] = React.useState(null);
  const { register, handleSubmit, formState: {errors}, } = useForm()
  const [errMsg, setErrMsg] = useState("");
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const handlePostSubmit = async(data) => {}
  return (
    <div className=' w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <Topbar/>

      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        {/* Left Side */}
        <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
          <ProfileCard  user={user} />
          <FriendCard friends={user?.friends} />
        </div>
        {/* CENTER */}
        <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
          <form 
            onSubmit={handleSubmit()}
            className="bg-primary px-4 rounded-lg">
              <div className='w-full flex items-center gap-2 py-4 border-b border-[#66666645]'>
                <img src={user?.profileUrl ?? NoProfile} 
                  alt='User Image'
                  className='w-14 h-14 rounded-full object-cover'
                />
                <TextInput
                  styles="w-full rounded-full py-3"
                  placeholder="What's on your mind?...."
                  name="description"
                  register={register("description", {
                    required: "Write something about the post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>
              {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status == "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                {errMsg?.message}
              </span>
              )}

              <div className='flex items-center justify-between py-4'>
                <label htmlFor="imgUpload"
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer '
                >
                  <input type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='imgUpload'
                    data-max-size='5120'
                    accept=".jpg, .jpeg, .png"
                  />
                  <BiImages/>
                  <span>Image</span>
                </label>

                <label htmlFor="videoUpload"
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer '
                >
                  <input type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='videoUpload'
                    data-max-size='5120'
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo/>
                  <span>Video</span>
                </label>

                <label htmlFor="vgifUpload"
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer '
                >
                  <input type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className='hidden'
                    id='vgifUpload'
                    data-max-size='5120'
                    accept=".gif"
                  />
                  <BsFiletypeGif/>
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (<Loading/>) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm'
                    />
                  )}
                </div>
              </div>

          </form>

          {loading ? (<Loading/>) : posts?.length > 0 ? (
              posts?.map((post) => (
                <Postcard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletepost={()=> {}}
                  likePost={()=> {}}
                />
              ))
          ):( 
            <div className='flex w-full h-full items-center justify-center'>
              <p className='text-lg text-ascent-2'>No Post Available</p>
            </div>
          )}
        </div>
        {/* Right Side */}
        <div className="hidden w-1/4 h-full lg:flex flex-col gap-8">
          {/*FRIEND REQUEST*/}
          <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
              <div className='flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]'>
                  <span>Friend Request</span>
                  <span>{friendRequest?.length}</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {friendRequest?.map(({_id, requestFrom: from}) => (
                  <div key={_id} className='flex items-center justify-between'>
                    <Link
                      to={"/profile/" + from?._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <CustomButton title='Accept'
                        containerStyles='bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full'
                      /> 
                      <CustomButton title='Deny'
                        containerStyles='border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full'
                      />
                    </div>
                  </div>
                ))}
              </div>
          </div>
          {/*SUGGESTED REQUEST*/}
          <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
              <div className='flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]'>
                  <span>Friend Suggestion</span>
              </div>

              <div className='w-full flex flex-col gap-4 pt-4'>
                {suggestedFriend?.map((friend) => (
                  <div key={friend._id} className='flex items-center justify-between'>
                    <Link
                      to={"/profile/" + friend?._id}
                      key={friend._id}
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className='flex gap-1'>
                      <button className='bg-[#0444a430] text-sm text-white p-1 rounded' onClick={() => {}}>
                        <BsPersonFillAdd size={20} className='text-blue'/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home