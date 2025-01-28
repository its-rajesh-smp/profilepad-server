import prisma from "@/config/prisma.conf";
import { Prisma, User } from "@prisma/client";

/**
 * User service
 */
export default class UserService {
  /**
   * Find one user
   * @param {Prisma.UserFindFirstArgs} conditions Conditions to find the user
   * @returns {Promise<User | null>} The found user or null if not found
   */
  async findOne(conditions: Prisma.UserFindFirstArgs): Promise<User | null> {
    return await prisma.user.findFirst(conditions);
  }

  /**
   * Create a user
   * @param {Prisma.UserCreateArgs} data Data to create the user
   * @returns {Promise<User>} The created user
   */
  async create(data: Prisma.UserCreateArgs): Promise<User> {
    return await prisma.user.create(data);
  }

  /**
   * Update a user
   * @param {Prisma.UserWhereUniqueInput} condition Condition to find the user
   * @param {Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput} data Data to update the user
   * @returns {Promise<User>} The updated user
   */
  async update(
    condition: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput
  ): Promise<User> {
    return await prisma.user.update({
      where: condition,
      data: data,
    });
  }

  /**
   * Delete a user
   * @param {string} id The id of the user to delete
   * @returns {Promise<User>} The deleted user
   */
  async delete(id: string): Promise<User> {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
