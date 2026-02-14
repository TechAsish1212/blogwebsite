import React, { useContext } from 'react'
import pageNotFoundImageDark from "../imgs/error_dark.png";
import pageNotFoundImageWhite from "../imgs/error_white.png";
import { Link } from 'react-router-dom';
import fulllogoDark from '../imgs/full_logo_dark.png';
import fulllogoWhite from '../imgs/full_logo_white.png';
import Footer from '../components/footer.component';
import { ThemeContext } from '../App';

const PageNotFound = () => {

  let { theme } = useContext(ThemeContext);

  return (
    <>
      <section className='h-cover relative p-10 flex flex-col items-center gap-20 text-center'>
        <img src={theme == 'light' ? pageNotFoundImageWhite : pageNotFoundImageDark} alt="404 page" className='select-none border-2 border-grey w-72 aspect-square object-cover rounded' />
        <h1 className='text-4xl font-gelasio leading-7'>Page Not Found</h1>
        <p className='text-dark-grey text-xl leading-7 -mt-8'>The page you are looking for does not exists. Head back to the <Link to='/' className='text-black underline'>home page</Link></p>

        <div className='mt-auto'>
          <img src={theme == 'light' ? fulllogoDark : fulllogoWhite} className='h-20 object-contain block mx-auto select-none' />
          <p className='m-5 text-dark-grey'>Read millions of stories around the world</p>
        </div>
      </section>
    </>
  )
}

export default PageNotFound;
