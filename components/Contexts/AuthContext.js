// This is a component that will create a Context for the user "authentication".

// This is the import of the createContext and useState hooks from React.
import React, { createContext, useState } from 'react';

export const AuthContext = createContext(); // this is the creation of the AuthContext.

// This is a component that will provide the user information to the app.
export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    sub: '123456',
    name: 'Gustavo González',
    email: 'gustavogeronimogonzalez@hotmail.com',
    picture: 'https://i.pinimg.com/736x/70/85/54/7085548f3d0372a08aea0291ddcee895.jpg'
  });

  // This is the return of the component. It will provide the user information to the app.
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}