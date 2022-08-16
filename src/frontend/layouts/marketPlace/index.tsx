// import { createStyles, makeStyles } from '@material-ui/styles';
import { checkConnectionForMarketPlace } from 'frontend/redux/slices/marketplace';
import { dispatch, RootState, useSelector } from 'frontend/redux/store';
import { isIPhone } from 'frontend/utils';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import MainFooter from '../main/MainFooter';
import MarketPlaceNavbar from './MarketPlaceNavbar';

export default function MarketPlaceLayout() {
  const { isLoading } = useSelector((rootState: RootState) => rootState.marketplace);

  useEffect(() => {
    dispatch(checkConnectionForMarketPlace());
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isIPhone() ? window.innerHeight : '100vh'
      }}
    >
      <div>
        <MarketPlaceNavbar />
      </div>
      <div id="page-body">
        <div>
          {isLoading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh'
              }}
            >
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Outlet />
          )}
          <MainFooter />
        </div>
      </div>
    </div>
  );
}
