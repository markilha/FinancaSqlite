import React, { useState, createContext } from "react";


export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [atual, setAtual] = useState(true);

  return (
    <AuthContext.Provider value={{ atual,setAtual }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
