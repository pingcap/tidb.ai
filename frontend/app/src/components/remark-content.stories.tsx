import { RemarkContent } from '@/components/remark-content';
import type { Meta, StoryObj } from '@storybook/react';
import './chat/style.css'

const meta = {
  title: 'Components/RemarkContent',
  component: RemarkContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <article className="remark-content prose prose-sm prose-neutral dark:prose-invert overflow-x-hidden break-words max-w-[unset]" style={{ minWidth: 400 }}>
        <Story />
      </article>
    ),
  ],
  argTypes: {},
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

\`\`\`sql
SELECT 'hello world' from tidb;
\`\`\`
`,
  },
};
