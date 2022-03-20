import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BucketEntity } from '../enitity/bucket.entity';
import { FileEntity } from '../enitity/file.entity';

@Injectable()
export class FileSystemRepository {
  constructor(
    @InjectRepository(BucketEntity)
    private readonly folder: Repository<BucketEntity>,
    @InjectRepository(FileEntity)
    private readonly file: Repository<FileEntity>,
  ) {}

  async craeteFolder(
    folderPath: string,
    parentId?: number,
  ): Promise<BucketEntity> {
    if (!parentId) {
      // todo
      await this.file.save(this.file.create({ path: folderPath }));
    } else {
      const parent = await this.folder.findOne(parentId);
      if (!parent) {
        throw new Error('Parent not found');
      }
      const childs = await this.folder.find({
        where: {
          path: folderPath,
          parent,
        },
      });

      if (childs.length > 0) {
        for (const child of childs) {
          if (child.name === folderPath) {
            throw new Error('Folder already exists');
          }
        }
      }
      const folder = await this.folder.save(
        this.folder.create({ name: folderPath, parent }),
      );

      return folder;
    }
  }
}
