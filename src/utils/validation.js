const yup = require('yup');

const required = "Bu alanın girilmesi zorunludur.";
const numeric = "Bu alana sayısal bir ifade girmelisiniz."
const text = "Bu alana metinsel bir ifade girmelisiniz.";
const integer = "Bu alana girdiğiniz değer bir tam sayı olmalıdır.";
const email = "Bu alana e-posta formatında bir değer girmelisiniz."
const passwordRequirements = "Şifreniz yeterince güçlü değil."
const minCharacter = (min) => `Bu alana en az ${min} karakter girmelisiniz.`
const maxCharacter = (max) => `Bu alana en fazla ${max} karakter girmelisiniz.`
const minNumber = (min) => `Bu alana en az ${min} değerini girebilirsiniz..`
const maxNumber = (max) => `Bu alana en fazla ${max} değerini girebilirsiniz.`

const defaultValidations = {
  name: yup
  .string()
  .typeError(text)
  .required(required)
  .min(3,({min}) => minCharacter(min))
  .max(24,({max}) => maxCharacter(max)),


  surname: yup
  .string()
  .typeError(text)
  .required(required)
  .min(3,({min}) => minCharacter(min))
  .max(24, ({max}) => maxCharacter(max)),

  age: yup
  .number()
  .integer(integer)
  .typeError(numeric)
  .min(12,({min}) => minNumber(min))
  .max(100,({max}) => maxNumber(max))
  .required(required),

  weight: yup
  .number()
  .min(30,({min}) => minNumber(min))
  .max(250, ({max}) => maxNumber(max))
  .typeError(numeric)
  .required(required),

  height: yup
  .number()
  .typeError(numeric)
  .min(120,({min}) => minNumber(min))
  .max(250, ({max}) => maxNumber(max))
  .required(required),

  waistCircum: yup
  .number()
  .typeError(numeric)
  .min(55,({min}) => minNumber(min))
  .max(130, ({max}) => maxNumber(max))
  .required(required),

  neckCircum: yup
  .number()
  .typeError(numeric)
  .min(30,({min}) => minNumber(min))
  .max(55, ({max}) => maxNumber(max))
  .required(required),

  hipCircum: yup
  .number()
  .typeError(numeric)
  .min(50,({min}) => minNumber(min))
  .max(150, ({max}) => maxNumber(max))
  .required(required),
}

const registerValidationSchema = yup.object().shape({
  ...defaultValidations,
  email: yup
  .string()
  .typeError(text)
  .email(email)
  .required(required),

  password: yup
  .string()
  .typeError(text)
  .required(required)
  .matches(/^[^\s]{8,16}$/,'Şifreniz 8 ile 16 karakter arası olmalıdır.'),

  confirmPassword: yup.string().oneOf([yup.ref('password')],"Şifreler uyuşmuyor.").required(),

})
const updateValidations = yup.object().shape(defaultValidations);





export {registerValidationSchema,updateValidations};