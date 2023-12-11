/* eslint-disable */
import styles from "./FetchPosts.module.css"
import { FaHashtag } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoIosLink } from "react-icons/io";

const FetchPosts = ({post}) => {
  return (
    <>
        <div className={styles.posts}>
            <img src={post.image} alt={post.title}/>
            <h2>{post.title}</h2>
            <p>Por:  {post.createdBy}</p>
            <NavLink className={styles.linkPost} to={`/posts/${post.id}`}><IoIosLink />Ler Postagem</NavLink>
            <div className={styles.tags}>
                {post.tagsArray.map((tag, i)=>( 
                    <p key={i}><span><FaHashtag style={{marginBottom:"-1px",fontSize:"12px" ,color:"#069"}} /></span>{tag}</p>
                ))}
            </div>
        </div>
    </>
  )
}

export default FetchPosts