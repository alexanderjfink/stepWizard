module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			dev: {
				options: {
					file: 'server/server.js',
					args: ['dev'],
					ignoredFiles: ['README.md', 'node_modules/**'],
					watchedExtensions: ['js'],
					watchedFolders: ['tests'],
					debug: false,
					delayTime: 1,
					env: {
						PORT: '1337'
					},
					cwd: __dirname
				}
			},
			exec: {
				options: {
					exec: 'less'
				}
			}
		},
		requirejs: {
			mainCSS: {
				options: {
					optimizeCss: "standard",
					cssIn: "./public/stylesheets/app.css",
					out: "./public/stylesheets/app.min.css"
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'public/javascripts/app/**/*.js', '!public/javascripts/app/**/*min.js'],
			options: {
				globals: {
					jQuery: true,
					console: false,
					module: true,
					document: true
				}
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['server/tests/**/*.js']
			}
		},
		shell: {
			copyBootstrapCSS: {
				command: 'cp ./public/javascripts/vendor/bootstrap/dist/css/bootstrap.css ./public/stylesheets/bootstrap.css'
			},
			copyFontAwesomeCSS: {
				command: 'cp ./public/javascripts/vendor/font-awesome/css/font-awesome.css ./public/stylesheets/font-awesome.css && cp ./public/javascripts/vendor/font-awesome/css/font-awesome-ie7.css ./public/stylesheets/font-awesome-ie7.css'
			},
			copyFontAwesomeFonts: {
				command: 'cp -r ./public/javascripts/vendor/font-awesome/font/* ./public/font'
			}
		},
		less: {
			production: {
				options: {
					paths: ["public/stylesheets"]
				},
				files: {
					"public/stylesheets/includes/css/*.css": "public/stylesheets/includes/less/*.less"
				}
			}
		}


		// Custom compile Foundation's SCSS
		// sass: {
		// 	options: {
		// 		includePaths: ['public/javascripts/vendor/foundation/scss']
		// 	},
		// 	dist: {
		// 		options: {
		// 			outputStyle: 'compressed'
		// 		},
		// 		files: {
		// 			'public/stylesheets/includes/css/custom.css': 'public/stylesheets/includes/scss/custom.scss'
		// 		}
		// 	}
		// },

		watch: {
			grunt: { files: ['Gruntfile.js'] },

			less: {
				files: 'public/stylesheets/less/**/*.less',
				tasks: ['less']
			}
			// sass: {
			// 	files: 'public/stylesheets/scss/**/*.scss',
			// 	tasks: ['scss']
			// }
		}
	});

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.registerTask('test', ['jshint', 'mochaTest' ]);
	grunt.registerTask('init', ['shell:copyBootstrapCSS','shell:copyFontAwesomeCSS', 'shell:copyFontAwesomeFonts','less', 'requirejs:mainCSS']); // 'requirejs:mainJS',
	grunt.registerTask('build', ['less', 'requirejs:mainCSS']); // 'requirejs:mainJS',
	grunt.registerTask('server', ['less','nodemon:dev']);
	grunt.registerTask('default', ['init', 'build']); // 'test',

};
