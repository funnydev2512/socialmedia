import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
// check to show the component of app if user is logged or not
function Layout(){
  const user = null;
  const location = useLocation();
  
  return user?.token ? (
    // if user is logged in, show the component ( token means user is logged in)
    <Outlet/>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace/>
  )

}

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
        <Route  element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>

        </Route>

        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
