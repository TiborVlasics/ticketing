'use client';

import useRequest from '@/hooks/use-request';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { pipe } from '@/utils/pipe';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { doRequest, isLoading, errors } = useRequest({
    url: '/api/users/signin',
    method: 'POST',
    body: JSON.stringify({ email, password }),
    onSuccess: () => router.push('/'),
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="w-full flex justify-center pt-16">
      <form
        className="bg-white dark:bg-gray-800 shadow-md w-md md:w-auto rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => onSubmit(e)}
      >
        <h1 className="mb-8 text-2xl">Sign in</h1>
        {pipe(
          errors,
          (err) => err.find((e) => e.field === 'email'),
          (err) => (
            <div className="mb-8">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>

              <input
                className={
                  'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' +
                  (err ? ' border-red-500 text-red-500' : '')
                }
                id="email"
                type="text"
                value={email}
                autoComplete="username"
                onChange={(e) => setEmail(e.target.value)}
              />
              {err?.message && (
                <span className="text-red-500 text-xs italic">
                  {err.message}
                </span>
              )}
            </div>
          )
        )}
        {pipe(
          errors,
          (err) => err.find((e) => e.field === 'password'),
          (err) => (
            <div className="mb-8">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={
                  'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' +
                  (err ? ' border-red-500 text-red-500' : '')
                }
                id="password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {err?.message && (
                <span className="text-red-500 text-xs italic">
                  {err.message}
                </span>
              )}
            </div>
          )
        )}
        <div className="md:flex flex-col md:items-center">
          {errors.length > 0 && (
            <div>
              <div className="text-red-500 text-xs italic mb-4">
                {errors.map((error) => (
                  <div key={error.field}>
                    {error.field}: {error.message}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <button
              className="flex flex-row bg-cyan-500 shadow-cyan-500/50 hover:shadow-lg focus:outline-2 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <svg
                  className="size-5 fill-current animate-spin"
                  viewBox="0 0 24 24"
                ></svg>
              )}
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
