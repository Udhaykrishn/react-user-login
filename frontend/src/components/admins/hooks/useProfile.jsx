import axios from "axios";
import {toast} from "@/hooks/use-toast"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const useProfile = () => {
    const [data,setUserList] = useState([]);
  const navigate = useNavigate();


  const fetchData = async ()=>{
     try {
      const response = await axios.get("admin/dashboard/users")
      setUserList(response.data.users)
     } catch (error) {
      console.log(error.response)
      if(error.response){
          navigate("/admin/login")
      }
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to edit user",
        variant: "destructive",
      });
     }
  }

  useEffect(()=>{
      fetchData()
  },[])
 
  return {data,setUserList}
}
