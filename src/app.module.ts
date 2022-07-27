import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

type DatabaseTypes = 'postgres' | 'mariadb';

const getDatabaseType = (envVar: string): DatabaseTypes => {
  const protocol = envVar.split(':')[0];
  switch (protocol) {
    case 'postgresql':
      return 'postgres';
    default:
      return 'mariadb';
  }
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: getDatabaseType(process.env['DB_URL']),
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: false,
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
    }),
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
