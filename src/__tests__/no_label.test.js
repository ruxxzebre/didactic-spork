const testData = require('./test_data_no_label.json');
const { processJSON } = require('../index.js');

const { input, output } = testData;

test('Overcomplicated test', () => {
  expect(processJSON(input, false)).toEqual(output);
});
