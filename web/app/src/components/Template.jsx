import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Template(props) {
  const [sidebarMemberName, setSidebarMemberName] = useState('');

  const updateSidebarMemberName = (newName) => {
    setSidebarMemberName(newName);
  };

  return (
    <div>
      <div className="wrapper">
        <Navbar updateSidebarMemberName={updateSidebarMemberName} />
        <Sidebar memberNames={sidebarMemberName} />

        <div className="content-wrapper pt-3">
          <section className='content'>
            {props.children}
          </section>
        </div>

      </div>
    </div>
  );
}

export default Template;
