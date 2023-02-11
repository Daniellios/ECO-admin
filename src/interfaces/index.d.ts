export enum UserStatus {
  CONFIRMED = "CONFIRMED",
  BANNED = "BANNED",
  IN_CHECK = "IN_CHECK",
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  COMPANY = "COMPANY",
}

export interface IUser {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  isEmailConfirmed: boolean;
  phone: string;
  email: string;
  roles: Role;
  status: UserStatus;

  createdAt: Date;

  workLoad: number;

  workLoadLimit: number;

  updatedAt: Date;

  skillForm: any;

  manager: any;

  contracts: any;
}
