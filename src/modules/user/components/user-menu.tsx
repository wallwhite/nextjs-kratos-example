'use client';

import React, { FC } from 'react';
import { useLogOut } from '@/modules/auth/context/auth.context';
import { Button } from '@/components/ui/button';

export const UserMenu: FC = () => {
  const logout = useLogOut();

  return (
    <div className="flex flex-row gap-3">
      <Button className="w-full" variant="outline">
        Settings
      </Button>
      <Button className="w-full" variant="outline">
        Verify
      </Button>
      <Button className="w-full" variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
