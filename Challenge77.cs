// http://www.reddit.com/r/dailyprogrammer/comments/wn3ld/7162012_challenge_77_easy_enumerating_morse_code/

/*
Morse code, as we are all aware, consists of dots and dashes. Lets define 
a "Morse code sequence" as simply a series of dots and dashes (and nothing else). 
So ".--.-.--" would be a morse code sequence, for instance.
Dashes obviously take longer to transmit, that's what makes them dashes. Lets say 
that a dot takes 1 unit of time to transmit, and a dash takes 2 units of time. 
Then we can say that the "size" of a certain morse code sequence is the sum of 
the time it takes to transmit the dots and dashes. So, for instance "..-." would 
have a size of 5 (since there's three dots taking three units of time and one 
dash taking two units of time, for a total of 5). The sequence "-.-" would also 
have a size of 5.
In fact, if you list all the the possible Morse code sequences of size 5, you get:
.....  ...-  ..-.  .-..  -...  .--  -.-  --.
A total of 8 different sequences.
Your task is to write a function called Morse(X) which generates all morse code 
sequences of size X and returns them as an array of strings (so Morse(5) should 
return the 8 strings I just mentioned, in some order).
Use your function to generate and print out all sequences of size 10.
*/
 
public string[] Morse(List<string> codes, int counter, string curCode)
{
    if (counter == 0)
    {
        codes.Add(curCode);
        return codes.ToArray();
    } 

    if (counter == -1)
    {
        curCode = curCode.Remove(curCode.Length - 1);
        curCode += ".";
        codes.Add(curCode);
        return codes.ToArray(); 
    } 

    int[] dotDashValue = { 1, 2 };
    string[] dotDash = { ".", "-" };

    for (int i = 0; i < 2; i++)
    {
        StringBuilder sbuilder = new StringBuilder(curCode);
        sbuilder.Append(dotDash[i]);
        Morse(codes, counter - dotDashValue[i], sbuilder.ToString());
    }

    return codes.Distinct().ToArray();
}
