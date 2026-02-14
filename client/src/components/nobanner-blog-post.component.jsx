import React from 'react'
import { Link } from 'react-router-dom';
import { getDay } from '../common/date';

// const MinimalBlogPost = ({ blog, index }) => {

//   const { title, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

//   return (
//     <Link to={`/blog/${id}`} className='flex gap-5 mb-8 '>
//       <h1 className='blog-index'>{index < 10 ? "0" + (index + 1) : index}</h1>

//       <div>
//         <div className='flex gap-2 items-center mb-7'>
//           <img src={profile_img} className='w-6 h-6 rounded-full' />
//           <p className='lime-clamp-1'>{fullname} @{username}</p>
//           <p className='min-w-fit'>{getDay(publishedAt)}</p>
//         </div>

//         <h1 className='blog-title'>{title}</h1>
//       </div>
//     </Link>
//   )
// }

// export default MinimalBlogPost


const MinimalBlogPost = ({ blog, index }) => {
  if (!blog || !blog.author?.personal_info) {
    // fallback UI if blog or personal_info is missing
    return null; // or some placeholder
  }

  const {
    title,
    blog_id: id,
    author: { personal_info: { fullname, username, profile_img } },
    publishedAt
  } = blog;

  return (
    <Link to={`/blog/${id}`} className='flex gap-5 mb-8 '>
      <h1 className='blog-index'>{index < 10 ? "0" + (index + 1) : index}</h1>

      <div>
        <div className='flex gap-2 items-center mb-7'>
          <img src={profile_img} className='w-6 h-6 rounded-full' alt={fullname} />
          <p className='lime-clamp-1'>{fullname} @{username}</p>
          <p className='min-w-fit'>{getDay(publishedAt)}</p>
        </div>

        <h1 className='blog-title'>{title}</h1>
      </div>
    </Link>
  )
}

export default MinimalBlogPost