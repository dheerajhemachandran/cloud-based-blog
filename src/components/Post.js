import React,{useState,useEffect} from 'react'
import { getDatabase,ref,remove,push,set,onValue } from 'firebase/database';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios'

const Post = ({post,setid}) => {
  
  const [language, setlanguage] = useState("english")
  const [langlist, setlanglist] = useState([])
  const [data, setdata] = useState(post.data.content)
  const [code, setcode] = useState("en")
  const [comments, setcomments] = useState([])


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

    const db = getDatabase();
    const dbRef = ref(db, 'posts/'+post.key+"/comment/");
    onValue(dbRef, (snapshot) => {
      setcomments([])
    snapshot.forEach((childSnapshot) => {
      const childKey=childSnapshot.key;
      const childData = childSnapshot.val();
      setcomments(data=>[...data,{data:childData,key:childKey}])
    });
  });
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


    const Handlesubmit=(e)=>{
      e.preventDefault()
      let comment=(e.target.comment.value)
      let user=(localStorage.getItem("isauth"))
      console.log(post.key)
      const db=getDatabase()
      const commentRef = ref(db, 'posts/'+post.key+"/comment/");
      const newRef = push(commentRef);
      set(newRef, {
        user:user,
        comment:comment
    });
    }


  return (
    <div className="card mb-5 bg-dark bg-gradient bg-opacity-75 text-white" style={{width:"80vw"}}>
    <div className="card-body">
      <h5 className="card-title">{post.data.title}</h5>
      {path==="/"?<p>author:<span className='text-primary fw-bold ms-2'>{post.data.aname}</span></p>:<></>}
      
      
      <div className="dropdown mb-2">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {language}
        </button>
        <ul className="dropdown-menu">
          {langlist.map((lang,index)=>{
            return(<li key={index}><button className="dropdown-item" onClick={()=>setvalues(lang)}>{lang.name}</button></li>)
          })}
        </ul>
      </div>
     
      <p className="card-text my-3">{data}</p>

      {localStorage.getItem("isauth")===post.data.aname?<Link to="/update" onClick={()=>setid(post)} className="btn btn-primary me-3">update</Link>:<></>}
      {localStorage.getItem("isauth")===post.data.aname?<button onClick={deletenode} className="btn btn-danger">delete</button>:<></>}

      <form className="input-group my-3 pe-5 me-5" onSubmit={Handlesubmit}>
        <input type="text" name="comment" className="form-control" placeholder="put your comment"/>
        <button className="btn btn-outline-primary me-md-5" type="submit">submit</button>
      </form>

      <div>
        {comments.length>0?
        <>
        <p>comments:</p>
        {comments.map((comment,index)=>{
          console.log(comment)
          return(<p key={index}><span className='text-primary'>{comment.data.user}</span>: {comment.data.comment}</p>)
        })}
        </>:
        <></>}
      </div>

    </div>
  </div>
  )
}

export default Post