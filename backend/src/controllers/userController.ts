import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../config/db/data-source";
import { User } from "../models/User";
import { AppError } from "../errors/AppError";
import { userService } from "../services/userService";
import { RegisterDto } from "../dtos/request/AuthDto";
import { validate } from "class-validator";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const userController = {
  registerUser: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("hello");
      const registerDto: RegisterDto = req.body;
      await validate(registerDto);
      const user = await userService.registerUser(registerDto);
      res.status(201).json(user);
    } catch (error: any) {
      throw new AppError(error.message, 500);
    }
  },

  getUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userService.getUsers();
      console.log("Hello");
      res.json(users);
    } catch (error: any) {
      throw new AppError(
        "Lỗi khi lấy danh sách người dùng: " + error.message,
        500
      );
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        throw new AppError("Không tìm thấy người dùng với ID: " + id, 404);
      }
      res.json(user);
    } catch (error: any) {
      throw error instanceof AppError
        ? error
        : new AppError(
            "Lỗi khi lấy thông tin người dùng: " + error.message,
            500
          );
    }
  },
};
