// http://www.reddit.com/r/dailyprogrammer/comments/1hvh6u/070813_challenge_132_easy_greatest_common_divisor/

/*
    The Greatest Common Divisor of a given set of integers is the greatest integer that 
    can divide these integers without any remainder. From Wikipedia, take a look at this 
    example: for the integers 8 and 12, the highest integer that divides them without 
    remainder is 4.
    
    Your goal is to write a program that takes two integers, and returns the greatest 
    common divisor. You may pick any algorithm or approach you prefer, though a good 
    starting point is Euclid's algorithm.
    Problem Author: nint22
*/

function gcd( highestNum, lowestNum ) {
    var rem  = highestNum % lowestNum;
    if (rem === 0) return lowestNum;
    return gcd(lowestNum, rem);
};
// http://jsfiddle.net/kXD8j/
