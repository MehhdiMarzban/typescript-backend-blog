import * as yup from "yup";

export const loginValidation = yup.object().shape({
    username: yup.string().required().min(6).max(16),
    password: yup.string().required().min(6).max(32),
});

export const registerValidation = yup.object().shape({
    fullname: yup.string().required().min(4).max(64),
    username: yup.string().required().min(6).max(16),
    password: yup.string().required().min(6).max(32),
    email: yup.string().email(),
    mobile: yup.string().length(11),
});
