import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const profile = useSelector((state: any) => state.auth.authentication);
  // const isLoggedIn = localStorage.getItem('authentication');
  // const profile = JSON.parse(isLoggedIn as string);
  console.log('priv', profile)
  return profile ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
