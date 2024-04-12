import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { redirect } from 'next/navigation';

export async function authGuard (role?: 'admin') {
  const session = await auth();

  if (!session?.user || session.user.role === 'anonymous') {
    redirect('/auth/login');
  }

  if (role === 'admin') {
    if (session.user.role !== 'admin') {
      redirect('/403');
    }
  }
}
