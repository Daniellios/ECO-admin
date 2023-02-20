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

export interface IDecodedIdentity {
  id: number;
  roles: Role;
}

export interface IDecodedJwt {
  sub: number;
  roles: Role;
  isEmailConfirmed: boolean;
  iat: number;
  exp: number;
}

export interface IFilterUserProps {
  id: number;
  firstName: string;
  secondName: string;
  thirdName: string;
  email: string;
  isEmailConfirmed: boolean;
  phone: string;
  status: UserStatus;
  workLoad: number;
  workLoadLimit: number;
}

export interface IUpdateUser {
  firstName: string;

  secondName: string;

  thirdName: string;

  status: UserStatus;

  phone: string;

  workLoad: number;

  workLoadLimit: number;
}

export interface IApplication {
  id: string;
  createdAt: Date;
  applicantName: string;
  details: string;
  email: string;
  phone: string;
  isProcessed: boolean;
}

export interface IFilterApplication {
  createdAt: Date;
  phone: string;
  isProcessed: boolean;
}

export interface IStaffMember {
  id: number;

  firstName: string;

  secondName: string;

  email: string;

  password: string;

  phone: string;

  roles: Role;
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
