import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import UsersPage from "./components/UsersPage";
import OverviewPage from "./components/OverviewPage";
import LogoutPage from "./components/LogoutPage";

function App() {
  const { userLoggedIn }: UserAuthValue = useAuth();

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/** BG */}
        <div className="fixed insert-0 z-10">
          <div className="absolute insert-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        {userLoggedIn && <Sidebar />}
        <Routes>
          <Route path="/" element={!userLoggedIn && <LoginPage />} />
          <Route path="/login" element={!userLoggedIn && <LoginPage />} />
          <Route path="/overview" element={userLoggedIn && <OverviewPage />} />
          <Route path="/users" element={userLoggedIn && <UsersPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </>
  );
}
import { useAuth, UserAuthValue } from "./context/AuthProvider";

export default App;
