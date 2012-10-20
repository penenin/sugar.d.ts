//     sugar.d.ts
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
