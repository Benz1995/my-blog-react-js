import React from 'react'
import LayoutAdmin from '../components/MenuAdminSidebar';
import AllBlogs from '../Api/AllBlog'
export default function Dashboard() {
  let statuLogin = localStorage.getItem('status');
  if(statuLogin == null){
    window.location.href = "/";
  }
  let levelUser = "Admin";
  return (
    <LayoutAdmin>
      <AllBlogs levelUser={levelUser} pageSize={6}/>
    </LayoutAdmin>
  )
}



 
