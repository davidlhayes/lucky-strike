module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/app.js',
      'app/login/login.js',
      'app/login/login_test.js'
    ],

    // list of files to exclude
    exclude: [

    ],

    // test results reporter to use
    reporters: ['progress'],

    // web server PORT
    port: 9876,

    colors: true,

    autoWatch : true,

    preprocessors: {
       'app/tests/*.js': [ 'browserify' ] //Mention path as per your test js folder
    },

    frameworks: ['jasmine', 'browserify'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-browserify'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
