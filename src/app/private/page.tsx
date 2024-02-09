import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { UserMenu } from '@/modules/user/components/user-menu';
import { UserProfile } from '@/modules/user/components/user-profile';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const PrivatePage: NextPage = () => (
  <>
    <div className="flex flex-row items-center justify-between gap-2 w-full">
      <Button variant="link" className="group pl-0 pr-0" asChild>
        <Link href="/">
          <ChevronLeftIcon className="group-hover:-translate-x-1 w-4 h-4 transition-all" />
          Go back
        </Link>
      </Button>
      <h4 className="text-md font-bold">Private page</h4>
    </div>
    <Separator className="my-4" />
    <div className="flex flex-col w-full">
      <h2 className="text-2xl font-bold tracking-tight">Welcome to private space!</h2>
      <p className="text-muted-foreground">This page is private and only accessible to authenticated users.</p>
      <Card className="flex flex-col gap-4 w-full p-4 mt-6">
        <h3 className="text-lg font-bold">Current user</h3>
        <UserProfile />
        <Separator className="my-4" />
        <UserMenu />
      </Card>
    </div>
  </>
);

export default PrivatePage;
