import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      <div className="flex flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
