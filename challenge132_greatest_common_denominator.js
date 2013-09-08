// http://www.reddit.com/r/dailyprogrammer/comments/1hvh6u/070813_challenge_132_easy_greatest_common_divisor/

function gcd( highestNum, lowestNum ) {
    var rem  = highestNum % lowestNum;
    if (rem === 0) return lowestNum;
    return gcd(lowestNum, rem);
};
// http://jsfiddle.net/kXD8j/