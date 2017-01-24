/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
	'use strict';
	function supportsProperty(p) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			i,
			div = document.createElement('div'),
			ret = p in div.style;
		if (!ret) {
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (i = 0; i < prefixes.length; i += 1) {
				ret = prefixes[i] + p in div.style;
				if (ret) {
					break;
				}
			}
		}
		return ret;
	}
	var icons;
	if (!supportsProperty('fontFeatureSettings')) {
		icons = {
			'caretdown': '&#xe600;',
			'caretright': '&#xe601;',
			'caretleft': '&#xe602;',
			'caretup': '&#xe603;',
			'twitter': '&#xf099;',
			'facebook': '&#xf09a;',
			'linkedin': '&#xf0e1;',
			'youtube': '&#xf167;',
			'add': '&#xe069;',
			'time': '&#xe08e;',
			'attach': '&#xe0c0;',
			'download': '&#xe0ff;',
			'upload': '&#xe100;',
			'chevrondown': '&#xe10f;',
			'chevronleft': '&#xe110;',
			'chevronright': '&#xe111;',
			'chevronup': '&#xe112;',
			'edit': '&#xe15e;',
			'check': '&#xe206;',
			'close': '&#xe209;',
			'ellipsis': '&#xe20f;',
			'refresh': '&#xe211;',
			'calendar': '&#xe21c;',
			'user': '&#xe253;',
			'doc': '&#xe272;',
			'home': '&#xe29e;',
			'search': '&#xe2ca;',
			'settings': '&#xe2cb;',
			'arrowup': '&#xe608;',
			'arrowright': '&#xe609;',
			'arrowdown': '&#xe60a;',
			'arrowleft': '&#xe60b;',
			'arrowcircleup': '&#xe60c;',
			'arrowcircleright': '&#xe60d;',
			'arrowcircledown': '&#xe60e;',
			'arrowcircleleft': '&#xe60f;',
			'googleplus': '&#xe610;',
			'eye': '&#xe9ce;',
			'code': '&#xea80;',
			'0': 0
		};
		delete icons['0'];
		window.icomoonLiga = function (els) {
			var classes,
				el,
				i,
				innerHTML,
				key;
			els = els || document.getElementsByTagName('*');
			if (!els.length) {
				els = [els];
			}
			for (i = 0; ; i += 1) {
				el = els[i];
				if (!el) {
					break;
				}
				classes = el.className;
				if (/icon/.test(classes)) {
					innerHTML = el.innerHTML;
					if (innerHTML && innerHTML.length > 1) {
						for (key in icons) {
							if (icons.hasOwnProperty(key)) {
								innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
							}
						}
						el.innerHTML = innerHTML;
					}
				}
			}
		};
		window.icomoonLiga();
	}
}());