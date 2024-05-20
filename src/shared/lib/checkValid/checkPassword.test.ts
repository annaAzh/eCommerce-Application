import { checkContainEightCharacters } from './validationRules/checkContainEightCharacters';
import { checkContainOneDigit } from './validationRules/checkContainOneDigit ';
import { checkContainOneLowercaseLetter } from './validationRules/checkContainOneLowercaseLetter';
import { checkContainOneSpecialCharacter } from './validationRules/checkContainOneSpecialCharacter';
import { checkContainOneUppercaseLetter } from './validationRules/checkContainOneUppercaseLetter';
import { checkTrailingSpaces } from './validationRules/checkTrailingSpaces';

const validPasswords = ['#0aAasds', '1Sggjh&csa', 'xcaSj18F*&'];

describe('testing checkPassword validation rules', () => {
  it('password must not contain leading or trailing whitespace', () => {
    const invalidPasswords = [' ', ' sad', 'sda '];
    validPasswords.forEach((password) => expect(checkTrailingSpaces(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkTrailingSpaces(password)).toBeTruthy());
  });
  it('password must contain at least one special character (!@#$%^&*)', () => {
    const invalidPasswords = [' ', ' sad', 'sda ', '1'];
    validPasswords.forEach((password) => expect(checkContainOneSpecialCharacter(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkContainOneSpecialCharacter(password)).toBeTruthy());
  });
  it('password must contain at least one digit (0-9)', () => {
    const invalidPasswords = [' ', ' sad', 'sda '];
    validPasswords.forEach((password) => expect(checkContainOneDigit(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkContainOneDigit(password)).toBeTruthy());
  });
  it('password must contain at least one lowercase letter (a-z)', () => {
    const invalidPasswords = [' ', ' AS', 'SA ', '1'];
    validPasswords.forEach((password) => expect(checkContainOneLowercaseLetter(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkContainOneLowercaseLetter(password)).toBeTruthy());
  });
  it('password must contain at least one uppercase letter (A-Z)', () => {
    const invalidPasswords = [' ', ' s', 'czx ', '1'];
    validPasswords.forEach((password) => expect(checkContainOneUppercaseLetter(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkContainOneUppercaseLetter(password)).toBeTruthy());
  });
  it('password must be at least 8 characters long', () => {
    const invalidPasswords = [' ', ' s', 'czx ', '1', 'xxxxx'];
    validPasswords.forEach((password) => expect(checkContainEightCharacters(password)).toBeFalsy());
    invalidPasswords.forEach((password) => expect(checkContainOneUppercaseLetter(password)).toBeTruthy());
  });
});
