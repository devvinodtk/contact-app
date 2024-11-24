import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import UsersPage from "./components/UsersPage";
import OverviewPage from "./components/OverviewPage";
import LogoutPage from "./components/LogoutPage";

function App() {
  const { userLoggedIn }: UserAuthValue = useAuth();

  const AuthenticateUser = ({ children }: any) => {
    return userLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/** BG */}
        <div className="fixed insert-0 z-10">
          <div className="absolute insert-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <AuthenticateUser>
          <Sidebar />
        </AuthenticateUser>
        <Routes>
          <Route
            path="/overview"
            element={
              <AuthenticateUser>
                <OverviewPage />
              </AuthenticateUser>
            }
          />
          <Route
            path="/users"
            element={
              <AuthenticateUser>
                <UsersPage />
              </AuthenticateUser>
            }
          />
          <Route
            path="/logout"
            element={
              <AuthenticateUser>
                <LogoutPage />
              </AuthenticateUser>
            }
          />

          <Route path="/" element={!userLoggedIn && <LoginPage />} />
          <Route path="/login" element={!userLoggedIn && <LoginPage />} />
        </Routes>
      </div>
    </>
  );
}
import { useAuth, UserAuthValue } from "./context/AuthProvider";

export default App;
