import React from 'react';

import PublicHeader from '../components/PublicHeader';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <PublicHeader />
      <NavBar />
      <div className="App">
        {children}
      </div>
      <Footer />
    </>
  );
}
