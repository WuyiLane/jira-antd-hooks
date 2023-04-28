import React from 'react';
import './App.css';
import 'antd/dist/antd.min.css';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { useAuth } from './context/auth-context';

const App = () => {
  const { user } = useAuth();
  // console.log(user,"user")
  return <div>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
};

export default App;
