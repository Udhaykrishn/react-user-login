import { useState } from "react";
import { useUserSearch } from "./useUserSearch";


export const usePagination = () => {
    const {filteredUsers} = useUserSearch()

     const [currentPage, setCurrentPage] = useState(1);
    
    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));

    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    if (currentPage !== validCurrentPage) {
      setCurrentPage(validCurrentPage);
    }
  
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  return {paginatedUsers,ITEMS_PER_PAGE,totalPages,setCurrentPage,currentPage}
}