define(['./employee'], function($__0) {
  "use strict";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Employee = $__0.Employee;
  var Company = function Company() {};
  ($traceurRuntime.createClass)(Company, {
    hire: function() {
      for (var names = [],
          $__8 = 0; $__8 < arguments.length; $__8++)
        $traceurRuntime.setProperty(names, $__8, arguments[$traceurRuntime.toProperty($__8)]);
      this.employees = names.map((function(name) {
        return new Employee(name);
      }));
    },
    doWork: function() {
      var $__5 = this;
      return (function() {
        var e;
        var $__3 = 0,
            $__4 = [];
        for (var $__6 = $__5.employees[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__7; !($__7 = $__6.next()).done; ) {
          e = $__7.value;
          $traceurRuntime.setProperty($__4, $__3++, e.doWork());
        }
        return $__4;
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
