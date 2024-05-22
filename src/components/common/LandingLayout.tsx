import React from 'react';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col items-stretch justify-between">
      <div className="flex w-full flex-1 justify-center">{children}</div>
    </div>
  );
};

export default LandingLayout;
