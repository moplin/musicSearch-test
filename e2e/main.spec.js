'use strict';

describe('Hello World', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:5000/#/');
    page = require('./main.po');
  });

  it('Should say hi!!', function() {
    expect(page.hw.getText()).toBe('helloWorld');
  });


});
