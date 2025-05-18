export type DocumentsType = {
  _id: number;
  fullName: string;
//   fileSize: string;
  documentType: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  verificationStatus: string;
};

export type IUserType = {
  _id: number;
  firstname: string;
  lastname: string;
  email: string;
};


export type ISignupType ={
    firstname:string,
    lastname:string,
    gender:string,
    email:string,
    password:string,
} 


export type ILoginType ={
    email:string,
    password:string,
}

export type IVerifyType ={
    otpCode:string,
}
export type IResendType ={
    email:string,
}

export type IUpdateProfileType ={
    fullname:string,
}
export type IUploadImageType ={
    image:string
}


export type IUploadIdentityType ={
    fullName: string;
	dateOfBirth: string;
	nationality: string;
	documentType: string;
	documentNumber: string;
	documentFileUrl: string;
	blockchainHash: string;
	rejectionReason: string;
}