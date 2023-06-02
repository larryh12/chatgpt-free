'use client';

import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import NewChat from './NewChat';

function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="hidden h-screen w-60 flex-col overflow-y-scroll bg-base-300 p-4 md:flex">
      <div className="flex-1">
        <div>
          <NewChat />
          <div>{/* model select */}</div>
          {/* map through the chat row */}
        </div>
      </div>

      {session && (
        <div onClick={() => signOut()} className="mx-auto cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user?.image!}
            alt="User profile picture"
            className="m-auto h-8 w-8 rounded-full hover:opacity-50"
          />
          <p className="link m-auto text-sm">Sign out</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
