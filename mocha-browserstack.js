(function () {
  if (Mocha) {
    function clean(tests) {
      var result = [];

      for (var i = 0; i < tests.length; i += 1) {
        result.push({
          title: tests[i].title,
          fullTitle: tests[i].fullTitle(),
          duration: tests[i].duration
        });
      }
      return result;
    }

    Mocha.BrowserStack = function (runner, root) {
      Mocha.reporters.HTML.call(this, runner, root);

      if (/browserstack=true/i.test(window.location.search)) {
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
          var xhr = new XMLHttpRequest();

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
  }
}());
