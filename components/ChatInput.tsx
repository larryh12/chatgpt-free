'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const model = 'gpt-3.5-turbo';

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt('');

    const userMessage: Message = {
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
      userMessage
    );

    setIsLoading(true);

    const res = await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    });

    const data = await res.json();

    const gptMessage: Message = {
      text: data.answer || 'ChatGPT was unable to find an answer for that!',
      createdAt: serverTimestamp(),
      user: {
        _id: 'ChatGPT',
        name: 'ChatGPT',
        avatar: 'https://simpleicons.org/icons/openai.svg',
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
      gptMessage
    );

    setIsLoading(false);
  };

  return (
    <div className="space-y-2">
      <label
        className={`${
          isLoading ? 'inline-flex' : 'hidden'
        } gap-2 overflow-hidden rounded-full bg-base-200 p-2`}
      >
        <span className="label-text-alt">ChatGPT is thinking</span>
        <span className="loading loading-dots loading-xs"></span>
      </label>
      <form onSubmit={sendMessage} className="flex w-full items-center gap-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Send a message"
          className="input-bordered input flex-1 focus:outline-none"
          disabled={!session || isLoading}
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
