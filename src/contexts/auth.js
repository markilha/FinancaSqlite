import React, { useState, createContext } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [atual, setAtual] = useState(true);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  React.useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemaUser");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, []);
  //Fazendo login do usuario
  async function signIn(email, senha) {
    try {
      setLoadingAuth(true);
      const response = await api.get(`/usuario/${email}`); 
      if (senha === response.data.password) {
        setUser(response.data);
        storageUser(response.data);
        setLoadingAuth(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function signOut(){   
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{
       atual, 
       setAtual,
        signed: !!user, 
        signIn 
        }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
