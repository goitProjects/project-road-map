import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { LayoutWrapper } from './Layout.styled';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <main>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </main>
    </LayoutWrapper>
  );
};

export default Layout;
