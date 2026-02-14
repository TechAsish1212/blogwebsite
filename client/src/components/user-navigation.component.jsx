// import React, { useContext } from 'react'
// import AnimationWrapper from '../common/page-animation';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../App';
// import { removeFromSessiion } from '../common/session';


// const UserNavigationPanel = () => {

//     const { userAuth: { username }, setUserAuth } = useContext(UserContext);

//     const signOutUser = () => {
//         removeFromSessiion("user");
//         setUserAuth({ access_token :null})
//     }

//     return (
//         <AnimationWrapper
//             className="absolute right-0 z-50"
//             transition={{ duration: 0.2 }}
//         >

//             <div className='bg-white absolute right-0 border border-grey w-60 duration-200'>

//                 <Link to='/editor' className='flex gap-2 link md:hidden pl-8 py-4'>
//                     <i className="fi fi-rr-file-edit"></i>
//                     <p>Write</p>
//                 </Link>

//                 <Link to={`/user/${username}`} className='link pl-8 py-4'>
//                     profile
//                 </Link>

//                 <Link to='/dashboard/blogs' className='link pl-8 py-4'>
//                     Dashboard
//                 </Link>

//                 <Link to='/setting/edit-profile' className='link pl-8 py-4'>
//                     Setting
//                 </Link>

//                 <span className='absolute border-t border-grey w-[100%]'></span>

//                 <button className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
//                     onClick={signOutUser}
//                 >
//                     <h1 className='font-bold text-xl mg-1'>Sign Out</h1>
//                     <p className='text-dark-grey'>@{username}</p>
//                 </button>

//             </div>

//         </AnimationWrapper>
//     )
// }

// export default UserNavigationPanel;

import React, { useContext } from 'react';
import AnimationWrapper from '../common/page-animation';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { removeFromSessiion } from '../common/session';

const UserNavigationPanel = ({ closePanel }) => {
    const navigate = useNavigate();
    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSessiion("user");
        setUserAuth({ access_token: null });
        closePanel(); // Close dropdown
        navigate('/signin');
    };

    const handleClick = (path) => {
        closePanel(); // Close dropdown
        navigate(path); // Navigate
    };

    return (
        <AnimationWrapper
            className="absolute right-0 top-full mt-2 z-50 shadow-lg"
            transition={{ duration: 0.2 }}
        >
            <div className='bg-white border border-grey w-60 rounded-md overflow-hidden'>

                <button
                    className='flex gap-2 link md:hidden pl-8 py-4 hover:bg-grey/10 w-full text-left'
                    onClick={() => handleClick('/editor')}
                >
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </button>

                <button
                    className='block link pl-8 py-4 hover:bg-grey/10 w-full text-left'
                    onClick={() => handleClick(`/user/${username}`)}
                >
                    Profile
                </button>

                <button
                    className='block link pl-8 py-4 hover:bg-grey/10 w-full text-left'
                    onClick={() => handleClick('/dashboard/blogs')}
                >
                    Dashboard
                </button>

                <button
                    className='block link pl-8 py-4 hover:bg-grey/10 w-full text-left'
                    onClick={() => handleClick('/setting/edit-profile')}
                >
                    Setting
                </button>

                <span className='border-t border-grey block w-full'></span>

                <button
                    className='text-left w-full pl-8 py-4 hover:bg-grey/10'
                    onClick={signOutUser}
                >
                    <h1 className='font-bold text-xl mb-1'>Sign Out</h1>
                    <p className='text-dark-grey'>@{username}</p>
                </button>
            </div>
        </AnimationWrapper>
    );
};

export default UserNavigationPanel;
