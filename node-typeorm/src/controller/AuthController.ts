import { BaseEntity, getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { Auth } from "../entities/Auth";

class AuthController extends BaseEntity {
  static logIn(req: Request, res: Response) {}

  static signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    let newUser = new Auth();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    /* this part of code is written using class validator which is a npm package not being used in this project
    //   const error = await validate(user);
    //   if (error.length > 0) {
    //     res.status(400).json({ error });
    */

    const useRepository = getRepository(Auth);
    let user = useRepository.find({ email: email });
    if (!user) {
      res.status(400).json({ msg: "User already exists" });
    }
    try {
      await useRepository.save(newUser);
      res.status(201).json({
        msg: "User created",
        user: newUser,
        jwt: newUser.generateJwt(),
      });
    } catch (err) {
      console.log("err");
      res.status(400).json({ err: err });
    }
  };
}

export { AuthController };
