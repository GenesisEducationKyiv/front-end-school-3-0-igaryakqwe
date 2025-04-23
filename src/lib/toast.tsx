import { toast as dependencyToast } from 'sonner';
import { Toast } from '@/components/ui/sonner.tsx';

export const toast = {
  success: (title: string) => {
    dependencyToast.custom((id) => (
      <Toast id={id} title={title} type="success" />
    ));
  },
  error: (title: string) => {
    dependencyToast.custom((id) => (
      <Toast id={id} title={title} type="error" />
    ));
  },
  info: (title: string) => {
    dependencyToast.custom((id) => <Toast id={id} title={title} type="info" />);
  },
  warning: (title: string) => {
    dependencyToast.custom((id) => (
      <Toast id={id} title={title} type="warning" />
    ));
  },
};
