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

export interface IContract {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  startAt: Date;

  endAt: Date;

  contractJobs: IContractJob[];

  totalPrice: number;

  paymentAmount: number;

  description: string;

  status: ContractStatus;

  hasCandidates: boolean;

  // stage: string;

  // timeline: string;

  candidates: IUser[];

  ecologist: IUser;

  company: ICompany;
}

export interface IContractJob {
  id: number;

  region: string;

  address: string;

  serviceName: string;

  serviceVolume: number;
}

export interface ICompany {
  id: number;

  companyName: string;

  companySphere: string;

  contactFirstName: string;

  contactSecondName: string;

  email: string;

  isEmailConfirmed: boolean;

  password: string;

  hashedRT: string;

  phone: string;

  status: CompanyStatus;

  readonly roles: Role;

  createdAt: Date;

  updatedAt: Date;

  contracts: IContract[];

  // needsForm: CompanyNeedsFormEntity;
}

export enum ContractStatus {
  PREPARATION = "PREPARATION",
  COMPLETED = "COMPLETED",
  IN_WORK = "IN_WORK",
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

  skillForm: IUserSkillForm;

  manager: any;

  contracts: any;
}

export interface IUserSkillForm {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  hasDegree: boolean;

  isApproved: boolean;

  isCompleted: boolean;
}
