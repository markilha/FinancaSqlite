import React from "react";
import api from "../services/api";


export const AuthContext = React.createContext({});

function AuthProvider({ children }) {
  const [atual, setAtual] = React.useState(true);
  const [user, setUser] = React.useState(null);
  const [dados, setDados] = React.useState([]);
  const [loadingAuth, setLoadingAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
 


  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  React.useEffect(() => {
    setLoading(true);  
   function loadStorage() {    
      const storage = localStorage.getItem("SistemaUser");
      if (storage) {
        setDados(JSON.parse(storage)) 
        setUser(dados)
        setLoading(false);  
      }
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
       user,
       setAtual,
       signed : !!user, 
        signIn,
        signOut
        }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
