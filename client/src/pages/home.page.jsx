// import React, { useEffect, useState } from 'react'
// import AnimationWrapper from '../common/page-animation'
// import InPageNavigation from '../components/inpage-navigation.component'
// import axios from 'axios';
// import Loader from '../components/loader.component';
// import BlogPostCard from '../components/blog-post.component';
// import MinimalBlogPost from '../components/nobanner-blog-post.component';
// import { activeTabLineRef } from '../components/inpage-navigation.component';
// import { activeTabRef } from '../components/inpage-navigation.component';
// import NoDataMessage from '../components/nodata.component';
// import { filterPaginationData } from '../common/filter-pagination-data';
// import LoadMoreDataBtn from '../components/load-more.component';
// // import AiPage from './ai.page';
// import { useNavigate } from "react-router-dom";  
// import Footer from '../components/footer.component';

// const HomePage = () => {

//     const [blogs, setBlogs] = useState(null);
//     const [trendingBlogs, setTrendingBlogs] = useState(null);
//     const [pageState, setPageState] = useState("home");

//     const navigate = useNavigate();

//     const categories = ["programing", "hollywood", "bhakti", "sports", "technology", "car", "gamming", "travel", "college", "web development", "algorithm"];

//     const fetchLatestBlogs = ({ page = 1 }) => {
//         axios
//             .post(import.meta.env.VITE_SERVER_DOMAIN + '/latest-blogs', { page })
//             .then(async ({ data }) => {

//                 let formatData = await filterPaginationData({
//                     state: blogs,
//                     data: data.blogs,
//                     page,
//                     countRoute: "/all-latest-blogs-count"
//                 })
//                 setBlogs(formatData);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     const fetchBlogsByCategory = ({ page = 1 }) => {
//         axios
//             .post(import.meta.env.VITE_SERVER_DOMAIN + '/search-blogs', { tag: pageState, page })
//             .then(async ({ data }) => {

//                 let formatData = await filterPaginationData({
//                     state: blogs,
//                     data: data.blogs,
//                     page,
//                     countRoute: "/search-blogs-count",
//                     data_to_send: { tag: pageState }
//                 })
//                 setBlogs(formatData);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     const fetchTrendingBlogs = () => {
//         axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/trending-blogs')
//             .then(({ data }) => {
//                 setTrendingBlogs(data.blogs)
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     const loadBlogByCategory = (e) => {

//         let category = e.target.innerText.toLowerCase();
//         setBlogs(null);
//         if (pageState === category) {
//             setPageState("home");
//             return
//         }

//         setPageState(category)


//     }

//     useEffect(() => {

//         activeTabRef.current.click();

//         if (pageState == "home")
//             fetchLatestBlogs({ page: 1 });
//         else
//             fetchBlogsByCategory({ page: 1 });

//         if (!trendingBlogs)
//             fetchTrendingBlogs();
//     }, [pageState])

//     return (
//         <AnimationWrapper>
//             <section className='h-cover flex justify-center gap-10'>
//                 {/* lateest blogs */}

//                 <div className='w-full '>

//                     <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]}>

//                         <>
//                             {
//                                 blogs === null ? (<Loader />) :
//                                     (
//                                         blogs.results.length ?
//                                             blogs.results.map((blog, i) => {
//                                                 return (
//                                                     <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i} >
//                                                         <BlogPostCard content={blog} author={blog.author.personal_info} />
//                                                     </AnimationWrapper>
//                                                 )
//                                             })
//                                             :
//                                             <NoDataMessage message="Not Found Any Blogs" />
//                                     )
//                             }
//                             <LoadMoreDataBtn state={blogs} fetchDataFun={(pageState === 'home' ? fetchLatestBlogs : fetchBlogsByCategory)} />
//                         </>

//                         {
//                             trendingBlogs === null ? (<Loader />) :
//                                 (
//                                     trendingBlogs.length ?
//                                         trendingBlogs.map((blog, i) => {
//                                             return (
//                                                 <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i} >
//                                                     <MinimalBlogPost blog={blog} index={i} />
//                                                 </AnimationWrapper>
//                                             )
//                                         })
//                                         :
//                                         <NoDataMessage message="Not Found Trending Blogs" />
//                                 )
//                         }

//                     </InPageNavigation>

//                 </div>

//                 {/* filter and trending blogs */}
//                 <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>

//                     <div className='flex flex-col gap-10'>
//                         <div>
//                             <h1 className='font-medium text-xl mb-8'>Stories from all interest</h1>

//                             <div className='flex gap-3 flex-wrap'>

//                                 {
//                                     categories.map((category, i) => {
//                                         return (
//                                             <button onClick={loadBlogByCategory} className={'tag ' + (pageState == category ? " bg-black text-white " : " ")} key={i}>
//                                                 {category}
//                                             </button>
//                                         )
//                                     })
//                                 }

//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h1 className='font-medium text-xl mb-8 mt-5'>Trending <i className="fi fi-sr-arrow-trend-up text-xl"></i></h1>

//                         {
//                             trendingBlogs === null ? (<Loader />) :
//                                 (
//                                     trendingBlogs.length ?
//                                         trendingBlogs.map((blog, i) => {
//                                             return (
//                                                 <AnimationWrapper transition={{ duration: 1, delay: i * .1 }} key={i} >
//                                                     <MinimalBlogPost blog={blog} index={i} />
//                                                 </AnimationWrapper>
//                                             )
//                                         })
//                                         :
//                                         <NoDataMessage message="No Trending Blogs" />
//                                 )
//                         }

//                     </div>

//                 </div>
//             </section>
//             <button
//                 className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg 
//                 hover:bg-gray-800 transition-all duration-300"
//                 onClick={() => navigate("/ai")}
//             >
//                 🤖 
//             </button>
//         </AnimationWrapper>
//     )
// }

// export default HomePage


import React, { useEffect, useState } from 'react';
import AnimationWrapper from '../common/page-animation';
import InPageNavigation from '../components/inpage-navigation.component';
import axios from 'axios';
import Loader from '../components/loader.component';
import BlogPostCard from '../components/blog-post.component';
import MinimalBlogPost from '../components/nobanner-blog-post.component.jsx';
import { activeTabRef } from '../components/inpage-navigation.component';
import NoDataMessage from '../components/nodata.component';
import { filterPaginationData } from '../common/filter-pagination-data';
import LoadMoreDataBtn from '../components/load-more.component';
import { useNavigate } from "react-router-dom";  

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");
  const navigate = useNavigate();

  const categories = ["programing", "hollywood", "bhakti", "sports", "technology", "car", "gamming", "travel", "college", "web development", "algorithm"];

  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_DOMAIN}/latest-blogs`, { page })
      .then(async ({ data }) => {
        const formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count"
        });
        setBlogs(formatData);
      })
      .catch(err => console.log(err));
  }

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(`${import.meta.env.VITE_SERVER_DOMAIN}/search-blogs`, { tag: pageState, page })
      .then(async ({ data }) => {
        const formatData = await filterPaginationData({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState }
        });
        setBlogs(formatData);
      })
      .catch(err => console.log(err));
  }

  const fetchTrendingBlogs = () => {
    axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/trending-blogs`)
      .then(({ data }) => setTrendingBlogs(data.blogs))
      .catch(err => console.log(err));
  }

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs(null);
    if (pageState === category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  }

  useEffect(() => {
    activeTabRef.current?.click();

    if (pageState === "home") fetchLatestBlogs({ page: 1 });
    else fetchBlogsByCategory({ page: 1 });

    if (!trendingBlogs) fetchTrendingBlogs();
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className='h-cover flex justify-center gap-10'>
        {/* Latest Blogs */}
        <div className='w-full'>
          <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]}>
            <>
              {/* Latest blogs section */}
              {blogs === null ? (
                <Loader />
              ) : blogs.results?.length ? (
                blogs.results.map((blog, i) => {
                  const authorInfo = blog?.author?.personal_info || { fullname: "Anonymous", username: "unknown", profile_img: "/default-profile.png" };
                  return (
                    <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                      <BlogPostCard content={blog} author={authorInfo} />
                    </AnimationWrapper>
                  )
                })
              ) : (
                <NoDataMessage message="Not Found Any Blogs" />
              )}

              <LoadMoreDataBtn state={blogs} fetchDataFun={(pageState === 'home' ? fetchLatestBlogs : fetchBlogsByCategory)} />
            </>

            {/* Trending blogs section */}
            {trendingBlogs === null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => (
                <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                  <MinimalBlogPost blog={blog} index={i} />
                </AnimationWrapper>
              ))
            ) : (
              <NoDataMessage message="No Trending Blogs" />
            )}
          </InPageNavigation>
        </div>

        {/* Categories & Trending sidebar */}
        <div className='min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden'>
          <div className='flex flex-col gap-10'>
            <div>
              <h1 className='font-medium text-xl mb-8'>Stories from all interest</h1>
              <div className='flex gap-3 flex-wrap'>
                {categories.map((category, i) => (
                  <button
                    key={i}
                    onClick={loadBlogByCategory}
                    className={`tag ${pageState === category ? "bg-black text-white" : ""}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h1 className='font-medium text-xl mb-8 mt-5'>Trending <i className="fi fi-sr-arrow-trend-up text-xl"></i></h1>
            {trendingBlogs === null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => (
                <AnimationWrapper key={i} transition={{ duration: 1, delay: i * 0.1 }}>
                  <MinimalBlogPost blog={blog} index={i} />
                </AnimationWrapper>
              ))
            ) : (
              <NoDataMessage message="No Trending Blogs" />
            )}
          </div>
        </div>
      </section>

      {/* AI Button */}
      <button
        className="fixed bottom-6 right-6 bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300"
        onClick={() => navigate("/ai")}
      >
        🤖
      </button>
    </AnimationWrapper>
  )
}

export default HomePage;
