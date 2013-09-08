// http://www.reddit.com/r/dailyprogrammer/comments/wn3ld/7162012_challenge_77_easy_enumerating_morse_code/
//  
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