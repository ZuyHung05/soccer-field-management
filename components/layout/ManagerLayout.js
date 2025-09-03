import React from 'react';
import ManagerHeader from './ManagerHeader';

const ManagerLayout = ({ children }) => {
  return (
    <>
      <ManagerHeader />
      <main className="manager-main">{children}</main>
    </>
  );
};

export default ManagerLayout;
