import React, {useState}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Topbar, ProfileCard, FriendCard, Loading, Postcard } from '../components';

const Profile = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.user)
  const {posts} = useSelector((state) => state.posts)
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {}
  const handleLikePost = () => {}

  return (
    <>
      <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
        <Topbar />
        <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
          {/* Left */}
          <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
            <ProfileCard user={userInfo} />
            <div className='block lg:hidden'>
              <FriendCard friends={userInfo?.friends} />
            </div>
          </div>

          {/*CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {loading ? (<Loading/>) : posts?.length > 0 ? (
                  posts?.map((post) => (
                    <Postcard
                      key={post?._id}
                      post={post}
                      user={user}
                      deletepost={handleDelete}
                      likePost={handleLikePost}
                    />
                  ))
              ):( 
                <div className='flex w-full h-full items-center justify-center'>
                  <p className='text-lg text-ascent-2'>No Post Available</p>
                </div>
              )}
          </div>

          {/*RIGHT*/}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8">
            <FriendCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile