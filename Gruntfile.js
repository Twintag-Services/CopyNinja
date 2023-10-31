module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      
      clean: ['dist/**','zip/**'],
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
            dest: 'dist/',
            ext: '.css'
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
                'dist/content.js': ['content.js'],
                'dist/popup.js': ['popup.js']
            }
        }
      },

      copy: {
        main: {
          files: [
            // includes files within path
            {expand: true, src: ['manifest.json'], dest: 'dist/'},
            {expand: true, src: ['animate.min.css'], dest: 'dist/'},
            {expand: true, src: ['popup.html'], dest: 'dist/'},
            {expand: true, src: ['icons/*'], dest: 'dist/'}
          ],
        },
      },

      /*zip: {
        cwd: 'nested/',
        'dist/zip/copyninja.zip': ['dist/*.*']
      }*/
    });
    
  
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-obfuscator');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');
  
    // Default task(s).
    grunt.registerTask('default', ['clean','uglify', 'cssmin','obfuscator','copy',]);
  };
  