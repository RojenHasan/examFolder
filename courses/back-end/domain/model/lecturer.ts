import { Course } from './course';
import { mapToCourses } from '../../mapper/course.mapper';
import { User } from './user';
import {
    Lecturer as LecturerPrisma,
    User as UserPrisma,
    Course as CoursePrisma,
} from '@prisma/client';

export class Lecturer {
    readonly id?: number;
    readonly user: User;
    readonly expertise: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly courses: Course[];

    constructor(lecturer: {
        id?: number;
        user: User;
        expertise: string;
        createdAt?: Date;
        updatedAt?: Date;
        courses?: Course[];
    }) {
        this.id = lecturer.id;
        this.user = lecturer.user;
        this.expertise = lecturer.expertise;
        this.createdAt = lecturer.createdAt;
        this.updatedAt = lecturer.updatedAt;
        this.courses = lecturer.courses || [];
    }

    equals({ id, user, expertise, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.user.equals(user) &&
            this.expertise === expertise &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }
    static create (user: User, expertise: string,id?: number, createdAt?: Date, updatedAt?: Date){
        return new Lecturer({user: user, expertise:expertise,id: id, createdAt:createdAt,updatedAt:updatedAt })
}
    static from({
        id,
        user,
        expertise,
        createdAt,
        updatedAt,
        courses,
    }: LecturerPrisma & { user: UserPrisma } & { courses?: CoursePrisma[] }) {
        return new Lecturer({
            id,
            user: User.from(user),
            expertise,
            createdAt,
            updatedAt,
            courses: courses ? mapToCourses(courses) : [],
        });
    }
}
