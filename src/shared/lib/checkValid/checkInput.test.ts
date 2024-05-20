import { checkContainOnlyLetters } from './validationRules/checkContainOnlyLetters';

const validValues = ['SCvsdfd', 'S', 'Skdal', 't'];
const invalidValues = ['1', 'С', 'ш'];

describe('testing checkInput validation rules', () => {
  test('field can contain only latin letters', () => {
    validValues.forEach((value) => expect(checkContainOnlyLetters(value)).toBeFalsy());
    invalidValues.forEach((value) => expect(checkContainOnlyLetters(value)).toBeTruthy());
  });
});
