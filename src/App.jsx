import { useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import HeaderPage from './components/Header'
import FooterWeb from './components/FooterWeb'

//Page
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import BlogPage from './pages/blog'
import Error from './pages/Error'
import Dashboard from './AdminPage/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [loggedIn,setLoggedIn] =useState(null)
  const [hiddenHeaderPage,sethiddenHeaderPage] = useState(true)
  
  const handleLogIn = () => {
    let statuLogin = localStorage.getItem('status');
    setLoggedIn(statuLogin)
  }
  const handleLogOut = () => {
    localStorage.removeItem('status');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setLoggedIn(false)
  }
  const roleHiddenHeader = () => {
    let listPage =  [ "login",
                      "signup",
                      "dashboard"
                    ]
    let pageName = location.pathname.replace("/", "");
    console.log(listPage.includes(pageName))
    if(listPage.includes(pageName)){
      sethiddenHeaderPage(false)
    }else{
      sethiddenHeaderPage(true)
    }
  }
  useEffect(() => {
    handleLogIn();
    roleHiddenHeader();
    console.log(hiddenHeaderPage)
  },[]);

  return (
    <>
      <BrowserRouter forceRefresh >
        { (hiddenHeaderPage) ? <HeaderPage logout={handleLogOut}/> : ""}
        <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path="/blogs/:id" element={<BlogPage/>}/> 
          <Route path='/login' element={ <Login/>}/>
          <Route path='/register' element={ <Register/>}/>
          <Route path='/dashboard' element={ <Dashboard/>} />
          <Route path='*' element={<Error/>} />
        </Routes>
        {(hiddenHeaderPage) ? <FooterWeb/> : ""}
      </BrowserRouter>
    </>
  )
}

export default App
