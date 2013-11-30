// http://www.reddit.com/r/dailyprogrammer/comments/1aih0v/031813_challenge_122_easy_words_with_ordered/

/*
    Find words in a word list that contain all the vowels in alphabetical order, 
    non-repeated, where vowels are defined as A E I O U Y.
*/

static void Main(string[] args)
{
    var vowels = new List<char>() { 'a', 'e', 'i', 'o', 'u', 'y' };
    var wordsMatched = new List<string>();

    using (var r = new StreamReader("enable1.txt"))
    {
        string line;
        while ((line = r.ReadLine()) != null)
        {
            var stripWord = line.Where(w => vowels.Contains(w)).ToList();
            if (stripWord.SequenceEqual(vowels))
                wordsMatched.Add(line);
        }
    }

    wordsMatched.ForEach(w => Console.WriteLine(w));
}
