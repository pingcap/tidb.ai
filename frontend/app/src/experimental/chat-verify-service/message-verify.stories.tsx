import { AuthProvider } from '@/components/auth/AuthProvider';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { getVerify, verify, VerifyStatus } from '@/experimental/chat-verify-service/api.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { mutate } from 'swr';
import { MessageVerify } from './message-verify';

const exampleSql = `INSERT INTO orders (user_id, order_date) VALUES (3, '2023-05-03');`;

const meta = {
  title: 'Experimental/MessageVerify',
  component: undefined,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  argTypes: {},
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
        <div style={{ width: 600 }}>
          <MessageVerify
            user={new ChatMessageController({ finished_at: new Date(), id: 0, role: 'user', content: 'Question' } as any, undefined)}
            assistant={new ChatMessageController({ finished_at: new Date(), id: 1, role: 'assistant', content: 'Answer' } as any, undefined)}
          />
        </div>
      </AuthProvider>
    );
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Creating: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(new Promise(() => {}));
  },
};

export const Created: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.CREATED,
      message: 'This is a created message returned from server',
      runs: [],
    }));
  },
};

export const Extracting: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.EXTRACTING,
      message: 'This is a extracting message returned from server',
      runs: [],
    }));
  },
};

export const Validating: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.VALIDATING,
      message: 'This is a validating message returned from server',
      runs: [],
    }));
  },
};

export const Verified: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.SUCCESS,
      message: 'This is a success message returned from server',
      runs: [
        { sql: exampleSql, results: [], success: true, explanation: 'some description for this SQL', llm_verification: 'No xxxxx' },
        { sql: exampleSql, results: [['Expected Error']], success: true, sql_error_code: 8848, sql_error_message: 'Expected Error', explanation: 'some description for this SQL', llm_verification: 'This is LLM verification description' },
      ],
    }));
  },
};

export const Failed: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.FAILED,
      message: 'This is a failed message returned from server',
      runs: [
        { sql: exampleSql, results: [], success: true, explanation: 'Some description for this SQL', llm_verification: 'No xxxxx' },
        { sql: exampleSql, results: [], success: false, explanation: 'Another description for this SQL', sql_error_code: 8848, sql_error_message: 'TiDB Error Message', llm_verification: 'No xxxxx', warnings: [] },
      ],
    }));
  },
};

export const Skipped: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.SKIPPED,
      message: 'This is a skipped message returned from server',
      runs: [],
    }));
  },
};

export const ApiError: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.reject(new Error('This is error from server')));
  },
};