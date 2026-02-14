// import axios from "axios";

// export const filterPaginationData = async ({ create_new_arr = false, state, data, page, countRoute, data_to_send={ } }) => {

//     let obj;

//     if (state != null && !create_new_arr) {
//         obj = { ...state, results: [...state.results, ...data], page: page }
//     }
//     else {
//         await axios.post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send)
//             .then(({ data: { totalDocs } }) => {
//                 obj = { results: data, page: 1, totalDocs }
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }
//     return obj;
// } 

// import axios from "axios";

// export const filterPaginationData = async ({
//     create_new_arr = false,
//     state,
//     data,
//     page,
//     countRoute,
//     data_to_send = {},
//     user = undefined
// }) => {
//     let obj;
//     let headers ={};

//     if(user){
//         headers.headers ={
//             'Authorization':`Bearer ${user}`
//         }
//     }

//     if (state != null && !create_new_arr) {
//         obj = {
//             ...state,
//             prevResultsLength: state.results.length, 
//             results: [...state.results, ...data],
//             page: page
//         };
//     } else {
//         await axios
//             .post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send,headers)
//             .then(({ data: { totalDocs, limit } }) => {
//                 obj = {
//                     results: data,
//                     prevResultsLength: 0, 
//                     page: 1,
//                     totalDocs,
//                     limit: limit || data.length 
//                 };
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     return obj;
// };


// import axios from "axios";

// export const filterPaginationData = async ({
//     create_new_arr = false,
//     state,
//     data,
//     page,
//     countRoute,
//     data_to_send = {},
//     user = undefined
// }) => {
//     let obj;
//     let headers = {};

//     if (user) {
//         headers = {
//             headers: {
//                 'Authorization': `Bearer ${user}`
//             }
//         };
//     }

//     if (state != null && !create_new_arr) {
//         obj = {
//             ...state,
//             prevResultsLength: state.results.length,
//             results: [...state.results, ...data],
//             page: page
//         };
//     } else {
//         await axios
//             .post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send, headers) // ✅ headers fixed
//             .then(({ data: { totalDocs, limit } }) => {
//                 obj = {
//                     results: data,
//                     prevResultsLength: 0,
//                     page: 1,
//                     totalDocs,
//                     limit: limit || data.length
//                 };
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     return obj;
// };


import axios from "axios";

export const filterPaginationData = async ({
    create_new_arr = false,
    state,
    data,
    page,
    countRoute,
    data_to_send = {},
    user = undefined
}) => {
    let obj;
    let headers = {};

    if (user) {
        headers = {
            headers: {
                'Authorization': `Bearer ${user}`
            }
        };
    }

    if (state && state.results && !create_new_arr) {
        // ✅ Safe fallback for results
        const prevResults = state.results || [];
        obj = {
            ...state,
            prevResultsLength: prevResults.length,
            results: [...prevResults, ...(data || [])],
            page: page
        };
    } else {
        await axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + countRoute, data_to_send, headers)
            .then(({ data: { totalDocs, limit } }) => {
                obj = {
                    results: data || [],
                    prevResultsLength: 0,
                    page: 1,
                    totalDocs,
                    limit: limit || (data ? data.length : 0)
                };
            })
            .catch(err => {
                console.log(err);
            });
    }

    return obj;
};
