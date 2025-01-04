import { useMemo, useState } from "react";
import {useProfile} from "./useProfile"
export const useUserSearch = () => {
    const {data} = useProfile()
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = useMemo(() => {
        return data.filter(user =>
          user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }, [data, searchQuery]);  


      return {filteredUsers,setSearchQuery,searchQuery}
}

