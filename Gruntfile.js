/**
 * phpMyFAQ Gruntfile.js
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @category  phpMyFAQ
 * @package   Development
 * @author    Thorsten Rinne <thorsten@phpmyfaq.de>
 * @copyright 2013-2018 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/2.0/ Mozilla Public License Version 2.0
 * @link      http://www.phpmyfaq.de
 * @since     2013-06-23
 */

/*global module:false, require:false */

module.exports = function (grunt) {

  'use strict';

  // Load all tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    //
    // Metadata.
    //
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! phpMyFAQ v<%= pkg.version %> - <%= pkg.homepage %> - Copyright (c) 2001 - <%= grunt.template.today("yyyy") %> Thorsten Rinne and phpMyFAQ Team */\n',
    bumpup: {
      files: ['package.json', 'composer.json']
    },

    //
    // Task configuration.
    //

    clean: {
      build: {
        src: [
          'phpmyfaq/assets/js/vendor.js',
          'phpmyfaq/assets/js/phpmyfaq.js',
          'phpmyfaq/assets/js/phpmyfaq.js.map',
          'phpmyfaq/assets/js/phpmyfaq.min.js',
          'phpmyfaq/assets/js/modernizr.min.js'
        ]
      }
    },
    copy: {
      tinymce: {
        files: [
          {
            expand: true,
            src: 'node_modules/tinymce/tinymce.min.js',
            flatten: true,
            dest: 'phpmyfaq/admin/assets/js/editor'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/plugins/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/js/editor/plugins/'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/skins/',
            src: '**/*.!(scss)',
            dest: 'phpmyfaq/admin/assets/js/editor/skins/'
          },
          {
            expand: true,
            cwd: 'node_modules/tinymce/themes/',
            src: '**',
            dest: 'phpmyfaq/admin/assets/js/editor/themes/'
          }
        ]
      },
      openiconic: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/open-iconic/svg/',
            src: '**',
            dest: 'phpmyfaq/assets/svg/'
          }
        ]
      },
      highlightjs: {
        files: [
          {
            expand: true,
            src: 'node_modules/highlightjs/highlight.pack.js',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          },
          {
            expand: true,
            src: 'node_modules/highlightjs/styles/default.css',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          }
        ]
      },
      bxslider: {
        files: [
          {
            expand: true,
            src: 'node_modules/bxslider/dist/jquery.bxslider.css',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          },
          {
            expand: true,
            src: 'node_modules/bxslider/dist/jquery.bxslider.js',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          },
          {
            expand: true,
            src: 'node_modules/bxslider/dist/images/bx_loader.gif',
            flatten: true,
            dest: 'phpmyfaq/assets/themes/default/css/images'
          },
          {
            expand: true,
            src: 'node_modules/bxslider/dist/images/controls.png',
            flatten: true,
            dest: 'phpmyfaq/assets/themes/default/css/images'
          }
        ]
      },
      cookieconsent: {
        files: [
          {
            expand: true,
            src: 'node_modules/cookieconsent/build/cookieconsent.min.css',
            flatten: true,
            dest: 'phpmyfaq/assets/js/libs'
          }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      vendors: {
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/popper.js/dist/umd/popper.min.js',
          'node_modules/bootstrap/js/dist/util.js',
          'node_modules/bootstrap/js/dist/tooltip.js',
          'node_modules/bootstrap/js/dist/alert.js',
          'node_modules/bootstrap/js/dist/button.js',
          'node_modules/bootstrap/js/dist/collapse.js',
          'node_modules/bootstrap/js/dist/dropdown.js',
          'node_modules/bootstrap/js/dist/modal.js',
          'node_modules/bootstrap/js/dist/popover.js',
          'node_modules/bootstrap/js/dist/tab.js',
          'node_modules/corejs-typeahead/dist/typeahead.bundle.js',
          'node_modules/handlebars/dist/handlebars.js',
          'node_modules/mermaid/dist/mermaid.js',
          'node_modules/bootstrap-fileinput/js/fileinput.js',
          'node_modules/bxslider/dist/jquery.bxslider.js',
          'node_modules/cookieconsent/src/cookieconsent.js'
        ],
        dest: 'phpmyfaq/assets/js/vendors.js'
      },
      dist: {
        src: [
          'phpmyfaq/assets/js/add.js',
          'phpmyfaq/assets/js/autosave.js',
          'phpmyfaq/assets/js/category.js',
          'phpmyfaq/assets/js/comments.js',
          'phpmyfaq/assets/js/editor.js',
          'phpmyfaq/assets/js/faq.js',
          'phpmyfaq/assets/js/records.js',
          'phpmyfaq/assets/js/typeahead.js',
          'phpmyfaq/assets/js/functions.js',
          'phpmyfaq/assets/js/setup.js'
        ],
        dest: 'phpmyfaq/assets/js/phpmyfaq.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        preserveComments: 'some'
      },
      frontend: {
        files: {
          'phpmyfaq/assets/js/phpmyfaq.min.js': [ '<%= concat.dist.dest %>' ]
        }
      },
      phpmyfaq_tinymce_plugin: {
        files: {
          'phpmyfaq/admin/assets/js/editor/plugins/phpmyfaq/plugin.min.js': ['phpmyfaq/admin/assets/js/phpmyfaq.tinymce.plugin.js'],
          'phpmyfaq/admin/assets/js/editor/plugins/imageupload/plugin.min.js': ['phpmyfaq/admin/assets/js/imageupload.tinymce.plugin.js']
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      beforeconcat: [
        'phpmyfaq/admin/assets/js/*.js',
        'phpmyfaq/assets/js/*.js'
      ]
    },
    sass: {
      options: {
        sourceMap: true
      },
      development: {
        banner: '<%= banner %>',
        files: {
          'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/scss/style.scss',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/scss/style.rtl.scss',
          'phpmyfaq/assets/themes/default/css/style.css': 'phpmyfaq/assets/themes/default/scss/style.scss'
          //'phpmyfaq/assets/themes/default/css/style.rtl.css': 'phpmyfaq/assets/themes/default/scss/style.rtl.scss'
        }
      },
      production: {
        files: {
          'phpmyfaq/admin/assets/css/style.css': 'phpmyfaq/admin/assets/scss/style.scss',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/scss/style.rtl.scss',
          'phpmyfaq/assets/themes/default/css/style.css': 'phpmyfaq/assets/themes/default/scss/style.scss'
          //'phpmyfaq/assets/themes/default/css/style.rtl.css': 'phpmyfaq/assets/themes/default/scss/style.rtl.scss'
        },
        compress: true
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '<%= banner %>',
          keepSpecialComments: 0
        },
        files: {
          'phpmyfaq/admin/assets/css/style.min.css': 'phpmyfaq/admin/assets/css/style.css',
          //'phpmyfaq/admin/assets/css/style.rtl.css': 'phpmyfaq/admin/assets/css/style.rtl.css',
          'phpmyfaq/assets/themes/default/css/style.min.css': ['phpmyfaq/assets/themes/default/css/style.css']
          //'phpmyfaq/assets/themes/default/css/style.rtl.min.css': ['phpmyfaq/assets/themes/default/css/style.rtl.css']
        }
      }
    },
    modernizr: {
      dist: {
        dest: 'phpmyfaq/assets/js/modernizr.min.js',
        uglify: true
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['phpmyfaq/admin/assets/js/**/*.js', 'phpmyfaq/assets/js/*.js'],
        tasks: ['clean', 'jshint', 'concat', 'uglify'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['phpmyfaq/admin/assets/scss/*.scss', 'phpmyfaq/assets/themes/default/scss/*.scss'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['hpmyfaq/assets/themes/default/templates/default/*.html'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'copy', 'jshint', 'concat', 'uglify', 'sass:development', 'cssmin', 'modernizr']);

  // Build task
  grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'sass:production', 'cssmin', 'modernizr']);

  // Watcher
  grunt.event.on('watch', function (action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
};
