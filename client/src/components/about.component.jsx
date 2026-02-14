// import React from 'react'
// import { Link } from 'react-router-dom';
// import { getFullDay } from '../common/date';

// const AboutUser = ({ classname, bio, social_links, joinedAt }) => {
//     return (
//         <div className={'md:w-[90%] md:mt-7 ' + classname}>
//             <p className='text-xl leading-7 '>{bio.length ? bio : "Nothing to read here"}</p>

//             <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey'>

//                 {
//                     Object.keys(social_links).map((key) => {

//                         let link = social_links[key];

//                         return link ? <Link to={link} key={key} target='_blank'><i className={"fi " + (key != "website" ? "fi-brands-" + key : "fi-rr-globe") + " text-2xl hover:text-black"}></i>
//                         </Link> : " "

                      
//                     })
//                 }
//         </div>
//         <p className='text-xl leading-7 text-dark-grey '>Joined on {getFullDay(joinedAt)}</p>

//         </div >
//     )
// }

// export default AboutUser;

import React from 'react'
import { Link } from 'react-router-dom';
import { getFullDay } from '../common/date';

const AboutUser = ({ classname, bio, social_links, joinedAt }) => {
    return (
        <div className={'md:w-[90%] md:mt-7 ' + classname}>
            <p className='text-xl leading-7 '>{bio.length ? bio : "Nothing to read here"}</p>

            <div className='flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey'>
                {
                    Object.keys(social_links).map((key) => {
                        let link = social_links[key];

                        return link ? (
                            <Link to={link} key={key} target='_blank'>
                                {
                                    key === "twitter"
                                        ? (
                                            // ✅ inline SVG for new Twitter (X) icon
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 24 24" 
                                                fill="currentColor" 
                                                className="w-6 h-6 hover:text-black"
                                            >
                                                <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.367l-4.986-6.494-5.705 6.494H2.134l7.73-8.789L1.5 2.25h6.55l4.495 5.937 5.699-5.937z"/>
                                            </svg>
                                        )
                                        : (
                                            <i className={"fi " + (key !== "website" ? "fi-brands-" + key : "fi-rr-globe") + " text-2xl hover:text-black"}></i>
                                        )
                                }
                            </Link>
                        ) : " "
                    })
                }
            </div>
            <p className='text-xl leading-7 text-dark-grey '>Joined on {getFullDay(joinedAt)}</p>
        </div >
    )
}

export default AboutUser;

