import { User } from './user';
import { Student as StudentPrisma, User as UserPrisma } from '@prisma/client';

export class Student {
    readonly id?: number;
    readonly user: User;
    readonly studentnumber: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(lecturer: {
        id?: number;
        user: User;
        studentnumber: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = lecturer.id;
        this.user = lecturer.user;
        this.studentnumber = lecturer.studentnumber;
        this.createdAt = lecturer.createdAt;
        this.updatedAt = lecturer.updatedAt;
    }
    static create(user: User,studentnumber: string ,createdAt: Date,updatedAt: Date, id?: number){
        return new Student({user:user,studentnumber: studentnumber, createdAt: createdAt, updatedAt: updatedAt, id: id })
    }
    equals({ id, user, studentnumber, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.user.equals(user) &&
            this.studentnumber === studentnumber &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({
        id,
        user,
        studentnumber,
        createdAt,
        updatedAt,
    }: StudentPrisma & { user: UserPrisma }) {
        return new Student({
            id,
            user: User.from(user),
            studentnumber,
            createdAt,
            updatedAt,
        });
    }
}
