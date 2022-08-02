// import { useSnackbar } from 'notistack5';
import AuthGuard from 'frontend/guards/AuthGuard';
import GuestGuard from 'frontend/guards/GuestGuard';
import MainLayout from 'frontend/layouts/main';
import Events from 'frontend/pages/Events/Events';
import Home from 'frontend/pages/Home/Home';
import Login from 'frontend/pages/Login/Login';
import Profile from 'frontend/pages/Profile/Profile';
import PublicEvents from 'frontend/pages/PublicEvents/PublicEvents';
import Register from 'frontend/pages/Register/Register';
import { useNavigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

const win = window as any;

export default function Router() {
  win.objNavigate = useNavigate();
  // win.enqSnackbar = useSnackbar().enqueueSnackbar;

  return useRoutes([
    {
      path: 'auth',
      element: <MainLayout />,
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'signup',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        }
        // { path: 'reset-password', element: <ResetPassword /> },
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },

    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/public/events', element: <PublicEvents /> },
        {
          path: '/events',
          element: (
            <AuthGuard>
              <Events />
            </AuthGuard>
          )
        },
        {
          path: '/profile',
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          )
        }
      ]
    }
  ]);
}
