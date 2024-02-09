'use client';

import React, { FC } from 'react';
import { useSession } from '../context/auth.context';
import { JsonTree } from '@/components/json-tree';
import { Card } from '@/components/ui/card';

export const CurrentSession: FC = () => {
  const session = useSession();

  return <Card className="border-dashed p-4">{session ? <JsonTree data={session} /> : ' No session'}</Card>;
};
