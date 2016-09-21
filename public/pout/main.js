define("../pout/employee", [], function() {
  "use strict";
  var __moduleName = "../pout/employee";
  var s_name = Symbol();
  var Employee = function Employee(name) {
    this.name = name;
  };
  ($traceurRuntime.createClass)(Employee, {
    get name() {
      return this[$traceurRuntime.toProperty(s_name)];
    },
    set name(val) {
      $traceurRuntime.setProperty(this, s_name, val);
    },
    doWork: function() {
      return (this.name + " is working.<br>");
    }
  }, {});
  ;
  return {
    get Employee() {
      return Employee;
    },
    __esModule: true
  };
});
define("../pout/company", ['./employee'], function($__1) {
  "use strict";
  var __moduleName = "../pout/company";
  if (!$__1 || !$__1.__esModule)
    $__1 = {default: $__1};
  var Employee = $__1.Employee;
  var Company = function Company() {};
  ($traceurRuntime.createClass)(Company, {
    hire: function() {
      for (var names = [],
          $__9 = 0; $__9 < arguments.length; $__9++)
        $traceurRuntime.setProperty(names, $__9, arguments[$traceurRuntime.toProperty($__9)]);
      this.employees = names.map((function(name) {
        return new Employee(name);
      }));
    },
    doWork: function() {
      var $__6 = this;
      return (function() {
        var e;
        var $__4 = 0,
            $__5 = [];
        for (var $__7 = $__6.employees[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__8; !($__8 = $__7.next()).done; ) {
          e = $__8.value;
          $traceurRuntime.setProperty($__5, $__4++, e.doWork());
        }
        return $__5;
      }());
    }
  }, {});
  return {
    get Company() {
      return Company;
    },
    __esModule: true
  };
});
define("../pout/main", ['./company'], function($__10) {
  "use strict";
  var __moduleName = "../pout/main";
  if (!$__10 || !$__10.__esModule)
    $__10 = {default: $__10};
  var Company = $__10.Company;
  var company = new Company();
  company.hire('dank', 'carl', 'jim');
  company.doWork().forEach((function(x) {
    return document.write(x);
  }));
  return {};
});
