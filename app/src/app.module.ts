import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { PrismaModule } from './prisma/prisma.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions?.exception?.response?.message || error.message,
        };

        return graphQLFormattedError;
      },
      playground: true,
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
