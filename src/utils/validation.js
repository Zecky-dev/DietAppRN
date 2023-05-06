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




const validationSchema = yup.object().shape({




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


  email: yup
  .string()
  .typeError(text)
  .email(email)
  .required(required),

  password: yup
  .string()
  .typeError(text)
  .required(required)
  .min(8,({min}) => minCharacter(min))
  .max(16,({max}) => maxCharacter(max)),


  age: yup
  .number()
  .integer(integer)
  .typeError(numeric)
  .min(12,({min}) => minNumber(min))
  .max(100,({max}) => maxNumber(max))
  .required(required),

  gender: yup
  .string(text)
  .required(required),


  weight: yup
  .number()
  .typeError(numeric)
  .required(required),

  height: yup
  .number()
  .typeError(numeric)
  .required(required),

  waistCircum: yup
  .number()
  .typeError(numeric)
  .required(required),

  neckCircum: yup
  .number()
  .typeError(numeric)
  .required(required),

  hipCircum: yup
  .number()
  .typeError(numeric)
  .required(required),


  movementFrequency: yup
  .string(text)
  .required(required)

});

export default validationSchema;