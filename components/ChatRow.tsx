import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSession } from 'next-auth/react';

type Props = {
  id: string;
  isActive: boolean;
};

function ChatRow({ id, isActive }: Props) {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      collection(db, 'users', session.user?.email!, 'chats', id, 'messages')
  );

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`btn-ghost ${
          isActive && 'btn-active'
        } btn-block btn mt-2 normal-case`}
      >
        <ChatBubbleLeftIcon className="h-5 w-5" />
        <p className="flex-1 truncate">
          {messages?.docs[0]?.data().text || `New chat - ${id}`}
        </p>
        <TrashIcon className="h-5 w-5 hover:text-error" />
      </div>
    </Link>
  );
}

export default ChatRow;
