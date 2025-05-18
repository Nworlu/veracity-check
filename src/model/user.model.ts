export type IUser = {
  blockchainAddress: string;
  createdAt: string;
  email: string;
  firstname: string;
  gender: string;
  identitySubmission: [];
  image:string;
  isActive: boolean;
  lastname: string;
  otp: { code: number; expiresAt: string };
  password: string;
  userType: string;
  __v: 0;
  _id: string;
};
