import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ConfigProvider} from 'antd'
import { AuthProvider } from './auth/AuthContext';
import { OrganizerProvider } from './store/OrganizerContext';
import { CampaignProvider } from './store/CampaignContext';

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
        <OrganizerProvider>
          <CampaignProvider>
            <App />
          </CampaignProvider>
        </OrganizerProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
