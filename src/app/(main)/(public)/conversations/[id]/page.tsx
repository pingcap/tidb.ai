import { permanentRedirect } from 'next/navigation';

export default async function Conversations ({ params }: { params: { id: string } }) {
  permanentRedirect(`/c/${params.id}`);
}
