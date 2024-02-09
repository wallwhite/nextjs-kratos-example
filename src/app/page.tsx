import { NextPage } from 'next';
import { AuthMenu } from '@/modules/auth/components/auth-menu';
import { CurrentSession } from '@/modules/auth/components/current-session';
import { Card } from '@/components/ui/card';

export const revalidate = 0;

const Home: NextPage = async () => (
  <>
    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
    <p className="text-muted-foreground">Here&apos;s an example of integration Ory Kratos with Next.js!</p>
    <div className="flex mt-6 w-full">
      <Card className="flex flex-col gap-4 w-full p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">Current session</h3>
          <AuthMenu />
        </div>
        <CurrentSession />
      </Card>
    </div>
  </>
);

export default Home;
