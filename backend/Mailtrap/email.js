import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { client, sender } from "./mailtrap.js";


export const sendSignUpVerification=async(email,verificationToken)=>{
    const recipient=[{email}];

    try {
        const clientDetails=await client.send({
            from:sender,
            to:recipient,
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification",
            subject:"Congratulations on joining !! "
        })
        console.log("Client details",clientDetails);
    } catch (error) {
        console.log(error.message);
    }

}

export const sendVerifiedConfirmationEmail=async(email,name)=>{
    const recipient=[{email}];
    try {
        const clientDetails=await client.send({
            from:sender,
            to:recipient,
            template_uuid: "88a8bd42-a271-4af5-97bb-8f4e7ebabf88",
            template_variables: {
            "company_info_name": "Auth Demo",
            "name": name,
            }
        })

        console.log({message:'User email send',clientDetails});
    } catch (error) {
        console.log(error.message);
        throw new Error("Error in verification");
    }
}

export const sendPasswordResetReq=async(email,resetURL)=>{
    const recipient=[{email}];

    try {
        const response=await client.send({
            from:sender,
            to:recipient,
            subject:'Password Reset Request !!',
            category:'password reset',
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
        })
        console.log("Reset Password Email Details",response)
    } catch (error) {
        console.log(error.message);
        throw new Error("reset password email couldn't be sent");
    }

}

export const sendPasswordResetSuccessFullEmail=async(email)=>{
    const recipient=[{email}];
     try {
        const response=await client.send({
            from:sender,
            to:recipient,
            subject:'Password Reset Request Successful !!',
            category:'password reset',
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        })
        console.log("Reset Password Email Success Details",response)
    } catch (error) {
        console.log(error.message);
        throw new Error("reset password email couldn't be sent");
    }
}