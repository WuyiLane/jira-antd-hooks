import React, { Fragment } from 'react';
import './App.css';
// import 'antd/dist/antd.min.css';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from 'unauthenticated-app';
import { useAuth } from './context/auth-context';
import { ErrorBoundary } from 'component/error-boundary';
import { FullPageErrorFallback } from './component/lib';

function App() {
  const { user } = useAuth();
  console.log(user, 'user');
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
