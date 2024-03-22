import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const profile = useSelector((state: any) => state.auth.authentication);
  // const isLoggedIn = localStorage.getItem('authentication');
  // const profile = JSON.parse(isLoggedIn as string);
  console.log('pub', profile)
  return profile ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
