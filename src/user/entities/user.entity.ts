import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', length: 500, nullable: false })
  password: string;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'role', length: 15, nullable: false })
  role: string;
}
