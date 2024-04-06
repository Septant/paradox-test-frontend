export interface Notification extends NotificationBase {
  id: number;
  isResolved: boolean;
}

export interface NotificationBase {
  text: string;
  deadline: string;
}
