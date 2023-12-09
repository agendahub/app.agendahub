import { User, Service } from "./entities";

export class ErrorDto {
    public code!: number;
    public message!: string;
    public exception!: string;
    public status!: number
}

export class RetornoDto<T = any> {
    public errorDescription: string = "";
    public hasError!: boolean;
    public message!: string;
    public data!: T;
}

export class ScheduleViewLinkDto {

    public id!: string
    public hasWhatsappButton!: boolean
    public expirationDate!: Date
    public whatsAppLink!: string
    public fromDateTime!: Date
    public employeeId!: number
    public isActive!: boolean
    public serviceId!: number
    public service!: Service
    public toDateTime!: Date
    public employee!: User


}