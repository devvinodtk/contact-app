import { useEffect, useRef, useState } from "react";
import SettingSection from "./SettingSection";
import { User, LayoutDashboard } from "lucide-react";
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
        <div className="flex-1 overflow-auto relative z-10 bg-white">
          {/* <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8 ">
            <SettingSection icon={User} title={"Login"}>
              <div className="flex flex-col items-center mb-6 ">
                <div className="flex flex-col items-start justify-between py-3">
                  <label className="text-black" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="email"
                    id="username"
                    autoComplete="off"
                    className="text-black placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-between py-3">
                  <label className="text-black" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="text-black placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </main> */}
          <section className="bg-zinc-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <img
                className="w-16 h-16 mr-2 mb-3"
                src="src/assets/Logo.jpeg"
                alt="Kalakairali"
              />
              <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Kalakairali Member Management System
              </div>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
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
                    <button
                      onClick={handleLoginClick}
                      type="button"
                      className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Sign in
                    </button>
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
