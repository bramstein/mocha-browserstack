(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('mocha'));
  } else if (typeof define === 'function' && define.amd) {
    define(['mocha'], factory);
  } else {
    factory(Mocha);
  }
}(this, function (Mocha) {
  function clean(tests) {
    var result = [];

    for (var i = 0; i < tests.length; i += 1) {
      var t = {
        title: tests[i].title,
        fullTitle: tests[i].fullTitle(),
        duration: tests[i].duration
      };

      if (tests[i].state !== 'passed') {
        var str = tests[i].err.stack || tests[i].err.toString();

        if (!~str.indexOf(tests[i].err.message)) {
          str = tests[i].err.message + '\n' + str;
        }

        if ('[object Error]' == str) {
          str = tests[i].err.message;
        }

        if (!tests[i].err.stack && tests[i].err.sourceURL && tests[i].err.line !== undefined) {
          str += '\n(' + tests[i].err.sourceURL + ':' + tests[i].err.line + ')';
        }
        t.err = {
          message: str
        };
      }

      result.push(t);
    }
    return result;
  }

  return Mocha.BrowserStack = function (runner, root) {
    Mocha.reporters.HTML.call(this, runner, root);

    if (/browser=/i.test(window.location.search)) {
      var that = this,
          tests = [],
          failures = [],
          passes = [];

      runner.on('test end', function (test) {
        tests.push(test);
      });

      runner.on('pass', function (test) {
        passes.push(test);
      });

      runner.on('fail', function (test) {
        failures.push(test);
      });

      runner.on('end', function () {
        var xhr = null;

        if (window.XHMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.open('POST', window.location.href);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
          stats: that.stats,
          tests: clean(tests),
          failures: clean(failures),
          passes: clean(passes)
        }, null, 2));
      });
    }
  };
}));
