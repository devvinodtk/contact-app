import { useEffect, useRef, useState } from "react";
import SettingSection from "./SettingSection";
import { User, LayoutDashboard } from "lucide-react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth, UserAuthValue } from "../context/AuthProvider";
import { UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function LoginPage() {
  const { userLoggedIn }: UserAuthValue = useAuth();

  const userNameRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userNameRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      console.log(`Pressed key is ${e.key}`);
      handleLoginClick();
    }
  };
  const handleLoginClick = async () => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
        setLoading(true);
        const userCredentials: UserCredential =
          await doSignInWithEmailAndPassword(userName, password);
        if (userCredentials?.user?.email) {
          navigate("/overview");
          setIsSigningIn(false);
        }
      }
    } catch (err) {
      setLoading(false);
      setLoginError(true);
      setIsSigningIn(false);
    }
  };

  return (
    <>
      {!userLoggedIn && (
        <div className="flex-1 overflow-auto relative z-10 bg-white">
          <section className="bg-zinc-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <img
                className="w-16 h-16 mr-2 mb-3"
                src="src/assets/Logo.jpeg"
                alt="Kalakairali"
              />
              <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                Kalakairali Member Management System
              </div>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onKeyDown={handleKeyDown}
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="email"
                        name="username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="flex items-right w-full justify-between">
                      <a
                        href="#"
                        className="text-sm font-medium text-gray-600 hover:underline dark:text-gray-500"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      onClick={handleLoginClick}
                      loading={loading}
                      color="blue"
                      className="w-full cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </Button>
                    {loginError && (
                      <div className="mt-5 flex justify-between items-start w-full">
                        <div className="text-red-600 font-semibold text-center w-full">
                          Login failed. Wrong email or password.
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default LoginPage;
