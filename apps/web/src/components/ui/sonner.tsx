import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      data-testid="toast-container"
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const toastIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const toastStyles = {
  info: 'bg-blue-100 border border-blue-100 text-info-foreground',
  success: 'bg-green-100 border border-green-300 text-success-foreground',
  warning: 'bg-orange-100 border border-yellow-300 text-warning-foreground',
  error: 'bg-red-100 border border-red-300 text-destructive-foreground',
} as const;

const Toast = ({ id, title, description, type = 'info' }: ToastProps) => {
  const Icon = toastIcons[type];

  return (
    <div
      data-testid={cn(`toast-${type}`)}
      className={cn('flex w-full gap-3 rounded-lg p-4', toastStyles[type])}
      key={id}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">{title}</span>
        {description && (
          <span className="text-sm opacity-90">{description}</span>
        )}
      </div>
    </div>
  );
};

export { Toast, Toaster };
