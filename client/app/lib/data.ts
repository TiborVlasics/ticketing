import { CurrentUserResponse, User } from '@/types/user';
import { headers } from 'next/headers';
import z from 'zod';

export const getCurrentUser = async (): Promise<User | undefined> => {
  const headersList = await headers();

  const res = await fetch(
    'http://auth-srv.default.svc.cluster.local:3000/api/users/currentuser',
    {
      method: 'GET',
      headers: headersList,
    }
  );

  const data = await res.json();
  const result = CurrentUserResponse.safeParse(data);
  console.log('CLIENT calling GET/currentuser', result);
  return result.success ? result.data.currentUser : undefined;
};

export const postSignout = async (): Promise<'success' | 'fail'> => {
  const headersList = await headers();

  const res = await fetch(
    'http://auth-srv.default.svc.cluster.local:3000/api/users/signout',
    {
      method: 'POST',
      headers: headersList,
    }
  );

  const data = await res.json();
  const result = z.object({}).safeParse(data);
  console.log('CLIENT calling POST/signout', result);
  return result.success ? 'success' : 'fail';
};
