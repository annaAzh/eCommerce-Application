import { checkContainDomain } from './validationRules/checkContainDomain';
import { checkEmailFormat } from './validationRules/checkEmailFormat';
import { checkEmailSeparator } from './validationRules/checkEmailSeparator';
import { checkTrailingSpaces } from './validationRules/checkTrailingSpaces';

const validEmails = ['user@exemple.com', 'a@b.ru', '1@s.com'];

describe('testing checkEmail validation rules', () => {
  it('email must not contain leading or trailing whitespace', () => {
    const invalidEmails = [' user@exemple.com', 'user@exemple.com '];
    validEmails.forEach((email) => expect(checkTrailingSpaces(email)).toBeFalsy());
    invalidEmails.forEach((email) => expect(checkTrailingSpaces(email)).toBeTruthy());
  });
  it('email must contain an @ symbol', () => {
    const invalidEmails = ['userexemple.com', 'exemple.com'];
    validEmails.forEach((email) => expect(checkEmailSeparator(email)).toBeFalsy());
    invalidEmails.forEach((email) => expect(checkEmailSeparator(email)).toBeTruthy());
  });
  it('email must contain a domain name', () => {
    const invalidEmails = ['userexemple@.com', 'exemple.com'];
    validEmails.forEach((email) => expect(checkContainDomain(email)).toBeFalsy());
    invalidEmails.forEach((email) => expect(checkContainDomain(email)).toBeTruthy());
  });
  it('email must be in English and formatted like user@example.com', () => {
    const invalidEmails = ['userexemple@.com', 'exemple.com', ' 1', 'SddcxXZ', '//'];
    validEmails.forEach((email) => expect(checkEmailFormat(email)).toBeFalsy());
    invalidEmails.forEach((email) => expect(checkEmailFormat(email)).toBeTruthy());
  });
});
