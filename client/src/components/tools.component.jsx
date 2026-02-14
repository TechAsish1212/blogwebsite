//importing tools

import Embed from "@editorjs/embed"
import List from "@editorjs/list"
import Image from "@editorjs/image"
import Header from "@editorjs/header"
import Quote from "@editorjs/quote"
import Marker from "@editorjs/marker"
import InlineCode from "@editorjs/inline-code"
import { uploadImage } from "../common/aws"
import Code from "@editorjs/code"; 

// upload image using url in the blog not blog banner 
const uploadImageByURL = (e) => {
    let link = new Promise((reslove, reject) => {
        try {
            reslove(e)
        }
        catch (err) {
            reject(err)
        }
    })
    return link.then(url => {
        return {
            success: 1,
            file: { url }
        }
    })
}

// upload image using file in the blog not blog banner
// const uploadImageByFile = (e) => {
//     return uploadImage(e).then(url => {
//         if (url) {
//             return {
//                 success: 1,
//                 file: { url }
//             }
//         }
//     })
// }

const uploadImageByFile = async (e) => {
    try {
        const url = await uploadImage(e);
        if (url) {
            return {
                success: 1,
                file: { url }
            };
        } else {
            return { success: 0, error: "Upload failed" };
        }
    } catch (error) {
        return { success: 0, error: error.message || "Unknown error" };
    }
};

export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true,
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByURL,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type heading...",
            levels: [2, 3],
            defaultLevel: 2,
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
    },
    marker: Marker,
    inlineCode: InlineCode,
    code: {
        class: Code,   // ✅ Code block tool
        config: {
            placeholder: "Write your code here..."
        }
    }
}
