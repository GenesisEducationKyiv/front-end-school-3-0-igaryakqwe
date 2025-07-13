import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from '@/lib/toast';

import { Button } from '@/components/ui/button';
import { Toaster, Toast } from '@/components/ui/sonner';

const meta: Meta<typeof Toaster> = {
  title: 'ui/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    position: 'bottom-right',
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => (
    <div className="flex min-h-[300px] items-center justify-center space-x-2">
      <Button onClick={() => toast.info('Info Toast')}>Show Info Toast</Button>
      <Button onClick={() => toast.success('Success Toast')}>
        Show Success Toast
      </Button>
      <Button onClick={() => toast.warning('Warning Toast')}>
        Show Warning Toast
      </Button>
      <Button onClick={() => toast.error('Error Toast')}>
        Show Error Toast
      </Button>
      <Toaster {...args} />
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Info: Story = {
  render: () => (
    <Toast
      id="info"
      title="Info Toast"
      description="This is an info toast."
      type="info"
    />
  ),
};

export const Success: Story = {
  render: () => (
    <Toast
      id="success"
      title="Success Toast"
      description="This is a success toast."
      type="success"
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <Toast
      id="warning"
      title="Warning Toast"
      description="This is a warning toast."
      type="warning"
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Toast
      id="error"
      title="Error Toast"
      description="This is an error toast."
      type="error"
    />
  ),
};
