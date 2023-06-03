'use client';

import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  isActive: boolean;
};

function ChatRow({ id, isActive }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'desc')
      )
  );
  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`btn-ghost ${
          isActive && 'btn-active'
        } btn-block btn mt-2 normal-case`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 truncate text-left">
          {messages?.docs[0]?.data().text || `New chat`}
        </p>
        <TrashIcon onClick={removeChat} className="h-5 w-5 hover:text-error" />
      </div>
    </Link>
  );
}

export default ChatRow;
