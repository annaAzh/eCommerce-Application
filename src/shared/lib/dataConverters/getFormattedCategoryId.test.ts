import { getFormattedCategoryId } from './getFormattedCategoryId';

describe('test getFormattedCategoryId', () => {
  it('should be equal expectedResult', () => {
    const testStr = 'category:"12345" name:"test"';
    const expectedResult = 'categories.id:"category:"12345" name:"test""';
    const result = getFormattedCategoryId(testStr);

    expect(result).toBe(expectedResult);
  });
});
