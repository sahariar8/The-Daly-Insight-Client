import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes.jsx'
import ContextProvider from './pages/provider/ContextProvider.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ContextProvider>
          <QueryClientProvider client={queryClient}>
              <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
     </ContextProvider>
  </React.StrictMode>,
)
