/*
	Write a function that, given a string, removes from the string any * character, 
	or any character that's one to the left or one to the right of a * character. Examples:
	
	"adf*lp" --> "adp"
	"a*o" --> ""
	"*dech*" --> "ec"
	"de**po" --> "do"
	"sa*n*ti" --> "si"
	"abc" --> "abc"
	Thanks to user larg3-p3nis for suggesting this problem in /r/dailyprogrammer_ideas!
	
	http://www.reddit.com/r/dailyprogrammer/comments/12qi5b/1162012_challenge_111_easy_star_delete/
*/

public static string starDelete(string str)
{
    List<char> chars = str.ToList();
    List<int> delIndex = new List<int>();
    StringBuilder builder = new StringBuilder();

    for (int i = 0; i < chars.Count; i++)
    {
        if (chars[i] == '*')
        {
            delIndex.Add(i);
            if (i > 0)
            {
                delIndex.Add(i - 1);
            }
            if (i + 1 < chars.Count)
            {
                delIndex.Add(i + 1);
            }                    
        }
    }

    for (int i = 0; i < chars.Count; i++)
    {
        if (!delIndex.Contains(i))
            builder.Append(chars[i]);
    }

    return builder.ToString();
}
