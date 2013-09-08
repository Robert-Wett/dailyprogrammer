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