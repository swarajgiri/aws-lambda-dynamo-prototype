module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-aws-lambda');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        lambda_invoke: {
            default: {
                options: {
                    handler : 'canILambda',
                    filename: 'index.js',
                    event   : 'event.json'
                }
            }
        },
        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'node create-table-users.js'
            }
        }
    });

    grunt.registerTask('test', ['lambda_invoke']);
    grunt.registerTask('setup', ['shell']);
};
