export function checkEmailError(email) {
  if (!email) {
    return "please enter email";
  } else if (!email.includes("@")) {
    return "please enter valid email";
  }

  return null;
}

export function isValidEmail(email) {
  if (!email) {
    return false;
  } else if (!email.includes("@")) {
    return false;
  }
  return true;
}

export function isValidPassword(password) {
  if (password.length < 6) {
    return false;
  }

  return true;
}

export function checkPasswordError(password) {
  if (password.length < 6) {
    return "password length should be more than 6 characters";
  }

  return null;
}
