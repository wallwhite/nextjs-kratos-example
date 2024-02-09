'use client';

import React, { FC } from 'react';
import { useSession } from '../context/auth.context';
import { AuthMenuPrivate } from './auth-menu-private';
import { AuthMenuPublic } from './auth-menu-public';

export const AuthMenu: FC = () => {
  const session = useSession();

  return session ? <AuthMenuPrivate /> : <AuthMenuPublic />;
};
