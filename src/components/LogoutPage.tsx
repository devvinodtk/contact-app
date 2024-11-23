import { Link, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import { useEffect } from "react";
import { doSignOut } from "../firebase/auth";

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      doSignOut().then(() => {
        navigate("/login");
      });
    } catch (err: any) {
      console.log(err);
    }
  }, []);
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Logout" />
      <p className="p-10">
        Logged out successfully. Please click
        <Link className="text-indigo-600" to="/login">
          here
        </Link>
        to Login again.
      </p>
    </div>
  );
}

export default LogoutPage;
