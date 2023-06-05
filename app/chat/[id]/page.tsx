import Chat from '@/components/Chat';
import ChatInput from '@/components/ChatInput';
import MenuBtn from '@/components/MenuBtn';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

function ChatPage({ params: { id } }: Props) {
  return (
    <div className="mx-auto flex h-screen w-full max-w-screen-lg flex-col p-8">
      <MenuBtn />
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
