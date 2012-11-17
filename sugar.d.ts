﻿//     sugar.d.ts
//     (c) 2012 Josh Baldwin
//     sugar.d.ts may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/jbaldwin/sugar.d.ts

interface String {

	/***
	* @short Adds <str> at [index]. Negative values are also allowed.
	* @param str String to add.
	* @param index Index where str is added. Default = str.length
	* @returns String
	* @extra %insert% is provided as an alias, and is generally more readable when using an index.
	* @example
	*
	*   'schfifty'.add(' five')         -> schfifty five
	*   'dopamine'.insert('e', 3)       -> dopeamine
	*   'spelling eror'.insert('r', -3) -> spelling error
	*
	***/
	add(str: string, index?: number): string;
	insert(str: string, index?: number): string;

	/***
	* @short Assigns variables to tokens in a string.
	* @method assign(<obj1>, <obj2>, ...)
	* @returns String
	* @extra If an object is passed, it's properties can be assigned using
	*        the object's keys. If a non-object (string, number, etc.)
	*        is passed it can be accessed by the argument number beginning
	*        with 1 (as with regex tokens). Multiple objects can be passed
	*        and will be merged together (original objects are unaffected).
	* @example
	*
	*   'Welcome, Mr. {name}.'.assign({ name: 'Franklin' })   -> 'Welcome, Mr. Franklin.'
	*   'You are {1} years old today.'.assign(14)             -> 'You are 14 years old today.'
	*   '{n} and {r}'.assign({ n: 'Cheech' }, { r: 'Chong' }) -> 'Cheech and Chong'
	*
	***/
	assign(str: string): string;
	assign(strs: string[]): string;
	assign(num: number): string;
	assign(nums: number[]): string;
	assign(obj: { }): string;
	assign(...objs: { }[]): string;

	/***
	* @short Gets the character(s) at a given index.
	* @method at(<index>, [loop] = true)
	* @param index Index of the character.
	* @param loop Default = true
	* @returns String or String[]
	* @extra When [loop] is true, overshooting the end of the string
	*        (or the beginning) will begin counting from the other end.
	*        As an alternate syntax, passing multiple indexes will get
	*        the characters at those indexes.
	* @example
	*
	*   'jumpy'.at(0)               -> 'j'
	*   'jumpy'.at(2)               -> 'm'
	*   'jumpy'.at(5)               -> 'j'
	*   'jumpy'.at(5, false)        -> ''
	*   'jumpy'.at(-1)              -> 'y'
	*   'lucky charms'.at(2,4,6,8) -> ['u','k','y',c']
	*
	***/
	at(index: number, loop?: bool): string;
	at(indexes: number[], loop?: bool): string[];

	/***
	* @short Converts underscores and hyphens to camel case.
	*        If [first] is true the first letter will also be capitalized.
	* @method camelize([first] = true)
	* @param first Default = true
	* @returns String
	* @extra If the Inflections package is included acryonyms can also
	*        be defined that will be used when camelizing.
	* @example
	*
	*   'caps_lock'.camelize()              -> 'CapsLock'
	*   'moz-border-radius'.camelize()      -> 'MozBorderRadius'
	*   'moz-border-radius'.camelize(false) -> 'mozBorderRadius'
	*
	***/
	camelize(first?: bool): string;

	/***
	* @short Capitalizes the first character in the string.
	* @method capitalize([all] = false)
	* @param all Default = false
	* @returns String
	* @extra If [all] is true, all words in the string will be capitalized.
	* @example
	*
	*   'hello'.capitalize()           -> 'Hello'
	*   'hello kitty'.capitalize()     -> 'Hello kitty'
	*   'hello kitty'.capitalize(true) -> 'Hello Kitty'
	*
	***/
	capitalize(all: bool): string;

	/***
	* @short Runs callback [fn] against each character in the string.
	*        Returns an array of characters.
	* @method chars([fn])
	* @param fn Callback function.
	* @returns String[]
	* @example
	*
	*   'jumpy'.chars() -> ['j','u','m','p','y']
	*   'jumpy'.chars(function(c) {
	*     // Called 5 times: "j","u","m","p","y"
	*   });
	*
	***/
	chars(fn?: Function): string[];

	/***
	* @short Runs callback [fn] against each character code in the string.
	         Returns an array of character codes.
	* @method codes([fn])
	* @param fn Callback function.
	* @returns number[]
	* @example
	*
	*   'jumpy'.codes() -> [106,117,109,112,121]
	*   'jumpy'.codes(function(c) {
	*     // Called 5 times: 106, 117, 109, 112, 121
	*   });
	*
	***/
	codes(fn?: Function): number[];

	/***
	* @short Compacts all white space in the string to
	*        a single space and trims the ends.
	* @method compact()
	* @returns String
	* @example
	*
	*   'too \n much \n space'.compact() -> 'too much space'
	*   'enough \n '.compact()           -> 'enought'
	*
	***/
	compact(): string;

	/***
	* @short Converts underscores and camel casing to hypens.
	* @method dasherize()
	* @returns String
	* @example
	*
	*   'a_farewell_to_arms'.dasherize() -> 'a-farewell-to-arms'
	*   'capsLock'.dasherize()           -> 'caps-lock'
	*
	***/
	dasherize(): string;

	/***
	* @short Decodes the string from base64 encoding.
	* @method decodeBase64()
	* @returns String
	* @extra This method wraps the browser native %atob% when available,
	         and uses a custom implementation when not available.
	* @example
	*
	*   'aHR0cDovL3R3aXR0ZXIuY29tLw=='.decodeBase64() -> 'http://twitter.com/'
	*   'anVzdCBnb3QgZGVjb2RlZA=='.decodeBase64()     -> 'just got decoded!'
	*
	***/
	decodeBase64(): string;

	/***
	* @short Runs callback [fn] against each occurence of [search].
	* @method each([search] = single character, [fn])
	* @returns Array
	* @extra Returns an array of matches. [search] may be either
	*        a string or regex, and defaults to every character in the string.
	* @example
	*
	*   'jumpy'.each() -> ['j','u','m','p','y']
	*   'jumpy'.each(/[r-z]/) -> ['u','y']
	*   'jumpy'.each(/[r-z]/, function(m) {
	*     // Called twice: "u", "y"
	*   });
	*
	***/
	each(): string[];
	each(search: string, fn?: Function): string[];
	each(search: RegExp, fn?: Function): string[];
	each(search: Function): string[];

	/***
	* @short Encodes the string into base64 encoding.
	* @method encodeBase64()
	* @returns String
	* @extra This method wraps the browser native %btoa% when available,
	*        and uses a custom implementation when not available.
	* @example
	*
	*   'gonna get encoded!'.encodeBase64()  -> 'Z29ubmEgZ2V0IGVuY29kZWQh'
	*   'http://twitter.com/'.encodeBase64() -> 'aHR0cDovL3R3aXR0ZXIuY29tLw=='
	*
	***/
	encodeBase64(): string;

	/***
	* @short Returns true if the string ends with <find>.
	* @method endsWith(<find>, [case] = true)
	* @returns Boolean
	* @extra <find> may be either a string or regex. Case 
	*        sensitive if [case] is true.
	* @example
	*
	*   'jumpy'.endsWith('py')         -> true
	*   'jumpy'.endsWith(/[q-z]/)      -> true
	*   'jumpy'.endsWith('MPY')        -> false
	*   'jumpy'.endsWith('MPY', false) -> true
	*
	***/
	endsWith(find: string, case_?: bool): bool;
	endsWith(find: RegExp, case_?: bool): bool;

	/***
	* @short Converts HTML characters to their entity equivalents.
	* @method escapeHTML()
	* @returns String
	* @example
	*
	*   '<p>some text</p>'.escapeHTML() -> '&lt;p&gt;some text&lt;/p&gt;'
	*   'one & two'.escapeHTML()        -> 'one &amp; two'
	*
	***/
	escapeHTML(): string;

	/***
	* @short Escapes all RegExp tokens in the string.
	* @method escapeRegExp()
	* @returns String
	* @example
	*
	*   'really?'.escapeRegExp()       -> 'really\?'
	*   'yes.'.escapeRegExp()         -> 'yes\.'
	*   '(not really)'.escapeRegExp() -> '\(not really\)'
	*
	***/
	escapeRegExp(): string;

	/***
	* @short Escapes characters in a string to make a valid URL.
	* @method escapeURL([param] = false)
	* @returns String
	* @extra If [param] is true, it will also escape valid URL 
	*        characters for use as a URL parameter.
	* @example
	*
	*   'http://foo.com/"bar"'.escapeURL()     -> 'http://foo.com/%22bar%22'
	*   'http://foo.com/"bar"'.escapeURL(true) -> 'http%3A%2F%2Ffoo.com%2F%22bar%22'
	*
	***/
	escapeURL(param?: bool): string;

	/***
	* @short Returns the first [n] characters of the string.
	* @method first([n] = 1)
	* @returns String
	* @example
	*
	*   'lucky charms'.first()   -> 'l'
	*   'lucky charms'.first(3)  -> 'luc'
	*
	***/
	first(n?: number): string;

	/***
	* @short Returns a section of the string starting from [index].
	* @method from([index] = 0)
	* @returns String
	* @example
	*
	*   'lucky charms'.from()   -> 'lucky charms'
	*   'lucky charms'.from(7)  -> 'harms'
	*
	***/
	from(index?: number): string;

	/***
	* @short Converts full-width characters (zenkaku) to half-width (hankaku).
	* @method hankaku([mode] = 'all')
	* @returns String
	* @extra [mode] accepts any combination of 
	*        "a" (alphabet),
	*        "n" (numbers),
	*        "k" (katakana),
	*        "s" (spaces),
	*        "p" (punctuation),
	*        or "all".
	* @example
	*
	*   'タロウ　ＹＡＭＡＤＡです！'.hankaku()                      -> 'ﾀﾛｳ YAMADAです!'
	*   'タロウ　ＹＡＭＡＤＡです！'.hankaku('a')                   -> 'タロウ　YAMADAです！'
	*   'タロウ　ＹＡＭＡＤＡです！'.hankaku('alphabet')            -> 'タロウ　YAMADAです！'
	*   'タロウです！　２５歳です！'.hankaku('katakana', 'numbers') -> 'ﾀﾛｳです！　25歳です！'
	*   'タロウです！　２５歳です！'.hankaku('k', 'n')              -> 'ﾀﾛｳです！　25歳です！'
	*   'タロウです！　２５歳です！'.hankaku('kn')                  -> 'ﾀﾛｳです！　25歳です！'
	*   'タロウです！　２５歳です！'.hankaku('sp')                  -> 'タロウです! ２５歳です!'
	*
	***/
	hankaku(mode?: string): string;

	/***
	* @short Returns true if the string matches <find>.
	* @method has(<find>)
	* @returns Boolean
	* @extra <find> may be a string or regex.
	* @example
	*
	*   'jumpy'.has('py')     -> true
	*   'broken'.has(/[a-n]/) -> true
	*   'broken'.has(/[s-z]/) -> false
	*
	***/
	has(find: string): bool;
	has(find: RegExp): bool;

	/***
	* @short Returns true if the string contains any characters in that script.
	* @method has[Script]()
	* @returns Boolean
	*
	* @set
	*   hasArabic
	*   hasCyrillic
	*   hasGreek
	*   hasHangul
	*   hasHan
	*   hasKanji
	*   hasHebrew
	*   hasHiragana
	*   hasKana
	*   hasKatakana
	*   hasLatin
	*   hasThai
	*   hasDevanagari
	*
	* @example
	*
	*   'أتكلم'.hasArabic()          -> true
	*   'визит'.hasCyrillic()        -> true
	*   '잘 먹겠습니다!'.hasHangul() -> true
	*   'ミックスです'.hasKatakana() -> true
	*   "l'année".hasLatin()         -> true
	*
	***/
	hasArabic(): bool;
	hasCyrillic(): bool;
	hasGreek(): bool;
	hasHangul(): bool;
	hasHan(): bool;
	hasKanji(): bool;
	hasHebrew(): bool;
	hasHiragana(): bool;
	hasKana(): bool;
	hasKatakana(): bool;
	hasLatin(): bool;
	hasThai(): bool;
	hasDevanagari(): bool;

	/***
	* @method hiragana([all] = true)
	* @returns String
	* @short Converts katakana into hiragana.
	* @extra If [all] is false, only full-width katakana will be converted.
	* @example
	*
	*   'カタカナ'.hiragana()   -> 'かたかな'
	*   'コンニチハ'.hiragana() -> 'こんにちは'
	*   'ｶﾀｶﾅ'.hiragana()       -> 'かたかな'
	*   'ｶﾀｶﾅ'.hiragana(false)  -> 'ｶﾀｶﾅ'
	*
	***/
	hiragana(all?: bool): string;

	/***
	* @method humanize()
	* @returns String
	* @short Creates a human readable string.
	* @extra Capitalizes the first word and turns underscores into spaces and strips a trailing '_id', if any. Like String#titleize, this is meant for creating pretty output.
	* @example
	*
	*   'employee_salary'.humanize() -> 'Employee salary'
	*   'author_id'.humanize()       -> 'Author'
	*
	***/
	humanize(): string;

	/***
	* @short Returns true if the string has a length of 0 or contains only whitespace.
	* @method isBlank()
	* @returns Boolean
	* @example
	*
	*   ''.isBlank()      -> true
	*   '   '.isBlank()   -> true
	*   'noway'.isBlank() -> false
	*
	***/
	isBlank(): bool;
	
	/***
	* @short Returns true if the string contains only characters in that script. Whitespace is ignored.
	* @method is[Script]()
	* @returns Boolean
	*
	* @set
	*   isArabic
	*   isCyrillic
	*   isGreek
	*   isHangul
	*   isHan
	*   isKanji
	*   isHebrew
	*   isHiragana
	*   isKana
	*   isKatakana
	*   isKatakana
	*   isThai
	*   isDevanagari
	*
	* @example
	*
	*   'أتكلم'.isArabic()          -> true
	*   'визит'.isCyrillic()        -> true
	*   '잘 먹겠습니다!'.isHangul() -> true
	*   'ミックスです'.isKatakana() -> false
	*   "l'année".isLatin()         -> true
	*
	***/
	isArabic(): bool;
	isCyrillic(): bool;
	isGreek(): bool;
	isHangul(): bool;
	isHan(): bool;
	isKanji(): bool;
	isHebrew(): bool;
	isHiragana(): bool;
	isKana(): bool;
	isKatakana(): bool;
	isLatin(): bool;
	isThai(): bool;
	isDevanagari(): bool;

	/***
	* @short Converts hiragana into katakana.
	* @method katakana()
	* @returns String
	* @example
	*
	*   'かたかな'.katakana()   -> 'カタカナ'
	*   'こんにちは'.katakana() -> 'コンニチハ'
	*
	***/
	katakana(): string;

	/***
	* @short Returns the last [n] characters of the string.
	* @method last([n] = 1)
	* @returns String
	* @example
	*
	*   'lucky charms'.last()   -> 's'
	*   'lucky charms'.last(3)  -> 'rms'
	*
	***/
	last(n?: number): string;

	/***
	* @short Runs callback [fn] against each line in the string.
	*        Returns an array of lines.
	* @method lines([fn])
	* @returns Array
	* @example
	*
	*   'broken wear\nand\njumpy jump'.lines() -> ['broken wear','and','jumpy jump']
	*   'broken wear\nand\njumpy jump'.lines(function(l) {
	*     // Called three times: "broken wear", "and", "jumpy jump"
	*   });
	*
	***/
	lines(fn?: Function): string[];

	/***
	* @short Finds the namespace or property indicated by the string.
	* @method namespace([init] = global)
	* @returns Mixed
	* @extra [init] can be passed to provide a starting context, 
	*        otherwise the global context will be used. If any 
	*        level returns a falsy value, that will be the final result.
	* @example
	*
	*   'Path.To.Namespace'.namespace() -> Path.To.Namespace
	*   '$.fn'.namespace()              -> $.fn
	*
	***/
	namespace(init?: any): any;

	/***
	* @short Returns the string with accented and non-standard Latin-based
	*        characters converted into ASCII approximate equivalents.
	* @method normalize()
	* @returns String
	* @example
	*
	*   'á'.normalize()                  -> 'a'
	*   'Ménage à trois'.normalize()     -> 'Menage a trois'
	*   'Volkswagen'.normalize()         -> 'Volkswagen'
	*   'ＦＵＬＬＷＩＤＴＨ'.normalize() -> 'FULLWIDTH'
	*
	***/
	normalize(): string;

	/***
	* @short Pads either/both sides of the string.
	* @method pad[Side](<padding> = '', [num] = 1)
	* @returns String
	* @extra [num] is the number of characters on each side,
	*        and [padding] is the character to pad with.
	*
	* @set
	*   pad
	*   padLeft
	*   padRight
	*
	* @example
	*
	*   'wasabi'.pad('-')         -> '-wasabi-'
	*   'wasabi'.pad('-', 2)      -> '--wasabi--'
	*   'wasabi'.padLeft('-', 2)  -> '--wasabi'
	*   'wasabi'.padRight('-', 2) -> 'wasabi--'
	*
	***/
	pad(padding: string, num?: number): string;
	padLeft(padding: string, num?: number): string;
	padRight(padding: string, num?: number): string;

	/***
	* @short Runs callback [fn] against each paragraph in the string.
	*        Returns an array of paragraphs.
	* @method paragraphs([fn])
	* @returns Array
	* @extra A paragraph here is defined as a block of text bounded
	*        by two or more line breaks.
	* @example
	*
	*   'Once upon a time.\n\nIn the land of oz...'.paragraphs() -> ['Once upon a time.','In the land of oz...']
	*   'Once upon a time.\n\nIn the land of oz...'.paragraphs(function(p) {
	*     // Called twice: "Once upon a time.", "In teh land of oz..."
	*   });
	*
	***/
	paragraphs(fn?: Function): string[];

	/***
	* @short Replaces special characters in a string so that it may
	*        be used as part of a pretty URL.
	* @method parameterize()
	* @returns String
	* @example
	*
	*   'hell, no!'.parameterize() -> 'hell-no'
	*
	***/
	parameterize(): string;

	/***
	* @short Returns the plural form of the word in the string.
	* @method pluralize()
	* @returns String
	* @example
	*
	*   'post'.pluralize()         -> 'posts'
	*   'octopus'.pluralize()      -> 'octopi'
	*   'sheep'.pluralize()        -> 'sheep'
	*   'words'.pluralize()        -> 'words'
	*   'CamelOctopus'.pluralize() -> 'CamelOctopi'
	*
	***/
	pluralize(): string;

	/***
	* @short Removes any part of the string that matches <f>.
	* @method remove(<f>)
	* @returns String
	* @extra <f> can be a string or a regex.
	* @example
	*
	*   'schfifty five'.remove('f')     -> 'schity ive'
	*   'schfifty five'.remove(/[a-f]/g) -> 'shity iv'
	*
	***/
	remove(find: string): string;
	remove(find: RegExp): string;

	/***
	* @short Removes all HTML tags and their contents from the string.
	* @method removeTags([tag1], [tag2], ...)
	* @returns String
	* @extra Tags to remove may be enumerated in the parameters,
	*        otherwise will remove all.
	* @example
	*
	*   '<p>just <b>some</b> text</p>'.removeTags()    -> ''
	*   '<p>just <b>some</b> text</p>'.removeTags('b') -> '<p>just text</p>'
	*
	***/
	removeTags(): string;
	removeTags(tag: string): string;
	removeTags(...tags: string[]): string;

	/***
	* @short Returns the string repeated [num] times.
	* @method repeat([num] = 0)
	* @returns String
	* @example
	*
	*   'jumpy'.repeat(2) -> 'jumpyjumpy'
	*   'a'.repeat(5)     -> 'aaaaa'
	*   'a'.repeat(0)     -> ''
	*
	***/
	repeat(num?: number): string;

	/***
	* @short Reverses the string.
	* @method reverse()
	* @returns String
	* @example
	*
	*   'jumpy'.reverse()        -> 'ypmuj'
	*   'lucky charms'.reverse() -> 'smrahc ykcul'
	*
	***/
	reverse(): string;

	/***
	* @short Shifts each character in the string <n> places in the character map.
	* @method shift(<n>)
	* @returns Array
	* @example
	*
	*   'a'.shift(1)  -> 'b'
	*   'ク'.shift(1) -> 'グ'
	*
	***/
	shift(num: number): string[];

	/***
	* @short The reverse of String#pluralize.
	*        Returns the singular form of a word in a string.
	* @method singularize()
	* @returns String
	* @example
	*
	*   'posts'.singularize()       -> 'post'
	*   'octopi'.singularize()      -> 'octopus'
	*   'sheep'.singularize()       -> 'sheep'
	*   'word'.singularize()        -> 'word'
	*   'CamelOctopi'.singularize() -> 'CamelOctopus'
	*
	***/
	singularize(): string;

	/***
	* @short Converts camel case, underscores, and hyphens to a properly spaced string.
	* @method spacify()
	* @returns String
	* @example
	*
	*   'camelCase'.spacify()                         -> 'camel case'
	*   'an-ugly-string'.spacify()                    -> 'an ugly string'
	*   'oh-no_youDid-not'.spacify().capitalize(true) -> 'something else'
	*
	***/
	spacify(): string;

	/***
	* @short Returns true if the string starts with <find>.
	* @method startsWith(<find>, [case] = true)
	* @returns Boolean
	* @extra <find> may be either a string or regex. 
	*        Case sensitive if [case] is true.
	* @example
	*
	*   'hello'.startsWith('hell')        -> true
	*   'hello'.startsWith(/[a-h]/)       -> true
	*   'hello'.startsWith('HELL')        -> false
	*   'hello'.startsWith('HELL', false) -> true
	*
	***/
	startsWith(find: string, case_?: bool): bool;
	startsWith(find: RegExp, case_?: bool): bool;

	/***
	* @short Strips all HTML tags from the string.
	* @method stripTags([tag1], [tag2], ...)
	* @returns String
	* @extra Tags to strip may be enumerated in the parameters,
	*        otherwise will strip all.
	* @example
	*
	*   '<p>just <b>some</b> text</p>'.stripTags()    -> 'just some text'
	*   '<p>just <b>some</b> text</p>'.stripTags('p') -> 'just <b>some</b> text'
	*
	***/
	stripTags(): string;
	stripTags(tag: string): string;
	stripTags(...tags: string[]): string;

	/***
	* @short Creates a title version of the string.
	* @method titleize()
	* @returns String
	* @extra Capitalizes all the words and replaces some characters
	*        in the string to create a nicer looking title.
	*        String#titleize is meant for creating pretty output.
	* @example
	*
	*   'man from the boondocks'.titleize() -> 'Man from the Boondocks'
	*   'x-men: the last stand'.titleize() -> 'X Men: The Last Stand'
	*   'TheManWithoutAPast'.titleize() -> 'The Man Without a Past'
	*   'raiders_of_the_lost_ark'.titleize() -> 'Raiders of the Lost Ark'
	*
	***/
	titleize(): string;

	/***
	* @short Returns a section of the string ending at [index].
	* @method to([index] = end)
	* @returns String
	* @example
	*
	*   'lucky charms'.to()   -> 'lucky charms'
	*   'lucky charms'.to(7)  -> 'lucky ch'
	*
	***/
	to(index?: number): string;

	/***
	* @short Converts the string into a number.
	* @method toNumber([base] = 10)
	* @returns Number
	* @extra Any value with a "." fill be converted to a floating point value,
	*        otherwise an integer.
	* @example
	*
	*   '153'.toNumber()    -> 153
	*   '12,000'.toNumber() -> 12000
	*   '10px'.toNumber()   -> 10
	*   'ff'.toNumber(16)   -> 255
	*
	***/
	toNumber(base?: number): number;

	/***
	* @short Removes leading and/or trailing whitespace from the string.
	* @method trim[Side]()
	* @returns String
	* @extra Whitespace is defined as line breaks, tabs, and any character
	*        in the "Space, Separator" Unicode category, conforming to the
	*        the ES5 spec. The standard %trim% method is only added when
	*        not fully supported natively.
	*
	* @set
	*   trim
	*   trimLeft
	*   trimRight
	*
	* @example
	*
	*   '   wasabi   '.trim()      -> 'wasabi'
	*   '   wasabi   '.trimLeft()  -> 'wasabi   '
	*   '   wasabi   '.trimRight() -> '   wasabi'
	*
	***/
	// Duplicate from lib.d.ts
	//trim(): string;
	trimLeft(): string;
	trimRight(): string;

	/***
	* @short Truncates a string.
	* @method truncate(<length>, [split] = true, [from] = 'right', [ellipsis] = '...')
	* @returns Object
	* @extra If [split] is %false%, will not split words up, and instead
	*        discard the word where the truncation occurred. [from] can
	*        also be %"middle"% or %"left"%.
	* @example
	*
	*   'just sittin on the dock of the bay'.truncate(20)                 -> 'just sittin on the do...'
	*   'just sittin on the dock of the bay'.truncate(20, false)          -> 'just sittin on the...'
	*   'just sittin on the dock of the bay'.truncate(20, true, 'middle') -> 'just sitt...of the bay'
	*   'just sittin on the dock of the bay'.truncate(20, true, 'left')   -> '...the dock of the bay'
	*
	***/
	truncate(length: number, split?: bool, from?: string, ellipsis?: string): string;

	/***
	* @short Converts hyphens and camel casing to underscores.
	* @method underscore()
	* @returns String
	* @example
	*
	*   'a-farewell-to-arms'.underscore() -> 'a_farewell_to_arms'
	*   'capsLock'.underscore()           -> 'caps_lock'
	*
	***/
	underscore(): string;

	/***
	* @short Restores escaped HTML characters.
	* @method unescapeHTML([partial] = false)
	* @returns String
	* @example
	*
	*   '&lt;p&gt;some text&lt;/p&gt;'.unescapeHTML() -> '<p>some text</p>'
	*   'one &amp; two'.unescapeHTML()                -> 'one & two'
	*
	***/
	unescapeHTML(partial?: bool): string;

	/***
	* @short Restores escaped characters in a URL escaped string.
	* @method unescapeURL([partial] = false)
	* @returns String
	* @extra If [partial] is true, it will only unescape non-valid URL characters. [partial] is included here for completeness, but should very rarely be needed.
	* @example
	*
	*   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL()     -> 'http://foo.com/the bar'
	*   'http%3A%2F%2Ffoo.com%2Fthe%20bar'.unescapeURL(true) -> 'http%3A%2F%2Ffoo.com%2Fthe bar'
	*
	***/
	unescapeURL(partial?: bool): string;

	/***
	* @short Runs callback [fn] against each word in the string.
	*        Returns an array of words.
	* @method words([fn])
	* @returns String[]
	* @extra A "word" here is defined as any sequence of non-whitespace characters.
	* @example
	*
	*   'broken wear'.words() -> ['broken','wear']
	*   'broken wear'.words(function(w) {
	*     // Called twice: "broken", "wear"
	*   });
	*
	***/
	words(fn?: Function): string[];

	/***
	* @short Converts half-width characters (hankaku) to full-width (zenkaku).
	* @method zenkaku([mode] = 'all')
	* @returns String
	* @extra [mode] accepts any combination of
	*        "a" (alphabet),
	*        "n" (numbers),
	*        "k" (katakana),
	*        "s" (spaces),
	*        "p" (punctuation),
	*        or "all".
	* @example
	*
	*   'ﾀﾛｳ YAMADAです!'.zenkaku()                         -> 'タロウ　ＹＡＭＡＤＡです！'
	*   'ﾀﾛｳ YAMADAです!'.zenkaku('a')                      -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
	*   'ﾀﾛｳ YAMADAです!'.zenkaku('alphabet')               -> 'ﾀﾛｳ ＹＡＭＡＤＡです!'
	*   'ﾀﾛｳです! 25歳です!'.zenkaku('katakana', 'numbers') -> 'タロウです! ２５歳です!'
	*   'ﾀﾛｳです! 25歳です!'.zenkaku('k', 'n')              -> 'タロウです! ２５歳です!'
	*   'ﾀﾛｳです! 25歳です!'.zenkaku('kn')                  -> 'タロウです! ２５歳です!'
	*   'ﾀﾛｳです! 25歳です!'.zenkaku('sp')                  -> 'ﾀﾛｳです！　25歳です！'
	*
	***/
	zenkaku(mode?: string): string;
}

interface Number {

	/***
	* @short Returns a random integer between [n1] and [n2].
	* @method Number.random([n1], [n2])
	* @returns Number
	* @extra If only 1 number is passed, the other will be 0. If none are passed, the number will be either 0 or 1.
	* @example
	*
	*   Number.random(50, 100) -> ex. 85
	*   Number.random(50)      -> ex. 27
	*   Number.random()        -> ex. 0
	*
	***/
	random(n1?: number, n2?: number): number;

	/***
	* @short Returns an abbreviated form of the number.
	* @method abbr([precision] = 0)
	* @returns String
	* @extra [precision] will round to the given precision.
	* @example
	*
	*   (1000).abbr()    -> "1k"
	*   (1000000).abbr() -> "1m"
	*   (1280).abbr(1)   -> "1.3k"
	*
	***/
	abbr(precision?: number): string;

	/***
	* @short Returns an abbreviated form of the number, considered to be "Bytes".
	* @method bytes([precision] = 0, [limit] = 4)
	* @returns String
	* @extra [precision] will round to the given precision.
	*        [limit] is the upper limit for the units.
	*        The default is %4%, which is "terabytes" (TB).
	*        If [limit] is %false%, the upper limit will be "exa".
	* @example
	*
	*   (1000).bytes()                 -> "1kB"
	*   (1000).bytes(2)                -> "0.98kB"
	*   ((10).pow(20)).bytes()         -> "90,949,470TB"
	*   ((10).pow(20)).bytes(0, false) -> "87EB"
	*
	***/
	bytes(precision?: number, limit?: number): string;
	bytes(precision?: number, limit?: bool): string;

	/***
	* @short Shortcut for %Math.ceil% that also allows a <precision>.
	* @method ceil(<precision> = 0)
	* @returns Number
	*
	* @example
	*
	*   (3.241).ceil()  -> 4
	*   (-3.241).ceil() -> -3
	*   (3.241).ceil(2) -> 3.25
	*   (3748).ceil(-2) -> 3800
	*
	***/
	ceil(precision?: number): number;

	/***
	* @short Returns a string at the code point of the number.
	* @method chr()
	* @returns String
	* @example
	*
	*   (65).chr() -> "A"
	*   (75).chr() -> "K"
	*
	***/
	chr(): string;

	/***
	* @short Returns an array containing numbers from the number down to <num>.
	* @method downto(<num>, [fn], [step] = 1)
	* @returns Array
	* @extra Optionally calls [fn] callback for each number in that array.
	*        [step] allows multiples greater than 1.
	* @example
	*
	*   (8).downto(3) -> [8, 7, 6, 5, 4, 3]
	*   (8).downto(3, function(n) {
	*     // This function is called 6 times receiving n as the value.
	*   });
	*   (8).downto(2, null, 2) -> [8, 6, 4, 2]
	*
	***/
	downto(num: number, fn?: Function, step?: number): number[];

	/***
	* @short Takes the number as milliseconds and returns a unit-
	*        adjusted localized string.
	* @method duration([locale] = currentLocale)
	* @returns String
	* @extra This method is the same as %Date#relative% without 
	*        the localized equivalent of "from now" or "ago".
	*        [locale] can be passed as the first (and only) parameter.
	*        Note that this method is only available when the dates
	*        package is included.
	* @example
	*
	*   (500).duration() -> '500 milliseconds'
	*   (1200).duration() -> '1 second'
	*   (75).minutes().duration() -> '1 hour'
	*   (75).minutes().duration('es') -> '1 hora'
	*
	***/
	duration(locale?: string): string;

	/***
	* @short Shortcut for %Math.floor% that also allows a <precision>.
	* @method floor(<precision> = 0)
	* @returns Number
	* @example
	*
	*   (3.241).floor()  -> 3
	*   (-3.841).floor() -> -4
	*   (3.241).floor(2) -> 3.24
	*   (3748).floor(-2) -> 3700
	*
	***/
	floor(precision?: number): number;

	/***
	* @short Formats the number to a readable string.
	* @method format([place] = 0, [thousands] = ',', [decimal] = '.')
	* @returns String
	* @extra If [place] is %undefined%, will automatically determine the place.
	*        [thousands] is the character used for the thousands separator.
	*        [decimal] is the character used for the decimal point.
	* @example
	*
	*   (56782).format()           -> '56,782'
	*   (56782).format(2)          -> '56,782.00'
	*   (4388.43).format(2, ' ')      -> '4 388.43'
	*   (4388.43).format(2, '.', ',') -> '4.388,43'
	*
	***/
	format(place?: number, thousands?: string, decimal?: string): string;

	/***
	* @short Converts the number to hexidecimal.
	* @method hex([pad] = 1)
	* @returns String
	* @extra [pad] will pad the resulting string to that many places.
	* @example
	*
	*   (255).hex()   -> 'ff';
	*   (255).hex(4)  -> '00ff';
	*   (23654).hex() -> '5c66';
	*
	***/
	hex(pad?: number): string;

	/***
	* @short Returns true if the number is even.
	* @method isEven()
	* @returns Boolean
	* @example
	*
	*   (6).isEven()  -> true
	*   (17).isEven() -> false
	*
	***/
	isEven(): bool;

	/***
	* @short Returns true if the number has no trailing decimal.
	* @method isInteger()
	* @returns Boolean
	* @example
	*
	*   (420).isInteger() -> true
	*   (4.5).isInteger() -> false
	*
	***/
	isInteger(): bool;

	/***
	* @short Returns true if the number is a multiple of <num>.
	* @method isMultipleOf(<num>)
	* @returns Boolean
	* @example
	*
	*   (6).isMultipleOf(2)  -> true
	*   (17).isMultipleOf(2) -> false
	*   (32).isMultipleOf(4) -> true
	*   (34).isMultipleOf(4) -> false
	*
	***/
	isMultipleOf(num: number): bool;

	/***
	* @short Returns true if the number is odd.
	* @method isOdd()
	* @returns Boolean
	* @example
	*
	*   (3).isOdd()  -> true
	*   (18).isOdd() -> false
	*
	***/
	isOdd(): bool;

	/***
	* @short Returns the logarithm of the number with base <base>,
	*        or natural logarithm of the number if <base> is undefined.
	* @method log(<base> = Math.E)
	* @returns Number
	* @example
	*
	*   (64).log(2) -> 6
	*   (9).log(3)  -> 2
	*   (5).log()   -> 1.6094379124341003
	*
	***/
	log(base?: number): number;

	/***
	* @short Math related functions are mapped as shortcuts to numbers and are identical. Note that %Number#log% provides some special defaults.
	* @method [math]()
	* @returns Number
	*
	* @set
	*   abs
	*   sin
	*   asin
	*   cos
	*   acos
	*   tan
	*   atan
	*   sqrt
	*   exp
	*   pow
	*
	* @example
	*
	*   (3).pow(3) -> 27
	*   (-3).abs() -> 3
	*   (1024).sqrt() -> 32
	*
	***/
	abs(): number;
	sin(): number;
	asin(): number;
	cos(): number;
	acos(): number;
	tan(): number;
	atan(): number;
	sqrt(): number;
	exp(): number;
	pow(num: number): number;

	/***
	* @short Returns the number as a string in metric notation.
	* @method metric([precision] = 0, [limit] = 1)
	* @returns String
	* @extra [precision] will round to the given precision.
	*        Both very large numbers and very small numbers are supported.
	*        [limit] is the upper limit for the units.
	*        The default is %1%, which is "kilo".
	*        If [limit] is %false%, the upper limit will be "exa".
	*        The lower limit is "nano", and cannot be changed.
	* @example
	*
	*   (1000).metric()            -> "1k"
	*   (1000000).metric()         -> "1,000k"
	*   (1000000).metric(0, false) -> "1M"
	*   (1249).metric(2) + 'g'     -> "1.25kg"
	*   (0.025).metric() + 'm'     -> "25mm"
	*
	***/
	metric(precision?: number, limit?: number): string;
	metric(precision?: number, limit?: bool): string;

	/***
	* @short Returns an ordinalized (English) string, i.e. "1st", "2nd", etc.
	* @method ordinalize()
	* @returns String
	* @example
	*
	*   (1).ordinalize() -> '1st';
	*   (2).ordinalize() -> '2nd';
	*   (8).ordinalize() -> '8th';
	*
	***/
	ordinalize(): string;

	/***
	* @short Pads a number with "0" to <place>.
	* @method pad(<place> = 0, [sign] = false, [base] = 10)
	* @returns String
	* @extra [sign] allows you to force the sign as well (+05, etc). [base] can change the base for numeral conversion.
	* @example
	*
	*   (5).pad(2)        -> '05'
	*   (-5).pad(4)       -> '-0005'
	*   (82).pad(3, true) -> '+082'
	*
	***/
	pad(place?: number, sign?: bool, base?: number): string;

	/***
	* @short Shortcut for %Math.round% that also allows a <precision>.
	* @method round(<precision> = 0)
	* @returns Number
	*
	* @example
	*
	*   (3.241).round()  -> 3
	*   (-3.841).round() -> -4
	*   (3.241).round(2) -> 3.24
	*   (3748).round(-2) -> 3800
	*
	***/
	round(precision?: number): number;

	/***
	* @short Calls <fn> a number of times equivalent to the number.
	* @method times(<fn>)
	* @returns Number
	* @example
	*
	*   (8).times(function(i) {
	*     // This function is called 8 times.
	*   });
	*
	***/
	times(fn: Function): number;

	/***
	* @short Returns a number. This is mostly for compatibility reasons.
	* @method toNumber()
	* @returns Number
	* @example
	*
	*   (420).toNumber() -> 420
	*
	***/
	toNumber(): number;

	/***
	* @short Takes the number as a corresponding unit of time and
	*        converts to milliseconds.
	* @method [unit]()
	* @returns Number
	* @extra Method names can be both singular and plural.
	*        Note that as "a month" is ambiguous as a unit of time,
	*        %months% will be equivalent to 30.4375 days, the average
	*        number in a month. Be careful using %months% if you need
	*        exact precision.
	*
	* @set
	*   millisecond
	*   milliseconds
	*   second
	*   seconds
	*   minute
	*   minutes
	*   hour
	*   hours
	*   day
	*   days
	*   week
	*   weeks
	*   month
	*   months
	*   year
	*   years
	*
	* @example
	*
	*   (5).milliseconds() -> 5
	*   (10).hours()       -> 36000000
	*   (1).day()          -> 86400000
	*
	***/
	millisecond(): number;
	milliseconds(): number;
	second(): number;
	seconds(): number;
	minute(): number;
	minutes(): number;
	hour(): number;
	hours(): number;
	day(): number;
	days(): number;
	week(): number;
	weeks(): number;
	month(): number;
	months(): number;
	year(): number;
	years(): number;

	/***
	* @short Returns a date <n> units after [d], where <n> is the number.
	* @method [unit]After([d], [locale] = currentLocale)
	* @returns Date
	* @extra [d] will accept a date object, timestamp, or text format.
	*        Note that "months" is ambiguous as a unit of time. If the
	*        target date falls on a day that does not exist
	*        (ie. August 31 -> February 31), the date will be shifted
	*        to the last day of the month. Be careful using %monthsAfter%
	*        if you need exact precision. See @date_format for more.
	*
	* @set
	*   millisecondAfter
	*   millisecondsAfter
	*   secondAfter
	*   secondsAfter
	*   minuteAfter
	*   minutesAfter
	*   hourAfter
	*   hoursAfter
	*   dayAfter
	*   daysAfter
	*   weekAfter
	*   weeksAfter
	*   monthAfter
	*   monthsAfter
	*   yearAfter
	*   yearsAfter
	*
	* @example
	*
	*   (5).daysAfter('tuesday')          -> 5 days after tuesday of this week
	*   (1).yearAfter('January 23, 1997') -> January 23, 1998
	*
	***/
	millisecondAfter(d: string, locale?: string): Date;
	millisecondAfter(d: Date, locale?: string): Date;
	millisecondsAfter(d: string, locale?: string): Date;
	millisecondsAfter(d: Date, locale?: string): Date;
	secondAfter(d: string, locale?: string): Date;
	secondAfter(d: Date, locale?: string): Date;
	secondsAfter(d: string, locale?: string): Date;
	secondsAfter(d: Date, locale?: string): Date;
	minuteAfter(d: string, locale?: string): Date;
	minuteAfter(d: Date, locale?: string): Date;
	minutesAfter(d: string, locale?: string): Date;
	minutesAfter(d: Date, locale?: string): Date;
	hourAfter(d: string, locale?: string): Date;
	hourAfter(d: Date, locale?: string): Date;
	hoursAfter(d: string, locale?: string): Date;
	hoursAfter(d: Date, locale?: string): Date;
	dayAfter(d: string, locale?: string): Date;
	dayAfter(d: Date, locale?: string): Date;
	daysAfter(d: string, locale?: string): Date;
	daysAfter(d: Date, locale?: string): Date;
	weekAfter(d: string, locale?: string): Date;
	weekAfter(d: Date, locale?: string): Date;
	weeksAfter(d: string, locale?: string): Date;
	weeksAfter(d: Date, locale?: string): Date;
	monthAfter(d: string, locale?: string): Date;
	monthAfter(d: Date, locale?: string): Date;
	monthsAfter(d: string, locale?: string): Date;
	yearAfter(d: string, locale?: string): Date;
	yearAfter(d: Date, locale?: string): Date;
	yearsAfter(d: string, locale?: string): Date;
	yearsAfter(d: Date, locale?: string): Date;

	/***
	* @short Returns a date that is <n> units ago.
	* @method [unit]Ago()
	* @returns Date
	* @extra Note that "months" is ambiguous as a unit of time.
	*        If the target date falls on a day that does not exist
	*        (ie. August 31 -> February 31), the date will be shifted
	*        to the last day of the month. Be careful using %monthsAgo% 
	*        if you need exact precision.
	*
	* @set
	*   millisecondAgo
	*   millisecondsAgo
	*   secondAgo
	*   secondsAgo
	*   minuteAgo
	*   minutesAgo
	*   hourAgo
	*   hoursAgo
	*   dayAgo
	*   daysAgo
	*   weekAgo
	*   weeksAgo
	*   monthAgo
	*   monthsAgo
	*   yearAgo
	*   yearsAgo
	*
	* @example
	*
	*   (5).weeksAgo() -> 5 weeks ago
	*   (1).yearAgo()  -> January 23, 1996
	*
	***/
	millisecondAgo(): Date;
	millisecondsAgo(): Date;
	secondAgo(): Date;
	secondsAgo(): Date;
	minuteAgo(): Date;
	minutesAgo(): Date;
	hourAgo(): Date;
	hoursAgo(): Date;
	dayAgo(): Date;
	daysAgo(): Date;
	weekAgo(): Date;
	weeksAgo(): Date;
	monthAgo(): Date;
	monthsAgo(): Date;
	yearAgo(): Date;
	yearsAgo(): Date;

	/***
	* @short Returns a date that is <n> units before [d], where <n> is the number.
	* @method [unit]Before([d], [locale] = currentLocale)
	* @returns Date
	* @extra [d] will accept a date object, timestamp, or text format.
	*        Note that "months" is ambiguous as a unit of time. If the
	*        target date falls on a day that does not exist
	*        (ie. August 31 -> February 31), the date will be shifted to
	*        the last day of the month. Be careful using %monthsBefore%
	*        if you need exact precision. See @date_format for more.
	*
	* @set
	*   millisecondBefore
	*   millisecondsBefore
	*   secondBefore
	*   secondsBefore
	*   minuteBefore
	*   minutesBefore
	*   hourBefore
	*   hoursBefore
	*   dayBefore
	*   daysBefore
	*   weekBefore
	*   weeksBefore
	*   monthBefore
	*   monthsBefore
	*   yearBefore
	*   yearsBefore
	*
	* @example
	*
	*   (5).daysBefore('tuesday')          -> 5 days before tuesday of this week
	*   (1).yearBefore('January 23, 1997') -> January 23, 1996
	*
	***/
	millisecondBefore(d: string, locale?: string): Date;
	millisecondBefore(d: Date, locale?: string): Date;
	millisecondsBefore(d: string, locale?: string): Date;
	millisecondsBefore(d: Date, locale?: string): Date;
	secondBefore(d: string, locale?: string): Date;
	secondBefore(d: Date, locale?: string): Date;
	secondsBefore(d: string, locale?: string): Date;
	secondsBefore(d: Date, locale?: string): Date;
	minuteBefore(d: string, locale?: string): Date;
	minuteBefore(d: Date, locale?: string): Date;
	minutesBefore(d: string, locale?: string): Date;
	minutesBefore(d: Date, locale?: string): Date;
	hourBefore(d: string, locale?: string): Date;
	hourBefore(d: Date, locale?: string): Date;
	hoursBefore(d: string, locale?: string): Date;
	hoursBefore(d: Date, locale?: string): Date;
	dayBefore(d: string, locale?: string): Date;
	dayBefore(d: Date, locale?: string): Date;
	daysBefore(d: string, locale?: string): Date;
	daysBefore(d: Date, locale?: string): Date;
	weekBefore(d: string, locale?: string): Date;
	weekBefore(d: Date, locale?: string): Date;
	weeksBefore(d: string, locale?: string): Date;
	weeksBefore(d: Date, locale?: string): Date;
	monthBefore(d: string, locale?: string): Date;
	monthBefore(d: Date, locale?: string): Date;
	monthsBefore(d: string, locale?: string): Date;
	monthsBefore(d: Date, locale?: string): Date;
	yearBefore(d: string, locale?: string): Date;
	yearBefore(d: Date, locale?: string): Date;
	yearsBefore(d: string, locale?: string): Date;
	yearsBefore(d: Date, locale?: string): Date;

	/***
	* @short Returns a date <n> units from now.
	* @method [unit]FromNow()
	* @returns Date
	* @extra Note that "months" is ambiguous as a unit of time.
	*        If the target date falls on a day that does not exist
	*        (ie. August 31 -> February 31), the date will be shifted
	*        to the last day of the month. Be careful using %monthsFromNow%
	*        if you need exact precision.
	*
	* @set
	*   millisecondFromNow
	*   millisecondsFromNow
	*   secondFromNow
	*   secondsFromNow
	*   minuteFromNow
	*   minutesFromNow
	*   hourFromNow
	*   hoursFromNow
	*   dayFromNow
	*   daysFromNow
	*   weekFromNow
	*   weeksFromNow
	*   monthFromNow
	*   monthsFromNow
	*   yearFromNow
	*   yearsFromNow
	*
	* @example
	*
	*   (5).weeksFromNow() -> 5 weeks ago
	*   (1).yearFromNow()  -> January 23, 1998
	*
	***/
	millisecondFromNow(): Date;
	millisecondsFromNow(): Date;
	secondFromNow(): Date;
	secondsFromNow(): Date;
	minuteFromNow(): Date;
	minutesFromNow(): Date;
	hourFromNow(): Date;
	hoursFromNow(): Date;
	dayFromNow(): Date;
	daysFromNow(): Date;
	weekFromNow(): Date;
	weeksFromNow(): Date;
	monthFromNow(): Date;
	monthsFromNow(): Date;
	yearFromNow(): Date;
	yearsFromNow(): Date;

	/***
	* @short Returns an array containing numbers from the number up to <num>.
	* @method upto(<num>, [fn], [step] = 1)
	* @returns Array
	* @extra Optionally calls [fn] callback for each number in that array.
	*       [step] allows multiples greater than 1.
	* @example
	*
	*   (2).upto(6) -> [2, 3, 4, 5, 6]
	*   (2).upto(6, function(n) {
	*     // This function is called 5 times receiving n as the value.
	*   });
	*   (2).upto(8, null, 2) -> [2, 4, 6, 8]
	*
	***/
	upto(num: number, fn?: Function, step?: number): number[];
}

interface Array {
	
	/***
	* @short Alternate array constructor.
	* @method Array.create(<obj1>, <obj2>, ...)
	* @returns Array
	* @extra This method will create a single array by calling %concat%
	*        on all arguments passed. In addition to ensuring that an unknown
	*        variable is in a single, flat array (the standard constructor will
	*        create nested arrays, this one will not), it is also a useful
	*        shorthand to convert a function's arguments object into a standard
	*        array.
	* @example
	*
	*   Array.create('one', true, 3)   -> ['one', true, 3]
	*   Array.create(['one', true, 3]) -> ['one', true, 3]
	+   Array.create(function(n) {
	*     return arguments;
	*   }('howdy', 'doody'));
	*
	***/
	create(...args: any[]): any[];

	/***
	* @short Returns true if <obj> is an Array.
	* @method Array.isArray(<obj>)
	* @returns Boolean
	* @extra This method is provided for browsers that don't support it internally.
	* @example
	*
	*   Array.isArray(3)        -> false
	*   Array.isArray(true)     -> false
	*   Array.isArray('wasabi') -> false
	*   Array.isArray([1,2,3])  -> true
	*
	***/
	isArray(obj: any): bool;

	/***
	* @short Adds <el> to the array.
	* @method add(<el>, [index])
	* @returns Array
	* @extra If [index] is specified, it will add at [index], otherwise
	*        adds to the end of the array. %add% behaves like %concat%
	*        in that if <el> is an array it will be joined, not inserted.
	*        This method will change the array! Use %include% for a
	*        non-destructive alias. Also, %insert% is provided as an
	*        alias that reads better when using an index.
	* @example
	*
	*   [1,2,3,4].add(5)       -> [1,2,3,4,5]
	*   [1,2,3,4].add([5,6,7]) -> [1,2,3,4,5,6,7]
	*   [1,2,3,4].insert(8, 1) -> [1,8,2,3,4]
	*
	***/
	add(el: any, index?: number): any[];
	add(el: any[], index?: number): any[];
	insert(el: any, index?: number): any[];
	insert(el: any[], index?: number): any[];

	/***
	* @short Gets the element(s) at a given index.
	* @method at(<index>, [loop] = true)
	* @returns Mixed
	* @extra When [loop] is true, overshooting the end of the array (or the beginning) will begin counting from the other end. As an alternate syntax, passing multiple indexes will get the elements at those indexes.
	* @example
	*
	*   [1,2,3].at(0)        -> 1
	*   [1,2,3].at(2)        -> 3
	*   [1,2,3].at(4)        -> 2
	*   [1,2,3].at(4, false) -> null
	*   [1,2,3].at(-1)       -> 3
	*   [1,2,3].at(0,1)      -> [1,2]
	*
	***/
	at(index: number, loop?: bool): any;
	at(start: number, stop: number): any[];

	/***
	* @short Averages all values in the array.
	* @method average([map])
	* @returns Number
	* @extra [map] may be a function mapping the value to be averaged or
	*        a string acting as a shortcut.
	* @example
	*
	*   [1,2,3].average()                           -> 2
	+   [{age:35},{age:11},{age:11}].average(function(n) {
	*     return n.age;
	*   });                                         -> 19
	*   [{age:35},{age:11},{age:11}].average('age') -> 19
	*
	***/
	average(map?: (n: number) => number): number;

	/***
	* @short Clones the array.
	* @method clone()
	* @returns Array
	* @example
	*
	*   [1,2,3].clone() -> [1,2,3]
	*
	***/
	clone(): any[];

	/***
	* @short Removes all instances of %undefined%, %null%, and %NaN% from the array.
	* @method compact([all] = false)
	* @returns Array
	* @extra If [all] is %true%, all "falsy" elements will be removed. This includes empty strings, 0, and false.
	* @example
	*
	*   [1,null,2,undefined,3].compact() -> [1,2,3]
	*   [1,'',2,false,3].compact()       -> [1,'',2,false,3]
	*   [1,'',2,false,3].compact(true)   -> [1,2,3]
	*
	***/
	compact(all?: bool): any[];

	/***
	* @short Counts all elements in the array that match <f>.
	* @method count(<f>)
	* @returns Number
	* @extra <f> will match a string, number, array, object, or alternately test against a function or regex. This method implements @array_matching.
	* @example
	*
	*   [1,2,3,1].count(1)       -> 2
	*   ['a','b','c'].count(/b/) -> 1
	+   [{a:1},{b:2}].count(function(n) {
	*     return n['a'] > 1;
	*   });                      -> 0
	*
	***/
	count(f: number): number;
	count(f: string): number;
	count(f: any[]): number;
	count(f: Object): number;
	count(f: (n: any) => any): number;
	count(f: RegExp): number;

	/***
	* @short Runs <fn> against each element in the array. Enhanced version of %Array#forEach%.
	* @method each(<fn>, [index] = 0, [loop] = false)
	* @returns Array
	* @extra Parameters passed to <fn> are identical to %forEach%,
	*        ie. the first parameter is the current element, second
	*        parameter is the current index, and third parameter is
	*        the array itself. If <fn> returns %false% at any time
	*        it will break out of the loop. Once %each% finishes,
	*        it will return the array. If [index] is passed, <fn> will
	*        begin at that index and work its way to the end. If [loop]
	*        is true, it will then start over from the beginning of the
	*        array and continue until it reaches [index] - 1.
	* @example
	*
	*   [1,2,3,4].each(function(n) {
	*     // Called 4 times: 1, 2, 3, 4
	*   });
	*   [1,2,3,4].each(function(n) {
	*     // Called 4 times: 3, 4, 1, 2
	*   }, 2, true);
	*
	***/
	each(fn: (el: any, i?: number, array?: any[]) => bool,
		index?: number,
		loop?: bool): any[];

	/***
	* @short Returns true if all elements in the array match <f>.
	* @method every(<f>, [scope])
	* @returns Boolean
	* @extra [scope] is the %this% object. %all% is provided an alias.
	*        In addition to providing this method for browsers that don't
	*        support it natively, this method also implements @array_matching.
	* @example
	*
	+   ['a','a','a'].every(function(n) {
	*     return n == 'a';
	*   });
	*   ['a','a','a'].every('a')   -> true
	*   [{a:2},{a:2}].every({a:2}) -> true
	***/
	every(f: number, scope?: any): bool;
	every(f: string, scope?: any): bool;
	every(f: Object, scope?: any): bool;
	every(f: (el: any, i?: number, array?: any[]) => bool, scope?: any): bool;
	all(f: number, scope?: any): bool;
	all(f: string, scope?: any): bool;
	all(f: Object, scope?: any): bool;
	all(f: (el: any, i?: number, array?: any[]) => bool, scope?: any): bool;

	/***
	* @short Removes any element in the array that matches [f1], [f2], etc.
	* @method exclude([f1], [f2], ...)
	* @returns Array
	* @extra This is a non-destructive alias for %remove%. It will not change the original array. This method implements @array_matching.
	* @example
	*
	*   [1,2,3].exclude(3)         -> [1,2]
	*   ['a','b','c'].exclude(/b/) -> ['a','c']
	*   [{a:1},{b:2}].exclude(function(n) {
	*     return n['a'] == 1;
	*   });                       -> [{b:2}]
	*
	***/
	exclude(...f: number[]): number[];
	exclude(...f: string[]): string[];
	exclude(...f: RegExp[]): string[];
	exclude(...f: Object[]): Object[];
	exclude(...f: (el: any) => bool): any[];

	/***
	* @short Returns any elements in the array that match <f>.
	* @method filter(<f>, [scope])
	* @returns Array
	* @extra [scope] is the %this% object. In addition to providing this
	*        method for browsers that don't support it natively, this method
	*        also implements @array_matching.
	* @example
	*
	*   [1,2,3].filter(function(n) {
	*     return n > 1;
	*   });
	*   [1,2,2,4].filter(2) -> 2
	*
	***/
	filter(f: number, scope?: any): number[];
	filter(f: string, scope?: any): string[];
	filter(f: RegExp, scope?: any): String[];
	filter(f: Object, scope?: any): Object[];
	filter(f: (el: any, i?: number, array?: any[]) => bool, scope?: any): any[];

	/***
	* @short Returns the first element that matches <f>.
	* @method find(<f>, [index] = 0, [loop] = false)
	* @returns Mixed
	* @extra <f> will match a string, number, array, object, or alternately
	*        test against a function or regex. Starts at [index], and will
	*        continue once from index = 0 if [loop] is true. This method
	*        implements @array_matching.
	* @example
	*
	*   [{a:1,b:2},{a:1,b:3},{a:1,b:4}].find(function(n) {
	*     return n['a'] == 1;
	*   });                                     -> {a:1,b:3}
	*   ['cuba','japan','canada'].find(/^c/, 2) -> 'canada'
	*
	***/
	find(f: number, index?: number, loop?: bool): number;
	find(f: string, index?: number, loop?: bool): string;
	find(f: RegExp, index?: number, loop?: bool): string;
	find(f: Object, index?: number, loop?: bool): Object;
	find(f: (el: any, i?: number, array?: any[]) => bool, index?: number, loop?: bool): any;

	/***
	* @short Returns all elements that match <f>.
	* @method findAll(<f>, [index] = 0, [loop] = false)
	* @returns Array
	* @extra <f> will match a string, number, array, object, or alternately
	*        test against a function or regex. Starts at [index], and will
	*        continue once from index = 0 if [loop] is true. This method
	*        implements @array_matching.
	* @example
	*
	*   [{a:1,b:2},{a:1,b:3},{a:2,b:4}].findAll(function(n) {
	*     return n['a'] == 1;
	*   });                                        -> [{a:1,b:3},{a:1,b:4}]
	*   ['cuba','japan','canada'].findAll(/^c/)    -> 'cuba','canada'
	*   ['cuba','japan','canada'].findAll(/^c/, 2) -> 'canada'
	*
	***/
	findAll(f: number, index?: number, loop?: bool): number[];
	findAll(f: string, index?: number, loop?: bool): string[];
	findAll(f: RegExp, index?: number, loop?: bool): string[];
	findAll(f: Object, index?: number, loop?: bool): Object[];
	findAll(f: (el: any, i?: number, array?: any[]) => bool, index?: number, loop?: bool): any[];

	/***
	* @short Returns the index of the first element that matches <f>
	*        or -1 if not found.
	* @method findIndex(<f>, [startIndex] = 0, [loop] = false)
	* @returns Number
	* @extra This method has a few notable differences to native %indexOf%.
	*        Although <f> will similarly match a primitive such as a string
	*        or number, it will also match deep objects and arrays that are
	*        not equal by reference (%===%). Additionally, if a function is
	*        passed it will be run as a matching function (similar to the
	*        behavior of %Array#filter%) rather than attempting to find that
	*        function itself by reference in the array. Starts at [index],
	*        and will continue once from index = 0 if [loop] is true.
	*        This method implements @array_matching.
	* @example
	*
	*   [1,2,3,4].findIndex(3);  -> 2
	*   [1,2,3,4].findIndex(function(n) {
	*     return n % 2 == 0;
	*   }); -> 1
	*   ['one','two','three'].findIndex(/th/); -> 2
	*
	***/
	findIndex(f: number, startIndex?: number, loop?: bool): number;
	findIndex(f: string, startIndex?: number, loop?: bool): number;
	findIndex(f: Object, startIndex?: number, loop?: bool): number;
	findIndex(f: RegExp, startIndex?: number, loop?: bool): number;
	findIndex(f: (el: any, i?: number, array?: any[]) => bool, startIndex?: number, loop?: bool): number;

	/***
	* @short Returns the first element(s) in the array.
	* @method first([num] = 1)
	* @returns Mixed
	* @extra When <num> is passed, returns the first <num> elements in the array.
	* @example
	*
	*   [1,2,3].first()        -> 1
	*   [1,2,3].first(2)       -> [1,2]
	*
	***/
	first(num?: number): any[];

	/***
	* @short Returns a flattened, one-dimensional copy of the array.
	* @method flatten([limit] = Infinity)
	* @returns Array
	* @extra You can optionally specify a [limit], which will only flatten
	*        that depth.
	* @example
	*
	*   [[1], 2, [3]].flatten()      -> [1,2,3]
	*   [['a'],[],'b','c'].flatten() -> ['a','b','c']
	*
	***/
	flatten(limit?: number): any[];

	/***
	* @short Iterates over the array, calling [fn] on each loop.
	* @method forEach([fn], [scope])
	* @returns Nothing
	* @extra This method is only provided for those browsers that do not support
	*        it natively. [scope] becomes the %this% object.
	* @example
	*
	*   ['a','b','c'].forEach(function(a) {
	*     // Called 3 times: 'a','b','c'
	*   });
	*
	***/
	forEach(fn: (el: any, i?: number, array?: any[]) => any, scope?: any): void;

	/***
	* @short Returns a slice of the array from <index>.
	* @method from(<index>)
	* @returns Array
	* @example
	*
	*   [1,2,3].from(1)  -> [2,3]
	*   [1,2,3].from(2)  -> [3]
	*
	***/
	from(index: number): any[];

	/***
	* @short Groups the array by <map>.
	* @method groupBy(<map>, [fn])
	* @returns Object
	* @extra Will return an object with keys equal to the grouped values.
	*        <map> may be a mapping function, or a string acting as a shortcut.
	*        Optionally calls [fn] for each group.
	* @example
	*
	*   ['fee','fi','fum'].groupBy('length') -> { 2: ['fi'], 3: ['fee','fum'] }
	+   [{age:35,name:'ken'},{age:15,name:'bob'}].groupBy(function(n) {
	*     return n.age;
	*   });                                  -> { 35: [{age:35,name:'ken'}], 15: [{age:15,name:'bob'}] }
	*
	***/
	groupBy(map: string, fn?: (n: any) => void): Object;
	groupBy(fn: (n: any) => void): Object;

	/***
	* @short Groups the array into <num> arrays.
	* @method inGroups(<num>, [padding])
	* @returns Array
	* @extra [padding] specifies a value with which to pad the last array
	*        so that they are all equal length.
	* @example
	*
	*   [1,2,3,4,5,6,7].inGroups(3)         -> [ [1,2,3], [4,5,6], [7] ]
	*   [1,2,3,4,5,6,7].inGroups(3, 'none') -> [ [1,2,3], [4,5,6], [7,'none','none'] ]
	*
	***/
	inGroups(num: number, padding?: any): any[][];

	/***
	* @short Groups the array into arrays of <num> elements each.
	* @method inGroupsOf(<num>, [padding] = null)
	* @returns Array
	* @extra [padding] specifies a value with which to pad the last array so that they are all equal length.
	* @example
	*
	*   [1,2,3,4,5,6,7].inGroupsOf(4)         -> [ [1,2,3,4], [5,6,7] ]
	*   [1,2,3,4,5,6,7].inGroupsOf(4, 'none') -> [ [1,2,3,4], [5,6,7,'none'] ]
	*
	***/
	inGroupsOf(num: number, padding?: any): any[][];

	/***
	* @short Adds <el> to the array.
	* @method include(<el>, [index])
	* @returns Array
	* @extra This is a non-destructive alias for %add%. It will not change
	*        the original array.
	* @example
	*
	*   [1,2,3,4].include(5)       -> [1,2,3,4,5]
	*   [1,2,3,4].include(8, 1)    -> [1,8,2,3,4]
	*   [1,2,3,4].include([5,6,7]) -> [1,2,3,4,5,6,7]
	*
	***/
	include(el: any, index?: number): any[];

	/***
	* @short Searches the array and returns the first index where <search> occurs, or -1 if the element is not found.
	* @method indexOf(<search>, [fromIndex])
	* @returns Number
	* @extra [fromIndex] is the index from which to begin the search.
	*        This method performs a simple strict equality comparison on <search>.
	*        It does not support enhanced functionality such as searching
	*        the contents against a regex, callback, or deep comparison of objects.
	*        For such functionality, use the %findIndex% method instead.
	* @example
	*
	*   [1,2,3].indexOf(3)           -> 1
	*   [1,2,3].indexOf(7)           -> -1
	*
	***/
	indexOf(search: any, fromIndex?: number): number;

	/***
	* @short Returns an array containing the elements all arrays have in common.
	* @method intersect([a1], [a2], ...)
	* @returns Array
	* @extra This method will also correctly operate on arrays of objects.
	* @example
	*
	*   [1,3,5].intersect([5,7,9])   -> [5]
	*   ['a','b'].intersect('b','c') -> ['b']
	*
	***/
	intersect(...args: number[]): number[];
	intersect(...args: string[]): string[];
	intersect(...args: Object[]): Object[];
	intersect(...args: any[]): any[];

	/***
	* @short Returns true if the array is empty.
	* @method isEmpty()
	* @returns Boolean
	* @extra This is true if the array has a length of zero, or contains
	*        only %undefined%, %null%, or %NaN%.
	* @example
	*
	*   [].isEmpty()               -> true
	*   [null,undefined].isEmpty() -> true
	*
	***/
	isEmpty(): bool;

	/***
	* @short Returns the last element(s) in the array.
	* @method last([num] = 1)
	* @returns Mixed
	* @extra When <num> is passed, returns the last <num> elements in the array.
	* @example
	*
	*   [1,2,3].last()        -> 3
	*   [1,2,3].last(2)       -> [2,3]
	*
	***/
	last(): any;
	last(num: number): any[];

	/***
	* @short Searches the array and returns the last index where <search> occurs,
	*        or -1 if the element is not found.
	* @method lastIndexOf(<search>, [fromIndex])
	* @returns Number
	* @extra [fromIndex] is the index from which to begin the search.
	*        This method performs a simple strict equality comparison on <search>.
	* @example
	*
	*   [1,2,1].lastIndexOf(1)                 -> 2
	*   [1,2,1].lastIndexOf(7)                 -> -1
	*
	***/
	lastIndexOf(search: any, fromIndex?: number): number;

	/***
	* @short Returns the elements in the array with the least
	*        commonly occuring value.
	* @method least([map])
	* @returns Array
	* @extra [map] may be a function mapping the value to be checked or a
	*        string acting as a shortcut.
	* @example
	*
	*   [3,2,2].least()                   -> [3]
	*   ['fe','fo','fum'].least('length') -> ['fum']
	*   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].least(function(n) {
	*     return n.age;
	*   });                               -> [{age:35,name:'ken'}]
	*
	***/
	least(map: string): any[];
	least(map: (n: any) => any): any[];

	/***
	* @short Maps the array to another array containing the values that
	*        are the result of calling <map> on each element.
	* @method map(<map>, [scope])
	* @returns Array
	* @extra [scope] is the %this% object. In addition to providing this method
	*        for browsers that don't support it natively, this enhanced method
	*        also directly accepts a string, which is a shortcut for a function
	*        that gets that property (or invokes a function) on each element.
	* @example
	*
	*   [1,2,3].map(function(n) {
	*     return n * 3;
	*   });                                  -> [3,6,9]
	*   ['one','two','three'].map(function(n) {
	*     return n.length;
	*   });                                  -> [3,3,5]
	*   ['one','two','three'].map('length')  -> [3,3,5]
	***/
	map(map: string, scope?: any): any[];
	map(map: (n: any) => any, scope?: any): any[];

	/***
	* @short Returns the element in the array with the greatest value.
	* @method max([map], [all] = false)
	* @returns Mixed
	* @extra [map] may be a function mapping the value to be checked or a string
	*        acting as a shortcut. If [all] is true, will return all max values
	*        in an array.
	* @example
	*
	*   [1,2,3].max()                          -> 3
	*   ['fee','fo','fum'].max('length')       -> 'fee'
	*   ['fee','fo','fum'].max('length', true) -> ['fee']
	+   [{a:3,a:2}].max(function(n) {
	*     return n['a'];
	*   });                              -> {a:3}
	*
	***/
	max(map: string): any;
	max(map: (n: any) => any): any;

	/***
	* @short Returns the element in the array with the lowest value.
	* @method min([map], [all] = false)
	* @returns Mixed
	* @extra [map] may be a function mapping the value to be checked or a string acting as a shortcut. If [all] is true, will return all min values in an array.
	* @example
	*
	*   [1,2,3].min()                          -> 1
	*   ['fee','fo','fum'].min('length')       -> 'fo'
	*   ['fee','fo','fum'].min('length', true) -> ['fo']
	+   ['fee','fo','fum'].min(function(n) {
	*     return n.length;
	*   });                              -> ['fo']
	+   [{a:3,a:2}].min(function(n) {
	*     return n['a'];
	*   });                              -> [{a:2}]
	*
	***/
	min(map: string): any;
	min(map: (n: any) => any): any;

	/***
	* @short Returns the elements in the array with the most
	*        commonly occuring value.
	* @method most([map])
	* @returns Array
	* @extra [map] may be a function mapping the value to be checked or a string
	*              acting as a shortcut.
	* @example
	*
	*   [3,2,2].most()                   -> [2]
	*   ['fe','fo','fum'].most('length') -> ['fe','fo']
	+   [{age:35,name:'ken'},{age:12,name:'bob'},{age:12,name:'ted'}].most(function(n) {
	*     return n.age;
	*   });                              -> [{age:12,name:'bob'},{age:12,name:'ted'}]
	*
	***/
	most(map: string): any[];
	most(map: (n: any) => any): any[];

	/***
	* @short Returns true if none of the elements in the array match <f>.
	* @method none(<f>)
	* @returns Boolean
	* @extra <f> will match a string, number, array, object, or alternately test
	*        against a function or regex. This method implements @array_matching.
	* @example
	*
	*   [1,2,3].none(5)         -> true
	*   ['a','b','c'].none(/b/) -> false
	+   [{a:1},{b:2}].none(function(n) {
	*     return n['a'] > 1;
	*   });                     -> true
	*
	***/
	none(f: number): bool;
	none(f: string): bool;
	none(f: RegExp): bool;
	none(f: Object): bool;
	none(f: any[]): bool;
	none(f: (n: any) => bool): bool;

	/***
	* @short Returns a copy of the array with the elements randomized.
	* @method randomize()
	* @returns Array
	* @extra Uses Fisher-Yates algorithm.
	* @example
	*
	*   [1,2,3,4].randomize()  -> [?,?,?,?]
	*
	***/
	randomize(): any[];

	/***
	* @short Reduces the array to a single result.
	* @method reduce(<fn>, [init])
	* @returns Mixed
	* @extra If [init] is passed as a starting value, that value will be passed
	*        as the first argument to the callback. The second argument will be
	*        the first element in the array. From that point, the result of the
	*        callback will then be used as the first argument of the next
	*        iteration. This is often refered to as "accumulation", and [init]
	*        is often called an "accumulator". If [init] is not passed, then
	*         <fn> will be called n - 1 times, where n is the length of the array.
	*        In this case, on the first iteration only, the first argument will
	*        be the first element of the array, and the second argument will be
	*        the second. After that callbacks work as normal, using the result
	*        of the previous callback as the first argument of the next. This
	*        method is only provided for those browsers that do not support it
	*        natively.
	*
	* @example
	*
	*   [1,2,3,4].reduce(function(a, b) {
	*     return a - b;
	*   });
	*   [1,2,3,4].reduce(function(a, b) {
	*     return a - b;
	*   }, 100);
	*
	***/
	reduce(fn: (a: any, b: any) => any, init: any): any;

	/***
	* @short Identical to %Array#reduce%,
	*        but operates on the elements in reverse order.
	* @method reduceRight([fn], [init])
	* @returns Mixed
	* @extra This method is only provided for those browsers that do not support
	*        it natively.
	* @example
	*
	*   [1,2,3,4].reduceRight(function(a, b) {
	*     return a - b;
	*   });
	*
	***/
	reduceRight(fn: (a: any, b: any) => any, init: any): any;

	/***
	* @short Removes any element in the array that matches [f1], [f2], etc.
	* @method remove([f1], [f2], ...)
	* @returns Array
	* @extra Will match a string, number, array, object, or alternately test
	*        against a function or regex. This method will change the array!
	*        Use %exclude% for a non-destructive alias. This method implements
	*        @array_matching.
	* @example
	*
	*   [1,2,3].remove(3)         -> [1,2]
	*   ['a','b','c'].remove(/b/) -> ['a','c']
	+   [{a:1},{b:2}].remove(function(n) {
	*     return n['a'] == 1;
	*   });                       -> [{b:2}]
	*
	***/
	remove(...args: number[]): number[];
	remove(...args: string[]): string[];
	remove(...args: Object[]): Object[];
	remove(...args: any[]): any[];
	remove(fn: (n: any) => bool): any[];

	/***
	* @short Removes element at <start>. If [end] is specified, removes the range
	*        between <start> and [end]. This method will change the array!
	*        If you don't intend the array to be changed use %clone% first.
	* @method removeAt(<start>, [end])
	* @returns Array
	* @example
	*
	*   ['a','b','c'].removeAt(0) -> ['b','c']
	*   [1,2,3,4].removeAt(1, 3)  -> [1]
	*
	***/
	removeAt(start: number, end?: number): any[];

	/***
	* @short Returns a random element from the array.
	* @method sample([num])
	* @returns Mixed
	* @extra If [num] is passed, will return [num] samples from the array.
	* @example
	*
	*   [1,2,3,4,5].sample()  -> // Random element
	*   [1,2,3,4,5].sample(3) -> // Array of 3 random elements
	*
	***/
	sample(): any;
	sample(num: number): any[];

	/***
	* @short Returns true if any element in the array matches <f>.
	* @method some(<f>, [scope])
	* @returns Boolean
	* @extra [scope] is the %this% object. %any% is provided as an alias.
	*        In addition to providing this method for browsers that don't
	*        support it natively, this method also implements @array_matching.
	* @example
	*
	*   ['a','b','c'].some(function(n) {
	*     return n == 'a';
	*   });
	*   ['a','b','c'].some(function(n) {
	*     return n == 'd';
	*   });
	*   ['a','b','c'].some('a')   -> true
	*   [{a:2},{b:5}].some({a:2}) -> true
	***/
	some(f: number, scope?: any): bool;
	some(f: string, scope?: any): bool;
	some(f: any, scope?: any): bool;
	some(f: (n: any) => bool, scope?: any): bool;

	/***
	* @short Sorts the array by <map>.
	* @method sortBy(<map>, [desc] = false)
	* @returns Array
	* @extra <map> may be a function, a string acting as a shortcut, or blank
	*        (direct comparison of array values). [desc] will sort the array in
	*        descending order. When the field being sorted on is a string, the
	*        resulting order will be determined by an internal collation algorithm
	*        that is optimized for major Western languages, but can be customized.
	*        For more information see @array_sorting.
	* @example
	*
	*   ['world','a','new'].sortBy('length')       -> ['a','new','world']
	*   ['world','a','new'].sortBy('length', true) -> ['world','new','a']
	*   [{age:72},{age:13},{age:18}].sortBy(function(n) {
	*     return n.age;
	*   });                                        -> [{age:13},{age:18},{age:72}]
	*
	***/
	sortBy(map: string, desc?: bool): any[];
	sortBy(fn: (n: any) => any, desc?: bool): any[];

	/***
	* @short Subtracts from the array all elements in [a1], [a2], etc.
	* @method subtract([a1], [a2], ...)
	* @returns Array
	* @extra This method will also correctly operate on arrays of objects.
	* @example
	*
	*   [1,3,5].subtract([5,7,9])   -> [1,3]
	*   [1,3,5].subtract([3],[5])   -> [1]
	*   ['a','b'].subtract('b','c') -> ['a']
	*
	***/
	subtract(...args: any[]): any[];

	/***
	* @method sum([map])
	* @returns Number
	* @short Sums all values in the array.
	* @extra [map] may be a function mapping the value to be summed or a string
	*        acting as a shortcut.
	* @example
	*
	*   [1,2,2].sum()                           -> 5
	*   [{age:35},{age:12},{age:12}].sum(function(n) {
	*     return n.age;
	*   });                                     -> 59
	*   [{age:35},{age:12},{age:12}].sum('age') -> 59
	*
	***/
	sum(map: string): number;
	sum(fn: (n: any) => number): number;

	/***
	* @short Returns a slice of the array up to <index>.
	* @method to(<index>)
	* @returns Array
	* @example
	*
	*   [1,2,3].to(1)  -> [1]
	*   [1,2,3].to(2)  -> [1,2]
	*
	***/
	to(index: number): any[];

	/***
	* @short Returns an array containing all elements in all arrays with
	*        duplicates removed.
	* @method union([a1], [a2], ...)
	* @returns Array
	* @extra This method will also correctly operate on arrays of objects.
	* @example
	*
	*   [1,3,5].union([5,7,9])     -> [1,3,5,7,9]
	*   ['a','b'].union(['b','c']) -> ['a','b','c']
	*
	***/
	union(array: any[]): any[];
	union(...args: any[]): any[];

	/***
	* @short Removes all duplicate elements in the array.
	* @method unique([map] = null)
	* @returns Array
	* @extra [map] may be a function mapping the value to be uniqued on or a
	*        string acting as a shortcut. This is most commonly used when you
	*        have a key that ensures the object's uniqueness, and don't need to
	*        check all fields. This method will also correctly operate on arrays
	*        of objects.
	* @example
	*
	*   [1,2,2,3].unique()                 -> [1,2,3]
	*   [{foo:'bar'},{foo:'bar'}].unique() -> [{foo:'bar'}]
	+   [{foo:'bar'},{foo:'bar'}].unique(function(obj){
	*     return obj.foo;
	*   }); -> [{foo:'bar'}]
	*   [{foo:'bar'},{foo:'bar'}].unique('foo') -> [{foo:'bar'}]
	*
	***/
	unique(map?: string): any[];
	unique(fn?: (obj: any) => any): any[];

	/***
	* @short Merges multiple arrays together.
	* @method zip([arr1], [arr2], ...)
	* @returns Array
	* @extra This method "zips up" smaller arrays into one large whose elements
	*        are "all elements at index 0", "all elements at index 1", etc.
	*        Useful when you have associated data that is split over separated
	*        arrays. If the arrays passed have more elements than the original
	*        array, they will be discarded. If they have fewer elements, the
	*        missing elements will filled with %null%.
	* @example
	*
	*   [1,2,3].zip([4,5,6])                                       -> [[1,2], [3,4], [5,6]]
	*   ['Martin','John'].zip(['Luther','F.'], ['King','Kennedy']) -> [['Martin','Luther','King'], ['John','F.','Kennedy']]
	*
	***/
	zip(...arrays: any[]): any[][];
}

interface Object {

	/***
	* @short Creates a new object, equivalent to %new Object()% or %{}%,
	*        but with extended methods.
	* @method Object.extended(<obj> = {})
	* @returns Extended object
	* @extra See extended objects for more.
	* @example
	*
	*   Object.extended()
	*   Object.extended({ happy:true, pappy:false }).keys() -> ['happy','pappy']
	*   Object.extended({ happy:true, pappy:false }).values() -> [true, false]
	*
	***/
	extended(obj?: Object): Object;

	/***
	* @short Converts the query string of a URL into an object.
	* @method Object.fromQueryString(<str>, [deep] = true)
	* @returns Object
	* @extra If [deep] is %false%, conversion will only accept shallow params (ie. no object or arrays with %[]% syntax) as these are not universally supported.
	* @example
	*
	*   Object.fromQueryString('foo=bar&broken=wear') -> { foo: 'bar', broken: 'wear' }
	*   Object.fromQueryString('foo[]=1&foo[]=2')     -> { foo: [1,2] }
	*
	***/
	fromQueryString(str: string, deep?: bool): Object;

	/***
	* @short Returns true if <obj> is an object of that type.
	* @method Object.is[Type](<obj>)
	* @returns Boolean
	* @extra %isObject% will return false on anything that is not an object
	*        literal, including instances of inherited classes. Note also
	*        that %isNaN% will ONLY return true if the object IS %NaN%.
	*        It does not mean the same as browser native %isNaN%, which returns
	*        true for anything that is "not a number".
	*
	* @set
	*   isArray
	*   isObject
	*   isBoolean
	*   isDate
	*   isFunction
	*   isNaN
	*   isNumber
	*   isString
	*   isRegExp
	*
	* @example
	*
	*   Object.isArray([1,2,3])            -> true
	*   Object.isDate(3)                   -> false
	*   Object.isRegExp(/wasabi/)          -> true
	*   Object.isObject({ broken:'wear' }) -> true
	*
	***/
	isArray(): bool;
	isArray(obj: any): bool;
	isObject(): bool;
	isObject(obj: any): bool;
	isBoolean(): bool;
	isBoolean(obj: any): bool;
	isDate(): bool;
	isDate(obj: any): bool;
	isFunction(): bool;
	isFunction(obj: any): bool;
	isNaN(): bool;
	isNaN(obj: any): bool;
	isNumber(): bool;
	isNumber(obj: any): bool;
	isString(): bool;
	isString(obj: any): bool;
	isRegExp(): bool;
	isRegExp(obj: any): bool;

	/***
	* @short Creates a clone (copy) of <obj>.
	* @method clone(<obj> = {}, [deep] = false)
	* @returns Cloned object
	* @extra Default is a shallow clone, unless [deep] is true. %clone%
	*        is available as an instance method on extended objects.
	* @example
	*
	*   Object.clone({foo:'bar'})            -> { foo: 'bar' }
	*   Object.clone()                       -> {}
	*   Object.extended({foo:'bar'}).clone() -> { foo: 'bar' }
	*
	***/
	clone(obj?: Object, deep?: bool): Object;

	/***
	* @short Enumerable methods in the Array package are also available to
	*        the Object class. They will perform their normal operations for
	*        every property in <obj>.
	* @method [enumerable](<obj>)
	* @returns Boolean
	* @extra In cases where a callback is used, instead of %element, index%,
	*        the callback will instead be passed %key, value%. Enumerable methods
	*        are also available to extended objects as instance methods.
	*
	* @set
	*   each
	*   map
	*   any
	*   all
	*   none
	*   count
	*   find
	*   findAll
	*   reduce
	*   isEmpty
	*   sum
	*   average
	*   min
	*   max
	*   least
	*   most
	*
	* @example
	*
	*   Object.any({foo:'bar'}, 'bar')            -> true
	*   Object.extended({foo:'bar'}).any('bar')   -> true
	*   Object.isEmpty({})                        -> true
	*   Object.map({ fred: { age: 52 } }, 'age'); -> { fred: 52 }
	*
	***/
	map(map: string): Object;
	map(obj: Object, map: string): Object;
	map(map: (key: string, value: any) => any): Object;
	map(obj: Object, map: (key: string, value: any) => any): Object;

	any(map: string): bool;
	any(obj: Object, map: string): bool;
	any(map: (key: string, value: any) => bool): bool;
	any(obj: Object, map: (key: string, value: any) => bool): bool;

	all(map: string): bool;
	all(obj: Object, map: string): bool;
	all(map: (key: string, value: any) => bool): bool;
	all(obj: Object, map: (key: string, value: any) => bool): bool;

	none(map: string): bool;
	none(obj: Object, map: string): bool;
	none(map: (key: string, value: any) => bool): bool;
	none(obj: Object, map: (key: string, value: any) => bool): bool;

	count(map: string): number;
	count(obj: Object, map: string): number;
	count(map: (key: string, value: any) => bool): number;
	count(obj: Object, map: (key: string, value: any) => bool): number;
	
	find(map: string): any;
	find(obj: Object, map: string): any;
	find(map: (key: string, value: any) => bool): any;
	find(obj: Object, map: (key: string, value: any) => bool): any;

	findAll(map: string): any[];
	findAll(obj: Object, map: string): any[];
	findAll(map: (key: string, value: any) => bool): any[];
	findAll(obj: Object, map: (key: string, value: any) => bool): any[];

	reduce(map: string, init?: any): any;
	reduce(obj: Object, map: string, init?: any): any;
	reduce(map: (key: string, value: any) => any, init?: any): any;
	reduce(obj: Object, map: (key: string, value: any) => any, init?: any): any;
	
	isEmpty(): bool;
	isEmpty(obj: Object): bool;
	
	sum(map: string): number;
	sum(obj: Object, map: string): number;
	sum(map: (key: string, value: any) => number): number;
	sum(obj: Object, map: (key: string, value: any) => number): number;

	average(map: string): number;
	average(obj: Object, map: string): number;
	average(map: (key: string, value: any) => number): number;
	average(obj: Object, map: (key: string, value: any) => number): number;

	min(map: string): Object;
	min(obj: Object, map: string): Object;
	min(map: (key: string, value: any) => any): Object;
	min(obj: Object, map: (key: string, value: any) => any): Object;

	max(map: string): Object;
	max(obj: Object, map: string): Object;
	max(map: (key: string, value: any) => any): Object;
	max(obj: Object, map: (key: string, value: any) => any): Object;

	least(map: string): Object;
	least(obj: Object, map: string): Object;
	least(map: (key: string, value: any) => any): Object;
	least(obj: Object, map: (key: string, value: any) => any): Object;

	most(map: string): Object;
	most(obj: Object, map: string): Object;
	most(map: (key: string, value: any) => any): Object;
	most(obj: Object, map: (key: string, value: any) => any): Object;

	/***
	* @short Returns true if <a> and <b> are equal.
	* @method equal(<a>, <b>)
	* @returns Boolean
	* @extra %equal% in Sugar is "egal", meaning the values are equal
	*        if they are "not observably distinguishable". Note that on
	*        extended objects the name is %equals% for readability.
	* @example
	*
	*   Object.equal({a:2}, {a:2}) -> true
	*   Object.equal({a:2}, {a:3}) -> false
	*   Object.extended({a:2}).equals({a:3}) -> false
	*
	***/
	equal(a: Object, b: Object): bool;

	/***
	* @short Checks if <obj> has <key> using hasOwnProperty from Object.prototype.
	* @method has(<obj>, <key>)
	* @returns Boolean
	* @extra This method is considered safer than %Object#hasOwnProperty% when
	*        using objects as hashes. See 
	*        http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/ 
	*        for more.
	* @example
	*
	*   Object.has({ foo: 'bar' }, 'foo') -> true
	*   Object.has({ foo: 'bar' }, 'baz') -> false
	*   Object.has({ hasOwnProperty: true }, 'foo') -> false
	*
	***/
	has(key: string): bool;
	has(obj: Object, key: string): bool;

	/***
	* @short Returns an array containing the keys in <obj>. Optionally calls
	*        [fn] for each key.
	* @method keys(<obj>, [fn])
	* @returns Array
	* @extra This method is provided for browsers that don't support it natively,
	*        and additionally is enhanced to accept the callback [fn]. Returned
	*        keys are in no particular order. %keys% is available as an instance
	*        method on extended objects.
	* @example
	*
	*   Object.keys({ broken: 'wear' }) -> ['broken']
	*   Object.keys({ broken: 'wear' }, function(key, value) {
	*     // Called once for each key.
	*   });
	*   Object.extended({ broken: 'wear' }).keys() -> ['broken']
	*
	***/
	keys(): string[];
	keys(obj: Object, fn?: (key: string, value: any) => void ): string[];

	/***
	* @short Merges all the properties of <source> into <target>.
	* @method merge(<target>, <source>, [deep] = false, [resolve] = true)
	* @returns Merged object
	* @extra Merges are shallow unless [deep] is %true%. Properties of <source>
	*        will win in the case of conflicts, unless [resolve] is %false%.
	*        [resolve] can also be a function that resolves the conflict.
	*        In this case it will be passed 3 arguments, %key%, %targetVal%,
	*        and %sourceVal%, with the context set to <source>. This will allow
	*        you to solve conflict any way you want, ie. adding two numbers
	*        together, etc. %merge% is available as an instance method on
	*        extended objects.
	* @example
	*
	*   Object.merge({a:1},{b:2}) -> { a:1, b:2 }
	*   Object.merge({a:1},{a:2}, false, false) -> { a:1 }
	+   Object.merge({a:1},{a:2}, false, function(key, a, b) {
	*     return a + b;
	*   }); -> { a:3 }
	*   Object.extended({a:1}).merge({b:2}) -> { a:1, b:2 }
	*
	***/
	merge(target: Object, source: Object, deep?: bool, resolve?: bool): Object;
	merge(target: Object, source: Object, deep?: bool, resolve?: (key: string, targetVal: any, sourceVal: any) => any): Object;

	/***
	* @short Returns the number of properties in <obj>.
	* @method size(<obj>)
	* @returns Number
	* @extra %size% is available as an instance method on extended objects.
	* @example
	*
	*   Object.size({ foo: 'bar' }) -> 1
	*
	***/
	size(): number;
	size(obj: Object): number;

	/***
	* @short Runs <fn> and returns <obj>.
	* @method tap(<obj>, <fn>)
	* @returns Object
	* @extra  A string can also be used as a shortcut to a method. This method
	*         is used to run an intermediary function in the middle of method
	*         chaining. As a standalone method on the Object class it doesn't
	*         have too much use. The power of %tap% comes when using extended
	*         objects or modifying the Object prototype with Object.extend().
	* @example
	*
	*   Object.extend();
	*   [2,4,6].map(Math.exp).tap(function(arr) {
	*     arr.pop()
	*   });
	*   [2,4,6].map(Math.exp).tap('pop').map(Math.round); ->  [7,55]
	*
	***/
	tap(fn: string): Object;
	tap(fn: (...args: any[]) => any): Object;
	tap(obj: Object, fn: string): Object;
	tap(obj: Object, fn: (...args: any[]) => any): Object;

	/***
	* @short Returns an array containing the values in <obj>.
	*        Optionally calls [fn] for each value.
	* @method values(<obj>, [fn])
	* @returns Array
	* @extra Returned values are in no particular order. %values% is available
	*        as an instance method on extended objects.
	* @example
	*
	*   Object.values({ broken: 'wear' }) -> ['wear']
	*   Object.values({ broken: 'wear' }, function(value) {
	*     // Called once for each value.
	*   });
	*   Object.extended({ broken: 'wear' }).values() -> ['wear']
	*
	***/
	values(): any[];
	values(fn: (value: any) => any): any[];
	values(obj: Object): any[];
	values(obj: Object, fn: (value: any) => any): any[];

	/***
	* @short Watches a property of <obj> and runs <fn> when it changes.
	* @method watch(<obj>, <prop>, <fn>)
	* @returns Nothing
	* @extra <fn> is passed three arguments: the property <prop>, the old value,
	*        and the new value. The return value of [fn] will be set as the new
	*        value. This method is useful for things such as validating or cleaning
	*        the value when it is set. Warning: this method WILL NOT work in
	*        browsers that don't support %Object.defineProperty%. This notably
	*        includes IE 8 and below, and Opera. This is the only method in Sugar
	*        that is not fully compatible with all browsers. %watch% is available
	*        as an instance method on extended objects.
	* @example
	*
	*   Object.watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
	*     // Will be run when the property 'foo' is set on the object.
	*   });
	*   Object.extended().watch({ foo: 'bar' }, 'foo', function(prop, oldVal, newVal) {
	*     // Will be run when the property 'foo' is set on the object.
	*   });
	*
	***/
	watch(prop: string, fn: (prop: string, oldVal: any, newVal: any) => any): void;
	watch(obj: Object, prop: string, fn: (prop: string, oldVal: any, newVal: any) => any): void;
}

interface Function {

	/***
	* @short Creates a function that will execute after [num] calls.
	* @method after([num] = 1)
	* @returns Function
	* @extra %after% is useful for running a final callback after a series of
	*        asynchronous operations, when the order in which the operations will
	*        complete is unknown.
	* @example
	*
	*   var fn = (function() {
	*     // Will be executed once only
	*   }).after(3); fn(); fn(); fn();
	*
	***/
	after(num?: number): Function;

	/***
	* @short Binds <scope> as the %this% object for the function when it is called.
	*        Also allows currying an unlimited number of parameters.
	* @method bind(<scope>, [arg1], ...)
	* @returns Function
	* @extra "currying" means setting parameters ([arg1], [arg2], etc.) ahead of
	*         time so that they are passed when the function is called later.
	*         If you pass additional parameters when the function is actually
	*         called, they will be added will be added to the end of the curried
	*         parameters. This method is provided for browsers that don't support
	*         it internally.
	* @example
	*
	+   (function() {
	*     return this;
	*   }).bind('woof')(); -> returns 'woof'; function is bound with 'woof' as the this object.
	*   (function(a) {
	*     return a;
	*   }).bind(1, 2)();   -> returns 2; function is bound with 1 as the this object and 2 curried as the first parameter
	*   (function(a, b) {
	*     return a + b;
	*   }).bind(1, 2)(3);  -> returns 5; function is bound with 1 as the this object, 2 curied as the first parameter and 3 passed as the second when calling the function
	*
	***/
	bind(scope?: Object, ...args: any[]): Function;

	/***
	* @short Cancels a delayed function scheduled to be run.
	* @method cancel()
	* @returns Function
	* @extra %delay%, %lazy%, %throttle%, and %debounce% can all set delays.
	* @example
	*
	*   (function() {
	*     alert('hay'); // Never called
	*   }).delay(500).cancel();
	*
	***/
	cancel(): Function;

	/***
	* @short Creates a "debounced" function that postpones its execution until
	*        after <ms> milliseconds have passed.
	* @method debounce(<ms>)
	* @returns Function
	* @extra This method is useful to execute a function after things have
	*        "settled down". A good example of this is when a user tabs quickly
	*        through form fields, execution of a heavy operation should happen
	*        after a few milliseconds when they have "settled" on a field.
	* @example
	*
	*   var fn = (function(arg1) {
	*     // called once 50ms later
	*   }).debounce(50); fn() fn() fn();
	*
	***/
	debounce(ms: number): Function;

	/***
	* @short Executes the function after <ms> milliseconds.
	* @method delay([ms] = 0, [arg1], ...)
	* @returns Function
	* @extra Returns a reference to itself. %delay% is also a way to execute
	*        non-blocking operations that will wait until the CPU is free.
	*        Delayed functions can be canceled using the %cancel% method.
	*        Can also curry arguments passed in after <ms>.
	* @example
	*
	*   (function(arg1) {
	*     // called 1s later
	*   }).delay(1000, 'arg1');
	*
	***/
	delay(ms?: number, ...args: any[]): Function;

	/***
	* @short Returns a new version of the function which when called will have
	*        some of its arguments pre-emptively filled in, also known as "currying".
	* @method fill(<arg1>, <arg2>, ...)
	* @returns Function
	* @extra Arguments passed to a "filled" function are generally appended to
	*        the curried arguments. However, if %undefined% is passed as any of
	*        the arguments to %fill%, it will be replaced, when the "filled"
	*        function is executed. This allows currying of arguments even when
	*        they occur toward the end of an argument list (the example
	*        demonstrates this much more clearly).
	* @example
	*
	*   var delayOneSecond = setTimeout.fill(undefined, 1000);
	*   delayOneSecond(function() {
	*     // Will be executed 1s later
	*   });
	*
	***/
	fill(...args: any[]): Function;

	/***
	* @short Creates a lazy function that, when called repeatedly, will queue
	*        execution and wait [ms] milliseconds to execute again.
	* @method lazy([ms] = 1, [limit] = Infinity)
	* @returns Function
	* @extra Lazy functions will always execute as many times as they are called
	*        up to [limit], after which point subsequent calls will be ignored
	*        (if it is set to a finite number). Compare this to %throttle%, which
	*        will execute only once per [ms] milliseconds. %lazy% is useful when
	*        you need to be sure that every call to a function is executed, but
	*        in a non-blocking manner. Calling %cancel% on a lazy function will
	*       clear the entire queue. Note that [ms] can also be a fraction.
	* @example
	*
	*   (function() {
	*     // Executes immediately.
	*   }).lazy()();
	*   (3).times(function() {
	*     // Executes 3 times, with each execution 20ms later than the last.
	*   }.lazy(20));
	*   (100).times(function() {
	*     // Executes 50 times, with each execution 20ms later than the last.
	*   }.lazy(20, 50));
	*
	***/
	lazy(ms?: number, limit?: number): Function;

	/***
	* @short Creates a function that will execute only once and store the result.
	* @method once()
	* @returns Function
	* @extra %once% is useful for creating functions that will cache the result of
	*        an expensive operation and use it on subsequent calls. Also it can be
	*        useful for creating initialization functions that only need to be run
	*        once.
	* @example
	*
	*   var fn = (function() {
	*     // Will be executed once only
	*   }).once(); fn(); fn(); fn();
	*
	***/
	once(): Function;

	/***
	* @short Creates a "throttled" version of the function that will only be
	*        executed once per <ms> milliseconds.
	* @method throttle(<ms>)
	* @returns Function
	* @extra This is functionally equivalent to calling %lazy% with a [limit]
	*        of %1%. %throttle% is appropriate when you want to make sure a
	*        function is only executed at most once for a given duration.
	*        Compare this to %lazy%, which will queue rapid calls and execute
	*        them later.
	* @example
	*
	*   (3).times(function() {
	*     // called only once. will wait 50ms until it responds again
	*   }.throttle(50));
	*
	***/
	throttle(ms: number): Function;
}

interface RegExp {

	/***
	* @short Escapes all RegExp tokens in a string.
	* @method RegExp.escape(<str> = '')
	* @returns String
	* @example
	*
	*   RegExp.escape('really?')      -> 'really\?'
	*   RegExp.escape('yes.')         -> 'yes\.'
	*   RegExp.escape('(not really)') -> '\(not really\)'
	*
	***/
	escape(str: string): string;

	/***
	* @short Adds <flag> to the regex.
	* @method addFlag(<flag>)
	* @returns RegExp
	* @example
	*
	*   /texty/.addFlag('g') -> now has global flag set
	*
	***/
	addFlag(flag: string): RegExp;

	/***
	* @short Returns the flags of the regex as a string.
	* @method getFlags()
	* @returns String
	* @example
	*
	*   /texty/gim.getFlags('testy') -> 'gim'
	*
	***/
	getFlags(): string;

	/***
	* @short Removes <flag> from the regex.
	* @method removeFlag(<flag>)
	* @returns RegExp
	* @example
	*
	*   /texty/g.removeFlag('g') -> now has global flag removed
	*
	***/
	removeFlag(flag: string): RegExp;

	/***
	* @short Sets the flags on a regex and retuns a copy.
	* @method setFlags(<flags>)
	* @returns RegExp
	* @example
	*
	*   /texty/.setFlags('gim') -> now has global, ignoreCase, and multiline set
	*
	***/
	setFlags(flags: string): RegExp;
}

interface Locale {
	plural: bool;
	months: string;
	weekdays: string;
	units: string;
	numbers: string;
	tokens: string[];
	short: string;
	long: string;
	full: string;
	past: string;
	future: string;
	duration: string;
	timeMarker: string;
	ampm: string;
	modifiers: 
		{ 
			name: string;
			src: string;
			value: number;
		}[];
	dateParse: string[];
	timeParse: string[];
}

interface Date {
	
	/***
	* @short Adds a locale <set> to the locales understood by Sugar.
	* @method Date.addLocale(<code>, <set>)
	* @returns Locale
	* @extra For more see @date_format.
	***/
	addLocale(code: string, set: Locale): Locale;

	/***
	* @short Alternate Date constructor which understands many different text formats,
	*        a timestamp, or another date.
	* @method Date.create(<d>, [locale] = currentLocale)
	* @returns Date
	* @extra If no argument is given, date is assumed to be now. %Date.create% additionally
	*        can accept enumerated parameters as with the standard date constructor. [locale]
	*        can be passed to specify the locale that the date is in. When unspecified, the
	*        current locale (default is English) is assumed. UTC-based dates can be created
	*        through the %utc% object. For more see @date_format.
	* @set
	*   Date.utc.create
	*
	* @example
	*
	*   Date.create('July')          -> July of this year
	*   Date.create('1776')          -> 1776
	*   Date.create('today')         -> today
	*   Date.create('wednesday')     -> This wednesday
	*   Date.create('next friday')   -> Next friday
	*   Date.create('July 4, 1776')  -> July 4, 1776
	*   Date.create(-446806800000)   -> November 5, 1955
	*   Date.create(1776, 6, 4)      -> July 4, 1776
	*   Date.create('1776年07月04日', 'ja') -> July 4, 1776
	*   Date.utc.create('July 4, 1776', 'en')  -> July 4, 1776
	*
	***/
	create(locale?: string): Date;
	create(d: string, locale?: string): Date;
	create(year: number, month: number, day: number, locale?: string): Date;

	/***
	* @short Alternate form of %Date.create% with any ambiguity assumed to be the future.
	* @method Date.future(<d>, [locale] = currentLocale)
	* @returns Date
	* @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last"
	*        depending on context. Note that dates explicitly in the past ("last Sunday") will
	*        remain in the past. This method simply provides a hint when ambiguity exists. UTC
	*       -based dates can be created through the %utc% object. For more, see @date_format.
	* @set
	*   Date.utc.future
	*
	* @example
	*
	*   Date.future('July')          -> July of this year or next depending on the current month
	*   Date.future('Wednesday')     -> This wednesday or next depending on the current weekday
	*
	***/
	future(d: string, locale?: string): Date;

	/***
	* @short Gets the locale for the given code, or the current locale.
	* @method Date.getLocale([code] = current)
	* @returns Locale
	* @extra The resulting locale object can be manipulated to provide more control over date localizations.
	*        For more about locales, see @date_format.
	***/
	getLocale(code?: string): Locale;

	/***
	* @short Returns the number of milliseconds since January 1st, 1970 00:00:00 (UTC time).
	* @method Date.now()
	* @returns String
	* @extra Provided for browsers that do not support this method.
	* @example
	*
	*   Date.now() -> ex. 1311938296231
	*
	***/
	now(): string;

	/***
	* @short Alternate form of %Date.create% with any ambiguity assumed to be the past.
	* @method Date.past(<d>, [locale] = currentLocale)
	* @returns Date
	* @extra For example %"Sunday"% can be either "the Sunday coming up" or "the Sunday last" depending
	*        on context. Note that dates explicitly in the future ("next Sunday") will remain in the future.
	*        This method simply provides a hint when ambiguity exists. UTC-based dates can be created
	*        through the %utc% object. For more, see @date_format.
	* @set
	*   Date.utc.past
	* @example
	*
	*   Date.past('July')          -> July of this year or last depending on the current month
	*   Date.past('Wednesday')     -> This wednesday or last depending on the current weekday
	*
	***/
	past(d: string, local?: string): Date;

	/***
	* @short Creates a new date range.
	* @method Date.range([start], [end])
	* @returns DateRange
	* @extra If either [start] or [end] are null, they will default to the current date.
	***/
	range(start: Date, end: Date): DateRange;

	/***
	* @short Sets the current locale to be used with dates.
	* @method Date.setLocale(<code>)
	* @returns Locale
	* @extra Sugar has support for 13 locales that are available through the
	&        "Date Locales" package. In addition you can define a new locale with
	*         %Date.addLocale%. For more see @date_format.
	*
	***/
	setLocale(code: string): Locale;

	/***
	* @short Adds <num> of the unit to the date. If [reset] is true, all lower
	*        units will be reset.
	* @method add[Units](<num>, [reset] = false)
	* @returns Date
	* @extra Note that "months" is ambiguous as a unit of time. If the target
	*        date falls on a day that does not exist (ie. August 31 -> February 31),
	*        the date will be shifted to the last day of the month. Don't use
	*        %addMonths% if you need precision.
	*
	* @set
	*   addMilliseconds
	*   addSeconds
	*   addMinutes
	*   addHours
	*   addDays
	*   addWeeks
	*   addMonths
	*   addYears
	*
	* @example
	*
	*   Date.create().addMilliseconds(5) -> current time + 5 milliseconds
	*   Date.create().addDays(5)         -> current time + 5 days
	*   Date.create().addYears(5)        -> current time + 5 years
	*
	***/
	addMilliseconds(num: number, reset?: bool): Date;
	addSeconds(num: number, reset?: bool): Date;
	addMinutes(num: number, reset?: bool): Date;
	addHours(num: number, reset?: bool): Date;
	addDays(num: number, reset?: bool): Date;
	addWeeks(num: number, reset?: bool): Date;
	addMonths(num: number, reset?: bool): Date;
	addYears(num: number, reset?: bool): Date;

	/***
	* @short Sets the date forward.
	* @method advance(<set>, [reset] = false)
	* @returns Date
	* @extra This method can accept multiple formats including an object, a string
	*        in the format %3 days%, a single number as milliseconds, or enumerated
	*        parameters (as with the Date constructor). If [reset] is %true%, any
	*        units more specific than those passed will be reset. For more see
	*        @date_format.
	* @example
	*
	*   new Date().advance({ year: 2 }) -> 2 years in the future
	*   new Date().advance('2 days')    -> 2 days in the future
	*   new Date().advance(0, 2, 3)     -> 2 months 3 days in the future
	*   new Date().advance(86400000)    -> 1 day in the future
	*
	***/
	advance(set: string, reset?: bool): Date;
	advance(year: number, month: number, day: number, reset?: bool): Date;
	advance(milliseconds: number, reset?: bool): Date;
	advance(set: Object, reset?: bool): Date;

	/***
	* @short Sets the date to the beginning of the appropriate unit.
	* @method beginningOf[Unit]()
	* @returns Date
	*
	* @set
	*   beginningOfDay
	*   beginningOfWeek
	*   beginningOfMonth
	*   beginningOfYear
	*
	* @example
	*
	*   Date.create().beginningOfDay()   -> the beginning of today (resets the time)
	*   Date.create().beginningOfWeek()  -> the beginning of the week
	*   Date.create().beginningOfMonth() -> the beginning of the month
	*   Date.create().beginningOfYear()  -> the beginning of the year
	*
	***/
	beginningOfDay(): Date;
	beginningOfWeek(): Date;
	beginningOfMonth(): Date;
	beginningOfYear(): Date;

	/***
	* @short Clones the date.
	* @method clone()
	* @returns Date
	* @example
	*
	*   Date.create().clone() -> Copy of now
	*
	***/
	clone(): Date;

	/***
	* @short Returns the number of days in the date's month.
	* @method daysInMonth()
	* @returns Number
	* @example
	*
	*   Date.create('May').daysInMonth()            -> 31
	*   Date.create('February, 2000').daysInMonth() -> 29
	*
	***/
	daysInMonth(): number;

	/***
	* @short Sets the date to the end of the appropriate unit.
	* @method endOf[Unit]()
	* @returns Date
	*
	* @set
	*   endOfDay
	*   endOfWeek
	*   endOfMonth
	*   endOfYear
	*
	* @example
	*
	*   Date.create().endOfDay()   -> the end of today (sets the time to 23:59:59.999)
	*   Date.create().endOfWeek()  -> the end of the week
	*   Date.create().endOfMonth() -> the end of the month
	*   Date.create().endOfYear()  -> the end of the year
	*
	***/
	endOfDay(): Date;
	endOfWeek(): Date;
	endOfMonth(): Date;
	endOfYear(): Date;

	/***
	* @short Formats and outputs the date.
	* @method format(<format>, [locale] = currentLocale)
	* @returns String
	* @extra <format> can be a number of pre-determined formats or a string of
	*        tokens. Locale-specific formats are %short%, %long%, and %full% which
	*        have their own aliases and can be called with %date.short()%, etc.
	*        If <format> is not specified the %long% format is assumed. [locale]
	*        specifies a locale code to use (if not specified the current locale 
	*        is used). See @date_format for more details.
	*
	* @set
	*   short
	*   long
	*   full
	*
	* @example
	*
	*   Date.create().format()                                   -> ex. July 4, 2003
	*   Date.create().format('{Weekday} {d} {Month}, {yyyy}')    -> ex. Monday July 4, 2003
	*   Date.create().format('{hh}:{mm}')                        -> ex. 15:57
	*   Date.create().format('{12hr}:{mm}{tt}')                  -> ex. 3:57pm
	*   Date.create().format(Date.ISO8601_DATETIME)              -> ex. 2011-07-05 12:24:55.528Z
	*   Date.create('last week').format('short', 'ja')                -> ex. 先週
	*   Date.create('yesterday').format(function(value,unit,ms,loc) {
	*     // value = 1, unit = 3, ms = -86400000, loc = [current locale object]
	*   });                                                      -> ex. 1 day ago
	*
	***/
	format(format: string, locale?: string): string;
	short(): string;
	long(): string;
	full(): string;

	/***
	* @short Returns a string representation of the offset from UTC time. If [iso]
	*        is true the offset will be in ISO8601 format.
	* @method getUTCOffset([iso])
	* @returns String
	* @example
	*
	*   new Date().getUTCOffset()     -> "+0900"
	*   new Date().getUTCOffset(true) -> "+09:00"
	*
	***/
	getUTCOffset(iso?: bool): string;

	/***
	* @short Gets the date's week (of the year).
	* @method getWeek()
	* @returns Number
	* @extra If %utc% is set on the date, the week will be according to UTC time.
	*
	* @example
	*
	*   new Date().getWeek()    -> today's week of the year
	*
	***/
	getWeek(): number;

	/***
	* @short Alias for %getDay%.
	* @method getWeekday()
	* @returns Number
	* @set
	*   getUTCWeekday
	*
	* @example
	*
	*   Date.create().getWeekday();    -> (ex.) 3
	*   Date.create().getUTCWeekday();    -> (ex.) 3
	*
	***/
	getWeekday(): number;
	getUTCWeekday(): number;
	// Duplicate from lib.d.ts
	//getDay(): number;
	// Duplicate from lib.d.ts
	//getUTCDay(): number;

	/***
	* @short Returns true if the date is <d>.
	* @method is(<d>, [margin] = 0)
	* @returns Boolean
	* @extra <d> will accept a date object, timestamp, or text format. %is%
	*        additionally understands more generalized expressions like
	*        month/weekday names, 'today', etc, and compares to the precision
	*        implied in <d>. [margin] allows an extra margin of error in
	*        milliseconds.  For more, see @date_format.
	* @example
	*
	*   Date.create().is('July')               -> true or false?
	*   Date.create().is('1776')               -> false
	*   Date.create().is('today')              -> true
	*   Date.create().is('weekday')            -> true or false?
	*   Date.create().is('July 4, 1776')       -> false
	*   Date.create().is(-6106093200000)       -> false
	*   Date.create().is(new Date(1776, 6, 4)) -> false
	*
	***/
	is(d: string, margin?: number): bool;
	is(milliseconds: number, margin?: number): bool;
	is(d: Date, margin?: number): bool;

	/***
	* @short Returns true if the date is after the <d>.
	* @method isAfter(<d>, [margin] = 0)
	* @returns Boolean
	* @extra [margin] is to allow extra margin of error (in ms). <d> will accept
	*        a date object, timestamp, or text format. If not specified, <d> is
	*        assumed to be now. See @date_format for more.
	* @example
	*
	*   new Date().isAfter('tomorrow')  -> false
	*   new Date().isAfter('yesterday') -> true
	*
	***/
	isAfter(d: string, margin?: number): bool;
	isAfter(milliseconds: number, margin?: number): bool;
	isAfter(d: Date, margin?: number): bool;

	/***
	* @short Returns true if the date is before <d>.
	* @method isBefore(<d>, [margin] = 0)
	* @returns Boolean
	* @extra [margin] is to allow extra margin of error (in ms). <d> will accept 
	*        a date object, timestamp, or text format. If not specified, <d> is
	*        assumed to be now. See @date_format for more.
	* @example
	*
	*   new Date().isBefore('tomorrow')  -> true
	*   new Date().isBefore('yesterday') -> false
	*
	***/
	isBefore(d: string, margin?: number): bool;
	isBefore(milliseconds: number, margin?: number): bool;
	isBefore(d: Date, margin?: number): bool;

	/***
	* @short Returns true if the date falls between <d1> and <d2>.
	* @method isBetween(<d1>, <d2>, [margin] = 0)
	* @returns Boolean
	* @extra [margin] is to allow extra margin of error (in ms). <d1> and <d2>
	*        will accept a date object, timestamp, or text format. If not specified,
	*        they are assumed to be now. See @date_format for more.
	* @example
	*
	*   new Date().isBetween('yesterday', 'tomorrow')    -> true
	*   new Date().isBetween('last year', '2 years ago') -> false
	*
	***/
	isBefore(start: string, end: string, margin?: number): bool;
	isBefore(start: number, end: string, margin?: number): bool;
	isBefore(start: Date, end: Date, margin?: number): bool;

	/***
	* @short Returns true if the date falls on that day.
	* @method is[Day]()
	* @returns Boolean
	* @extra Also available: %isYesterday%, %isToday%, %isTomorrow%, %isWeekday%,
	*        and %isWeekend%.
	*
	* @set
	*   isToday
	*   isYesterday
	*   isTomorrow
	*   isWeekday
	*   isWeekend
	*   isSunday
	*   isMonday
	*   isTuesday
	*   isWednesday
	*   isThursday
	*   isFriday
	*   isSaturday
	*
	* @example
	*
	*   Date.create('tomorrow').isToday() -> false
	*   Date.create('thursday').isTomorrow() -> ?
	*   Date.create('yesterday').isWednesday() -> ?
	*   Date.create('today').isWeekend() -> ?
	*
	***/
	isToday(): bool;
	isYesterday(): bool;
	isTomorrow(): bool;
	isWeekday(): bool;
	isWeekend(): bool;
	isSunday(): bool;
	isMonday(): bool;
	isTuesday(): bool;
	isWednesday(): bool;
	isThursday(): bool;
	isFriday(): bool;
	isSaturday(): bool;

	/***
	* @short Returns true if the date is in the future.
	* @method isFuture()
	* @returns Boolean
	* @example
	*
	*   Date.create('next week').isFuture() -> true
	*   Date.create('last week').isFuture() -> false
	*
	***/
	isFuture(): bool;

	/***
	* @short Returns true if the date is last week/month/year.
	* @method isLast[Unit]()
	* @returns Boolean
	*
	* @set
	*   isLastWeek
	*   isLastMonth
	*   isLastYear
	*
	* @example
	*
	*   Date.create('yesterday').isLastWeek()  -> true or false?
	*   Date.create('yesterday').isLastMonth() -> probably not...
	*   Date.create('yesterday').isLastYear()  -> even less likely...
	*
	***/
	isLastWeek(): bool;
	isLastMonth(): bool;
	isLastYear(): bool;

	/***
	* @short Returns true if the date is a leap year.
	* @method isLeapYear()
	* @returns Boolean
	* @example
	*
	*   Date.create('2000').isLeapYear() -> true
	*
	***/
	isLeapYear(): bool;

	/***
	* @short Returns true if the date is next week/month/year.
	* @method isNext[Unit]()
	* @returns Boolean
	*
	* @set
	*   isNextWeek
	*   isNextMonth
	*   isNextYear
	*
	* @example
	*
	*   Date.create('tomorrow').isNextWeek()  -> true or false?
	*   Date.create('tomorrow').isNextMonth() -> probably not...
	*   Date.create('tomorrow').isNextYear()  -> even less likely...
	*
	***/
	isNextWeek(): bool;
	isNextMonth(): bool;
	isNextYear(): bool;

	/***
	* @short Returns true if the date is in the past.
	* @method isPast()
	* @returns Boolean
	* @example
	*
	*   Date.create('last week').isPast() -> true
	*   Date.create('next week').isPast() -> false
	*
	***/
	isPast(): bool;

	/***
	* @short Returns true if the date is this week/month/year.
	* @method isThis[Unit]()
	* @returns Boolean
	*
	* @set
	*   isThisWeek
	*   isThisMonth
	*   isThisYear
	*
	* @example
	*
	*   Date.create('tomorrow').isThisWeek()  -> true or false?
	*   Date.create('tomorrow').isThisMonth() -> probably...
	*   Date.create('tomorrow').isThisYear()  -> signs point to yes...
	*
	***/
	isThisWeek(): bool;
	isThisMonth(): bool;
	isThisYear(): bool;

	/***
	* @short Returns true if the date has no timezone offset.
	* @method isUTC()
	* @returns Boolean
	* @extra This will also return true for a date that has had %toUTC% called on it. This is intended to help approximate shifting timezones which is not possible in client-side Javascript. Note that the native method %getTimezoneOffset% will always report the same thing, even if %isUTC% becomes true.
	* @example
	*
	*   new Date().isUTC()         -> true or false?
	*   new Date().toUTC().isUTC() -> true
	*
	***/
	isUTC(): bool;

	/***
	* @short Returns true if the date is valid.
	* @method isValid()
	* @returns Boolean
	* @example
	*
	*   new Date().isValid()         -> true
	*   new Date('flexor').isValid() -> false
	*
	***/
	isValid(): bool;

	/***
	* @method iso()
	* @method toISOString()
	* @returns String
	* @short Formats the string to ISO8601 format.
	* @extra This will always format as UTC time. Provided for browsers that do not
	*        support this method.
	* @example
	*
	*   Date.create().toISOString() -> ex. 2011-07-05 12:24:55.528Z
	*
	***/
	iso(): string;
	// Duplicate from lib.d.ts
	//toISOString(): string;

	/***
	* @short Returns a relative date string offset to the current time.
	* @method relative([fn], [locale] = currentLocale)
	* @returns String
	* @extra [fn] can be passed to provide for more granular control over the
	*        resulting string. [fn] is passed 4 arguments: the adjusted value,
	*        unit, offset in milliseconds, and a localization object. As an
	*        alternate syntax, [locale] can also be passed as the first (and only)
	*        parameter. For more, see @date_format.
	* @example
	*
	*   Date.create('90 seconds ago').relative() -> 1 minute ago
	*   Date.create('January').relative()        -> ex. 5 months ago
	*   Date.create('January').relative('ja')    -> 3ヶ月前
	*   Date.create('120 minutes ago').relative(function(val,unit,ms,loc) {
	*     // value = 2, unit = 3, ms = -7200, loc = [current locale object]
	*   });                                      -> ex. 5 months ago
	*
	***/
	relative(locale: string): string;
	relative(fn?: (value: number, unit: string, ms:number, loc: Locale) => string, locale?: string): string;

	/***
	* @short Resets the unit passed and all smaller units. Default is "hours",
	*        effectively resetting the time.
	* @method reset([unit] = 'hours')
	* @returns Date
	* @example
	*
	*   Date.create().reset('day')   -> Beginning of today
	*   Date.create().reset('month') -> 1st of the month
	*
	***/
	reset(unit?: string): Date;

	/***
	* @short Sets the date back.
	* @method rewind(<set>, [reset] = false)
	* @returns Date
	* @extra This method can accept multiple formats including a single number as a
	*        timestamp, an object, or enumerated parameters (as with the Date
	*        constructor). If [reset] is %true%, any units more specific than
	*        those passed will be reset. For more see @date_format.
	* @example
	*
	*   new Date().rewind({ year: 2 }) -> 2 years in the past
	*   new Date().rewind(0, 2, 3)     -> 2 months 3 days in the past
	*   new Date().rewind(86400000)    -> 1 day in the past
	*
	***/
	rewind(ms: number, reset?: bool): Date;
	rewind(year: number, month: number, day: number, reset?: bool): Date;
	//rewind(d: Object, reset?: bool): Date; // Do not like this, is not typesafe

	/***
	* @short Sets the date object.
	* @method set(<set>, [reset] = false)
	* @returns Date
	* @extra This method can accept multiple formats including a single number as a
	*        timestamp, an object, or enumerated parameters (as with the Date
	*        constructor). If [reset] is %true%, any units more specific than those
	*        passed will be reset.
	*
	* @example
	*
	*   new Date().set({ year: 2011, month: 11, day: 31 }) -> December 31, 2011
	*   new Date().set(2011, 11, 31)                       -> December 31, 2011
	*   new Date().set(86400000)                           -> 1 day after Jan 1, 1970
	*   new Date().set({ year: 2004, month: 6 }, true)     -> June 1, 2004, 00:00:00.000
	*
	***/
	set(ms: number): Date;
	set(year: number, month: number, day: number): Date;
	//set(d: Object, reset?: bool): Date; // Do not like this, is not typesafe

	
	/***
	* @short Sets the week (of the year).
	* @method setWeek(<week>)
	* @returns Nothing
	*
	* @example
	*
	*   d = new Date(); d.setWeek(15); d; -> 15th week of the year
	*
	***/
	setWeek(week: number): void;

	/***
	* @short Sets the weekday of the date.
	* @method setWeekday()
	* @returns Nothing
	*
	* @example
	*
	*   d = new Date(); d.setWeekday(1); d; -> Monday of this week
	*   d = new Date(); d.setWeekday(6); d; -> Saturday of this week
	*
	***/
	setWeekday(day: number): void;

	/***
	* @short Returns a JSON representation of the date.
	* @method toJSON()
	* @returns String
	* @extra This is effectively an alias for %toISOString%. Will always return
	*        the date in UTC time. Provided for browsers that do not support this
	*        method.
	* @example
	*
	*   Date.create().toJSON() -> ex. 2011-07-05 12:24:55.528Z
	*
	***/
	toJSON(): string;

	/***
	* @short Returns the time ago in the appropriate unit.
	* @method [units]Ago()
	* @returns Number
	*
	* @set
	*   millisecondsAgo
	*   secondsAgo
	*   minutesAgo
	*   hoursAgo
	*   daysAgo
	*   weeksAgo
	*   monthsAgo
	*   yearsAgo
	*
	* @example
	*
	*   Date.create('last year').millisecondsAgo() -> 3,600,000
	*   Date.create('last year').daysAgo()         -> 7
	*   Date.create('last year').yearsAgo()        -> 15
	*
	***/
	millisecondsAgo(): number;
	secondsAgo(): number;
	minutesAgo(): number;
	hoursAgo(): number;
	daysAgo(): number;
	weeksAgo(): number;
	monthsAgo(): number;
	yearsAgo(): number;

	/***
	* @short Returns the time from now in the appropriate unit.
	* @method [units]FromNow()
	* @returns Number
	*
	* @set
	*   millisecondsFromNow
	*   secondsFromNow
	*   minutesFromNow
	*   hoursFromNow
	*   daysFromNow
	*   weeksFromNow
	*   monthsFromNow
	*   yearsFromNow
	*
	* @example
	*
	*   Date.create('next year').millisecondsFromNow() -> 3,600,000
	*   Date.create('next year').daysFromNow()         -> 7
	*   Date.create('next year').yearsFromNow()        -> 15
	*
	***/
	millisecondsFromNow(): number;
	secondsFromNow(): number;
	minutesFromNow(): number;
	hoursFromNow(): number;
	daysFromNow(): number;
	weeksFromNow(): number;
	monthsFromNow(): number;
	yearsFromNow(): number;

	/***
	* @short Returns the time since [d] in the appropriate unit.
	* @method [units]Since([d], [locale] = currentLocale)
	* @returns Number
	* @extra [d] will accept a date object, timestamp, or text format. If not
	*        specified, [d] is assumed to be now. [locale] can be passed to specify
	*        the locale that the date is in. %[unit]Ago% is provided as an alias to
	*        make this more readable when [d] is assumed to be the current date.
	*        For more see @date_format.
	*
	* @set
	*   millisecondsSince
	*   secondsSince
	*   minutesSince
	*   hoursSince
	*   daysSince
	*   weeksSince
	*   monthsSince
	*   yearsSince
	*
	* @example
	*
	*   Date.create().millisecondsSince('1 hour ago') -> 3,600,000
	*   Date.create().daysSince('1 week ago')         -> 7
	*   Date.create().yearsSince('15 years ago')      -> 15
	*   Date.create('15 years ago').yearsAgo()        -> 15
	*
	***/
	millisecondsSince(date?: Date, locale?: string): number;
	millisecondsSince(date: string, locale?: string): number;
	secondsSince(date?: Date, locale?: string): number;
	secondsSince(date: string, locale?: string): number;
	minutesSince(date?: Date, locale?: string): number;
	minutesSince(date: string, locale?: string): number;
	hoursSince(date?: Date, locale?: string): number;
	hoursSince(date: string, locale?: string): number;
	daysSince(date?: Date, locale?: string): number;
	daysSince(date: string, locale?: string): number;
	weeksSince(date?: Date, locale?: string): number;
	weeksSince(date: string, locale?: string): number;
	monthsSince(date?: Date, locale?: string): number;
	monthsSince(date: string, locale?: string): number;
	yearsSince(date?: Date, locale?: string): number;
	yearsSince(date: string, locale?: string): number;

	/***
	* @short Returns the time until [d] in the appropriate unit.
	* @method [units]Until([d], [locale] = currentLocale)
	* @returns Number
	* @extra [d] will accept a date object, timestamp, or text format. If not
	*        specified, [d] is assumed to be now. [locale] can be passed to specify
	*        the locale that the date is in. %[unit]FromNow% is provided as an
	*        alias to make this more readable when [d] is assumed to be the current
	*        date. For more see @date_format.
	*
	* @set
	*   millisecondsUntil
	*   secondsUntil
	*   minutesUntil
	*   hoursUntil
	*   daysUntil
	*   weeksUntil
	*   monthsUntil
	*   yearsUntil
	*
	* @example
	*
	*   Date.create().millisecondsUntil('1 hour from now') -> 3,600,000
	*   Date.create().daysUntil('1 week from now')         -> 7
	*   Date.create().yearsUntil('15 years from now')      -> 15
	*   Date.create('15 years from now').yearsFromNow()    -> 15
	*
	***/
	millisecondsUntil(date?: Date, locale?: string): number;
	millisecondsUntil(date: string, locale?: string): number;
	secondsUntil(date?: Date, locale?: string): number;
	secondsUntil(date: string, locale?: string): number;
	minutesUntil(date?: Date, locale?: string): number;
	minutesUntil(date: string, locale?: string): number;
	hoursUntil(date?: Date, locale?: string): number;
	hoursUntil(date: string, locale?: string): number;
	daysUntil(date?: Date, locale?: string): number;
	daysUntil(date: string, locale?: string): number;
	weeksUntil(date?: Date, locale?: string): number;
	weeksUntil(date: string, locale?: string): number;
	monthsUntil(date?: Date, locale?: string): number;
	monthsUntil(date: string, locale?: string): number;
	yearsUntil(date?: Date, locale?: string): number;
	yearsUntil(date: string, locale?: string): number;

	/***
	* @short Sets the internal utc flag for the date. When on, UTC-based methods
	*        will be called internally.
	* @method utc([on] = true)
	* @returns Date
	* @extra For more see @date_format.
	* @example
	*
	*   new Date().utc(true)
	*   new Date().utc(false)
	*
	***/
	utc(on?: bool): Date;
}

/***
* @package DateRange
* @dependency date
* @description Date Ranges define a range of time. They can enumerate over specific points
*              within that range, and be manipulated and compared.
*
***/
interface DateRange {
	start: Date;
	end: Date;

	/***
	* @short Returns true if <d> is contained inside the DateRange.
	*        <d> may be a date or another DateRange.
	* @method contains(<d>)
	* @returns Boolean
	* @example
	*
	*   Date.range('2003', '2005').contains(Date.create('2004')) -> true
	*
	***/
	contains(d: Date): bool;
	contains(d: DateRange): bool;

	/***
	* @short Return the duration of the DateRange in milliseconds.
	* @method duration()
	* @returns Number
	* @example
	*
	*   Date.range('2003', '2005').duration() -> 94694400000
	*
	***/
	duration(): number;

	/***
	* @short Increments through the date range for each [unit], calling [fn] if it is passed.
	*        Returns an array of each increment visited.
	* @method each[Unit]([fn])
	* @returns Date
	*
	* @set
	*   eachMillisecond
	*   eachSecond
	*   eachMinute
	*   eachHour
	*   eachDay
	*   eachWeek
	*   eachMonth
	*   eachYear
	*
	* @example
	*
	*   Date.range('2003-01', '2003-02').eachMonth()     -> [...]
	*   Date.range('2003-01-15', '2003-01-16').eachDay() -> [...]
	*
	***/
	eachMillisecond(fn?: (d: Date) => void): Date[];
	eachSecond(fn?: (d: Date) => void): Date[];
	eachMinute(fn?: (d: Date) => void): Date[];
	eachHour(fn?: (d: Date) => void): Date[];
	eachDay(fn?: (d: Date) => void): Date[];
	eachWeek(fn?: (d: Date) => void): Date[];
	eachMonth(fn?: (d: Date) => void): Date[];
	eachYear(fn?: (d: Date) => void): Date[];

	/***
	* @short Iterates through the DateRange for every <increment>,
	*        calling [fn] if it is passed. Returns an array of each increment visited.
	* @method every(<increment>, [fn])
	* @returns Array
	* @extra When <increment> is a number, increments will be to the exact millisecond.
	*        <increment> can also be a string in the format %{number} {unit}s%, in which
	*        case it will increment in the unit specified. Note that a discrepancy exists
	*        in the case of months, as %(2).months()% is an approximation. Stepping
	*        through the actual months by passing %"2 months"% is usually preferable in
	*        this case.
	* @example
	*
	*   Date.range('2003-01', '2003-03').every("2 months") -> [...]
	*
	***/
	every(ms: number, fn?: (d: Date) => void): Date[];
	every(increment: string, fn?: (d: Date) => void): Date[];

	/***
	* @short Returns a new DateRange with the latest starting point as its start, and the
	*        earliest ending point as its end. If the two ranges do not intersect this will
	*        effectively produce an invalid range.
	* @method intersect(<range>)
	* @returns DateRange
	* @example
	*
	*   Date.range('2003-01', '2005-01').intersect(Date.range('2004-01', '2006-01')) -> Jan 1, 2004..Jan 1, 2005
	*
	***/
	intersect(range: DateRange): DateRange;

	/***
	* @short Returns true if the DateRange is valid, false otherwise.
	* @method isValid()
	* @returns Boolean
	* @example
	*
	*   Date.range('2003', '2005').isValid() -> true
	*   Date.range('2005', '2003').isValid() -> false
	*
	***/
	isValid(): bool;

	/***
	* @short Returns a string representation of the DateRange.
	* @method toString()
	* @returns String
	* @example
	*
	*   Date.range('2003', '2005').toString() -> January 1, 2003..January 1, 2005
	*
	***/
	toString(): string;

	/***
	* @short Returns a new DateRange with the earliest starting point as its start,
	*        and the latest ending point as its end. If the two ranges do not intersect
	*        this will effectively remove the "gap" between them.
	* @method union(<range>)
	* @returns DateRange
	* @example
	*
	*   Date.range('2003=01', '2005-01').union(Date.range('2004-01', '2006-01')) -> Jan 1, 2003..Jan 1, 2006
	*
	***/
	union(range: DateRange): DateRange;
}
