import { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import { FaLock, FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [colorMail, setColorMail] = useState(false)
  const [colorPass, setColorPass] = useState(false)

  const {
    login,
    error: authError,
    loading,
    success,
    
  } = userAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      email,
      password,
    };
    const response = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);


  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <p>Entre para criar postagens!</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <span>E-mail: </span>
          <MdAlternateEmail
            style={{
              position:"absolute",
              top:"265px",
              right:"35%",
              color: colorMail ? "#aaa" : "#eee",
              fontSize: "1em",
              marginBottom: "-2px",
              marginRight: "5px",
              cursor:"pointer",
              backgroundColor:"transparent",
              transition:".2s"
            }}
            
          />
          <input
            type="email"
            name="email"
            placeholder="Insira seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={()=>(setColorMail(true), password == "" ? setColorPass(false) : null)}
            required
            autoComplete="off"
            
          />
        </label>
        <label>
          <span>Senha: </span>
          <FaLock
            style={{
              position:"absolute",
              top:"345px",
              right:"35%",
              color: colorPass ? "#aaa" : "#eee",
              fontSize: "1em",
              marginBottom: "-2px",
              marginRight: "5px",
              cursor:"pointer",
              backgroundColor:"transparent",
              transition:".2s"
            }}
            
          />
          <input
            type="password"
            name="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={()=>(setColorPass(true), email == "" ? setColorMail(false) : null)}
            required
            autoComplete="off"
            
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

      </form>
      {error && <p className={styles.errorLogin}>{error}</p>}
      {success && <p className="sucess">Cadastro realizado com sucesso</p>}
    </div>
  );
};

export default Login;
