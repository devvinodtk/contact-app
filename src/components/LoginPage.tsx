import { useEffect, useRef, useState } from "react";
import SettingSection from "./SettingSection";
import { User } from "lucide-react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth, UserAuthValue } from "../context/AuthProvider";
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { userLoggedIn }: UserAuthValue = useAuth();

  const userNameRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    userNameRef.current?.focus();
  }, []);

  const handleLoginClick = async () => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        const userCredentials: UserCredential =
          await doSignInWithEmailAndPassword(userName, password);
        if (userCredentials?.user?.email) {
          navigate("/overview");
        }
      }
    } catch (err) {
      setLoginError(true);
    }
  };

  return (
    <>
      {!userLoggedIn && (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
          <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
            <SettingSection icon={User} title={"Login"}>
              <div className="flex flex-col items-center mb-6">
                <div className="flex flex-col items-start justify-between py-3">
                  <label className="text-gray-300" htmlFor="username">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="username"
                    autoComplete="off"
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-between py-3">
                  <label className="text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <div className="mt-5 flex justify-between items-start">
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                </div>
                <div className="mt-5 flex justify-between items-start">
                  <div>
                    <a href="#" className="text-indigo-800 font-semibold">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                {loginError && (
                  <div className="mt-5 flex justify-between items-start">
                    <div className="text-red-800 font-semibold">
                      Login failed. Wrong email or password.
                    </div>
                  </div>
                )}
              </div>
            </SettingSection>
          </main>
        </div>
      )}
    </>
  );
}

export default LoginPage;
