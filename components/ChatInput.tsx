import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React from 'react';

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  return (
    <div>
      <form className="flex w-full items-center gap-4">
        <input
          type="text"
          placeholder="Send a message"
          className="input flex-1 bg-base-300"
        />
        <button
          type="submit"
          className="btn-circle btn bg-base-300 text-opacity-50 hover:text-accent"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
