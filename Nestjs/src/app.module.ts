import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [

    GraphQLModule.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({req}) => {
          return {req};
      },
      cors: {
          credentials: true,
          origin: true,
      },
  }),

  
    MongooseModule.forRoot(`mongodb+srv://default:defaultpassword@cluster0-5q6hs.gcp.mongodb.net/test?retryWrites=true&w=majority`),
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
