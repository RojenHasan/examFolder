import { Schedule } from "../domain/model/schedule";
import { CoursePrisma,SchedulePrisma,StudentPrisma,LecturerPrisma } from "../util/database";
import { mapToCourse } from "./course.mapper";
//import { mapToLecturer, mapToLecturers } from "./lecturer.mapper";
import { mapToStudents } from "./student.mapper";
import { Lecturer } from "../domain/model/lecturer";
import { mapToUser } from "./user.mapper";
/*const mapToSchedule = ({
    start,
    end,
    course,
    lecturer,
    students,
    createdAt,
    updatedAt, id,
}: SchedulePrisma & {students: StudentPrisma[]} &
    {lecturer: LecturerPrisma} & {course: CoursePrisma}):
    Schedule => Schedule.create(start, end, mapToCourse(course),
    mapToLecturer(lecturer), mapToStudents(students), createdAt, updatedAt, id)


const mapToSchedules = (schedulesPrisma: SchedulePrisma[]):
    Schedule[] => {
        return schedulesPrisma.map(mapToSchedule)
    }

export{
    mapToSchedule, mapToSchedules
}*/