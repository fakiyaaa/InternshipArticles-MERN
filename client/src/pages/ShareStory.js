import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useState} from "react";


export default function ShareStory() {
  const[title, setTitle] = useState('');
  const[summary, setSummary] = useState('');
  const[content, setContent] = useState('');
  const[files, setFiles] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };
  const formats = {
    formats: [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]

  };
function createNewPost(ev) {
  const data = new FormData();
  data.set('title', title);
  data.set('summary', summary);
  data.set('content', content);
  data.set('file', files[0]);
  ev.preventDefault();
  console.log(files);
  fetch('http://localhost:4000/post', {
    method: 'POST',
    body: data,
  });
};

  return (
  <form onSubmit={createNewPost}>
    <input type="title" placeholder={'Title'}
    value = {title} onChange = {ev => setTitle(ev.target.value)}
    />
    <input type="summary" placeholder={'Summary'}
    value = {summary} onChange = {ev => setSummary(ev.target.value)}/>
    <input type="file" value={files} 
    onChange={ev=> setFiles(ev.target.files)}/>
    
    <ReactQuill value={content} 
    onChange = {newValue => setContent(newValue)}  
    modules={modules} 
    formats = {formats}/>

    <button style = {{marginTop:'5px'}}>Request to be featured</button>
  </form>
  );
}