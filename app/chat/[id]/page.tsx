import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col px-8 py-16">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
