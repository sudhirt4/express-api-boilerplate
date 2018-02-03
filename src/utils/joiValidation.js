export function normalizeErrors(joiErrs) {
  if (!joiErrs || !joiErrs.details) {
    return null;
  }

  let errors = {};
  for (let i = 0, leni = joiErrs.details.length; i < leni; i++) {
    let detail = joiErrs.details[i];
    let path = detail.path.reduce((a, b) => a + '.' + b);
    errors[path] = detail.message;
  }

  return errors;
}
