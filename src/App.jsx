import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContextProvider } from "./context/AuthContext";
import { useState, useEffect} from "react";
import { userAuthentication } from "./hooks/userAuthentication";

//Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Dashboard from "./pages/dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search.jsx"
import Post from "./pages/Post/Post.jsx";
import EditPost from "./pages/EditPost/EditPost.jsx";

//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


//Styles
import "./App.css";





function App() {
  const [user, setUser] = useState(undefined);
  const {auth} = userAuthentication()
  const loadingUser = user === undefined;

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser){
    return <p>Carregando...</p>;
  }
  return (
    <>
     <AuthContextProvider value={{user}}>
     <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/posts/edit/:id" element={!user ? <Register /> : <EditPost />} />
            <Route path="/register" element={!user ? <Register /> : <Home />} />
            <Route path="/login" element={ !user ? <Login /> : <Home />} />
            <Route path="/dashboard" element={!user ? <Login /> : <Dashboard />} />
            <Route path="/posts/create" element={!user ? <Login /> : <CreatePost />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
     </AuthContextProvider>
    </>
  );
}

export default App;
