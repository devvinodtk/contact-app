import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import LogoutPage from "./components/LogoutPage";
import { useAuth, UserAuthValue } from "./context/AuthProvider";
import Dashboard from "./components/Dashboard";
import AddressList from "./components/AddressList";
import MembershipCard from "./components/MembershipCard";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";

const LazyUserProfileForm = lazy(() => import("./components/UserProfileForm"));
const LazyDashboard = lazy(() => import("./components/Dashboard"));

function App() {
  const { userLoggedIn }: UserAuthValue = useAuth();
  return (
    <>
      {userLoggedIn ? (
        <div className="flex h-screen bg-white text-gray-100 overflow-hidden">
          <div className="fixed insert-0 z-10">
            <div className="absolute insert-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 opacity-80" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <Sidebar />
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<div><div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div></div>}>
                    <LazyDashboard />
                  </Suspense>
                }
              />
              <Route
                path="/users"
                element={
                  <Suspense fallback={<div><div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div></div>}>
                    <LazyUserProfileForm />
                  </Suspense>
                }
              />
              <Route
                path="/users/:memberid"
                element={
                  <Suspense fallback={<div><div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div></div>}>
                    <LazyUserProfileForm />
                  </Suspense>
                }
              />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/address" element={<AddressList />} />
              <Route path="/idcards" element={<MembershipCard />} />
            </Routes>
          </Provider>
        </div>
      ) : (
        <Provider store={store}>
          <Routes>
            {/* <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <LazyUserProfileForm />
                </Suspense>
              }
            /> */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Provider>
      )}
    </>
  );
}

export default App;
