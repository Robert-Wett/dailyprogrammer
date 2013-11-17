// http://www.reddit.com/r/dailyprogrammer/comments/17f3y2/012813_challenge_119_easy_change_calculator/
/*
Write A function that takes an amount of money, rounds it to the nearest penny and 
then tells you the minimum number of coins needed to equal that amount of money. 

For Example: "4.17" would print out:
	Quarters: 16
	Dimes: 1
	Nickels: 1
	Pennies: 2
	Author: nanermaner
*/

public class RedditChallenge {
    private static const QUARTER : Number = 25;
    private static const DIME    : Number = 10;
    private static const NICKEL  : Number = 05;

    public function RedditChallenge() {
        RedditChallenge119(4.17);       
        RedditChallenge119(1.23);   
        RedditChallenge119(10.24);  
        RedditChallenge119(.99);    
        RedditChallenge119(00.06);      
    }

    public function RedditChallenge119(num : Number) : void {

        var q, d, p, n : int = 0;

        num = (Math.round(num * 100) / 100) * 10;
        q  +=  Math.floor(num / QUARTER);

        num = num % QUARTER;
        d  += Math.floor(num / DIME);

        num = num % DIME;
        n  += Math.floor(num / NICKEL);

        p   = num % NICKEL;

        trace("Quarters : " + q + "\n" + 
              "Dimes    : " + d + "\n" +
              "Nickels  : " + n + "\n" +
              "Pennies  : " + p + "\n");
    }
}
