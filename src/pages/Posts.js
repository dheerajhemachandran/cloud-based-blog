import {React,useState} from 'react'
import { getDatabase, ref, push,set, onValue} from "firebase/database";
import { auth } from '../firebase/Firebase.config'
import Post from '../components/Post';

function writePostData(UserId, title, content) {
    const db = getDatabase();
    const postListRef = ref(db, 'posts');
    const newPostRef = push(postListRef);
    set(newPostRef, {
        title:title,
        content:content,
        author:UserId,
        aname:auth.currentUser.displayName
    });
}


const Posts = ({setid}) => {
    const [post, setpost] = useState(false)
    const [data, setdata] = useState([])
    
    function readPostData(){
        const db = getDatabase();
        const dbRef = ref(db, 'posts/');
        
        onValue(dbRef, (snapshot) => {
            setdata([])
          snapshot.forEach((childSnapshot) => {
            const childKey=childSnapshot.key;
            const childData = childSnapshot.val();
            if(childData.author===auth.currentUser.uid)
            {
            setdata(data=>[...data,{data:childData,key:childKey}])
            }
          });
          setpost(true)
        });
    }

    function Handlesubmit(e){
        e.preventDefault()
        const title=(e.target.title.value)
        const content=(e.target.content.value)
        const UserId=auth.currentUser.uid
        writePostData(UserId,title,content)
        readPostData()
    }

  return (
    <div className='d-flex justify-content-center align-items-center flex-column py-5'>
        <div className='py-5 d-flex gap-4 fs-3'>
            <button onClick={readPostData} className={post?"btn btn-primary":"btn btn-light"}>My Posts</button>
            <button onClick={()=>setpost(false)} className={post?"btn btn-light":"btn btn-primary"}>Createpost</button>
        </div>
        {post?
        <div className='mx-5 px-5'>
            {data.map((post)=>{
                if(post.data.author===auth.currentUser.uid)
                {
                    return(<Post post={post} setid={setid}/>)
                }
                return null
            }
            )}
            {data.length===0?<div className='text-primary'>No post yet!!!</div>:<></>}
        </div>
        :
        <form className='d-flex flex-column' onSubmit={Handlesubmit}>
            <label className='form-label'>Title:</label>
            <textarea className='form-control mb-3 border border-primary' name='title' placeholder='title'></textarea>
            <label className='form-label'>Content</label>
            <textarea className='form-control border border-primary mb-3' name='content' placeholder='type thecontent here'/>
            <button className='btn btn-primary' type='submit'>Create</button>
        </form>}

    </div>
  )
}

export default Posts