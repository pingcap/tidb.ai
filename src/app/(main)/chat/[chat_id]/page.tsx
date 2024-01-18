import type { MessageProps } from '@/components/message';
import { MessageInput } from '@/components/message-input';
import { MessageList } from '@/components/message-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { faker } from '@faker-js/faker';

export default function Page () {
  return (
    <>
      <div className="sticky top-16 p-4 z-20 flex items-center mb-8 gap-2 bg-background border-b">
        <Input defaultValue={faker.lorem.words()} />
        <Button variant="secondary">
          Update chat name
        </Button>
        <Button variant="ghost">
          Delete
        </Button>
      </div>
      <MessageList className='pb-36' messages={mockMessages} />
      <MessageInput className='h-28 sticky bottom-0 border-t' />
    </>
  );
}
faker.seed(Date.now());
const user = faker.person.fullName();
const avatar = faker.internet.avatar();

const mockMessages = faker.helpers.uniqueArray((): MessageProps => {
  const isUser = faker.datatype.boolean();
  return {
    id: faker.string.uuid(),
    username: isUser ? user : 'RAG',
    avatarUrl: isUser ? avatar : 'RA',
    content: faker.lorem.paragraph(),
    time: faker.date.recent(),
  };
}, 10);
