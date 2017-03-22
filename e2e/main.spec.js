'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:5000/#/');
    page = require('./main.po');
  });

  it('should include h1 with title', function() {
    expect(page.h1El.getText()).toBe('helloWorld');
  });

});
