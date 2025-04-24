import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  destination: string;

  @Column({ length: 100, nullable: false })
  startDate: string;

  @Column({ length: 100, nullable: false })
  endDate: string;

  @Column({ length: 100, nullable: false })
  createdBy: string;

  // relation between user and trip - Many Trip for one user
  @ManyToOne(() => User)
  user: User;

  @RelationId((trip: Trip) => trip.user)
  userId: number;
}
