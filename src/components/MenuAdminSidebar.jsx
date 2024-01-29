import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
const handleLogOut = () => {
  localStorage.removeItem('status');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = "/login";
}  
const MenuAdminSidebar = () => {
    const users = JSON.parse(localStorage.getItem('user'));
    console.log(users)
    return (
      <Card id="admin-bar" className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
        <a href="/blogs">
          <Typography variant="h5" color="blue-gray">
            หน้าแรก
          </Typography>
        </a>
            <Typography variant="h5" color="blue-gray">
             ผู้ใช้งาน {users.username}
            </Typography>
        </div>
        <List>
        <a href="/dashboard">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            บล็อกของฉัน
          </ListItem>
          </a>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            ข้อมูลส่วนตัว
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            ตั้งค่า
          </ListItem>
          <ListItem onClick={handleLogOut}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            ออกจากระบบ
          </ListItem>
        </List>
      </Card>
    );
  }

const LayoutAdmin = ({ children }) => {
    return(
        <>
        <div className="flex flex-row justify-center">
            <MenuAdminSidebar/>
            <div className="basis-10/12 p-10">
                { children }
            </div>
        </div>
        </>
    )
}
export default LayoutAdmin