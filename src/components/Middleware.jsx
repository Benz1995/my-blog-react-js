import axios from 'axios';
export default async function Middleware() {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:1337/api/users/me', {
           headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${token}`
           }
        });
        if(response.status != 200){
            throw new Error('Login Fall')
        }
        return true;
    } catch (error) {   
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        localStorage.removeItem("status");
        return false;
    }
}