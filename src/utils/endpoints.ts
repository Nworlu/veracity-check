export const ENDPOINT_URL ={
    auth:{
        signup:"/auth/signup",
        login:"/auth/login",
        logout:"/auth/logout",
        verify:"/auth/verify",
        resendverification:"/auth/resendverification",
    },
    profile:{
        update:"/profile/update-profile",
        getUser:"/profile/get-profile",
        "upload-image":"/profile/upload-image",
        "delete-profile":"/profile/delete-profile",
    },
    identity:{
        "submit-identity":"/identity/submit-identity",
        "get-identity":"/identity/get-documents",
        "get-single-identity":(id:string)=> `/identity/one-identity/${id}`,
    },
    admin:{
        getallusers:"/admin/get-users",
        getallIdentities:"/admin/get-identities",
        getuser: (id:string)=> `/admin/one-user/${id}`,
        getOneIdentity: (id:string)=> `/admin/one-identity/${id}`,
        verifyIdentity: (id:string)=> `/admin/verify-identity/${id}`,
    }
}