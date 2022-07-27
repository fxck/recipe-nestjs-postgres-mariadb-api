import { MigrationInterface, QueryRunner } from 'typeorm';
import { Todo } from '../todos/todos.entity';

export class DataSeed1650618572472 implements MigrationInterface {
  name = 'DataSeed1650618572472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const dataSeed = JSON.parse(process.env.ZEROPS_RECIPE_DATA_SEED || '[]');
    await queryRunner.connection.synchronize();
    console.log('Seeding data for the Zerops recipe ⏳');
    if (!!dataSeed?.length) {
      await queryRunner.manager.save(
        Todo,
        dataSeed.map((text) => ({ text })),
      );
    }
    console.log('Done ✅');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Clearing data for the Zerops recipe ⏳');
    await queryRunner.manager.clear(Todo);
    console.log('Done ✅');
  }
}
