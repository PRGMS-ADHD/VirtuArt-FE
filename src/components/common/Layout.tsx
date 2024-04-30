// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
//
// interface LayoutProps {
//   children: React.ReactNode;
// }
//
// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className="relative m-0 flex h-full max-w-[1920px] flex-col items-center justify-center p-0">
//       <Header />
//       {children}
//       <Footer />
//     </div>
//   );
// };
//
// export default Layout;
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;