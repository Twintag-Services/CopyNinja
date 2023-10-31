module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      
      clean: ['dist/**'],
      uglify: {
        options: {
          compress:true,
          mangle: {
            reserved: ['jQuery']
          }
        },
        dist: {
          files: {
            'dist/content.js': ['content.js'],
            'dist/popup.js': ['popup.js']
          }
        }
      },
      
      // CSSMin configuration
      cssmin: {
        target: {
          files: [{
            expand: true,
            cwd: '',
            src: ['*.css', '!*.min.css'],
            dest: 'build/css',
            ext: '.min.css'
          }]
        }
      },
      obfuscator: {
        options: {
            // global options for the obfuscator
        },
        task1: {
            options: {
                // options for each sub task
            },
            files: {
                'dist/mz.js': [
                    'src/libs/countries.js',
                    'src/mz.js'
                ]
            }
        }
      },
    });
    
  
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
  
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
  };
  