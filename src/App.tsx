import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import OverviewPage from "./components/OverviewPage";
import LogoutPage from "./components/LogoutPage";
import { useAuth, UserAuthValue } from "./context/AuthProvider";
import UserProfileForm from "./components/UserProfileForm";
import { Provider } from "react-redux";
import store from "./store/store";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import AddressList from "./components/AddressList";
import MembershipCard from "./components/MembershipCard";

function App() {
  const { userLoggedIn }: UserAuthValue = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(userLoggedIn);

  useEffect(() => {
    setIsAuthenticated(userLoggedIn);
  }, [userLoggedIn]);

  const AuthenticateUser = ({ children }: any) => {
    return userLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {" "}
      {isAuthenticated ? (
        <Provider store={store}>
          <div className="flex h-screen bg-white text-gray-100 overflow-hidden">
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
                path="/"
                element={
                  <AuthenticateUser>
                    <OverviewPage />
                  </AuthenticateUser>
                }
              />
              <Route
                path="/overview"
                element={
                  <AuthenticateUser>
                    <OverviewPage />
                  </AuthenticateUser>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AuthenticateUser>
                    <Dashboard />
                  </AuthenticateUser>
                }
              />
              <Route
                path="/users"
                element={
                  <AuthenticateUser>
                    <UserProfileForm />
                  </AuthenticateUser>
                }
              />
              <Route
                path="/address"
                element={
                  <AuthenticateUser>
                    <AddressList />
                  </AuthenticateUser>
                }
              />
              <Route
                path="/idcards"
                element={
                  <AuthenticateUser>
                    <MembershipCard />
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
            </Routes>
          </div>
        </Provider>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
