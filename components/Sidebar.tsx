'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import React from 'react';
import NewChat from './NewChat';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
    <div className="hidden h-screen w-72 flex-col bg-base-300 p-4 md:flex">
      <NewChat />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
        <div className="flex flex-col items-center">
          <a href="/" aria-label="Home">
            <div className="online avatar">
              <div className="w-10 rounded-full ring ring-offset-2 ring-offset-base-100 transition-all hover:ring-accent">
                <Image
                  alt="avatar"
                  src={session.user?.image!}
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </a>
          <p
            onClick={() => signOut({ callbackUrl: '/' })}
            className="link-hover link text-sm transition-all"
          >
            Sign out
          </p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
