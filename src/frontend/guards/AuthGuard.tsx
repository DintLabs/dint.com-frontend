// import Login from 'frontend/pages/Login/Login';
import { ReactNode, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log(pathname);

  // if (!isAuthenticated && isInitialized) {
  //   Swal.fire({
  //     title: 'You are not logged in',
  //     text: 'Click login button to Login',
  //     icon: 'error',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#CBC9C9',
  //     confirmButtonText: 'Login',
  //     cancelButtonText: 'Home'
  //   }).then((result: any) => {
  //     if (result.isConfirmed) {
  //       navigate(`/auth/login`, {
  //         state: {
  //           redirectUrl: pathname
  //         }
  //       });
  //       // return <Login />;
  //     } else {
  //       navigate('/', { replace: true });
  //     }
  //   });

  //   // if (pathname !== requestedLocation) {
  //   //   setRequestedLocation(pathname);
  //   // }
  // }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    navigate(`/auth/login`, {
      state: {
        redirectUrl: pathname
      }
    });

    return null;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
