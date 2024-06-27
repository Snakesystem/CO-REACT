/* eslint-disable no-unused-vars */

import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { pawdRegExp, phoneRegExp } from "../utils/utility";

// SCHEMA FORM VALIDATION
export const useSchema = () => {

    const [t, i18n] = useTranslation('lang');

    // SCHEMA VALIDATION FOR REGISTER
    const registerSchema = yup.object().shape({ 
        Email: yup.string().email("This must be a email").required(t("GLOBAL.mandatory")),
        Fullname: yup.string().required(t("GLOBAL.mandatory")).min(3, t("VALIDATE.minlength")),
        MobilePhone: yup.string().required(t("GLOBAL.mandatory")).matches(phoneRegExp, t("VALIDATE.mobilephone")),
        BankAccountNumber: yup.string().required(t("GLOBAL.mandatory")),
        BankAccountHolder: yup.string().required(t("GLOBAL.mandatory")),
        QuestionRDN: yup.number().required(t("GLOBAL.mandatory")),
        Sales: yup.number(),
        BankName: yup.string().required(t("GLOBAL.mandatory")),
        Password: yup.string().required(t("GLOBAL.mandatory")).matches(pawdRegExp, t("REGIS.strengthpass")),
        ConfirmPassword: yup.string().required(t("GLOBAL.mandatory")).oneOf([yup.ref("Password"), null], t("VALIDATE.ConfPassErr")),
    }).required();

    // SCHEMA VALIDATION FOR LOGIN
    const loginSchema = yup.object().shape({ 
        Email: yup.string().email("This must be a email").required(t("GLOBAL.mandatory")),
        Password: yup.string().required(t("GLOBAL.mandatory")),
    }).required();

    // SCHEMA VALIDATION FOR BANK BCA
    const bcaSchema = yup.object().shape({ 
        District: yup.number().required(t("GLOBAL.mandatory")),
    }).required();

    // SCHEMA VALIDATION FOR BANK BCA
    const briSchema = yup.object().shape({ 
        District: yup.number().required(t("GLOBAL.mandatory")),
    }).required();

    // SCHEMA VALIDATION FOR BANK BCA
    const permataSchema = yup.object().shape({ 
        Occupation: yup.string(),
        Position: yup.string(),
        NatureOfBusiness: yup.string(),
    }).required();

    // SCHEMA VALIDATION FOR DATA PRIBADI
    const dataPribadiSchema = yup.object({ 
        // Email: yup.string().email("This must be a email").required(t("GLOBAL.mandatory")),
        // Fullname: yup.string().required(t("GLOBAL.mandatory")),
        // Agree: yup.boolean().required(t("GLOBAL.mandatory")),
        fundsource: yup.array().required(t("GLOBAL.mandatory")),
    }).required();

    // SCHEMA VALIDATION FOR DATA PENDUKUNG
    const dataPendukungSchema = yup.object({ 
        IDCardFile: yup.string(),
        SelfieFile: yup.string(),
        SignatureFile: yup.string(),
    }).required();

    return { registerSchema, loginSchema, bcaSchema, briSchema, permataSchema, dataPribadiSchema, dataPendukungSchema };
}