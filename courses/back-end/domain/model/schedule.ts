import {
    Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    Student as StudentPrisma,
    Schedule as SchedulePrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Course } from './course';
import { Lecturer } from './lecturer';
import { Student } from './student';
import { User } from './user';

export class Schedule {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly course: Course;
    readonly lecturer: Lecturer;
    readonly students: Student[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(schedule: {
        id?: number;
        start: Date;
        end: Date;
        course: Course;
        lecturer: Lecturer;
        students: Student[];
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = schedule.id;
        this.start = schedule.start;
        this.end = schedule.end;
        this.course = schedule.course;
        this.lecturer = schedule.lecturer;
        this.students = schedule.students;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
    }
    static create ( start: Date,
        end: Date,
        course: Course,
        lecturer: Lecturer,
        students: Student[],
        createdAt: Date,
        updatedAt: Date, id?: number){
            return new Schedule({start: start, end: end, course: course,
            lecturer:lecturer,students:students, createdAt: createdAt, updatedAt: updatedAt, id: id})
        }

    equals({ id, start, end, course, lecturer, students, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.start === start &&
            this.end === end &&
            this.course.equals(course) &&
            this.lecturer.equals(lecturer) &&
            this.students.every((student, index) => student.equals(students[index])) &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({
        id,
        start,
        end,
        course,
        lecturer,
        students,
        createdAt,
        updatedAt,
    }: SchedulePrisma & {
        course: CoursePrisma;
        lecturer: LecturerPrisma & { user: UserPrisma };
        students: (StudentPrisma & { user: UserPrisma })[];
    }) {
        return new Schedule({
            id,
            start,
            end,
            course: Course.from(course),
            lecturer: Lecturer.from(lecturer),
            students: students.map((student) => Student.from(student)),
            createdAt,
            updatedAt,
        });
    }
}
