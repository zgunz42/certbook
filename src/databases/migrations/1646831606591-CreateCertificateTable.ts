import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCertificateTable1646831606591 implements MigrationInterface {
    name = 'CreateCertificateTable1646831606591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`certificates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`templateFile\` varchar(255) NOT NULL, \`templateData\` json NOT NULL, \`certificateFile\` varchar(255) NOT NULL, \`issueAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`ownerName\` varchar(255) NOT NULL, \`ownerEmail\` varchar(255) NOT NULL, \`receiverName\` varchar(255) NOT NULL, \`receiverEmail\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`certificates\``);
    }

}
