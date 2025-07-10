import { getCurrentUser } from '@/app/lib/data';
import Header from '@/components/header';
import Signin from './form';

export default async function Page() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Signin />
    </div>
  );
}
