import { useState, useEffect, createContext} from "react";
import api from "../services/api";
import useStorage from '../util/useStorage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [token,setToken] = useStorage('token');
 
  const [atual, setAtual] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('')
  const [user, setUser] = useState([]); 


  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  useEffect(() => {   
    loadStorage(); 
  }, []);


  const loadStorage = () => {
    const storage = localStorage.getItem("SistemaUser");
    return   setUser(JSON.parse(storage)); 
  }

  //Fazendo login do usuario
  async function signIn(email, senha) {
    try {
      setLoadingAuth(true);
      const response = await api.get(`/usuario/${email}`);

      if (senha === response.data.senha) {
        storageUser(response.data);        
        setLoadingAuth(false);
        setMensagem('Logado com sucesso!!!')

      } else {
        setMensagem('USUÁRIO ou SENHA não correspondem!!!!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function signOut() {
    localStorage.removeItem('SistemaUser');
   window.location.reload();
  
  }

  return (
    <AuthContext.Provider value={{
      atual,
      user,
      signed: !!user,
      setAtual,
      signIn,
      signOut,
      mensagem,
      token,
      setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
