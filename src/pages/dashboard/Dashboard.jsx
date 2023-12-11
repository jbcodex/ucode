import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeletePost } from "../../hooks/useDeletePost";

//Hooks
import { useAutValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//Post do usuário

const Dashboard = () => {
  const {deleteDocument} = useDeletePost("posts")
  const { user } = useAutValue();
  const uid = user.uid;
  const { documents: posts, loading, error} = useFetchDocuments("posts", null, uid);

  return (
    <div className={styles.dash}>
      <h2>Gerencie os seus posts</h2>
      {posts && posts.length === 0 ? (
        <div className={styles.nopost}>
          <p>Posts não encontrados</p>
          <Link className="btn" to="/posts/create">
            Criar post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div className={styles.dashPosts} key={post.id}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/posts/${post.id}`}>
                    <FaRegEye />
                  </Link>
                  <Link to={`/posts/edit/${post.id}`} style={{fontSize:"17px"}}>
                    <FaRegEdit />
                  </Link>
                  <Link onClick={() => deleteDocument(post.id)} style={{color:"red"}}>
                    <MdOutlineDeleteOutline />
                  </Link>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
