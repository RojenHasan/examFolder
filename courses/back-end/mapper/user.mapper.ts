import { User } from "../domain/model/user";
import { UserPrisma } from "../util/database";

const mapToUser = ({id, username, firstName,lastName,email,password}
     : UserPrisma):
User => User.create( username, firstName,lastName,email,password, id)

const mapToUsers = (userPrisma: UserPrisma[]):
    User[] => userPrisma.map(User.from)

export{
    mapToUsers, mapToUser
}