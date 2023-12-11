/* eslint-disable */
import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAutValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { suggestArray } from "../../components/suggestArray";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams()
  const {document: post} = useFetchDocument("posts", id)
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(null)
  const [sugg, setSugg] = useState("")
  

  useEffect(()=>{
    if(post){
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

 

  const { user } = useAutValue()
  const {updateDocument, response } = useUpdateDocument("posts")
  const navigate = useNavigate()
  
  const suggestIndex = Math.floor(Math.random() * suggestArray.length);
  const suggest = suggestArray[suggestIndex];
  


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validade url image
    try {
      new URL(image)
    } catch (error) {
      setFormError("A Imagem deve ser inserida através de uma URL de imagem válida.")
    }
    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    
    //Check all values

    if(!title || !body || !image || !tags){
      setFormError("Preencha os camos corretamente")
    }
    if(formError){
      return
    }

   const data = {
    title,
    image,
    body,
    tagsArray,
    uid:user.uid,
    createdBy: user.displayName
   }
   updateDocument(id, data)

    setSuccess(true)

    setTimeout(()=>{
      navigate("/dashboard") 
    }, 1000)
  };
  return (
   <div className={styles.editPost}>
     {post && (
      <>
      <h2>Editar Post {title}</h2>
      <p>Edite de acordo com as necessidades</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título do Post</span>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            placeholder="O Melhor título"
          />
        </label>
        <label>
          <span>URL da imagem</span>
          <input
            type="text"
            name="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
            placeholder="Endereço Imagem que represente melhor o Post"
          />
        </label>
        <label>
          <img src={post.image} alt="" />
        </label>
        <p style={{marginBottom:"40px"}}><b>Imagem atual do Post</b></p>
        <label>
          <span>Descrição</span>
          <textarea
            name="body"
            required
            placeholder="Descrição do Post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            required
            placeholder="Marque algumas tags separadas por vírgulas"
          />
        </label>

        {!response.loading && <button className="btn">Editar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
        {success && <p className="sucess">Sucesso!</p> }
      
      </form>
      </>
     )}
   </div>
  );
};

export default EditPost;
