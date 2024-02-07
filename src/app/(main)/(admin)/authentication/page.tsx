import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// todo:
// - [ ] read providers from API
// - [ ] add provider from API
// - [ ] remove provider from API

export default async function Page() {
  const providers = await readProviders();

  return (
    <>
      <h1 className='text-2xl font-semibold mb-4'>Authentication Configure</h1>
      <h2 className='text-xl font-semibold mb-4'>Enabled</h2>
      <div>
        <ul className='flex gap-2'>
          {providers.map((provider) => {
            return (
              <li key={provider.name} className='w-fit'>
                <ProviderCardItem {...provider} handleRemove={() => {}} />
              </li>
            );
          })}
        </ul>
      </div>
      <h2 className='text-xl font-semibold mb-4'>Add</h2>
      <div>
        <ul className='flex gap-2'>
          {supportedProviders
            .filter((i) => !providers.map((j) => j.name).includes(i))
            .map((provider) => {
              return (
                <li key={provider} className='w-fit'>
                  <ProviderCardItem
                    name={provider}
                    clientId=''
                    clientSecret=''
                    handleAdd={() => {}}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

async function readProviders(): Promise<
  {
    name: string;
    clientId: string;
    clientSecret: string;
  }[]
> {
  const res = await new Promise<{
    data: {
      name: string;
      clientId: string;
      clientSecret: string;
    }[];
  }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          // {
          //   name: 'GitHub',
          //   clientId: '123456',
          //   clientSecret: '123456',
          // },
          {
            name: 'Google',
            clientId: '123456',
            clientSecret: '123456',
          },
        ],
      });
    }, 1000);
  });
  return res.data;
}

const supportedProviders = ['GitHub', 'Google'];

const ProviderCardItem = (props: {
  name: string;
  clientId?: string;
  clientSecret?: string;
  handleRemove?: () => void;
  handleAdd?: () => void;
}) => {
  const { name, clientId, clientSecret, handleRemove, handleAdd } = props;

  return (
    <div className='block max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
      <div className='flex flex-col gap-2 w-full'>
        <h3 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {name}
        </h3>
        <form className='flex flex-col gap-2'>
          <div className='space-y-2'>
            <Label>CLIENT_ID</Label>
            <Input defaultValue={clientId || ''} />
          </div>
          <div className='space-y-2'>
            <Label>CLIENT_SECRET</Label>
            <Input defaultValue={clientSecret || ''} type='password' />
          </div>
          <div className='space-x-2'>
            {handleAdd && <Button>Add</Button>}
            {handleRemove && <Button variant='destructive'>Remove</Button>}
          </div>
        </form>
      </div>
    </div>
  );
};
