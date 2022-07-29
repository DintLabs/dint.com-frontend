import { useSnackbar } from 'notistack5';
import { useNavigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

const win = window as any;

export default function Router() {
  win.objNavigate = useNavigate();
  win.enqSnackbar = useSnackbar().enqueueSnackbar;

  return useRoutes([
    // {
    //   path: 'auth',
    //   children: [
    //     {
    //       path: 'login',
    //       element: (
    //         <GuestGuard>
    //           <Login />
    //         </GuestGuard>
    //       )
    //     },
    //     {
    //       path: 'register/:userType',
    //       element: (
    //         <GuestGuard>
    //           <Register />
    //         </GuestGuard>
    //       )
    //     },
    //     { path: 'login-unprotected', element: <Login /> },
    //     { path: 'register-unprotected', element: <Register /> },
    //     { path: 'reset-password', element: <ResetPassword /> },
    //     { path: 'verify', element: <VerifyCode /> }
    //   ]
    // },

    {
      path: '/',
      element: <>{/* <MainLayout /> */}</>
      //   children: [{ path: '/', element: <LandingPage /> }]
    }
  ]);
}
