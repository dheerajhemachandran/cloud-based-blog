import {React} from 'react'
import { getDatabase,ref,set } from 'firebase/database';
import { auth } from '../firebase/Firebase.config'
import { useNavigate } from 'react-router-dom';

const Updatepost = ({id}) => {

    const navigate=useNavigate();

    function writePostData(UserId, title, content) {
        const db = getDatabase();
            set(ref(db, 'posts/' + id.key), {
            title:title,
            content:content,
            author:UserId,
            aname:auth.currentUser.displayName
          });
        
    }

    function Handlesubmit(e){
        e.preventDefault()
        const title=(e.target.title.value)
        const content=(e.target.content.value)
        const UserId=auth.currentUser.uid
        writePostData(UserId,title,content)
        navigate("/post")
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center py-5 my-5'>
        
        <div className="card mb-5" style={{width:"80vw"}}>
        <div className="card-body">
            <h5 className="card-title">{id.data.title}</h5>
            <p className="card-text mt-3">{id.data.content}</p>
            </div>
        </div>

        <div className='my-5 fs-3'>Enter the new details below</div>
        <form className='d-flex flex-column' style={{width:"80vw"}} onSubmit={Handlesubmit} >
            <label className='form-label'>Title:</label>
            <textarea className='form-control mb-3 border border-primary' name='title' placeholder='title'>{id.data.title}</textarea>
            <label className='form-label'>Content</label>
            <textarea className='form-control border border-primary mb-3' name='content' style={{height:"280px"}} placeholder='type thecontent here'>{id.data.content}</textarea>
            <button className='btn btn-primary' type='submit'>Update</button>
        </form>

    </div>
  )
}

export default Updatepost