import bcrypt from 'bcrypt';
import { User } from '../domain/model/user';
import userDB from '../domain/data-access/user.db';
import { UserInput } from '../types';

const getAllUsers = async(): Promise<User[]>=>
await userDB.getAllUsers();

const getUserByUsername = async ({username}:{username: string}): 
Promise<User> => {
    const user = await userDB.getUserByUserName({username});
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const getUserById = async({id}: {id: number}):
    Promise<User> => await userDB.getUserById({id: id})

const createUser = async ({username,password, firstName,
    lastName, email}:UserInput):
Promise<User> => 
    await userDB.createUser({username,password, firstName,
        lastName, email})
      
   

export default{createUser, getUserById, getAllUsers, getUserByUsername };
