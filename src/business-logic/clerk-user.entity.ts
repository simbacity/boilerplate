import { clerkClient, type User } from "@clerk/nextjs/dist/api";

export default class ClerkUserEntity {
  async listUsersForClient(userIds: string[]) {
    const users = await this.list(userIds);
    const usersForClient = users.map(this.filterUserForClient.bind(this));
    return usersForClient;
  }

  private async list(userIds: string[]) {
    const users = await clerkClient.users.getUserList({
      userId: userIds,
    });

    return users;
  }

  private filterUserForClient(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      profileImageUrl: user.profileImageUrl,
    };
  }
}
