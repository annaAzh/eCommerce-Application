import { removeHtmlTags } from './removeHtmlTags';

const testStr = '<div>Test, <b>another!</b> <a href="https://example.com">Test</a></div>';

const expectedResult = 'Test, another! Test';

test('test removeHtmlTags', () => {
  const result = removeHtmlTags(testStr);
  expect(result).toBe(expectedResult);
});
