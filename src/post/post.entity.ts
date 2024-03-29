import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public author: string;

  @Column()
  public title: string;

  @Column()
  public content: string;
}

export default Post;
