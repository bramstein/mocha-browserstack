module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    base: "_site",
                    port: 9999
                }
            }
        },
        exec: {
            browserstacktest: {
                command: 'node_modules/browserstack-test/bin/browserstack-test -u $BROWSERSTACK_USERNAME -p $BROWSERSTACK_PASS -k $BROWSERSTACK_AUTHKEY -b browsers.json -t 60 http://localhost:9999/test-crossbrowser.html'
            }
        }
    });

    // Loading dependencies
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('browserstack-test');
            
    grunt.registerTask('test-crossbrowser', ['connect', 'exec:browserstacktest']);
    grunt.registerTask('default', ['test-crossbrowser']);
};
