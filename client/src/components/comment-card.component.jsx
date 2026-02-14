import React, { useContext, useState } from 'react'
import { getDay } from '../common/date';
import { UserContext } from '../App';
import toast from 'react-hot-toast';
import CommentField from './comment-field.component';
import { BlogContext } from '../pages/blog.page';
import axios from 'axios';


const CommentCard = ({ index, leftVal, commentData }) => {

    let { commented_by: { personal_info: { profile_img, fullname, username: commented_by_username } }, commentedAt, comment, _id, children } = commentData;
    let { blog, blog: { comments, activity, activity: { total_parent_comments }, comments: { results: commentArr }, author: { personal_info: { username: blog_author } } }, setBlog, setTotalParentCommentsLoaded } = useContext(BlogContext);

    let { userAuth: { access_token, username } } = useContext(UserContext);

    const [isReplying, setIsReplying] = useState(false);

    const handleReplyClick = () => {
        if (!access_token) {
            return toast.error('Login first to leave a reply')
        }

        setIsReplying(preVal => !preVal)
    }

    const getParentIndex = () => {
        let startingPoint = index - 1;

        try {
            while (commentArr[startingPoint].childrenLevel >= commentData.childrenLevel) {
                startingPoint--;
            }
        }
        catch {
            startingPoint = undefined;
        }
        return startingPoint;
    }

    const removeCommentsCards = (startingPoint, isDelete = false) => {

        if (commentArr[startingPoint]) {
            while (commentArr[startingPoint].childrenLevel > commentData.childrenLevel) {
                commentArr.splice(startingPoint, 1);

                if (!commentArr[startingPoint]) {
                    break;
                }
            }
        }

        if (isDelete) {
            let parentIndex = getParentIndex();

            if (parentIndex != undefined) {
                commentArr[parentIndex].children = commentArr[parentIndex].children.filter(child => child != _id)

                if (!commentArr[parentIndex].children.length) {
                    commentArr[parentIndex].isReplyLoaded = false;
                }
            }

            commentArr.splice(index, 1);

        }

        if (commentData.childrenLevel == 0 && isDelete) {
            setTotalParentCommentsLoaded(preVal => preVal - 1)
        }

        setBlog({ ...blog, comments: { results: commentArr }, activity: { ...activity, total_parent_comments: total_parent_comments - (commentData.childrenLevel == 0 && isDelete ? 1 : 0) } });

    }

    // const loadReplies = ({ skip = 0, currentIndex = index }) => {

    //     if (commentArr[currentIndex].children.length) {
    //         hideReplies();
    //         axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/get-replies', { _id: commentArr[currentIndex]._id, skip })
    //             .then(({ data: { replies } }) => {
    //                 commentArr[currentIndex].isReplyLoaded = true;

    //                 for (let i = 0; i < replies.length; i++) {
    //                     replies[i].childrenLevel = commentArr[currentIndex].childrenLevel + 1;
    //                     commentArr.splice(currentIndex + 1 + i + skip, 0, replies[i]);
    //                 }
    //                 setBlog({ ...blog, comments: { ...comments, results: commentArr } })
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    // }

    const loadReplies = ({ skip = 0, currentIndex = index }) => {
        if (commentArr[currentIndex].children.length) {
            hideReplies();
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/get-replies', { 
                _id: commentArr[currentIndex]._id, 
                skip,
                limit: 5 
            })
            .then(({ data: { replies, total } }) => {
                commentArr[currentIndex].isReplyLoaded = true;
                commentArr[currentIndex].repliesLoaded = (commentArr[currentIndex].repliesLoaded || 0) + replies.length;
                commentArr[currentIndex].totalReplies = total;
    
                for (let i = 0; i < replies.length; i++) {
                    replies[i].childrenLevel = commentArr[currentIndex].childrenLevel + 1;
                    commentArr.splice(currentIndex + 1 + i + skip, 0, replies[i]);
                }
                
                setBlog({ ...blog, comments: { ...comments, results: commentArr } });
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    const hideReplies = () => {
        commentData.isReplyLoaded = false;

        removeCommentsCards(index + 1)
    }

    // delete comment
    const deleteComment = (e) => {
        e.target.setAttribute('disabled', true);

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/delete-comments', { _id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(() => {
                e.target.removeAttribute('disabled');
                removeCommentsCards(index + 1, true)
            })
            .catch(err => {
                console.log(err);
            })
    }

    // const LoadMoreRepliesBtn = () => {
    //     let parentIndex = getParentIndex();
    //     if (commentArr[index + 1]) {
    //         if (commentArr[index + 1].childrenLevel < commentArr[index].childrenLevel) {
    //             if ((index - parentIndex) < commentArr[parentIndex].children.length) {
    //                 return <button className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center 
    //                 gap-2' onClick={() => loadReplies({ skip: index - parentIndex, currentIndex: parentIndex })}>View more reply</button>
    //             }
    //         }
    //     }
    // }
    const LoadMoreRepliesBtn = () => {
        let parentIndex = getParentIndex();
        
        // Check if we should show "Load more" for the current comment
        if (commentArr[index].isReplyLoaded && 
            commentArr[index].repliesLoaded < commentArr[index].totalReplies) {
            return (
                <button 
                    className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2' 
                    onClick={() => loadReplies({ 
                        skip: commentArr[index].repliesLoaded || 0,
                        currentIndex: index
                    })}
                >
                    View more replies
                </button>
            );
        }
        
        // Original condition for parent comments
        if (commentArr[index + 1]) {
            if (commentArr[index + 1].childrenLevel < commentArr[index].childrenLevel) {
                if ((index - parentIndex) < commentArr[parentIndex].children.length) {
                    return (
                        <button 
                            className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2' 
                            onClick={() => loadReplies({ 
                                skip: index - parentIndex, 
                                currentIndex: parentIndex 
                            })}
                        >
                            View more replies
                        </button>
                    );
                }
            }
        }
    }
    

    return (
        <div className='w-full' style={{ paddingLeft: `${leftVal * 10}px` }}>

            <div className='my-5 p-6 rounded-md border border-grey'>
                <div className='flex gap-3 items-center mb-8'>
                    <img src={profile_img} className='h-6 w-6 rounded-full' />
                    <p className='line-clamp-1'>{fullname} @{commented_by_username}</p>
                    <p className='min-w-fit'>{getDay(commentedAt)}</p>
                </div>

                <p className='font-gelasio text-xl ml-3'>{comment}</p>

                <div className='flex gap-5 items-center mt-5'>

                    {
                        commentData.isReplyLoaded ?
                            <button className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2' onClick={hideReplies}>
                                <i className='fi fi-rs-comment-dots'></i>Hide Reply
                            </button> :

                            <button className='text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2' onClick={loadReplies}>
                                <i className='fi fi-rs-comment-dots'></i> {children.length} Reply
                            </button>
                    }

                    <button className='underline' onClick={handleReplyClick}>Reply</button>

                    {
                        username == commented_by_username || username == blog_author ?
                            <button className='p-2 px-3 rounded-md border border-grey ml-auto hover:bg-red/30
                         hover:text-red flex items-center' onClick={deleteComment}>
                                <i className="fi fi-rr-trash pointer-events-none"></i>
                            </button> : ""
                    }
                </div>

                {
                    isReplying ?
                        <div className='mt-8 '>
                            < CommentField action='reply' index={index} replyingTo={_id} setIsReplying={setIsReplying} />
                        </div> : ""
                }
            </div>

            <LoadMoreRepliesBtn />

        </div>
    )
}

export default CommentCard


