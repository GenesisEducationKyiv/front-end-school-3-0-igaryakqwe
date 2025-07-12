import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const meta = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    className: 'w-96',
    type: 'email',
    placeholder: 'Email',
    disabled: false,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabel: Story = {
  render: (args: Story['args']) => (
    <Input {...args} id="email" label={args?.placeholder} />
  ),
};

export const WithErrorText: Story = {
  render: (args: Story['args']) => (
    <Input
      {...args}
      id="email-2"
      label={args?.placeholder}
      error="You typed wrong email address"
    />
  ),
};

export const WithButton: Story = {
  render: (args: Story['args']) => (
    <div className="flex items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};
