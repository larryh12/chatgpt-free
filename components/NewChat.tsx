import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

function NewChat() {
  return (
    <div className="btn-outline btn-block btn justify-start normal-case">
      <PlusIcon className="h-4 w-4" />
      New chat
    </div>
  );
}

export default NewChat;
