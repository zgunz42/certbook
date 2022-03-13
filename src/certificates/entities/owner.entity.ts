import { Column } from 'typeorm';

export class PersonEntity {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;
}
