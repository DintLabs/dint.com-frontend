// import { useSnackbar } from 'notistack5';
import GuestGuard from 'frontend/guards/GuestGuard';
import MainLayout from 'frontend/layouts/main';
import Home from 'frontend/pages/Home/Home';
import Login from 'frontend/pages/Login/Login';
import { useNavigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

const win = window as any;

export default function Router() {
  win.objNavigate = useNavigate();
  // win.enqSnackbar = useSnackbar().enqueueSnackbar;

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
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
      children: [{ path: '/', element: <Home /> }]
    }
  ]);
}
