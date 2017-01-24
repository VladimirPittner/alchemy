'use strict';
var path = require('path');
var modRewrite = require('connect-modrewrite');
var _pug = require('pug');

// Default settings
module.exports.uglifyJs = process.env.UGLIFYJS || true; // to remove .min sufix edit template manually
module.exports.minifyCss = process.env.MINIFYCSS || true; // to remove .min sufix edit template manually
module.exports.cacheBust = process.env.CACHEBUST || true;
module.exports.optimizeImages = process.env.OPTIMIZEIMAGES || true;
module.exports.lintJs = process.env.LINTJS || false;

// Default paths
var app = 'app';
var tmp = '.tmp';
var dist = 'dist';
var bowerDir = 'bower_components';

// Default paths in app folder
var data = 'data';
var fonts = 'fonts';
var icons = 'fonticons';
var images = 'images';
var scripts = 'scripts';
var styles = 'styles';
var views = 'views';
var styleguide = 'styleguide';
var styleguideDocs = 'docs';

// Rewrite rules enables removing .html extensions in development.
// This are possible routes for same test.html file:
// http://localhost:3000/test.html
// http://localhost:3000/test
var rewriteRules = [
  '^/$ - [L]', // default site root handling (index.html)
  '.html$ - [L]', // ignore routes ends with '.html'
  '(.*)/$ $1/index.html [L]', // routes with trailing slash are directories -> rewrite to directory index.html
  '\\/\[a-zA-Z0-9_\\-\@.]+\\.\[a-zA-Z0-9]+$ - [L]', // ignore files with extension (eg. .css, .js, ...)
  '(.*)$ $1.html [L]' // redirect routes ends with string without trailing slash to original html
];

_pug.filters.code = function( block ) {
  return block
    .replace( /&/g, '&amp;'  )
    .replace( /</g, '&lt;'   )
    .replace( />/g, '&gt;'   )
    .replace( /"/g, '&quot;' )
    .replace( /#/g, '&#35;'  )
    .replace( /\\/g, '\\\\'  );
    // .replace( /\n/g, '\\n'   );
};

// Browser sync task config
module.exports.browserSync = {
  dev: {
    server: {
      baseDir: [tmp, app],
      routes: {
        '/bower_components': bowerDir
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
  },
  dist: {
    server: {
      baseDir: dist
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
  }
};

// Build size task config
module.exports.buildSize = {
  srcAll: dist + '/**/*',
  cfgAll: {
    title: 'build',
    gzip: true
  },
  srcCss: path.posix.join(dist, styles, '/**/*'),
  cfgCss: {
    title: 'CSS',
    gzip: true
  },
  srcJs: path.posix.join(dist, scripts, '/**/*'),
  cfgJs: {
    title: 'JS',
    gzip: true
  },
  srcImages: path.posix.join(dist, images, '/**/*'),
  cfgImages: {
    title: 'Images',
    gzip: false
  }
};

// Clean task config
// Be carefull what you cleaning!
module.exports.clean = [tmp, dist];

// Copy fonts task config
module.exports.copyFonts = {
  src: path.posix.join(app, fonts, '**/*'),
  dest: dist + '/fonts'
};

// Copy fonts task config
module.exports.copyIcons = {
  src: path.posix.join(app, icons, '**/*'),
  dest: dist + '/fonticons'
};

// Copy extras task config
module.exports.copyExtras = {
  src: [
    app + '/*.*',
    '!' + app + '/*.html'
  ],
  dest: dist,
  cfg: {
    dot: true
  }
};

// Deploy task config
// FTP settings are in .env file
module.exports.deploy = {
  src: dist + '/**',
  dev: {
    root: dist,
    hostname: process.env.FTP_DEV_HOSTNAME,
    username: process.env.FTP_DEV_USER,
    destination: process.env.FTP_DEV_DEST
  },
  dist: {
    root: dist,
    hostname: process.env.FTP_DIST_HOSTNAME,
    username: process.env.FTP_DIST_USER,
    destination: process.env.FTP_DIST_DEST
  }
};

// Images task config
module.exports.images = {
  src: path.posix.join(app, images, '**/*.{gif,png,jpg}'),
  srcSVG: path.posix.join(app, images, '**/*.svg'),
  dest: dist + '/images',
  cfg: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  }
};

// JSHint task config
module.exports.eslint = {
  src: [
    path.posix.join(app, scripts,'**/*.js'),
    path.posix.join('!' + app, scripts,'plugins/**/*.js') // do not lint external plugins
  ]
};

// Modernizr task config
module.exports.modernizr = {
  src: [
    path.posix.join(app, scripts,'**/*.js'),
    path.posix.join(tmp, styles,'*.css')
  ],
  dest: path.posix.join(tmp, scripts, 'plugins'),
  cfg: {
    silent: true,
    options: [
      'setClasses',
      'addTest',
      'html5printshiv',
      'testProp',
      'fnBind'
    ]
  }
};

// User scripts task
module.exports.scripts = {
  src: path.posix.join(app, scripts, '**/*.js'),
  dest: path.posix.join(tmp, scripts),
  babel: {
    presets: ['es2015'],
  }
};

// Styles task config
module.exports.styles = {
  src: path.posix.join(app, styles, '*.scss'),
  dest: path.posix.join(tmp,styles),
  sassCfg: {},
  autoprefixerCfg: {browsers: ['last 2 version']}
};

// Templates task config
module.exports.templates = {
  base: path.posix.join(app, views),
  baseBuild: path.posix.join(tmp, 'pug'),
  src: path.posix.join(app, views, '**/*.pug'),
  srcBuild: path.posix.join(tmp, '**/*.pug'),
  dest: tmp,
  destBuild: path.posix.join(dist),
  cfg: {
    pug: _pug,
    pretty: true,
    compileDebug: true
  }
};

// TemplatesData task config
module.exports.templatesData = {
  src: [
    path.posix.join(app, views, data, '/**/*.yaml'),
    path.posix.join(app, views, styleguide, data, '/**/*.yaml'),
  ],
  dest: path.posix.join(tmp, '/data'),
  dataName: 'data.yaml',
  dataPath: path.posix.join(tmp, 'data/data.yaml'),
  helpersPath: path.posix.join('../../', app, views, styleguide, 'helpers', 'helpers.js')
};

module.exports.useref = {
  src: path.posix.join(app, views, '/**/*.pug'),
  dest: dist,
  destPug: path.posix.join(tmp, 'pug'),
  assetsCfg: {
    searchPath: app
  },
  revManifestCfg: {merge: true}
};

// Watch task config
module.exports.watch = {
  styles: path.posix.join(app, styles, '/**/*.scss'),
  pug: [
    path.posix.join(app, views, '/**/*.pug'),
    path.posix.join(app, views, data, '/**/*.yaml'),
    path.posix.join(app, views, styleguide, data, '/**/*.yaml'),
    path.posix.join(app, views, styleguide, 'helpers', '/**/*.js')
  ],
  scripts: path.posix.join(app, scripts, '/**/*.js'),
  wiredep: 'bower.json'
};

// Wiredep task config
module.exports.wiredep = {
  sass: {
    src: path.posix.join(app, styles, '/*.scss'),
    dest: path.posix.join(app, styles),
    cfg: {
      ignorePath: '',
      overides: {}
    }
  },
  pug: {
    src: path.posix.join(app, views, '/layouts/*.pug'),
    srcLight: path.posix.join(app, views, styleguide, 'templates/*.pug'),
    dest: path.posix.join(app, views, '/layouts/'),
    destLight: path.posix.join(app, views, styleguide, 'templates/'),
    cfg: {
      exclude: [
        'modernizr',
        'bootstrap',
        'jquery-mousewheel'],
      ignorePath: '../../',
      overides: {}
    },
    cfgLight: {
      exclude: [
        'modernizr',
        'bootstrap',
        'jquery-mousewheel'],
      ignorePath: '../',
      overides: {}
    }
  }
};
