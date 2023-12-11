import styles from "./Post.module.css"
import { useFetchDocument } from "../../hooks/useFetchDocument";

//hooks
import { useParams } from "react-router-dom";
const Post = () => {
    const { id } = useParams();
    const { document: post} = useFetchDocument("posts", id)
  return (
    <div>
       
        {post && (
            <>
               <div className={styles.post}>
                 <h2>{post.title}</h2>
                 <img src={post.image} alt="" />
                 <p>{post.body}</p>
               </div>
            </>
        )}
    </div>
  )
}

export default Post

