import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import styles from "./Home.module.css";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import FetchPosts from "../../components/FetchPosts";
const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading, error } = useFetchDocuments("posts");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }

  };
  return (
    <>
      <div className={styles.home}>
        <h1>Posts mais recentes</h1>

        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input
            type="text"
            placeholder="Ou busque por tags"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.btn_dark}>
            <IoIosSearch style={{ color: "#fff", fontSize: "18px" }} />
          </button>
        </form>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => (
            <FetchPosts post={post} key={post.id} />
          ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados Posts</p>
            <NavLink to="/posts/create" className="btn">
              Criar Post
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
