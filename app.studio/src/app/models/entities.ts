interface IIdentifiable<T> {
    id: T
}

export class UserType implements IIdentifiable<number> {
    id!: number;
    code!: string;
    description!: string
}

export class User implements IIdentifiable<number> {
    id!: number;
    name!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    password!: string;
    dateBirth!: Date;
    userType!: UserType
}

export class ServiceType implements IIdentifiable<number> {
    id!: number;
    code!: string;
    description!: string
}

export class Service implements IIdentifiable<number> {
    id!: number;
    code!: string;
    description!: string;
    note!: string;
    price!: number;
    serviceType!: ServiceType
}

export class ServiceUser implements IIdentifiable<number> {
    id!: number;
    service!: Service;
    employee!: User
}

export class Schedule implements IIdentifiable<number> {
    id!: number;
    price!: number;
    note!: string;
    startDateTime!: Date;
    finishDateTime!: Date;
    service!: Service;
}

export class UserSchedule implements IIdentifiable<number> {
    id!: number;
    employee!: User
    customer!: User
    schedule!: Schedule
}