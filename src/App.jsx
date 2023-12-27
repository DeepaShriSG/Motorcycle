import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoute';
import EngineerRoutes from './EngineerRoutes';
import UserRoutes from './UserRoute';
import Login from './user/Login'

function App() {
  return (
    <BrowserRouter> 
    <Routes>
      
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/engineer/*" element={<EngineerRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path='/' element={<Login/>}/>
     
    </Routes>
    </BrowserRouter>
  )
}

export default App