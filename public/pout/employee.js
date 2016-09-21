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
