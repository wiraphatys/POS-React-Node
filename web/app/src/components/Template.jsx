import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Template() {
  const [sidebarMemberName, setSidebarMemberName] = useState('');

  const updateSidebarMemberName = (newName) => {
    setSidebarMemberName(newName);
  };

  return (
    <div>
      <div className="wrapper">
        <Navbar updateSidebarMemberName={updateSidebarMemberName} />
        <Sidebar memberNames={sidebarMemberName} />
      </div>
    </div>
  );
}

export default Template;
