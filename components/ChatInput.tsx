'use client';

import { db } from '@/firebase';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useSWR from 'swr';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { data: model } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo',
  });

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
        avatar: session?.user?.image!,
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
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
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
      <label className={`${isLoading ? 'chat-bubble' : 'hidden'} bg-base-200`}>
        <p className="label-text-alt mt-1.5 flex gap-2">
          <span>ChatGPT is typing</span>
          <span className="loading loading-dots loading-xs" />
        </p>
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
