import styles from "./About.module.css";
import { NavLink } from "react-router-dom";
import {FaPencilAlt } from "react-icons/fa";
const About = () => {
  return (
    <>
      <div className={styles.about}>
        <h2>Sobre nós</h2>
        <p>
          Bem-vindo ao Under<b>CODE</b>, seu guia confiável no universo da
          segurança digital. Nossa missão é pioneira: oferecer compreensão
          completa das ameaças cibernéticas e soluções inovadoras. De análises
          detalhadas a estratégias avançadas, mantemos você à frente nas últimas
          tendências. Junte-se à nossa comunidade e descubra como podemos tornar
          o mundo digital mais seguro, uma linha de código de cada vez.
        </p>
        <NavLink className="btn" to="/posts/create">
          <FaPencilAlt
                  style={{
                    color: "#fff",
                    fontSize: ".8em",
                    marginBottom: "-2px",
                    marginRight: "5px"
                  }}
                />Criar Post</NavLink>
      </div>
    </>
  );
};

export default About;
