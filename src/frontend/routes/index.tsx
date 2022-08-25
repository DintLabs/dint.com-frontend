// import { useSnackbar } from 'notistack5';
import AdminAuthGuard from 'frontend/guards/AdminAuthGuard';
import AuthGuard from 'frontend/guards/AuthGuard';
import GuestGuard from 'frontend/guards/GuestGuard';
import MainLayout from 'frontend/layouts/main';
import SecondaryMainNavBar from 'frontend/layouts/main/SecondaryMainNavBar';
import MarketPlaceLayout from 'frontend/layouts/marketPlace';
import Admin from 'frontend/pages/Admin/Admin';
import Events from 'frontend/pages/Events/Events';
import Home from 'frontend/pages/Home/Home';
import Login from 'frontend/pages/Login/Login';
import MarketPlace from 'frontend/pages/MarketPlace/MarketPlace';
import MarketPlaceCreate from 'frontend/pages/MarketPlace/MarketPlaceCreate/MarketPlaceCreate';
import MyPurchases from 'frontend/pages/MarketPlace/MyPurchases/MyPurchases';
import NewHome from 'frontend/pages/Dashboard/Dashboard';
import Profile from 'frontend/pages/Profile/Profile';
import PublicEvents from 'frontend/pages/PublicEvents/PublicEvents';
import Register from 'frontend/pages/Register/Register';
import TicketCreate from 'frontend/pages/TicketCreate/TicketCreate';
import ThemeConfig from 'frontend/theme';
import { useNavigate, useRoutes } from 'react-router-dom';
import PrivacyPolicy from 'frontend/pages/Privacy/PrivacyPolicy';
import CookieNotice from 'frontend/pages/Privacy/CookieNotice';
import TermsOfServices from 'frontend/pages/Privacy/TermsOfServices';

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
          path: '/ticketcreate',
          element: (
            <AuthGuard>
              <TicketCreate />
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
    },
    {
      path: '/',
      element: (
        <ThemeConfig>
          <SecondaryMainNavBar />
        </ThemeConfig>
      ),
      children: [
        {
          path: '/dashboard',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/privacy',
          element: <PrivacyPolicy />
        },
        {
          path: '/cookies',
          element: <CookieNotice />
        },
        {
          path: '/terms',
          element: <TermsOfServices />
        },
        {
          path: '/dashboard/:page',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/dashboard/:page/:username',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/:username',
          element: (
            // <AuthGuard>
            <NewHome />
            // </AuthGuard>
          )
        }
      ]
    },
    {
      path: '/marketplace',
      element: <MarketPlaceLayout />,
      children: [
        { path: '/marketplace/', element: <MarketPlace /> },
        { path: '/marketplace/create', element: <MarketPlaceCreate /> },
        { path: '/marketplace/my-purchases', element: <MyPurchases /> }
      ]
    },
    {
      path: '/admin',
      element: (
        <AdminAuthGuard>
          <Admin />
        </AdminAuthGuard>
      )
    }
  ]);
}
