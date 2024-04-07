export class Notification {
    id!: number;
    title!: string;
    message!: string;
    createdAt!: Date;
    readAt: Date | null = null;
    type!: NotificationType
    status!: NotificationStatus
};

export enum NotificationType {
    Info = 1,
    Warning = 2,
    Error = 3,
    Success = 4
} 

export enum NotificationStatus {
    Unread = 1,
    Read = 2
}