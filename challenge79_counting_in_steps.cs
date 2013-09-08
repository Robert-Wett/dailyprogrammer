// http://www.reddit.com/r/dailyprogrammer/comments/wvc21/7182012_challenge_79_easy_counting_in_steps/
// 
public List<double> step_count(double a, double b, int steps)
{
    List<double> stepCountList = new List<double>();
    stepCountList.Add(a);
    if (steps == 2)
    {
        stepCountList.Add(b);
        return stepCountList;
    }
    else
    {
        for (int i = 1; i < steps - 1; i++)
        {
            stepCountList.Add(a - (((a - b) / (steps - 1)) * i));
        }
        stepCountList.Add(b);
        return stepCountList;
    }
}