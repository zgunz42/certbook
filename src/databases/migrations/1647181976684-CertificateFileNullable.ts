import {MigrationInterface, QueryRunner} from "typeorm";

export class CertificateFileNullable1647181976684 implements MigrationInterface {
    name = 'CertificateFileNullable1647181976684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`certificates\` CHANGE \`certificateFile\` \`certificateFile\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`certificates\` CHANGE \`certificateFile\` \`certificateFile\` varchar(255) NOT NULL`);
    }

}
