import React, { FC } from 'react';
import Link from 'next/link';
import { useLogOut } from '../context/auth.context';
import { Button } from '@/components/ui/button';

export const AuthMenuPrivate: FC = () => {
  const logOut = useLogOut();

  return (
    <div className="flex gap-3">
      <Button size="sm" variant="outline" asChild>
        <Link href="/private">Private space</Link>
      </Button>
      <Button size="sm" variant="secondary" onClick={logOut}>
        Log out
      </Button>
    </div>
  );
};
