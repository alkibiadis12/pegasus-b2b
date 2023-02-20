import * as yup from 'yup';

// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Παρακαλώ δώστε έγκυρη διεύθυνση email.')
    .required('Required'),
  password: yup
    .string()
    .min(5, 'Ο κωδικός πρέπει να έχει τουλάχιστον 5 ψηφία.')
    .matches(passwordRules, {
      message:
        'Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα πεζό γράμμα, ένα κεφαλαίο γράμμα και έναν αριθμό.',
    })
    .required('Required'),
});
