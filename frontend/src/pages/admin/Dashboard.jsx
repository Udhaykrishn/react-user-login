import { useProfile } from "@/components/admins/hooks";
import UserList from "@/components/admins/user-tables";
const Dashboard = () => {

  const { data, setUserList } = useProfile()

  return (
    <div className="h-screen">
      <h1 className="text-center text-xl font-semibold mb-4">User Table</h1>
      <UserList data={data} setUserList={setUserList}  />
    </div>
  );
}

export default Dashboard
