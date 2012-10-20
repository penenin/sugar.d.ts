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
	trim(): string;
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
	exclude(...f: (el: any, i?: number, array?: any[]) => bool): any[];

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
	findIndex(f: RegExp, startIndex?: number, loop?: bool): number;
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
