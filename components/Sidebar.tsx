'use client';

import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import React, { useEffect } from 'react';
import NewChat from './NewChat';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { modelData, themeData } from '@/utils/optionData';
import { themeChange } from 'theme-change';

function Sidebar() {
  useEffect(() => {
    themeChange(false);
  }, []);

  const { data: session } = useSession();
  const pathname = usePathname();
  const themes = themeData;
  const models = modelData;
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <div className="hidden h-screen w-72 flex-col space-y-3 bg-base-300 p-4 md:flex">
      <NewChat />

      <div className="form-control">
        <label className="label">
          <span className="label-text">Themes</span>
        </label>
        <select
          data-choose-theme
          className="select-bordered select w-full bg-base-300"
        >
          <option value="">System default</option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">ChatGPT model</span>
        </label>
        <select className="select-bordered select w-full bg-base-300">
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="mx-auto flex items-center gap-4 py-8 text-sm">
          <span>Loading chats</span>
          <span className="loading loading-bars loading-sm"></span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
