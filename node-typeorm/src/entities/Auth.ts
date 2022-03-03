import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
@Entity("user")
export class Auth extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;

  // method for hashing the password
  setPassWord = (password: string) => {
    console.log("password", password);
    return (this.password = bcrypt.hashSync(password, 8));
  };

  // method for checking if the password is correct
  checkPassword = (password: string) => {
    return bcrypt.compareSync(password, this.password);
  };

  // method for generating a jwt token
  generateJwt = () => {
    return jwt.sign(
      {
        name: this.name,
        email: this.email,
      },
      "JWT_SECRET",
      { expiresIn: "1hr" }
    );
  };
}
