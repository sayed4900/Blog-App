
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axois from 'axios'
import { baseUrl } from '../utils/service';
const Write = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState("")

  const upload = async()=>{
    try{
      const formData = new FormData();
      formData.append("file",file) ; 
      const res = await axois.post(`${baseUrl}/posts/upload`);
      return res.data.filename;
    }catch(err){
      console.log(err)
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const imgUrl = upload();

    try{

    }catch(err){
      console.log(err)
    }

  
  }
  return (
    <div className='write-post'>
      <div className="content">
        <input type='text' placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editor-container">
          <ReactQuill  className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">

        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input  type="file" name='' id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])} />
          <label htmlFor="file" className='file'> Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" name="cat" value="art" id="art" />
            <label htmlFor="art" >Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="science" id="science" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="cinema" id="cinema" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="desing" id="desing" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="desing">Desing</label>
          </div>

          <div className="cat">
            <input type="radio" name="cat" value="food" id="food" onChange={e=>setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write
