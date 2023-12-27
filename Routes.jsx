import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import EngineerRoutes from './EngineerRoutes';
import UserRoutes from './UserRoutes';

function Routes() {
  return (
    <BrowserRouter> 
    <Routes>
      
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/engineer/*" element={<EngineerRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
     
    </Routes>
    </BrowserRouter>
  )
}

export default Routes