// http://www.reddit.com/r/dailyprogrammer/comments/zkdv1/9082012_challenge_97_easy_concatenate_directory/
// C# with extra credit

/*
Write a program that concatenates all text files (*.txt) in a directory, numbering 
file names in alphabetical order. Print a header containing some basic information above each file.

For example, if you have a directory like this:
~/example/abc.txt
~/example/def.txt
~/example/fgh.txt

And call your program like this:
nooodl:~$ ./challenge97easy example

The output would look something like this:
=== abc.txt (200 bytes)
(contents of abc.txt)

=== def.txt (300 bytes)
(contents of def.txt)

=== ghi.txt (400 bytes)
(contents of ghi.txt)
For extra credit, add a command line option '-r' to your program that makes it recurse 
into subdirectories alphabetically, too, printing larger headers for each subdirectory.
*/

static void Main(string[] args)
{
    if (args.Length == 1)
    {
        PrintResults(getFiles(new DirectoryInfo(args[0]), "*.txt", false));
    }
    else if (args.Length == 2 && args[1] == "-r")
    {
        PrintResults(getFiles(new DirectoryInfo(args[0]), "*.txt", true));
    }
    else
    {
        Console.WriteLine("Pattern: [directory] [setRecursive]");
        return;
    }
}

public static IEnumerable<FileInfo> getFiles(DirectoryInfo d, string pattern, bool recursive)
{
    if (recursive)
    {
        foreach (DirectoryInfo dirInfo in d.GetDirectories())
        {
            foreach (FileInfo f in getFiles(dirInfo, pattern, true))
                yield return f;
        }
    }

    foreach (FileInfo f in d.GetFiles(pattern))
        yield return f;
}

public static void PrintResults(IEnumerable<FileInfo> files)
{
    string currentDir = "";
    foreach (FileInfo f in files)
    {
        if (currentDir != f.DirectoryName)
        {
            Console.WriteLine(string.Format("\nText files in Directory {0}", f.DirectoryName));
            Console.WriteLine("*********************************************");
            currentDir = f.DirectoryName;
        }
        Console.WriteLine(string.Format("\n=== Filename: {0} ({1} bytes)", f.Name, f.Length));

        string line;
        using (StreamReader reader = new StreamReader(f.FullName))
        {
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }
    }
    Console.ReadKey();
}
