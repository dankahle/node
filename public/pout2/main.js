define(['./company'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Company = $__0.Company;
  var company = new Company();
  company.hire('dank', 'carl', 'jim');
  company.doWork().forEach((function(x) {
    return document.write(x);
  }));
  return {};
});
