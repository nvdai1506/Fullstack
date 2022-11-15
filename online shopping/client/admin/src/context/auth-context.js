import React, { useState, useCallback } from 'react';
let logoutTimer;

const AuthContext = React.createContext({
  accessToken: '',
  refreshToken: '',
  role: 0,
  isLoggedIn: false,
  login: (data) => { },
  logout: () => { },
});


export const AuthContextProvider = (props) => {


  const [accessToken, setAccessToken] = useState(localStorage.getItem('x-access-token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('x-refreshToken'));
  const [role, setRole] = useState(0);


  const userIsLoggedIn = !!accessToken;

  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refreshToken');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (data) => {
    // console.log(data);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setRole(data.role);

    // console.log(data.accessToken);
    localStorage.setItem('x-access-token', data.accessToken);
    localStorage.setItem('x-refreshToken', data.refreshToken);

  };

  const contextValue = {
    accessToken,
    refreshToken,
    role:role,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};


export default AuthContext;