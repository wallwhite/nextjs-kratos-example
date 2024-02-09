import React from 'react';
import { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: NextPage = () => (
  <div className="flex justify-center w-full mt-auto mb-auto">
    <Card className="p-4 w-full max-w-md">
      <h3 className="text-2xl font-bold tracking-tight text-center mt-4">Sign in</h3>
      <p className="text-muted-foreground text-center mt-2 mb-4">Please fill out the form below to sign in.</p>

      <div className="flex flex-col gap-4 w-full p-4">
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="traits.email" type="email" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </div>
        <Button type="submit" variant="default" className="w-full">
          Sign in
        </Button>
      </div>
    </Card>
  </div>
);

export default LoginPage;
