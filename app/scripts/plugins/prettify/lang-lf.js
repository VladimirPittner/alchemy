/**
 * @fileoverview
 * Registers a language handler for Lighting Fly SCSS mixins library.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-lf"></pre>
 *
 *
 * This language handler is just extended SCSS language handler by kyo@haiil2u.net
 * https://github.com/hail2u/google-code-prettify-language-handlers
 *
 * @author iam@vladimirpittner.sk
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
            // The space production <s>
            [PR['PR_PLAIN'], /^[ \t\r\n\f]+/, null, ' \t\r\n\f']
        ],
        [
            // Quoted strings.  <string1> and <string2>
            [PR['PR_STRING'], /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null],
            [PR['PR_STRING'], /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null],
            ['lang-lf-str', /^url\(([^\)\"\']+)\)/i],
            [PR['PR_KEYWORD'], /^(?:url|rgba?|hsla?|\!important)(?=[^\-\w]|$)/i, null],
            // SCSS 
            ['atn', /^(@import|@page|@media|@charset|abs|adjust-color|adjust-hue|alpha|blue|ceil|change-color|comparable|complement|darken|desaturate|fade-in|fade-out|floor|grayscale|green|hue|invert|join|length|lighten|lightness|mix|nth|opacity|percentage|quote|red|round|saturate|saturation|scale-color|transparentize|type-of|unit|unitless|unquote|!default|@extend|@debug|@warn|@if|@else( if)?|@for|@each|@while|@mixin|@include|@function|@return)(?=[^\-\w]|$)/i, null],
            // LF mixins
            ['fun', /^(border-radius|border-top-radius|border-right-radius|border-bottom-radius|border-left-radius|box-shadow|linear-gradient|radial-gradient|background-color|background-image|background-size|background-clip|background-origin|_linear-gradient|_radial-gradient|transition|transition-property|transition-duration|transition-timing-function|transition-delay|transition-fix|keyframes|animation|animation-name|animation-duration|animation-timing-function|animation-delay|animation-iteration-count|animation-direction|animation-fill-mode|animation-play-state|transform|transform-origin|transform-style|perspective|perspective-origin|backface-visibility|clearfix|clearfix-old|center-unknown|box-sizing|calc|color|user-select|font-size|text-ellipsis|visually-hidden|_get-em|_get-rem|apply-to-moz|apply-to-opera|apply-to-webkit)(\(?=[^\-\w]|$)/i, null],
            // A property name -- an identifier followed by a colon.
            ['lang-lf-kw', /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],
            // A C style block comment.  The <comment> production.
            [PR['PR_COMMENT'], /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
            // A C style line comment.
            [PR['PR_COMMENT'], /^\/\/[^\r\n]*/, null],
            // Escaping text spans
            // [PR['PR_COMMENT'], /^(?:<!--|-->)/],
            // A number possibly containing a suffix.
            [PR['PR_LITERAL'], /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
            // A hex color
            [PR['PR_LITERAL'], /^#(?:[0-9a-f]{3}){1,2}/i],
            // Interpolation syntax: #{...}
            [PR['PR_LITERAL'], /^#{.*?}/],
            // Parental reference: &
            [PR['PR_LITERAL'], /^&/],
            // An identifier
            [PR['PR_PLAIN'], /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
            // An SCSS variable (for preventing keyword highlihting)
            [PR['PR_PLAIN'], /^\$?-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
            // A run of punctuation
            [PR['PR_PUNCTUATION'], /^[^\s\w\'\"#{}$]+/]
        ]
    ),
    ['lf', 'lf']
);

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [],
        [
            [PR['PR_KEYWORD'], /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]
        ]
    ),
    ['lf-kw']
);

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [],
        [
            [PR['PR_STRING'], /^[^\)\"\']+/]
        ]
    ),
    ['lf-str']
);
