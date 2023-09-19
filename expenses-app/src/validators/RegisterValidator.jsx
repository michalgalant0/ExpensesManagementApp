const validateNickname = (nickname) => {
  const isValid = nickname.length >= 3;
  const error = isValid ? null : "nickname is too short - 3 characters minimum";

  return { isValid: isValid, error: error };
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValid = emailRegex.test(email);
  const error = isValid ? null : "input value is not valid";

  return { isValid: isValid, error: error };
};

const validatePassword = (password) => {
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  const forbiddenChars = /[{}"'`\\]/;

  if (password.length < minLength) {
    return {
      isValid: false,
      error: "password is too short - 8 characters minimum",
    };
  }

  if (!uppercaseRegex.test(password)) {
    return {
      isValid: false,
      error: "password must contain at least 1 capital letter",
    };
  }

  if (!lowercaseRegex.test(password)) {
    return {
      isValid: false,
      error: "password must contain at least 1 lowercase letter",
    };
  }

  if (!specialCharsRegex.test(password)) {
    return {
      isValid: false,
      error: "password must contain at least 1 special character",
    };
  }

  if (forbiddenChars.test(password)) {
    return { isValid: false, error: "password contains forbidden characters" };
  }

  return { isValid: true, error: null };
};

const RegisterValidator = (formData) => {
  const nickname = formData.nickname;
  const email = formData.email;
  const password = formData.password;

  const errors = {};
  const nicknameValidation = validateNickname(nickname);
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  // nickname validation
  if (!nickname) errors.nickname = "please, enter your nickname";
  else if (!nicknameValidation.isValid)
    errors.nickname = nicknameValidation.error;

  // email validation
  if (!email) errors.email = "please, enter your email";
  else if (!emailValidation.isValid) errors.email = emailValidation.error;

  // password validation
  if (!password) errors.password = "please, enter your password";
  else if (!passwordValidation.isValid)
    errors.password = passwordValidation.error;

  return errors;
};

export default RegisterValidator;
