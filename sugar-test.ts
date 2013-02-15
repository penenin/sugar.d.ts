/// <reference path="sugar.d.ts" />

'schfifty'.add(' five');		// - > schfifty five
'dopamine'.insert('e', 3);		// - > dopeamine
'spelling eror'.insert('r', -3);// - > spelling error

'Welcome, Mr. {name}.'.assign({ name: 'Franklin' });	// - > 'Welcome, Mr. Franklin.'
'You are {1} years old today.'.assign(14);				// - > 'You are 14 years old today.'
'{n} and {r}'.assign({ n: 'Cheech' }, { r: 'Chong' });	// - > 'Cheech and Chong'

'jumpy'.at(0);					// - > 'j'
'jumpy'.at(2);					//- > 'm'
'jumpy'.at(5);					// - > 'j'
'jumpy'.at(5, false);			// - > ''
'jumpy'.at(-1);					// - > 'y'
'lucky charms'.at(2, 4, 6, 8);	// - > ['u', 'k', 'y', c']

'caps_lock'.camelize();					// - > 'CapsLock'
'moz-border-radius'.camelize();			// - > 'MozBorderRadius'
'moz-border-radius'.camelize(false);	// - > 'mozBorderRadius'

'caps_lock'.camelize();					// - > 'CapsLock'
'moz-border-radius'.camelize();			// - > 'MozBorderRadius'
'moz-border-radius'.camelize(false);	// - > 'mozBorderRadius'

'jumpy'.chars();	// - > ['j', 'u', 'm', 'p', 'y']
'jumpy'.chars(function (c) {
	// Called 5 times: "j","u","m","p","y"
});

'jumpy'.codes();	// - > [106, 117, 109, 112, 121]
'jumpy'.codes(function (c) {
	// Called 5 times: 106, 117, 109, 112, 121
});

'too \n much \n space'.compact();	// - > 'too much space'
'enough \n '.compact();				// - > 'enough'

'a_farewell_to_arms'.dasherize();	// - > 'a-farewell-to-arms'
'capsLock'.dasherize();				// - > 'caps-lock'

'aHR0cDovL3R3aXR0ZXIuY29tLw=='.decodeBase64();	// - > 'http://twitter.com/'
'anVzdCBnb3QgZGVjb2RlZA=='.decodeBase64();		// - > 'just got decoded!'

'jumpy'.each();			// - > ['j', 'u', 'm', 'p', 'y']
'jumpy'.each(/[r-z]/);	// - > ['u', 'y']
'jumpy'.each(/[r-z]/, function (m) {
		// Called twice: "u", "y"
});

'gonna get encoded!'.encodeBase64();	// - > 'Z29ubmEgZ2V0IGVuY29kZWQh'
'http://twitter.com/'.encodeBase64();	// - > 'aHR0cDovL3R3aXR0ZXIuY29tLw=='

'jumpy'.endsWith('py');			// - > true
'jumpy'.endsWith(/[q-z]/);		// - > true
'jumpy'.endsWith('MPY');		// - > false
'jumpy'.endsWith('MPY', false);	// - > true

'<p>some text</p>'.escapeHTML();	// - > '&lt;p&gt;some text&lt;/p&gt;'
'one & two'.escapeHTML();			// - > 'one &amp; two'

'really?'.escapeRegExp();		// - > 'really\?'
'yes.'.escapeRegExp();			// - > 'yes\.'
'(not really)'.escapeRegExp();	// - > '\(not really\)'

'http://foo.com/"bar"'.escapeURL();		// - > 'http://foo.com/%22bar%22'
'http://foo.com/"bar"'.escapeURL(true);	// - > 'http%3A%2F%2Ffoo.com%2F%22bar%22'

'lucky charms'.first();		// - > 'l'
'lucky charms'.first(3);	// - > 'luc'

'lucky charms'.from();	// - > 'lucky charms'
'lucky charms'.from(7);	// - > 'harms'