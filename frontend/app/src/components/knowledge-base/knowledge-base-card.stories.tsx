import { KnowledgeBaseCard, KnowledgeBaseCardPlaceholder } from '@/components/knowledge-base/knowledge-base-card';
import type { Meta, StoryObj } from '@storybook/react';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { FC } from 'react';

const meta = {
  title: 'Components/KnowledgeBase/KnowledgeBaseCard',
  component: KnowledgeBaseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minWidth: 250 }}>
        <AppRouterContext.Provider value={{} as any}>
          <Story />
        </AppRouterContext.Provider>
      </div>
    ),
  ],
  argTypes: {},
  args: {},
  subcomponents: {
    KnowledgeBaseCardPlaceholder: KnowledgeBaseCardPlaceholder as FC<any>,
  },
} satisfies Meta<typeof KnowledgeBaseCard>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    knowledgeBase: {
      id: 1,
      name: 'Some KB',
      description: 'Some Description',
      index_methods: ['vector', 'knowledge_graph'],
      creator: { id: 'xxx' },
      created_at: new Date(),
      updated_at: new Date(),
    },
  },
};

export const Placeholder: StoryObj<typeof KnowledgeBaseCardPlaceholder> = {
  render () {
    return <KnowledgeBaseCardPlaceholder />;
  },
};
