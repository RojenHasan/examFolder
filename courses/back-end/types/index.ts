type LecturerInput = {
    id?: number;
    user: number;
    expertise?: string;
    courses: number[];
};
type UserInput = {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
};


export type StudentInput = {
    id?: number;
    userId: number;
    studentnumber: string;
    scheduleId: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CourseInput = {
    id?: number;
    name?: string;
    description?: string;
    phase?: number;
    credits?: number;
};

export type ScheduleInput = {
    id: number;
    start: Date;
    end: Date;
    courseId?: number;
    lecturerId?: number;
    studentsId?: number[];
};

export type EnrollmentInput = {
    schedule: ScheduleInput;
    students: StudentInput[];
};

export { UserInput, LecturerInput}