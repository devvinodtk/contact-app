import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import UsersPage from "./components/UsersPage";
import OverviewPage from "./components/OverviewPage";

function App() {
  return (
    <>
      <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
        {/** BG */}
        <div className="fixed insert-0 z-10">
          <div className="absolute insert-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        {<Sidebar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
