import type { Meta, StoryObj } from '@storybook/react-vite';
import { BellRing } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ClassAttributes, HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

const meta = {
  title: 'ui/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    className: 'w-96',
  },
  render: (
    args: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLDivElement> &
      HTMLAttributes<HTMLDivElement>
  ) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-center gap-4">
            <BellRing className="size-6" />
            <div>
              <p>{notification.title}</p>
              <p className="text-foreground/60">{notification.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="link">Close</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
