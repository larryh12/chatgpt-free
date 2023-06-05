'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import Image from 'next/image';

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  return (
    <div className="flex-1 space-y-4 overflow-y-auto md:pr-4">
      {messages?.docs.map((message) => (
        <div
          key={message.id}
          className={`chat ${
            message.data().user._id === 'ChatGPT' ? 'chat-start' : 'chat-end'
          }`}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <Image
                alt="avatar"
                src={message.data().user.avatar}
                width={40}
                height={40}
              />
            </div>
          </div>
          <div
            className={`chat-bubble ${
              message.data().user._id === 'ChatGPT'
                ? 'bg-base-200 text-base-content'
                : 'chat-bubble-accent'
            }`}
          >
            {message.data().text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
