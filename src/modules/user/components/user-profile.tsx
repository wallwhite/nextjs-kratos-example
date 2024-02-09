'use client';

import React, { FC } from 'react';
import { Identity } from '@ory/client';
import { useSession } from '@/modules/auth/context/auth.context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const UserProfile: FC = () => {
  const session = useSession();

  if (!session) return null;

  const { traits } = session.identity as Identity;

  const fullName = `${traits?.name?.first} ${traits?.name?.last}`;
  const email = traits?.email;
  const initials = fullName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="text-sm font-medium leading-none">{fullName}</h4>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
};
