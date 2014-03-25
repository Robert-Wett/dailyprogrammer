// http://www.reddit.com/r/dailyprogrammer/comments/1ystvb/022414_challenge_149_easy_disemvoweler/

var disemvoweler = function(str) {
    var consonant = []
    ,   vowels    = []
    ,   str       = str.toLowerCase()
    ,   i         = 0;

    for (i; i < str.length; i++) {
        if ("aeiou".indexOf(str[i]) === -1)
            consonant.push(str[i]);
        else
            vowels.push(str[i]);
    }

    return {
        consonant: function() {
            console.log(consonant.join(""));
        },
        vowels: function() {
            console.log(vowels.join(""))
        }
    }
};
