export class Notification {
    id!: number;
    date!: Date;
    title!: string;
    message!: string;
    type!: NotificationType
    state!: NotificationState
};

export enum NotificationType {
    Info,
    Warning,
    Error
} 

export enum NotificationState {
    Read,
    Unread
}