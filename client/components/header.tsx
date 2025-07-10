import { User } from '@/types/user';
import Link from 'next/link';

interface Link {
  label: string;
  href: string;
}

export default function Header({
  currentUser,
}: {
  currentUser: User | undefined;
}) {
  const links = [
    !currentUser && { label: 'Sign up', href: '/auth/signup' },
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter((linkConfig): linkConfig is Link => Boolean(linkConfig))
    .map(({ label, href }) => {
      return (
        <li key={href}>
          <Link href={href}>{label}</Link>
        </li>
      );
    });

  return (
    <nav className="bg-mint-500 dark:bg-gray-800 flex flex-row justify-between px-4 py-8">
      <Link href="/">GitTix</Link>
      <div>
        <ul className="flex flex-row">{links}</ul>
      </div>
    </nav>
  );
}
