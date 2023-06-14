/**
 * @swagger
 *   components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          username:
 *            type: string
 *            description: User name.
 *          firstName:
 *            type: string
 *            description: User firstName.
 *          lastName:
 *            type: string
 *            description: User lastName.
 *          email:
 *            type: string
 *            description: User email.
 *          password:
 *            type: string
 *            description: User password.
 *      UserInput:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *            required: false
 *          username:
 *            type: string
 *            description: User name.
 *            required: true
 *          firstName:
 *            type: string
 *            description: User firstName.
 *            required: true
 *          lastName:
 *            type: string
 *            description: User lastName.
 *            required: true
 *          email:
 *            type: string
 *            description: User email.
 *            required: true
 *          password:
 *            type: string
 *            description: User password.
 *            required: true
 *         
 * 
 */
import express, { Request, Response } from 'express';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
* @swagger
* /user/{id}:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get a user by id.
*     responses:
*       200:
*         description: Returns a user, if not then an error is returned 
*         content:
*           application/json:
*             schema:
*                $ref: '#/components/schemas/User'
*     parameters :
*        - name: id
*          in: path
*          description: id of the user
*          required: true
*          type: integer
*          format: int64    
*    
*/
userRouter.get("/:id",async (req:Request, res:Response) =>{
    try{
        const int:number = parseInt(req.params.id)
        const user = await userService.getUserById({id: int});
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

/**
* @swagger
* /user:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Add a user
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserInput'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*/

userRouter.post("/",async(req:Request, res: Response) =>{
    const newUser = req.body
    try {
        const user = await userService.createUser(newUser)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})


/**
*  @swagger
* /users:
*   get:
*     security:
*       - bearerAuth: []
*     summary: Get list of users.
*     responses:
*       200:
*         description: List of all users
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*    
*/
userRouter.get("/",async (req:Request, res:Response) =>{
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({status:'error', errorMessage: error.message})
    }
})

export { userRouter };
