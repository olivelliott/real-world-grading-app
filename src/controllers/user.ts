import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class UserController {
  constructor(private prisma: PrismaClient) {}

  // Create a user
  async createUser(req: Request, res: Response) {
    try {
        const createdUser = await this.prisma.user.create({
          data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            social: req.body.social
          },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            social: true
          },
        })
        if (!req) {
          return res.status(404).json({ message: "Please enter the required fields"});
        } else {
          return res.status(200).json({ createdUser });
        }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `${err}`})
    }
  }

  // Get one user by id
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const foundUser = await this.prisma.user.findUnique({
        where: { id: +id },
      });
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user: foundUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `${err}.message` });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, firstName: true, lastName: true },
      });
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: `${err}.message` });
    }
  }
}
