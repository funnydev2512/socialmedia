import React, { useState } from 'react'
import { NoProfile } from '../assets'
import { Link } from 'react-router-dom'
import { BiLike, BiSolidLike, BiComment } from "react-icons/bi"
import moment from 'moment'
import { useForm } from "react-hook-form"
import { MdOutlineDeleteOutline } from "react-icons/md"
import { CustomButton, Loading } from '../components'
import { TextInput } from '../components'
import { postComments } from '../assets/data'

const ReplyCard = ({reply, user, handleLike}) => {
    return (
        <div className="w-full py-3">
            <div className="flex gap-3 items-center mb-1">
                <Link to={"/profile" + reply?.userId.id}>
                    <img src={reply?.userId?.profileUrl ?? NoProfile} alt={reply?.userId?.firstName} className="w-10 h-10 rounded-full object-cover" />
                </Link>

                <div>
                    <Link to={"/profile/" + reply?.userId?._id}>
                        <p className='font-medium text-base text-ascent-1'>
                            {reply?.userId?.firstName} {reply?.userId?.lastName}
                        </p>
                    </Link>

                    <span className='text-ascent-2 text-sm'>
                    {moment(reply?.createdAt).fromNow()}
                </span>

                </div>
            </div>

            <div className='ml-12'>
                <p className='text-ascent-2'>{reply?.comment}</p>
                    <div className='mt-2 flex gap-6'>
                        <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer' onClick={handleLike}>
                            {reply?.likes?.includes(user?._id) ?(
                                <BiSolidLike size={20} color='blue'/>
                            ):(
                                <BiLike size={20} />
                            )}
                                {reply?.likes?.length} Likes
                        </p>                        
                    </div>
            </div>
        </div>
    )
}

const CommentForm = ({user, id, replyAt, getComments}) => {
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const { register, handleSubmit, formState: {errors}, } = useForm({
        mode : "onChange"
    })
    const onSubmit = async(data) => {}

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full border-b border-[#66666645]'>
            <div className='w-full flex items-center gap-2 py-4'>
                <img src={user?.profileUrl ?? NoProfile} alt="User Image" className='w-10 h-10 rounded-full object-cover' />

                <TextInput
                    name='comment'
                    styles='w-full rounded-full py-3'
                    placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
                    register={register("comment", {
                        required: "Comment cannot be empty",
                    })}
                    error={errors.comment? errors.comment.message : ""}
                />
            </div>
            {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"} mt-0.5`}>
                {errMsg?.message}
              </span>
            )}

            <div className='flex items-end justify-end pb-2'>
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <CustomButton
                            title='Submit'
                            type='submit'
                            containerStyles='bg-blue text-white px-1 py-3 rounded-full font-semibold text-sm'
                        />
                    )
                }
            </div>
        </form>
    )
}

const Postcard = ({post, user, deletePost, likePost}) => {
  const [showAll, setShowAll] = useState(0)
  const [showReply, setShowReply] = useState(0)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [replyComments, setReplyComments] = useState(0)
  const [showComment, setShowComment] = useState(0)

  const handleLike = async(data) => {}

  const getComments = async () => {
    setReplyComments(0)
    setComments(postComments)
    setLoading(false)
  }

  return (
    <div className='mb-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2'>
            <Link to={"/profile/" + post?.userId?._id}>
                <img src={post?.userId?.profileUrl ?? NoProfile} 
                    alt={post?.userId?.firstName} 
                    className='w-14 h-14 object-cover rounded-ful'
                />
                     
            </Link>

            <div className='w-full flex justify-between'>
                <div className=''>
                    <Link to={"/profile/" + post?.userId?._id}>
                        <p className='font-medium text-lg text-ascent-1'>
                            {post?.userId?.firstName} {post?.userId?.lastName}
                        </p>
                    </Link>
                    <span className='text-ascent-2'>{post?.userId.location}</span>
                </div>

                <span className='text-ascent-2'>
                    {moment(post?.createdAt ?? "2023-05-25").fromNow()}
                </span>
            </div>
        </div>

        <div>
            <p className='text-ascent-2'>
                {showAll === post?._id 
                    ? post?.description
                    : post?.description.slice(0, 300)
                    
                }

                {
                   post?.description.length > 301 && (
                    showAll === post?._id ? (
                        <span
                            className='text-blue cursor-pointer ml-2 font-medium'
                            onClick={() => setShowAll(0)}
                        >
                            Show Less
                        </span>
                   ) : (
                        <span
                        className='text-blue cursor-pointer ml-2 font-medium'
                        onClick={() => setShowAll(post?._id)}
                        >
                            Show More
                        </span>
                   ))
                }
            </p>

            {
                post?.image && (
                    <img src={post?.image} alt="post image"  className='w-full mt-2 rounded-lg'/>
                )
            }
        </div>

        <div className='mt-4 flex justify-between items-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
            <p className='flex gap-2 items-center text-base cursor-pointer'>
                {post?.likes?.includes(user?._id) ? (
                    <BiSolidLike size={20} color='blue'/>
                ):(
                    <BiLike size={20} />
                )}
                {post?.likes?.length} Likes
            </p>

            <p className='flex gap-2 items-center text-base cursor-pointer' 
                //this code below is to show the comment section when the comment button is clicked and hide it when clicked again
                onClick={()=> {
                setShowComment(post?._id === showComment ? null : post?._id)
                getComments(post?._id)
            }}>
                <BiComment size={20} />
                {post?.comments?.length} Comments
            </p>

            {
                // check if the user is the owner of the post and show delete button
                post?.userId?._id === user?._id && (
                    <div className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer' onClick={()=> deletePost(post?._id)}>
                        <MdOutlineDeleteOutline size={20}/>
                        <span>Delete</span>
                    </div>
                )

            }
        </div>
        
        {/*COMMENT SECTION*/}
        { showComment === post?._id && (
            
            <div className='w-full mt-4 border-t border-[#66666645] pt-4'>
                <CommentForm user={user} id={post?.id} getComment={() => getComments(post?.id)} />
                {loading ? (
                    <Loading />
                ): comments?.length > 0 ? (
                    comments?.map((comment)=> (
                        <div className='w-full py-2' key={comment?.id}>
                            <div className='flex gap-3 items-center mb-1'>
                                <Link to={"/profile/" + comment?.userId._id}>
                                    <img src={comment?.userId.profileUrl ?? NoProfile} alt={comment?.userId?.firstName} className='w-10 h-10 rounded-full object-cover'/>
                                </Link>
                                <div>
                                    <Link to={"/profile/" + comment?.userId?._id}>
                                        <p className='font-medium text-base text-ascent-1'>
                                            {comment?.userId?.firstName} {comment?.userId?.lastName}
                                        </p>
                                    </Link>
                                    <span className='text-ascent-2 text-sm'>
                                        {moment(comment?.createdAt ?? "2023-05-25").fromNow()}
                                    </span>
                                </div>
                            </div>

                            <div className='ml-12'>
                                <p className='text-ascent-2'>
                                    {comment?.comment}
                                </p>
                                
                                <div className='mt-2 flex gap-6'>
                                    <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>
                                        {comment?.likes?.includes(user?._id) ?(
                                            <BiSolidLike size={20} color='blue'/>
                                        ):(
                                            <BiLike size={20} />
                                        )}
                                        {comment?.likes?.length} Likes
                                    </p>
                                    <span className='text-blue cursor-pointer' onClick={()=> setReplyComments(comment?.id)}>
                                        Reply
                                    </span>

                                    
                                </div>
                                { replyComments === comment?._id && (
                                    <CommentForm 
                                        user={user}
                                        id={comment?._id}
                                        replyAt={comment?.from}
                                        getComments={()=> getComments(post?._id)}
                                    />
                                )}
                            </div>

                            {/* Reply */}
                            <div className='py-2 px-8 mt-6'>
                                {comment?.replies.length > 0 && (
                                    <p
                                        className='text-base text-ascent-1 cursor-pointer'
                                        onClick={()=> setShowReply(
                                            showReply === comment.replies?._id ? 0 : comment?.replies?._id
                                        )}
                                    >
                                        Show Replies ({comment?.replies?.length})
                                    </p>
                                )}

                                {
                                    showReply === comment > comment.replies?.id && comment?.replies?.map((reply) => 
                                        <ReplyCard reply={reply} user={user} key={reply?.id} handleLike={() => handleLike("post/lile-comment" + comment?.id + "/" + reply?.id)}
                                        />    
                                    )
                                }
                                
                            </div>
                        </div>
                    ))
                ) : (
                    <span className='flex text-sm py-4 text-ascent-2 text-center'> No Comments, be first to comment</span>
                )
            }
            </div>
        )}
    </div>
  )
}

export default Postcard