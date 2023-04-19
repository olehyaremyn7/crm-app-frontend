export interface AlertProps {
  message: string;
  title: AlertTitle;
  icon: string;
}

type AlertTitle = 'Done' | 'Success' | 'Warning' | 'Error';
