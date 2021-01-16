/*
*version : https://github.com/yamilesquivel
*/
const termina = require ('./03-console-report-step-by-step');

test('devuelve string', () => {
  expect(termina()).toBe("Program Finish ✔");
});