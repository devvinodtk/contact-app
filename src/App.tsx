import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import LogoutPage from './components/LogoutPage';
import { useAuth, UserAuthValue } from './context/AuthProvider';
import AddressList from './components/AddressList';
import MembershipCard from './components/MembershipCard';
import store, { AppDispatch } from './store/store';
import './App.css';
import { fetchMembers, resetMember } from './store/MembersSlice';
import LoaderComponent from './components/common/Loader';
import PrivacyPolicy from './components/PrivacyPolicy';

const LazyUserProfileForm = lazy(() => import('./components/UserProfileForm'));
const LazyDashboard = lazy(() => import('./components/Dashboard'));

const App = () => {
  const { userLoggedIn }: UserAuthValue = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(fetchMembers());
    } else {
      dispatch(resetMember());
    }
  }, [userLoggedIn, dispatch]);

  return userLoggedIn === true ? (
    <div className="flex h-screen bg-white text-gray-100 overflow-hidden">
      <div className="fixed insert-0 z-10">
        <div className="absolute insert-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-90 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<LoaderComponent />}>
            <LazyDashboard />
          </Suspense>} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LazyDashboard />
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LazyUserProfileForm />
            </Suspense>
          }
        />
        <Route
          path="/users/:memberid"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LazyUserProfileForm />
            </Suspense>
          }
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/address" element={<AddressList />} />
        <Route path="/idcards" element={<MembershipCard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  ) : (
    <Provider store={store}>
      <Routes>
        <Route
          path="/users/:memberid"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LazyUserProfileForm />
            </Suspense>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<LoaderComponent />}>
              <LazyUserProfileForm />
            </Suspense>
          }
        />
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Provider>
  );
};

export default App;
