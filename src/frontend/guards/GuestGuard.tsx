import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  // const { isAuthenticated } = useAuth();
  const userData = localStorage.getItem('userData');

  if (userData) {
    return <Navigate to="/lounge" />;
  }

  return <>{children}</>;
}
