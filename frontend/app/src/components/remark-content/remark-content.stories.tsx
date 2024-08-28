import type { Meta, StoryObj } from '@storybook/react';
import { RemarkContent } from './remark-content';

const meta = {
  title: 'Components/RemarkContent',
  component: RemarkContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      type: 'string',
    },
  },
  args: {},
} satisfies Meta<typeof RemarkContent>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: `# H1
## H2
### H3
#### h4
##### h5
###### h6

> Blockquote

Paragraph

- a
  - a1
  - a2
- b
- c

\`\`\`
No language code block
\`\`\`

\`\`\`sql
SELECT 
  'hello world' 
from tidb;
\`\`\`
`,
  },
};
