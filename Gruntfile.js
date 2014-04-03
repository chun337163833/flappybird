module.exports = function(grunt) {
  grunt.initConfig({
    jasmine: {
      pivotal: {
        src: 'compiled/**/*.js',
        options: {
          specs: 'specs/*Spec.js',
          helpers: 'specs/*Helper.js',
        }
      }
    },
    shell: {
        buildLime: {
            options: {
                stdout: true
            },
            //command: '/bin/lime.py build firstgame -o firstgame/compiled/hw.js'
            command:[
              'cd ../',
              'python bin/lime.py build flappybird -o flappybird/dist/main.js'
            ].join('&')
        },
        createDep:{
          command:[
              'cd ../',
              'python closure/closure/bin/calcdeps.py -p flappybird/src/js -o deps > flappybird/dist/my-deps.js'
          ].join('&')
          
        },
        runServer:{
          options: {
                stdout: true
          },
          command:[
              'cd ../',
              'python -m SimpleHTTPServer'
          ].join('&')
        }
    }
  });

  // Register tasks.
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-shell');

  // Default task.
  grunt.registerTask('default', 'final');
  grunt.registerTask('final', ['shell:buildLime','jasmine','server']);
  grunt.registerTask('build', ['shell:buildLime','jasmine']);
  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('server',['shell:runServer']);
  grunt.registerTask('updateDep',['shell:createDep']);
};