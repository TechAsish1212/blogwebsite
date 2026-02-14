import React, { useContext } from 'react'
import { EditorContext } from '../pages/editor.pages'

const Tag = ({ tag, TagIndex }) => {

  let { blog, blog: { tags }, setBlog } = useContext(EditorContext);

  const handleTagDelete = () => {
    tags = tags.filter(t => t != tag);
    setBlog({ ...blog, tags })
  }

  // const handleTagEdit = (e) => {
  //   if (e.kay === 'Enter' || e.kay === ',') {
  //     e.preventDefault();

  //     let currentTag = e.target.innerText;

  //     tags[TagIndex] = currentTag;

  //     setBlog({ ...blog, tags });
  //     console.log(tags)
  //     e.target.setAttribute("contentEditable",false)

  //   }
  // }

  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
  
      let currentTag = e.target.innerText.trim();
  
      if (currentTag) {
        tags[TagIndex] = currentTag;
        setBlog({ ...blog, tags: [...tags] }); 
        e.target.setAttribute("contentEditable",false)
      }
    }
  };
  
  const addEditTable = (e)=>{
    e.target.setAttribute("contentEditable",true);
    e.target.focus();
  }

  return (
    <div className='relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10'>

      <p className='outline-none' onKeyDown={handleTagEdit} onClick={addEditTable}>{tag}</p>
      <button
        className='mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2'
        onClick={handleTagDelete}
      >
        <i className="fi fi-sr-cross-small text-sm pointer-events-none"></i>

      </button>

    </div>
  )
}

export default Tag;
