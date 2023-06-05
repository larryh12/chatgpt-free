import { Bars3Icon } from '@heroicons/react/24/solid';
import React from 'react';

function MenuBtn() {
  return (
    <label
      htmlFor="my-drawer"
      className="drawer-button btn-ghost btn w-fit p-0 md:hidden"
    >
      <Bars3Icon className="h-10 w-10 text-base-content" />
    </label>
  );
}

export default MenuBtn;
