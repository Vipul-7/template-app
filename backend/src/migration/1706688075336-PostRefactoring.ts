import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PostRefactoring1706687868323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the new column isEmailVerified to the User table
        await queryRunner.query('UPDATE "user" SET "isEmailVerified" = false WHERE "isEmailVerified" IS NULL');
        await queryRunner.addColumn('user', new TableColumn({
            name: 'isEmailVerified',
            type: 'boolean',
            default: false, // You can set a default value if needed
            isNullable: false, // Set to true if the column can be nullable
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the added column in the down migration (if needed)
        await queryRunner.dropColumn('user', 'isEmailVerified');
    }

}
