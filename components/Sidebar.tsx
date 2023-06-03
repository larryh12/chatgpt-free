'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import React from 'react';
import NewChat from './NewChat';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <div className="hidden h-screen w-72 flex-col  bg-base-300 p-4 md:flex">
      <NewChat />
      <div className="flex-1 overflow-y-auto">
        <div>{/* model select */}</div>
        {/* map through the chat row */}
        {chats?.docs.map((chat) => (
          <ChatRow
            isActive={pathname?.includes(chat.id)!}
            key={chat.id}
            id={chat.id}
          />
        ))}
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
