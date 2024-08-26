import { AuthProvider } from '@/components/auth/AuthProvider';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { getVerify, verify, VerifyState } from '@/experimental/chat-verify-service/api.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { mutate } from 'swr';
import { MessageVerify } from './message-verify';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Experimental/MessageVerify',
  component: undefined,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: [],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // user: { description: 'User message controller' },
    // assistant: { description: 'Assistant message controller' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
  beforeEach: async () => {
    await mutate(() => true, undefined, { revalidate: true });
    verify.mockReturnValue(Promise.resolve({ job_id: '000' }));
    localStorage.setItem('tidbai.experimental.verify-chat-message', 'on');
    return () => {
      verify.mockReset();
      localStorage.removeItem('tidbai.experimental.verify-chat-message');
    };
  },
  render (_, { id }) {
    return (
      <AuthProvider key={id} isLoading={false} isValidating={false} me={{ email: 'foo@bar.com', is_active: true, is_superuser: true, is_verified: true, id: '000' }} reload={() => {}}>
        <MessageVerify
          user={new ChatMessageController({ finished_at: new Date(), id: 0, role: 'user', content: 'Question' } as any, undefined)}
          assistant={new ChatMessageController({ finished_at: new Date(), id: 1, role: 'assistant', content: 'Answer' } as any, undefined)}
        />
      </AuthProvider>
    );
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Verified: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyState.SUCCESS,
      message: 'This is a success message returned from server',
      runs: [
        { sql: 'SOME A FROM B FROM C FROM D FROM E FROM F FROM G', results: [], success: true, explanation: 'some description for this SQL' },
      ],
    }));
  },
};

export const Validating: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyState.VALIDATING,
      message: 'This is a validating message returned from server',
      runs: [],
    }));
  },
};

export const Failed: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyState.FAILED,
      message: 'This is a failed message returned from server',
      runs: [
        { sql: 'SOME A FROM B FROM C FROM D FROM E FROM F FROM G', results: [], success: true, explanation: 'Some description for this SQL' },
        { sql: 'SOME A FROM B FROM C FROM D FROM E FROM F FROM G', results: [], success: false, explanation: 'Another description for this SQL', sql_error_code: 8848, sql_error_message: 'TiDB Error Message', warnings: [] },
      ],
    }));
  },
};

