
import { useParams } from "react-router-dom"

const Edit = () => {
    const { id } = useParams()
  return (
    <div>
        <h2>Edit Post {id}</h2>
    </div>
  )
}

export default Edit