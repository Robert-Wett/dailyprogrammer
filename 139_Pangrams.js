// http://www.reddit.com/r/dailyprogrammer/comments/1pwl73/11413_challenge_139_easy_pangrams/

/*
  Wikipedia[2] has a great definition for Pangrams: "A pangram or holoalphabetic sentence 
  for a given alphabet is a sentence using every letter of the alphabet at least once." 
  A good example is the English-language sentence "The quick brown fox jumps over the lazy 
  dog[3] "; note how all 26 English-language letters are used in the sentence.
  Your goal is to implement a program that takes a series of strings (one per line) 
  and prints either True (the given string is a pangram), or False (it is not).

  Bonus: On the same line as the "True" or "False" result, print the number of letters used, 
  starting from 'A' to 'Z'. The format should match the following example based on the above sentence:
  a: 1, b: 1, c: 1, d: 1, e: 3, f: 1, g: 1, h: 2, i: 1, j: 1, k: 1, l: 1, m: 1, n: 1, o: 4, p: 1, q: 1, r: 2, s: 1, t: 2, u: 2, v: 1, w: 1, x: 1, y: 1, z: 1
*/

var panagrammer = function(sentence) {
    var ret = {};
    _.map(sentence.toLowerCase().replace(/[^a-z]/g,'').split(''), function(c) {
        if (ret[c]) ret[c]++;
            else ret[c] = 1;
    });
    return {
        true: _.size(ret) === 26,
        toString: _.map(ret, function(v, k){return k+':'+v+' ';})
    };
};

_.map(["The quick brown fox jumped over the lazy dog.",
       "The quick brown fox jumps over the lazy dog.",
       "Pack my box with five dozen liquor jugs.",
       "Saxophones quickly blew over my jazzy hair"], function(sentence){
    var panagram = panagrammer(sentence);
    console.log(sentence + '\nValid panagram? ' + panagram.true + '\n' + panagram.toString + '\n');
});
// http://jsfiddle.net/rdwettlaufer/PP7qY/6/
