import React from 'react';
import NewChat from './NewChat';

function Sidebar() {
  return (
    <div className="hidden h-screen w-60 flex-col overflow-y-scroll bg-base-300 p-4 md:flex">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>{/* model select */}</div>
          {/* map through the chat row */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
