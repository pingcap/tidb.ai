import { AuthProvider } from '@/components/auth/AuthProvider';
import { ChatControllerProvider, useChatController } from '@/components/chat/chat-hooks';
import { ChatMessageController } from '@/components/chat/chat-message-controller';
import { getVerify, VerifyStatus } from '@/experimental/chat-verify-service/api.mock';
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
  },
  render (_, { id }) {
    const controller = useChatController(undefined, undefined, undefined);

    return (
      <AuthProvider key={id} isLoading={false} isValidating={false} me={{ email: 'foo@bar.com', is_active: true, is_superuser: true, is_verified: true, id: '000' }} reload={() => {}}>
        <ChatControllerProvider controller={controller}>
          <div style={{ width: 600 }}>
            <MessageVerify
              assistant={new ChatMessageController({ finished_at: new Date(), id: 1, role: 'assistant', content: 'Answer', post_verification_result_url: 'http://foo/bar' } as any, undefined)}
            />
          </div>
        </ChatControllerProvider>
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
      runs_report: null,
    }));
  },
};

export const Extracting: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.EXTRACTING,
      message: 'This is a extracting message returned from server',
      runs_report: null,
    }));
  },
};

export const Validating: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.VALIDATING,
      message: 'This is a validating message returned from server',
      runs_report: null,
    }));
  },
};

export const Verified: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.SUCCESS,
      message: 'This is a success message returned from server',
      runs_report: '#### Create the \'person\' table with columns \'id\', \'name\', and \'age\'.\n\n:::success\nThe SQL query executed successfully and created the \'person\' table with the specified columns \'id\', \'name\', and \'age\'.\n:::\n\n```sql\nCREATE TABLE person (id INT PRIMARY KEY, name VARCHAR(255), age INT);\n```\n\n```\n[[\'Query OK, 0 row affected (0.295 sec)\']]\n```\n\n### Insert sample data into the \'person\' table.\n\n:::success\nThe SQL query executed successfully and inserted the sample data into the \'person\' table as expected.\n:::\n\n```sql\nINSERT INTO person (id, name, age) VALUES (1, \'Alice\', 30), (2, \'Bob\', 25), (3, \'Charlie\', 35), (4, \'David\', 28), (5, \'Eve\', 22), (6, \'Frank\', 40);\n```\n\n```\n[[\'Query OK, 6 row affected (0.164 sec)\']]\n```\n\n## Retrieve all rows from the \'person\' table where the \'id\' column is less than 5.\n\n:::success\nThe SQL query executed successfully and retrieved all rows from the \'person\' table where the \'id\' column is less than 5, which matches the expected result.\n:::\n\n```sql\nSELECT * FROM person WHERE id < 5;\n```\n\n```\n[[1, \'Alice\', 30], [2, \'Bob\', 25], [3, \'Charlie\', 35], [4, \'David\', 28]]\n```\n\n## Clean up the table.\n\n:::success\nThe SQL query executed successfully and dropped the \'person\' table as expected, which matches the expected result.\n:::\n\n```sql\nDROP TABLE person;\n```\n\n```\n[[\'Query OK, 0 row affected (0.473 sec)\']]\n```\n\n',
    }));
  },
};

export const Failed: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      status: VerifyStatus.FAILED,
      message: 'This is a failed message returned from server',
      runs_report: '## Create the \'person\' table with columns \'id\', \'name\', and \'age\'.\n\n:::failed\nThe SQL query executed successfully and created the \'person\' table with the specified columns \'id\', \'name\', and \'age\'.\n:::\n\n```sql\nCREATE TABLE person (id INT PRIMARY KEY, name VARCHAR(255), age INT);\n```\n\n```\n[[\'Query OK, 0 row affected (0.295 sec)\']]\n```\n\n## Insert sample data into the \'person\' table.\n\n:::success\nThe SQL query executed successfully and inserted the sample data into the \'person\' table as expected.\n:::\n\n```sql\nINSERT INTO person (id, name, age) VALUES (1, \'Alice\', 30), (2, \'Bob\', 25), (3, \'Charlie\', 35), (4, \'David\', 28), (5, \'Eve\', 22), (6, \'Frank\', 40);\n```\n\n```\n[[\'Query OK, 6 row affected (0.164 sec)\']]\n```\n\n## Retrieve all rows from the \'person\' table where the \'id\' column is less than 5.\n\n:::success\nThe SQL query executed successfully and retrieved all rows from the \'person\' table where the \'id\' column is less than 5, which matches the expected result.\n:::\n\n```sql\nSELECT * FROM person WHERE id < 5;\n```\n\n```\n[[1, \'Alice\', 30], [2, \'Bob\', 25], [3, \'Charlie\', 35], [4, \'David\', 28]]\n```\n\n## Clean up the table.\n\n:::success\nThe SQL query executed successfully and dropped the \'person\' table as expected, which matches the expected result.\n:::\n\n```sql\nDROP TABLE person;\n```\n\n```\n[[\'Query OK, 0 row affected (0.473 sec)\']]\n```\n\n',
    }));
  },
};

export const Skipped: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.resolve({
      'status': VerifyStatus.SKIPPED,
      'message': 'No SQL examples found to validate.',
      'runs_report': null,
    }));
  },
};

export const ApiError: Story = {
  beforeEach: () => {
    getVerify.mockReturnValue(Promise.reject(new Error('This is error from server')));
  },
};