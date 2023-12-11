/* eslint-disable */
import { db } from "../firebase/config";

//Importação das configs do firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
//Importação do useState e useEffect
import { useState, useEffect } from "react";

//Exportação do hook de configurações
export const userAuthentication = () => {
  //declaração das constantes
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  //cleanup
  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  //Função para criar um usuário que recebe dados
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      
      );
      
      
      await updateProfile(user, {
        displayName: data.displayName,
      });
    

      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return user;

    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "As senhas precisam conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro!";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //Chama signOut do firebase para deslogar
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //Função para logar o usuário recebendo login(data)
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    console.log(success);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;
      if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "Dados inválidos";
      } else if (error.message.includes("auth/user-disabled")) {
        systemErrorMessage = "Conta temporariamente desativada";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente mais tarde!";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    success,
    logout,
    login
  };
};
