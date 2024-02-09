import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import fetchAdapter from '@haverstack/axios-fetch-adapter';
import { OryServerSdk } from './modules/auth/api/sdk';

export async function middleware(request: NextRequest): Promise<NextResponse | void> {
  if (request.nextUrl.pathname.startsWith('/private')) {
    const cookieParam = request.cookies.getAll().reduce((acc, cookie) => `${acc}${cookie.name}=${cookie.value}; `, '');

    try {
      const { data } = await OryServerSdk.toSession(
        {
          cookie: cookieParam,
        },
        {
          adapter: fetchAdapter,
        },
      );

      if (!data) {
        return NextResponse.redirect(new URL('/registration', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/registration', request.url));
    }
  }

  return NextResponse.next();
}
