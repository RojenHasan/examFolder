import { StudentPrisma, UserPrisma,SchedulePrisma} from "../util/database";
import { mapToUser } from "./user.mapper";
import { Student } from "../domain/model/student";


const mapToStudent =
({id, user, studentnumber, createdAt, updatedAt}: StudentPrisma & 
    {user: UserPrisma}):
Student => Student.create( mapToUser(user), studentnumber, createdAt, updatedAt, id)

const mapToStudents = (studentPrisma: StudentPrisma[]): 
Student[]  =>
studentPrisma.map(mapToStudent)

export {mapToStudent, mapToStudents}
