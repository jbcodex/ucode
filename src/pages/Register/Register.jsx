import { userAuthentication } from "../../hooks/userAuthentication";
import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const {
    createUser,
    error: authError,
    loading,
    success,
  } = userAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      displayName,
      email,
      password,
    };

    if (password != confirmPassword) {
      setError("As senhas não conferem!");
      return;
    }

    const response = await createUser(user);
   

  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.formRegister}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie uma conta e compartilhe seus conhecimentos</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome de usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confirme a senha:</span>
          <div onClick={togglePasswordVisibility}>
          {showPassword ? 
            <FaEye
            style={{
              position:"absolute",
              top:"400",
              right:"35%",
              color: "#000",
              fontSize: "1em",
              marginBottom: "-2px",
              marginRight: "5px",
              cursor:"pointer"
            }}
            
          />
           : 
           <FaEyeSlash
           style={{
             position:"absolute",
             top:"400",
             right:"35%",
             color: "#000",
             fontSize: "1em",
             marginBottom: "-2px",
             marginRight: "5px",
             cursor:"pointer"
           }}
           
         />}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            required
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
        {success && <p className="sucess">Cadastro realizado com sucesso</p>}
      
      </form>
    </div>
  );
};

export default Register;
