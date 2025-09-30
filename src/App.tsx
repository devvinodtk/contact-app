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
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route path="/" element={<LazyDashboard />} />
          <Route path="/dashboard" element={<LazyDashboard />} />
          <Route path="/users" element={<LazyUserProfileForm />} />
          <Route path="/users/:memberid" element={<LazyUserProfileForm />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/address" element={<AddressList />} />
          <Route path="/idcards" element={<MembershipCard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </div>
  ) : (
    <Provider store={store}>
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route path="/users/:memberid" element={<LazyUserProfileForm />} />
          <Route path="/" element={<LazyUserProfileForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>
    </Provider>
  );
};

export default App;
