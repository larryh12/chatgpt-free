'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import {
  addDoc,
  collection,
  limitToLast,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  const model = 'text-davinci-003';

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );

    // Toast loading
    const notification = toast.loading('ChatGPT is thinking...');

    await fetch('@/pages/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast success
      toast.success('ChatGPT has responded!', {
        id: notification,
      });
    });
  };

  return (
    <div>
      <form onSubmit={sendMessage} className="flex w-full items-center gap-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Send a message"
          className="input-bordered input flex-1 focus:outline-none"
          disabled={!session}
        />
        <button
          type="submit"
          className="btn-accent btn text-base-100"
          disabled={!prompt || !session}
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
