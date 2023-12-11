import styles from "./Search.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import FetchPosts from "../../components/FetchPosts"
import { Link } from "react-router-dom"
import { FaPencilAlt} from "react-icons/fa";
import { RiEmotionSadFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";


const Search = () => {
    const query = useQuery()
    const search = query.get("q")
    const {documents: posts} = useFetchDocuments("posts", search)
  return (
   <>
        <div className={styles.search}>
          <h3>Search</h3>
            {posts && posts.length === 0  &&(
              <>
                <p> <RiEmotionSadFill style={{color:"orange", marginBottom:"-3px", fontSize:"18px"}} /> Desculpe, não foram encontrados Posts sobre <b>{search}</b></p>
                <Link to="/posts/create" style={{color:"green"}}><FaPencilAlt style={{fontSize:"12px", marginRight:"5px"}} /><b>Criar post</b></Link>
                <Link to="/" className="btn" style={{width:"100px"}}><IoMdArrowRoundBack style={{marginBottom:"-3px", fontSize:"18px"}} /> <b>Voltar</b></Link>
              </>
            ) }
            {posts && posts.map((post) =>(
              
              <FetchPosts key={post.id} post={post}/>
            ))}
        </div>
   </>
  )
}

export default Search