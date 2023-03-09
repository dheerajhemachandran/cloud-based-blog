import React,{useState,useEffect} from 'react'
import { getDatabase,ref,remove } from 'firebase/database';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios'

const Post = ({post,setid}) => {
  
  const [language, setlanguage] = useState("english")
  const [langlist, setlanglist] = useState([])
  const [data, setdata] = useState(post.data.content)
  const [code, setcode] = useState("en")


  function translate(){
    var url = `https://api.mymemory.translated.net/get?q=${encodeURI(post.data.content)}!&langpair=en|${code}`;
    fetch(url).then((res)=> res.json()).then((data)=>{
      console.log(data)
      setdata(data.matches[0].translation)
    })
  }
  
  useEffect(() => {
    axios.get('https://libretranslate.com/languages').then((res)=>{
     setlanglist(res.data)
    })
    if(code==="en")
    {setdata(post.data.content)}
    else
    {translate()}
  }, [code])
  
    const loc=useLocation()
    const path=loc.pathname;

    function setvalues(lang){
        setlanguage(lang.name)
        setcode(lang.code)
    }

    function deletenode(){
        const db = getDatabase();
        remove(ref(db, 'posts/'+post.key))
       
    }
  return (
    <div className="card mb-5" style={{width:"80vw"}}>
    <div className="card-body">
      <h5 className="card-title">{post.data.title}</h5>
      {path==="/"?<p>author:<span className='text-primary fw-bold ms-2'>{post.data.aname}</span></p>:<></>}
      
      <p className="card-text mt-3">{data}</p>

      <div className="dropdown mb-2">
        <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {language}
        </button>
        <ul className="dropdown-menu">
          {langlist.map((lang,index)=>{
            return(<li key={index}><button className="dropdown-item" onClick={()=>setvalues(lang)}>{lang.name}</button></li>)
          })}
        </ul>
      </div>

      {localStorage.getItem("isauth")===post.data.aname?<Link to="/update" onClick={()=>setid(post)} className="btn btn-primary me-3">update</Link>:<></>}
      {localStorage.getItem("isauth")===post.data.aname?<button onClick={deletenode} className="btn btn-danger">delete</button>:<></>}


    </div>
  </div>
  )
}

export default Post