// import React from 'react'

// const LoadMoreDataBtn = ({ state, fetchDataFun }) => {

//     if (state != null && state.totalDocs > state.results.length) {
//         return (
//             <button
//                 onClick={() => fetchDataFun({ page: state.page + 1 })}
//                 className='text-dark-grey p-2 px-3 hover:bg-grey/50 rounded-md flex items-center gap-2'
//             >
//                 Load More
//             </button>
//         )
//     }

// }

// export default LoadMoreDataBtn;

import React from 'react'

const LoadMoreDataBtn = ({ state, fetchDataFun, additionalParam }) => {
    if (!state) return null;

    if (
        state.results.length > 0 && 
        state.totalDocs > state.results.length && 
        state.results.length !== state.prevResultsLength 
    ) {
        return (
            <button
                onClick={() => fetchDataFun({ ...additionalParam, page: state.page + 1 })}
                className='text-dark-grey p-2 px-3 hover:bg-grey/50 rounded-md flex items-center gap-2'
            >
                Load More
            </button>
        );
    }

    return null;
}

export default LoadMoreDataBtn;







