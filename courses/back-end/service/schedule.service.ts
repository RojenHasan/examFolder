import scheduleDb from '../domain/data-access/schedule.db';
import { Schedule } from '../domain/model/schedule';
import { ScheduleInput, StudentInput } from '../types';
import courseService from './course.service';
import lecturerService from './lecturer.service';
import studentService from './student.service';


const addSchedule = async (scheduleInput:ScheduleInput):Promise<Schedule> =>{
    await handleScheduleInput(scheduleInput)
    return await scheduleDb.addSchedule(scheduleInput)
}

const updateSchedule = async(scheduleInput: ScheduleInput): Promise<Schedule> => {
    await handleScheduleInput(scheduleInput)
    await getScheduleById({id: scheduleInput.id})
    return await scheduleDb.updateSchedule(scheduleInput)
}


const getScheduleById = async ({id}: {id: number}) : 
    Promise<Schedule> =>
    await scheduleDb.getScheduleById({id:id})

const getAllSchedules = async (): Promise<Schedule[]> =>
await scheduleDb.getAllSchedules();

const deleteScheduleById= async({id}: {id: number})=>
    await scheduleDb.deleteScheduleById({id: id})


const addStudentsToSchedule = async ({
    schedule,
    students,
}: {
    schedule: ScheduleInput;
    students: StudentInput[];
}): Promise<Schedule> => {
    if (!schedule.id) throw new Error('Schedule id is required');
    if (!students.length) throw new Error('At least one student is required');
    if (!scheduleDb.getScheduleById({ id: schedule.id })) throw new Error('Schedule not found');

    return scheduleDb.addStudentsToSchedule({ schedule, students });
};

const handleScheduleInput = async ({start, end, courseId,
    lecturerId, studentsId} 
    :ScheduleInput) => {
        if(start == null || end == null ){
            throw new Error("they can't be empty.")
        }
    if(!lecturerId){
        throw new Error("Lecturer id can't be empty.")
    }
    if(!courseId){
        throw new Error("Course id can't be empty.")
    }
    if(!studentsId ){
        throw new Error("studentsId can't be empty.")
    }
    // check if lecturer exists
    await lecturerService.getLecturerById({id: lecturerId})
    await courseService.getCourseById({id:courseId })

    // check if student ids exist
    for(let id=0; id< studentsId.length;id++){
        await studentService.getStudentById({id: studentsId[id]})
    }    
}

export default {addSchedule, getAllSchedules, addStudentsToSchedule ,updateSchedule, deleteScheduleById};
