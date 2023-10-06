import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ConfigProvider} from 'antd'
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#33BBC5',
          borderRadius: 8,

          // Alias Token
          colorBgContainer: '#FFFFFF',
        },
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
