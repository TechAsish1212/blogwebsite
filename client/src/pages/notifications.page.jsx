// import React, { useContext, useEffect, useState } from 'react'
// import { UserContext } from '../App'
// import { filterPaginationData } from '../common/filter-pagination-data';
// import axios from 'axios';

// const Notification = () => {

//     let { userAuth: { access_token } } = useContext(UserContext);

//     const [filter, setFilter] = useState('all');
//     const [notification, setNotification] = useState(null);

//     let filters = ['all', 'like', 'comment', 'reply'];

//     const fetchNotifications = ({ page, deletedDocCount = 0 }) => {
//         axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/notification", {
//             page, filter, deletedDocCount
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         })
//             .then(async ({ data: { notification: data } }) => {
//                 let formatedData = await filterPaginationData({
//                     state: notification, data, page,
//                     countRoute: "/all-notifications-count",
//                     data_to_send: { filter },
//                     user: access_token
//                 })

//                 setNotification(formatedData);
//                 console.log(formatedData);
//             })
//             .catch(err=>{
//                 console.log(err);
//             })
//     }

//     useEffect(()=>{
//         if(access_token){
//             fetchNotifications({page:1})
//         }
//     },[access_token,filter])

//     const handleFilter = (e) => {
//         let btn = e.target;
//         setFilter(btn.innerHTML);
//         setNotification(null);

//     }

//     return (
//         <div>
//             <h1 className='max-md:hidden'>Recent Notifications</h1>
//             <div className='my-8 flex gap-4'>
//                 {
//                     filters.map((filterName, i) => {
//                         return <button key={i} className={'py-2 ' + (filter == filterName ? 'btn-dark' : 'btn-light')} onClick={handleFilter}>{filterName}</button>
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default Notification



import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { UserContext } from '../App';
import { filterPaginationData } from '../common/filter-pagination-data';
import Loader from '../components/loader.component';
import AnimationWrapper from '../common/page-animation';
import NoDataMessage from '../components/nodata.component';
import NotificationCard from '../components/notification-card.component';
import LoadMoreDataBtn from '../components/load-more.component';

const Notification = () => {
    let { userAuth, userAuth: { access_token, new_notification_avail }, setUserAuth } = useContext(UserContext);

    const [filter, setFilter] = useState('all');
    const [notification, setNotification] = useState(null);

    let filters = ['all', 'like', 'comment', 'reply'];

    const fetchNotifications = ({ page, deletedDocCount = 0 }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/notification", {
            page, filter, deletedDocCount
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(async ({ data: { notification: data } }) => {
                if (new_notification_avail) {
                    setUserAuth({...userAuth,new_notification_avail:false})
                }
                let formatedData = await filterPaginationData({
                    state: notification, data, page,
                    countRoute: "/all-notifications-count",
                    data_to_send: { filter },
                    user: access_token
                });

                setNotification(formatedData);
                console.log(formatedData);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (access_token) {
            fetchNotifications({ page: 1 });
        }
    }, [access_token, filter]);

    const handleFilter = (e) => {
        let btn = e.target;
        setFilter(btn.innerHTML);
        setNotification(null);
    };

    return (
        <div>
            <h1 className='max-md:hidden'>Recent Notifications</h1>
            <div className='my-8 flex gap-4'>
                {
                    filters.map((filterName, i) => {
                        return (
                            <button
                                key={i}
                                className={'py-2 ' + (filter === filterName ? 'btn-dark' : 'btn-light')}
                                onClick={handleFilter}
                            >
                                {filterName}
                            </button>
                        );
                    })
                }
            </div>

            {
                notification == null ? <Loader /> :
                    <>
                        {
                            notification.results.length ?
                                notification.results.map((notification, i) => {
                                    return <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
                                        <NotificationCard data={notification} index={i} notificationState={{ notification, setNotification }} />
                                    </AnimationWrapper>
                                })
                                :
                                <NoDataMessage message="Nothing available" />
                        }
                        <LoadMoreDataBtn state={notification} fetchDataFun={fetchNotifications} additionalParam={{ deletedDocCount: notification.deletedDocCount }} />
                    </>
            }
        </div>
    );
};

export default Notification;

