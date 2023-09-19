const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginValidator = (formData) => {
  const errors = {};
  const email = formData.email;
  const password = formData.password;

  // email validation
  if (!email) {
    errors.email = "please, enter your email";
  } else if (!validateEmail(email)) {
    errors.email = "input value is not valid";
  }

  // password validation
  if (!password) {
    errors.password = "please, enter your password";
  }

  return errors;
};

export default LoginValidator;
