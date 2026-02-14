// import React, { useContext, useEffect } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import logoDark from "../imgs/logo1_dark.png";
// import logoLight from "../imgs/logo1_white.png";
// import AnimationWrapper from '../common/page-animation';
// import bannerDark from '../imgs/blog_banner_dark.png';
// import bannerLight from '../imgs/blog_banner_white.png';
// import { uploadImage } from '../common/aws';
// import { Toaster, toast } from 'react-hot-toast';
// import { EditorContext } from '../pages/editor.pages';
// import EditorJs from "@editorjs/editorjs"
// import { tools } from './tools.component';
// import axios from 'axios';
// import { ThemeContext, UserContext } from '../App';

// const BlogEditor = () => {

//     // let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext);
//     let {
//         blog = {},
//         blog: { title = "", banner = "", content = {}, tags = [], des = "" } = {},
//         setBlog,
//         textEditor,
//         setTextEditor,
//         setEditorState
//     } = useContext(EditorContext);


//     let { userAuth: { access_token } } = useContext(UserContext);
//     let { blog_id } = useParams();

//     let navigate = useNavigate();

//     let { theme } = useContext(ThemeContext);

//     // useEffect
//     useEffect(() => {
//         if (!textEditor.isReady) {
//             setTextEditor(new EditorJs({
//                 holderId: "textEditor",
//                 data: Array.isArray(content) ? content[0] : content,
//                 tools: tools,
//                 placeholder: 'Lets write an awesome story'
//             }))
//         }

//     }, [])

//     const handleBannerUpload = (event) => {
//         const img = event.target.files[0];

//         if (img) {
//             const loadingToast = toast.loading("Uploading...");

//             uploadImage(img)
//                 .then((url) => {
//                     if (url) {
//                         // Create a new Image element to wait for load
//                         const tempImg = new Image();
//                         tempImg.src = url;

//                         tempImg.onload = () => {
//                             // blogBannerRef.current.src = url;
//                             toast.dismiss(loadingToast);
//                             toast.success("Uploaded 👍");
//                         };

//                         tempImg.onerror = () => {
//                             toast.dismiss(loadingToast);
//                             toast.error("Image failed to load.");
//                         };

//                         setBlog({ ...blog, banner: url });
//                     }
//                 })
//                 .catch((err) => {
//                     toast.dismiss(loadingToast);
//                     toast.error("Upload failed.");
//                     console.error(err);
//                 });
//         }
//     };

//     const handleTitleKeyDown = (e) => {
//         if (e.keyCode === 13) { //enter key
//             e.preventDefault();
//         }
//     }

//     const handleTitleChange = (e) => {
//         console.log(e);
//         let input = e.target;

//         // console.log(input.scrollHeight)
//         input.style.height = 'auto';
//         input.style.height = input.scrollHeight + "px";

//         setBlog({ ...blog, title: input.value })
//     }

//     const handleError = (e) => {
//         let img = e.target;
//         img.src = theme=='light'?bannerLight:bannerDark
//     }

//     const handlePublishEvent = () => {
//         if (!banner.length) {
//             return toast.error("Upload a blog banner to publish it.")
//         }

//         if (!title.length) {
//             return toast.error("Write blog title to publish it.")
//         }

//         if (textEditor.isReady) {
//             textEditor.save().then(data => {
//                 if (data.blocks.length) {
//                     setBlog({ ...blog, content: data });
//                     setEditorState("publish")
//                 }
//                 else {
//                     return toast.error("Write something in your blog to publish it.")
//                 }
//             })
//                 .catch((err) => {
//                     console.log(err);
//                 })
//         }
//     }

//     // save draft button

//     const handleSaveDraft = (e) => {
//         if (e.target.className.includes("disable")) return;

//         if (!title.length) {
//             return toast.error("🤦‍♂️ Write blog title before saving it as a draft.");
//         }

//         const loadingToast = toast.loading("Saving Draft.....");
//         e.target.classList.add("disable");

//         if (textEditor.isReady) {
//             textEditor.save().then(content => {

//                 const blogObj = { title, banner, des, content, tags, draft: true };

//                 axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
//                     headers: {
//                         'Authorization': `Bearer ${access_token}`
//                     }
//                 })
//                     .then(() => {
//                         e.target.classList.remove("disable");
//                         toast.dismiss(loadingToast);
//                         toast.success("Saved 👍");

//                         setTimeout(() => {
//                             navigate("/dashboard/blogs?tab=draft");
//                         }, 500);
//                     })
//                     .catch(({ response }) => {
//                         e.target.classList.remove("disable");
//                         toast.dismiss(loadingToast);

//                         return toast.error(response.data.error);
//                     });
//             })
//         }

//     }



//     return (
//         <>
//             <nav className='navbar'>
//                 <Link to='/' className='flex-none w-14'>
//                     <img src={theme == 'light' ? logoDark : logoLight} alt="" />
//                 </Link>
//                 <p className='max-md:hidden text-black line-clamp-1 w-full '>
//                     {title.length ? title : "New Blog"}

//                 </p>

//                 <div className='flex gap-4 ml-auto'>
//                     <button className='btn-dark py-2'
//                         onClick={handlePublishEvent}
//                     >
//                         Publish
//                     </button>
//                     <button className='btn-light py-2' onClick={handleSaveDraft}>
//                         Save Draft
//                     </button>
//                 </div>
//             </nav>
//             <Toaster />
//             <AnimationWrapper>
//                 <section>
//                     <div className='mx-auto max-w-[900px] w-full '>

//                         {/* banner div */}
//                         <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
//                             <label htmlFor="uploadBanner" className='w-full h-full block cursor-pointer'>
//                                 <img
//                                     src={banner}
//                                     alt="Upload banner"
//                                     className='w-full h-full object-cover'
//                                     onError={handleError}
//                                 />
//                             </label>
//                             <input
//                                 type="file"
//                                 id='uploadBanner'
//                                 accept='.png,.jpeg,.jpg'
//                                 hidden
//                                 onChange={handleBannerUpload}
//                             />
//                         </div>

//                         {/* title of blog */}
//                         <textarea
//                             defaultValue={title}
//                             placeholder='Write the Blog Title'
//                             className='text-3xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white'
//                             onKeyDown={handleTitleKeyDown}
//                             onChange={handleTitleChange}
//                         >
//                         </textarea>

//                         <hr className='w-full opacity-10 my-5' />

//                         <div id='textEditor' className='font-gelasio'>

//                         </div>

//                     </div>
//                 </section>
//             </AnimationWrapper>
//         </>
//     )
// }

// export default BlogEditor;



import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import logoDark from "../imgs/logo1_dark.png";
import logoLight from "../imgs/logo1_white.png";
import AnimationWrapper from '../common/page-animation';
import bannerDark from '../imgs/blog_banner_dark.png';
import bannerLight from '../imgs/blog_banner_white.png';
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { EditorContext } from '../pages/editor.pages';
import EditorJs from "@editorjs/editorjs"
import { tools } from './tools.component';
import axios from 'axios';
import { ThemeContext, UserContext } from '../App';

const BlogEditor = () => {
    let {
        blog = {},
        blog: { title = "", banner = "", content = {}, tags = [], des = "" } = {},
        setBlog,
        textEditor,
        setTextEditor,
        setEditorState
    } = useContext(EditorContext);

    let { userAuth: { access_token } } = useContext(UserContext);
    let { blog_id } = useParams();
    let navigate = useNavigate();
    let { theme } = useContext(ThemeContext);

    // State for AI generation
    const [isGenerating, setIsGenerating] = useState(false);
    const editorContainerRef = useRef(null);

    // useEffect
    useEffect(() => {
        if (!textEditor.isReady) {
            setTextEditor(new EditorJs({
                holderId: "textEditor",
                data: Array.isArray(content) ? content[0] : content,
                tools: tools,
                placeholder: 'Lets write an awesome story'
            }))
        }
    }, [])

    const handleBannerUpload = (event) => {
        const img = event.target.files[0];

        if (img) {
            const loadingToast = toast.loading("Uploading...");

            uploadImage(img)
                .then((url) => {
                    if (url) {
                        const tempImg = new Image();
                        tempImg.src = url;

                        tempImg.onload = () => {
                            toast.dismiss(loadingToast);
                            toast.success("Uploaded 👍");
                        };

                        tempImg.onerror = () => {
                            toast.dismiss(loadingToast);
                            toast.error("Image failed to load.");
                        };

                        setBlog({ ...blog, banner: url });
                    }
                })
                .catch((err) => {
                    toast.dismiss(loadingToast);
                    toast.error("Upload failed.");
                    console.error(err);
                });
        }
    };

    const handleTitleKeyDown = (e) => {
        if (e.keyCode === 13) { //enter key
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        console.log(e);
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";

        setBlog({ ...blog, title: input.value })
    }

    const handleError = (e) => {
        let img = e.target;
        img.src = theme == 'light' ? bannerLight : bannerDark
    }

    const handlePublishEvent = () => {
        if (!banner.length) {
            return toast.error("Upload a blog banner to publish it.")
        }

        if (!title.length) {
            return toast.error("Write blog title to publish it.")
        }

        if (textEditor.isReady) {
            textEditor.save().then(data => {
                if (data.blocks.length) {
                    setBlog({ ...blog, content: data });
                    setEditorState("publish")
                }
                else {
                    return toast.error("Write something in your blog to publish it.")
                }
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // ✅ AI Content Generation Function (Integrated with backend)
    const generateAIContent = async () => {
        if (!title.trim()) {
            return toast.error("Please enter a blog title first.");
        }

        setIsGenerating(true);
        const loadingToast = toast.loading("Generating content with AI...");

        try {
            // call backend API
            const { data } = await axios.post(
                import.meta.env.VITE_SERVER_DOMAIN + "/generate-content",
                { title },
                { headers: { Authorization: `Bearer ${access_token}` } }
            );

            toast.dismiss(loadingToast);

            if (textEditor.isReady) {
                await textEditor.clear();
                await textEditor.render(data.content);
                toast.success("Content generated successfully!");
            } else {
                toast.error("Editor is not ready yet. Please try again.");
            }
        } catch (error) {
            console.error("AI generation error:", error);
            toast.dismiss(loadingToast);
            toast.error("Failed to generate content. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    // save draft button
    const handleSaveDraft = (e) => {
        if (e.target.className.includes("disable")) return;

        if (!title.length) {
            return toast.error("🤦‍♂️ Write blog title before saving it as a draft.");
        }

        const loadingToast = toast.loading("Saving Draft.....");
        e.target.classList.add("disable");

        if (textEditor.isReady) {
            textEditor.save().then(content => {

                const blogObj = { title, banner, des, content, tags, draft: true };

                axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", { ...blogObj, id: blog_id }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                    .then(() => {
                        e.target.classList.remove("disable");
                        toast.dismiss(loadingToast);
                        toast.success("Saved 👍");

                        setTimeout(() => {
                            navigate("/dashboard/blogs?tab=draft");
                        }, 500);
                    })
                    .catch(({ response }) => {
                        e.target.classList.remove("disable");
                        toast.dismiss(loadingToast);

                        return toast.error(response.data.error);
                    });
            })
        }
    }

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='flex-none w-14'>
                    <img src={theme == 'light' ? logoDark : logoLight} alt="" />
                </Link>
                <p className='max-md:hidden text-black line-clamp-1 w-full '>
                    {title.length ? title : "New Blog"}
                </p>

                <div className='flex gap-4 ml-auto'>
                    <button className='btn-dark py-2'
                        onClick={handlePublishEvent}
                    >
                        Publish
                    </button>
                    <button className='btn-light py-2' onClick={handleSaveDraft}>
                        Save Draft
                    </button>
                </div>
            </nav>
            <Toaster />
            <AnimationWrapper>
                <section>
                    <div className='mx-auto max-w-[900px] w-full'>

                        {/* banner div */}
                        <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
                            <label htmlFor="uploadBanner" className='w-full h-full block cursor-pointer'>
                                <img
                                    src={banner}
                                    alt="Upload banner"
                                    className='w-full h-full object-cover'
                                    onError={handleError}
                                />
                            </label>
                            <input
                                type="file"
                                id='uploadBanner'
                                accept='.png,.jpeg,.jpg'
                                hidden
                                onChange={handleBannerUpload}
                            />
                        </div>

                        {/* title of blog */}
                        <textarea
                            defaultValue={title}
                            placeholder='Write the Blog Title'
                            className='text-3xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white'
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                        >
                        </textarea>

                        <hr className='w-full opacity-10 my-5' />

                        <div className='relative' ref={editorContainerRef}>
                            <div id='textEditor' className='font-gelasio'>
                            </div>

                            {/* AI Generate Button - Fixed Positioning */}
                            {/* <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={generateAIContent}
                                    disabled={isGenerating}
                                    className={`p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
                                        theme === 'light' 
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600' 
                                            : 'bg-gradient-to-r from-purple-500 to-blue-400 text-white hover:from-purple-600 hover:to-blue-500'
                                    } ${isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl'}`}
                                    title="Generate content with AI"
                                >
                                    {isGenerating ? (
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                {!isGenerating && (
                                    <div className="text-xs text-center mt-1 text-gray-500">
                                        AI
                                    </div>
                                )}
                            </div> */}
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    onClick={generateAIContent}
                                    disabled={isGenerating}
                                    className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${theme === 'light'
                                            ? 'bg-white hover:bg-gray-100'
                                            : 'bg-gray-800 hover:bg-gray-700'
                                        } ${isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl'}`}
                                    title="Generate content with AI"
                                >
                                    {isGenerating ? (
                                        <span className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <i className="fi fi-rr-magic-wand text-xl"></i>  
                                    )}
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            </AnimationWrapper>

            {/* Add some custom styles for the editor and button */}
            <style jsx>{`
                #textEditor {
                    min-height: 400px;
                    border: 1px solid #e5e7eb;
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    padding-top: 3rem;
                    position: relative;
                    background: ${theme === 'light' ? '#fff' : '#1f2937'};
                }
                
                .ce-block__content {
                    max-width: 100% !important;
                }
                
                .ce-toolbar__content {
                    max-width: 100% !important;
                }
            `}</style>
        </>
    )
}

export default BlogEditor;
