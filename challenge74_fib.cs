// http://www.reddit.com/r/dailyprogrammer/comments/wa0mc/792012_challenge_74_easy/
// First time working with recursion

public string FindFibonacciNumbers(string result, int counterValue, int currentTotal)
{   
    int[] fibNumbers = {0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181};

    if (counterValue == 0 || counterValue == 1)
        return counterValue.ToString();

    if (currentTotal == counterValue)              
        return result.Substring(0, result.Length - 3);

    int remainingValue = counterValue - currentTotal;

    for (int i = 0; i < fibNumbers.Length; i++)
    {
        if (remainingValue < fibNumbers[i] && remainingValue >= fibNumbers[i-1])
        {
            currentTotal += fibNumbers[i-1];
            StringBuilder sbuilder = new StringBuilder(result);
            sbuilder.Append(string.Format("{0} + ", fibNumbers[i-1].ToString()));
            result = FindFibonacciNumbers(sbuilder.ToString(), counterValue, currentTotal);
        }
    }
    return result;
}
// I know I should generate the fib sequence out past the input value but I got lazy