/// <reference path="sugar.d.ts" />
'schfifty'.add(' five')// - > schfifty five
;
'dopamine'.insert('e', 3)// - > dopeamine
;
'spelling eror'.insert('r', -3)// - > spelling error
;
'Welcome, Mr. {name}.'.assign({
    name: 'Franklin'
})// - > 'Welcome, Mr. Franklin.'
;
'You are {1} years old today.'.assign(14)// - > 'You are 14 years old today.'
;
'{n} and {r}'.assign({
    n: 'Cheech'
}, {
    r: 'Chong'
})// - > 'Cheech and Chong'
;
'jumpy'.at(0)// - > 'j'
;
'jumpy'.at(2)//- > 'm'
;
'jumpy'.at(5)// - > 'j'
;
'jumpy'.at(5, false)// - > ''
;
'jumpy'.at(-1)// - > 'y'
;
'lucky charms'.at(2, 4, 6, 8)// - > ['u', 'k', 'y', c']
;
//@ sourceMappingURL=sugar-test.js.map
