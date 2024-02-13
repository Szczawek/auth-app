import Profile from "./Profile";
import { Outlet, Route, Routes } from "react-router-dom";
import useSearchUser from "../profile/useSearchUser";
import EditProfile from "../profile/EditProfile";
import ComShelf from "../comments/ComShelf";
export default function User() {
  const accountUser = useSearchUser();

  if (!accountUser) return <p className="user_not_found">nothing is here...</p>;

  return (
    <div className="profile_table">
      <Profile session={true} user={accountUser} />
      <Routes>
        <Route path="/" element={ < ComShelf type={accountUser["id"]} />} />
        <Route path="edit-profile" element={<EditProfile />}></Route>
      </Routes>
      <Outlet></Outlet>
    </div>
  );
}
