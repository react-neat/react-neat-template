export interface User {
  id: string

  signed: boolean
  type: UserRole

  email: string
  firstName: string
  lastName: string

  avatar: string
  // createdAt: Date
}

/**
 * To help comparing user types, `SuperAdmin` is highest in rank for this enum.
 */
export enum UserRole {
  Guest = -1, User, Manager, StreamAdmin, SuperAdmin
}
