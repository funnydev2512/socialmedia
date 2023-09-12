import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useSelector } from "react-redux";
// check to show the component of app if user is logged or not
function Layout(){
  //useSelector is a hook to get data from redux store
  const user = useSelector((state) => state.user);
  // console.log(user);
  const location = useLocation();
  
  return user?.token ? (
    // if user is logged in, show the component ( token means user is logged in)
    <Outlet/>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace/>
  )

}

function App() {
  const {theme} = useSelector((state) => state.theme);
  console.log(theme);
  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
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
