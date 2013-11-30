// http://www.reddit.com/r/dailyprogrammer/comments/1aih0v/031813_challenge_122_easy_words_with_ordered/

/*
    Find words in a word list that contain all the vowels in alphabetical order, 
    non-repeated, where vowels are defined as A E I O U Y.
*/

static void Main(string[] args)
{
    // Create a 'whitelist' of chars to look out for, in this case, vowels.
    var vowels = new List<char>() { 'a', 'e', 'i', 'o', 'u', 'y' };\
    // Initialize the list that we will dump matches to
    var wordsMatched = new List<string>();

    using (var r = new StreamReader("enable1.txt"))
    {
        string line;
        while ((line = r.ReadLine()) != null)
        {
            // Grab all the characters in the line that are in the vowels set
            var stripWord = line.Where(w => vowels.Contains(w)).ToList();
            if (stripWord.SequenceEqual(vowels))
                wordsMatched.Add(line);
        }
    }

    wordsMatched.ForEach(w => Console.WriteLine(w));
}
