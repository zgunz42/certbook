import { Column } from 'typeorm';

export class Person {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;
}
