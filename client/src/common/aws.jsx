// import axios from "axios";

// export const uploadImage = (img) => {

//     let imgUrl = null;

//     axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
//         .then(async ({ data: { uploadURL } }) => {
//             await axios({
//                 method: 'PUT',
//                 url: uploadURL,
//                 headers: { 'Content-Type': 'multipart/from-data' },
//                 data: img
//             })
//                 .then(() => {
//                     imgUrl = uploadURL.split("?")[0]
//                 })
//         })

//     return imgUrl;
// }


import axios from "axios";

export const uploadImage = (img) => {
    return axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
        .then(({ data: { uploadURL } }) => {
            return axios({
                method: 'PUT',
                url: uploadURL,
                headers: { 'Content-Type': img.type }, 
                data: img
            }).then(() => {
                return uploadURL.split("?")[0]; 
            });
        })
        .catch((err) => {
            console.error("Image upload failed:", err);
            return null;
        });
};
