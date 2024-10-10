import { Route, Routes } from "react-router-dom";

import Admin from "./pages/admin";
import SignIn from "./pages/sign-in/SignIn";
import Orders from "./pages/admin/orders/Orders";
import Main from "./pages/admin/main/Main";
import Services from "./pages/admin/services/Services";
import Users from "./pages/admin/users/Users";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/admin/profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin />}>
            <Route index path="company" element={<Main />} />
            <Route path="orders" element={<Orders />} />
            <Route path="services" element={<Services />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
