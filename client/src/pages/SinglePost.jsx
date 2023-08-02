import React from 'react'
import Menu from '../components/Menu';
import Edit from '../imges/edit.png'
import Delete from '../imges/delete.png'
import { Link } from 'react-router-dom'

const SinglePost = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src='https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'/>
      
        <div className="user">
          <img src='https://images.pexels.com/photos/17356078/pexels-photo-17356078/free-photo-of-profile-studio-shoot-of-a-man-posing-against-orange-brown-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
          <div className="info">
            <span>Sayed</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={'/write?edit=2'}>
              <img src={Edit}/>
            </Link>
            <img src={Delete}/>
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus obcaecati deserunt beatae quas ut doloremque ex quo qui corrupti pariatur, quos perspiciatis ipsa in dolore earum quisquam saepe, hic blanditiis!Lorem
        </p>
        <br/>
        <p>

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi fugiat vero suscipit, officiis, molestiae reiciendis maiores aperiam veniam asperiores eos, eligendi voluptate totam voluptatem. Ad accusamus quis architecto voluptas omnis?
        </p>
        <br/>  
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam quasi rem reprehenderit? Eveniet dolorum expedita libero? Quia consectetur quae voluptas quo repellendus et optio atque laborum! Quas, aut vero.  
          <br/>
        </p>
      </div>
      <Menu/>
    </div>
  )
}

export default SinglePost