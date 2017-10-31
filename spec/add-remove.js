var benchpress = require('@angular/benchpress');
var runner = new benchpress.Runner([
  //use protractor as Webdriver client
  benchpress.SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS,
  //use RegressionSlopeValidator to validate samples
  {provide: benchpress.Validator, useExisting: benchpress.RegressionSlopeValidator},
  //use 10 samples to calculate slope regression
  {provide: benchpress.RegressionSlopeValidator.SAMPLE_SIZE, useValue: 20},
  //use the script metric to calculate slope regression
  {provide: benchpress.RegressionSlopeValidator.METRIC, useValue: 'scriptTime'},
  {provide: benchpress.Options.FORCE_GC, useValue: true}
]);

describe('test input', () => {
  it('should enter and remove text', done => {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:5555/');

    runner.sample({
      id: 'deep-tree',
      execute: function() {
        $('.fa:first-of-type').click();
        $('input:first-of-type').sendKeys(protractor.Key.ENTER);
      }
    }).then(done, done.fail);
  });
});
