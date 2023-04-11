import { userModel } from "../Models/user.model.js";



export default class UserManager{
    constructor(){}
        
        findAll = async ()=>{
            try{
                const users= await userModel.find();
                return users;

            }catch(error){
                console.log(error)
            }
        
        };  

        create = async (user)=>{
            try {
                const createdUser= await userModel.create(user);
                return createdUser;
                
            } catch (error) {
                console.log (error);
                
            }
        }
}