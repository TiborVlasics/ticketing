import { getCurrentUser, postSignout } from '@/app/lib/data';
import Header from '@/components/header';

export default async function Signout() {
  await postSignout();
  const currentUser = await getCurrentUser();
  return (
    <div>
        <Header currentUser={currentUser}></Header>
        <p>Successfully signed out</p>
    </div>
  );
}
