import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const AuthMenuPublic: FC = () => (
  <div className="flex gap-3">
    <Button size="sm" variant="default" asChild>
      <Link href="/login">Login</Link>
    </Button>
    <Button size="sm" variant="outline" asChild>
      <Link href="/registration">Register</Link>
    </Button>
  </div>
);
