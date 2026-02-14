// import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/navbar.component";
// import UserAuthForm from "./pages/userAuthForm.page";
// import { createContext, useEffect, useState } from "react";
// import { lookInSession } from "./common/session";
// import Editor from "./pages/editor.pages.jsx";
// import HomePage from "./pages/home.page.jsx";
// import SearchPage from "./pages/search.page.jsx";
// import PageNotFound from "./pages/404.page.jsx";
// import ProfilePage from "./pages/profile.page.jsx";
// import BlogPage from "./pages/blog.page.jsx";
// import SideNav from "./components/sidenavbar.component.jsx";
// import ChangePassword from "./pages/change-password.page.jsx";
// import EditProfile from "./pages/edit-profile.page.jsx";
// import Notification from "./pages/notifications.page.jsx";

// export const UserContext = createContext({});

// const App = () => {

//     const [userAuth, setUserAuth] = useState({});

//     useEffect(() => {
//         let userInsession = lookInSession("user");

//         userInsession ? setUserAuth(JSON.parse(userInsession)) : setUserAuth({ access_token: null })
//     }, [])

//     return (
//         <UserContext.Provider value={{ userAuth, setUserAuth }}>
//             <Routes>
//                 <Route path='/' element={<Navbar />}>
//                     <Route index element={<HomePage />} />
//                     <Route path="dashboard" element={<SideNav />}>
//                         <Route path="notification" element={<Notification />} />
//                     </Route>
//                     <Route path="setting" element={<SideNav />}>
//                         <Route path="edit-profile" element={<EditProfile />} />
//                         <Route path="change-password" element={<ChangePassword />} />
//                     </Route>
//                     <Route path='signin' element={<UserAuthForm type="sign-in" />} />
//                     <Route path='signup' element={<UserAuthForm type="sign-up" />} />
//                     <Route path="search/:query" element={<SearchPage />} />
//                     <Route path="user/:id" element={<ProfilePage />} />
//                     <Route path="blog/:blog_id" element={<BlogPage />} />
//                     <Route path="*" element={<PageNotFound />} />
//                 </Route>
//                 <Route path='/editor' element={<Editor />} />
//                 <Route path='/editor/:blog_id' element={<Editor />} />
//             </Routes>
//         </UserContext.Provider>
//     )
// }

// export default App;




import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import Editor from "./pages/editor.pages.jsx";
import HomePage from "./pages/home.page.jsx";
import SearchPage from "./pages/search.page.jsx";
import PageNotFound from "./pages/404.page.jsx";
import ProfilePage from "./pages/profile.page.jsx";
import BlogPage from "./pages/blog.page.jsx";
import SideNav from "./components/sidenavbar.component.jsx";
import ChangePassword from "./pages/change-password.page.jsx";
import EditProfile from "./pages/edit-profile.page.jsx";
import Notification from "./pages/notifications.page.jsx";
import ManageBlogs from "./pages/manage-blogs.page.jsx";
// import AiPage from "./pages/ai.page.jsx";  

export const UserContext = createContext({});
export const ThemeContext = createContext({});
const darkThemePreference = () => window.matchMedia("(prefers-color-scheme:dark)").matches;

const App = () => {

    const [userAuth, setUserAuth] = useState({});
    const [theme, setTheme] = useState(() => darkThemePreference() ? "dark" : "light");

    useEffect(() => {
        let userInsession = lookInSession("user");
        let themeInSession = lookInSession('theme');

        userInsession ? setUserAuth(JSON.parse(userInsession)) : setUserAuth({ access_token: null })

        if (themeInSession) {
            setTheme(() => {
                document.body.setAttribute('data-theme', themeInSession);
                return themeInSession;
            })
        }
        else {
            document.body.setAttribute('data-theme', theme);
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <UserContext.Provider value={{ userAuth, setUserAuth }}>
                <Routes>
                    <Route path='/' element={<Navbar />}>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<SideNav />}>
                            <Route path="blogs" element={<ManageBlogs />} />
                            <Route path="notification" element={<Notification />} />
                        </Route>
                        <Route path="setting" element={<SideNav />}>
                            <Route path="edit-profile" element={<EditProfile />} />
                            <Route path="change-password" element={<ChangePassword />} />
                        </Route>
                        <Route path='signin' element={<UserAuthForm type="sign-in" />} />
                        <Route path='signup' element={<UserAuthForm type="sign-up" />} />
                        <Route path="search/:query" element={<SearchPage />} />
                        <Route path="user/:id" element={<ProfilePage />} />
                        <Route path="blog/:blog_id" element={<BlogPage />} />
                        {/* <Route path="ai" element={<AiPage />} />   */}
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                    <Route path='/editor' element={<Editor />} />
                    <Route path='/editor/:blog_id' element={<Editor />} />
                </Routes>
            </UserContext.Provider>
        </ThemeContext.Provider>
    )
}

export default App;
