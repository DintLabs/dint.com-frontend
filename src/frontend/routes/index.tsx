// import { useSnackbar } from 'notistack5';
import AdminAuthGuard from 'frontend/guards/AdminAuthGuard';
import AuthGuard from 'frontend/guards/AuthGuard';
import GuestGuard from 'frontend/guards/GuestGuard';
import MainLayout from 'frontend/layouts/main';
import SecondaryMainNavBar from 'frontend/layouts/main/SecondaryMainNavBar';
import MarketPlaceLayout from 'frontend/layouts/marketPlace';
import MyEvents from 'frontend/pages/my-events';
import NewHome from 'frontend/pages/Lounge/Lounge';
import Events from 'frontend/pages/Events/Events';
import Home from 'frontend/pages/Home/Home';
import Login from 'frontend/pages/Login/Login';
import MarketPlace from 'frontend/pages/MarketPlace/MarketPlace';
import MarketPlaceCreate from 'frontend/pages/MarketPlace/MarketPlaceCreate/MarketPlaceCreate';
import MyPurchases from 'frontend/pages/MarketPlace/MyPurchases/MyPurchases';
import NotFound from 'frontend/pages/NotFound';
import CookieNotice from 'frontend/pages/Privacy/CookieNotice';
import PrivacyPolicy from 'frontend/pages/Privacy/PrivacyPolicy';
import TermsOfServices from 'frontend/pages/Privacy/TermsOfServices';
import Profile from 'frontend/pages/Profile/Profile';
import PublicEvents from 'frontend/pages/PublicEvents/PublicEvents';
import Register from 'frontend/pages/Register/Register';
import TicketCreate from 'frontend/pages/TicketCreate/TicketCreate';
import ThemeConfig from 'frontend/theme';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';
import CreatePage from 'frontend/pages/Pages/CreatePage';
import ViewPage from 'frontend/pages/Pages/ViewPage';

// ----------------------------------------------------------------------

const win = window as any;

export default function Router() {
  win.objNavigate = useNavigate();
  const location = useLocation();
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
          path: '/404',
          element: (
            // <AuthGuard>
            <NotFound />
            // </AuthGuard>
          )
        },
        {
          path: '/lounge',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/lounge/events',
          element: (
            <AuthGuard>
              <MyEvents />
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
          path: '/lounge/:page',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/lounge/:page/:username',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/lounge/messages/user/:uid',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/lounge/messages/newMessage',
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          )
        },
        {
          path: '/page/creation',
          element: (
            <AuthGuard>
              <CreatePage />
            </AuthGuard>
          )
        },
        {
          path: '/page/:page',
          element: <ViewPage />
        },
        {
          path: '/:username',
          element: (
            // <AuthGuard>
            <NewHome />
            // </AuthGuard>
          )
        },
        {
          path: '/*',
          element: (
            // <AuthGuard>
            <NotFound />
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
    }
  ]);
}
