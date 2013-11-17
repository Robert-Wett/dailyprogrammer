// http://www.reddit.com/r/dailyprogrammer/comments/wvc21/7182012_challenge_79_easy_counting_in_steps/

/*
    Write a function step_count(a, b, steps) that returns a list or array 
    containing steps elements, counting from a to b in steps of an equal size. 
    Steps is a positive integer greater than or equal to 2, a and b are floating point numbers.
    
    For example:
    step_count(18.75, -22.00, 5)
    ==> [18.75, 8.5625, -1.625, -11.8125, -22.0]
    
    step_count(-5.75, 12.00, 5)
    ==> [-5.75, -1.3125, 3.125, 7.5625, 12.0]
    
    step_count(13.50, -20.75, 3)
    ==> [13.5, -3.625, -20.75]
    
    step_count(9.75, 3.00, 9)
    ==> [9.75, 8.90625, 8.0625, 7.21875, 6.375, 5.53125, 4.6875, 3.84375, 3.0]
*/

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
