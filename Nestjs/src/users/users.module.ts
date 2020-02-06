import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';



@Module({
    imports: [MongooseModule.forFeature([{name:'User', schema: UserSchema}])],
    providers: [UserResolver],
    exports: [UserResolver]

})
export class UsersModule {}
