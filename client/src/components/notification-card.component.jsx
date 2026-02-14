import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';
import NotificationCommentField from './notification-comment-field.component';
import { UserContext } from '../App';
import axios from 'axios';

const NotificationCard = ({ data, index, notificationState }) => {

  let [isReplying, setIsReplying] = useState(false);

  // safe destructuring
  let {
    seen,
    type,
    reply,
    createdAt,
    replied_on_comment,
    comment = {},
    user = {},
    blog = {},
    _id: notification_id
  } = data || {};

  let {
    personal_info: { profile_img = "", fullname = "", username = "" } = {}
  } = user || {};

  let { blog_id = "", title = "" } = blog || {};

  let { userAuth: { username: author_username, profile_img: author_profile_img, access_token } } = useContext(UserContext);

  let { notification, notification: { result = [], totalDocs = 0 } = {}, setNotification } = notificationState;

  const handleReplyClick = () => setIsReplying(preVal => !preVal);

  const handleDelete = (comment_id, type, target) => {
    target.setAttribute('disabled', true);

    axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/delete-comments", { _id: comment_id }, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
      .then(() => {
        if (type === 'comment') {
          result.splice(index, 1);
        } else {
          delete result[index].reply;
        }
        target.removeAttribute('disabled');
        setNotification({
          ...notification,
          result,
          totalDocs: totalDocs - 1,
          deleteDocCount: (notification.deleteDocCount || 0) + 1
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={`p-5 mb-5 rounded-xl bg-white shadow-sm transition hover:shadow-md 
      ${!seen ? "border-l-4 border-l-blue-500" : "border border-grey/50"}`}>
      
      {/* Header */}
      <div className="flex items-start gap-4">
        <img src={profile_img} alt="" className="w-12 h-12 rounded-full object-cover border" />
        <div className="flex-1">
          <h1 className="text-base font-semibold text-dark-grey leading-snug">
            <span className="capitalize">{fullname}</span>
            <Link to={`/user/${username}`} className="mx-1 text-blue-600 hover:underline">@{username}</Link>
            <span className="font-normal text-grey ml-1">
              {type === 'like'
                ? "liked your blog"
                : type === 'comment'
                  ? "commented on"
                  : "replied on"}
            </span>
          </h1>

          {type === 'reply' ? (
            <div className="p-3 mt-3 rounded-lg bg-grey/20">
              <p className="text-sm text-dark-grey">{replied_on_comment?.comment}</p>
            </div>
          ) : blog_id ? (
            <Link to={`/blog/${blog_id}`} className="block mt-2 text-sm font-medium text-blue-700 hover:underline line-clamp-1">
              “{title}”
            </Link>
          ) : null}
        </div>
      </div>

      {/* Comment Content */}
      {type !== 'like' && (
        <p className="ml-16 mt-4 font-gelasio text-base text-dark">{comment?.comment}</p>
      )}

      {/* Actions */}
      <div className="ml-16 mt-4 flex items-center gap-6 text-sm text-grey">
        <p>{getDay(createdAt)}</p>
        {type !== 'like' && (
          <>
            {!reply && (
              <button className="underline hover:text-blue-600" onClick={handleReplyClick}>
                Reply
              </button>
            )}
            {comment?._id && (
              <button className="underline hover:text-red-600" onClick={(e) => handleDelete(comment._id, "comment", e.target)}>
                Delete
              </button>
            )}
          </>
        )}
      </div>

      {/* Reply Field */}
      {isReplying && (
        <div className="mt-5 ml-16">
          <NotificationCommentField
            _id={data?._id}
            blog_author={user}
            index={index}
            replyingTo={comment?._id}
            setReplying={setIsReplying}
            notification_id={notification_id}
            notificationData={notificationState}
          />
        </div>
      )}

      {/* Reply Display */}
      {reply && (
        <div className="ml-20 mt-5 p-4 bg-grey/20 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <img src={author_profile_img} alt="" className="h-8 w-8 rounded-full object-cover border" />
            <h1 className="text-sm font-medium text-dark-grey">
              <Link to={`/user/${author_username}`} className="mx-1 text-blue-600 hover:underline">@{author_username}</Link>
              <span className="text-grey">replied to</span>
              <Link to={`/user/${username}`} className="mx-1 text-blue-600 hover:underline">@{username}</Link>
            </h1>
          </div>
          <p className="ml-10 text-base font-gelasio">{reply.comment}</p>

          {comment?._id && (
            <button className="underline hover:text-red-600 ml-10 mt-2 text-sm" onClick={(e) => handleDelete(comment._id, "reply", e.target)}>
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationCard
