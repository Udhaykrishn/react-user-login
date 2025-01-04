import UserList from "@/components/admins/user-tables";
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data,setData] = useState([]);
  const navigate = useNavigate();


  const fetchData = async ()=>{
     try {
      const response = await axios.get("admin/dashboard/users")
      console.log(response.data)
      setData(response.data.users)
     } catch (error) {
      if(error.response){
        if(error.response?.data?.message === "TokenExpire"){
          navigate("/admin/login")
        }
      }
      console.log(error.message)
     }
  }

  useEffect(()=>{
      fetchData()
  },[])


  return (
    <div className="h-screen">
      <h1 className="text-center text-xl font-semibold mb-4">User Table</h1>
      <UserList data={data} setUserList={setData} />
    </div>
  );
}

export default Dashboard
