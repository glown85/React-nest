import {Resolver, Query, Args, Mutation} from "@nestjs/graphql"
import { InjectModel } from "@nestjs/mongoose";
import { NotFoundException } from "@nestjs/common";
import { buildSchemaFromTypeDefinitions } from "graphql-tools";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


@Resolver()
export class UserResolver {
    constructor(@InjectModel('User') private readonly userModel){}
    

    @Query()
    async getUsers(){
        const users = await this.userModel.find().exec();
        return users;
    }

    @Query()
    async getUserByid(@Args('id') id:string){
        let user;
        try{
            user = await this.userModel.findById(id).exec();

        }
        catch(error){
            if(!user){
                throw new NotFoundException('could not find user');
            }
        }
        return user;
    }

    @Query()
    async login(@Args('email') email:string,@Args('password') password:string){
        const user = await this.userModel.findOne({email:email}).exec();
        if(!user){
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },'SUPERSECRETKEYDONTREADTHIS',{expiresIn: '1h'}
          );


          return { userId: user.id, token: token, tokenExpiration: 1 };
    }
    

    @Mutation()
    async createUser(@Args('name') name:string, @Args('email') email:string, @Args('password') password:string ){
        try{
            console.log(name);
            const userAlreadyExist = await this.userModel.findOne({email:email}).exec();
            if(userAlreadyExist){
                throw new Error('User already exists.')
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new this.userModel({name: name, email: email, password:hashedPassword});
            const result = await newUser.save();
            return "User Created";

        }
        catch (err) {
            throw err;

        }
    }
    

    @Mutation()
    async deleteUser(@Args('id') id:string){
        const result = await this.userModel.deleteOne({_id:id}).exec();
        // console.log(result);
        if(result.n==0){
        //    throw new NotFoundException('could not find product');
           return "no user found with: " + id;

        }
        
        return "deleted user with id: " + id;
    }

    @Mutation()
    async editUser(@Args('id') id:string, @Args('name') name:string, @Args('email') email:string, @Args('password') password:string){
        let user;
        try{
            user = await this.userModel.findById(id).exec();
            if(name){user.name = name;}
            if(email){user.email = email;}
            if(password){
                const hashedPassword = await bcrypt.hash(password, 12);
                user.password = hashedPassword;
            }
            
            user.save();

        }
        catch(error){
            if(!user){
                throw new NotFoundException('could not find user');
            }
        }
        return "User updated";
    }

}