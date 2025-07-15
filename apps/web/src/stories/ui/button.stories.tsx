import type { Meta, StoryObj } from '@storybook/nextjs';
import { Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';

const meta = {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args} isLoading={true}>
      Button
    </Button>
  ),
  args: {
    ...Outline.args,
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args} icon={<Mail />}>
      Login with Email Button
    </Button>
  ),
  args: {
    ...Secondary.args,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    ...Secondary.args,
    size: 'icon',
    title: 'Mail',
    children: <Mail />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
