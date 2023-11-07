import { Response, Request, NextFunction } from "express";
import { Service } from "typedi";

import { UserModel, ProductModel, StoreModel } from "../models";
import { IUser, UserLoginDTO, UserInputDTO } from "../interface/user.interface";
import { IProduct } from "../interface/product.interface";
import { CustomError } from "../utils/response/custom-error/customError";
import { createJwtToken } from "../utils/createJwtToken";

@Service()
class UserService {
  constructor(private readonly user = UserModel, private readonly product = ProductModel, private readonly store = StoreModel) {}

  async createUser(userInputDTO: UserInputDTO, next: NextFunction): Promise<IUser | void> {
    try {
      const { email } = userInputDTO;
      const user = await this.user.findOne({ email });
      if (user) next(new CustomError(400, "User already exist"));
      const newUser = await this.user.create(userInputDTO);
      delete newUser.password;
      return newUser;
    } catch (error) {
      return next(new CustomError(500, "Internal server error ", error.message));
    }
  }

  async loginUser(userLoginDTO: UserLoginDTO, next: NextFunction): Promise<String | void> {
    try {
      const { email, password } = userLoginDTO;
      const user = await this.user.findOne({ email });
      if (!user) next(new CustomError(404, "User does not exist"));
      if (user.password !== password) next(new CustomError(400, "Invalid email or password"));
      const token = createJwtToken({ user_id: user.id, email: user.email });
      user.last_login = new Date();
      await user.save();
      return token;
    } catch (error) {
      return next(new CustomError(500, "Internal server error ", error.message));
    }
  }

  async getUserById(userId: string, next: NextFunction): Promise<IUser | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));
      delete user.password;
      return user;
    } catch (error) {
      return next(new CustomError(500, "Internal server error ", error.message));
    }
  }

  async getAllUsers(next: NextFunction): Promise<IUser[] | void> {
    try {
      const users = await this.user.find();
      return users;
    } catch (error) {
      return next(new CustomError(500, "Internal server error ", error.message));
    }
  }

  async updateUser(userId: string, userInputDTO: any, next: NextFunction): Promise<IUser | void> {
    try {
      const user = await this.user.findById(userId);
      if (!user) next(new CustomError(404, "User does not exist"));
      const userUpdate = await this.user.findByIdAndUpdate(userId, userInputDTO , { new: true });
      return userUpdate;
    } catch (error) {
      return next(new CustomError(500, "Internal server error ", error.message));
    }
  }
  
}

export default UserService;
