/**
 * @swagger
 *   components:
 *    schemas:
 *      Schedule:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            courseId:
 *              $ref: '#/components/schemas/Course'
 *            lecturerId:
 *              $ref: '#/components/schemas/Lecturer'
 *            studentsId:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Student'
 *      ScheduleInput:
 *        type: object
 *        properties:
 *          start:
 *            type: string
 *            format: date-time
 *          end:
 *            type: string
 *            format: date-time
 *          courseId:
 *            type: number
 *            format: int64
 *            description: Id of the
 *          lecturerId:
 *            type: number
 *            format: int64
 *            description: Id of the
 *          studentsId:
 *            type: array
*             items:
*                type: number
*                format: int64
*             description:
 */
import express, { Request, Response } from 'express';
import scheduleService from '../service/schedule.service';
import { EnrollmentInput } from '../types';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Get a list of all schedules.
 *     responses:
 *       200:
 *         description: A list of schedules.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.get('/', async (req: Request, res: Response) => {
    try {
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /schedules/enroll:
 *   post:
 *      summary: Enroll students to a schedule.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Enrollment'
 *      responses:
 *         200:
 *            description: The schedule with all enrolled students.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/enroll', async (req: Request, res: Response) => {
    try {
        const enrollmentBody: EnrollmentInput = req.body;
        const schedule = await scheduleService.addStudentsToSchedule(enrollmentBody);
        res.status(200).json(schedule);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { scheduleRouter };
