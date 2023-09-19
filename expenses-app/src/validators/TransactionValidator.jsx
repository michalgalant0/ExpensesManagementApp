// import { useContext } from "react";
// import { CurrencyContext } from "../contexts/CurrencyContext";
// import { CategoryContext } from "../contexts/CategoryContext";

const validateTitle = (title) => {
  const minLength = 3,
    maxLength = 30;
  const regex = /^[a-zA-Z0-9_\- ]+$/;

  if (!title) {
    return {
      isValid: false,
      error: "please, enter transation's title",
    };
  }

  // validate by length
  if (title.length < minLength) {
    return {
      isValid: false,
      error: "title is too short - 3 characters minimum",
    };
  }

  if (title.length > maxLength) {
    return {
      isValid: false,
      error: "title is too long - 30 characters maximum",
    };
  }

  // validate by regex
  if (!regex.test(title)) {
    return {
      isValid: false,
      error: "title contains forbidden characters",
    };
  }

  return { isValid: true, error: null };
};

const validateAmount = (amount) => {
  if (!amount) {
    return {
      isValid: false,
      error: "please, enter amount",
    };
  }

  if (isNaN(amount)) {
    return {
      isValid: false,
      error: "amount is not a number",
    };
  }

  return { isValid: true, error: null };
};

const validateCurrency = (currencies, currencyCode) => {
  // const currencies = useContext(CurrencyContext);

  if (!currencyCode) {
    return {
      isValid: false,
      error: "please, enter currency code",
    };
  }

  if (!!currencies.find((c) => c.currencyCode === currencyCode)) {
    return {
      isValid: false,
      error: "given currency is not valid",
    };
  }

  return { isValid: true, error: null };
};

const validateCategory = (categories, categoryName) => {
  // const categories = useContext(CategoryContext);

  if (!categoryName) {
    return {
      isValid: false,
      error: "please, enter category name",
    };
  }

  if (!!categories.find((c) => c.categoryName === categoryName)) {
    return {
      isValid: false,
      error: "given category is not valid",
    };
  }

  return { isValid: true, error: null };
};

const validateDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!date) {
    return {
      isValid: false,
      error: "please, enter date",
    };
  }

  if (!regex.test(date))
    return {
      isValid: false,
      error: "given value is not a date",
    };

  return { isValid: true, error: null };
};

const validateDescription = (description) => {
  const regex = /^[a-zA-Z0-9_\- ]*$/;

  if (!regex.test(description)) {
    return {
      isValid: false,
      error: "description contains forbidden characters",
    };
  }

  return { isValid: true, error: null };
};

const TransactionValidator = (formData, currencies, categories) => {
  const title = formData.title;
  const amount = formData.amount;
  const currencyCode = formData.currencyCode;
  const categoryName = formData.categoryName;
  const date = formData.date;
  const description = formData.description;

  const errors = {};

  // title validation
  const titleValidation = validateTitle(title);
  if (!titleValidation.isValid) errors.title = titleValidation.error;

  // amount validation
  const amountValidation = validateAmount(amount);
  if (!amountValidation.isValid) errors.amount = amountValidation.error;

  // currenct(code) validation
  const currencyValidation = validateCurrency(currencies, currencyCode);
  if (!currencyValidation.isValid) errors.currency = currencyValidation.error;

  // category(name) validation
  const categoryValidation = validateCategory(categories, categoryName);
  if (!categoryValidation.isValid) errors.category = categoryValidation.error;

  // date validation
  const dateValidation = validateDate(date);
  if (!dateValidation.isValid) errors.date = dateValidation.error;

  // description validation
  const descriptionValidation = validateDescription(description);
  if (!descriptionValidation.isValid)
    errors.description = descriptionValidation.error;

  return errors;
};

export default TransactionValidator;
