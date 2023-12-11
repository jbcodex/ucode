/* eslint-disable */
import { NavLink } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserPlus,
  FaPencilAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaRegFaceSmile } from "react-icons/fa6";
import { userAuthentication } from "../hooks/userAuthentication";
import { useAutValue } from "../context/AuthContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const {user} = useAutValue();
  const {logout} = userAuthentication()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Under<span>CODE</span> &gt;
      </NavLink>
      <ul className={styles.nav_links}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        
        {!user && (
          <>
            
            <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <FaUserPlus
                  style={{
                    color: "orange",
                    fontSize: "1em",
                    marginBottom: "-2px",
                  }}
                />{" "}
                Cadastre-se
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <FaSignInAlt
                  style={{
                    color: "orange",
                    fontSize: ".9em",
                    marginBottom: "-2px",
                  }}
                />{" "}
                Login
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
              
                Dashboard
              </NavLink>
            </li>
            {user && <li style={{color:"#fff", fontSize:"12px", marginTop:"4px"}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <FaRegFaceSmile style={{color:"orange", marginBottom:"-1.5px", marginRight:"4px"}} /><b>Usuário: </b> {user.displayName.split(' ')[0]}&nbsp;&nbsp;&nbsp;&nbsp; </li>}
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <FaPencilAlt
                  style={{
                    color: "orange",
                    fontSize: ".8em",
                    marginBottom: "-2px",
                    marginRight: "3px",
                  }}
                />
                Criar Post
              </NavLink>
            </li>
            <li>
              <button style={{color:"#fff"}} onClick={logout}>
                <FaSignOutAlt
                  style={{
                    color: "orange",
                    fontSize: ".8em",
                    marginBottom: "-2px",
                    marginRight: "3px",
                  }}
                />
                Sair
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
