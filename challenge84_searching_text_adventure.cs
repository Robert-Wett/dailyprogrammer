// http://www.reddit.com/r/dailyprogrammer/comments/xilfu/812012_challenge_84_easy_searching_text_adventure/
// 
static void Main(string[] args)
{
    string[] entry;
    TreasureMap map = new TreasureMap();
    Console.WriteLine("Welcome to treasure hunt. USAGE: {distance} {direction}");
    while (map.continueSearching)
    {
        entry = Console.ReadLine().Split(' ');
        map.moveLocation(Convert.ToInt32(entry.GetValue(0)), entry.GetValue(1).ToString()); 
    }
}

public class TreasureMap
{
    public bool continueSearching { get; set; }
    int treasureX = 0;
    int treasureY = 0;
    int currentX = 0;
    int currentY = 0;

    public TreasureMap()
    {
        Random ran = new Random();
        continueSearching = true;
        treasureX = ran.Next(-100, 100);
        treasureY = ran.Next(-100, 100);
        currentX = ran.Next(-100, 100);
        currentY = ran.Next(-100, 100);
    }

    public void moveLocation(int distance, string direction)
    {
        switch (direction.ToUpper().ToCharArray()[0])
        {
            case 'N':
                currentY += distance;
                break;
            case 'E':
                currentX += distance;
                break;
            case 'S':
                currentY -= distance;
                break;
            case 'W':
                currentX -= distance;
                break;
            default:
                Console.WriteLine("Unrecognized input, please enter North, South, East, West (or N, S, E, W)");
                break;
        }

        if (currentX == treasureX && currentY == treasureY)
        {
            Console.WriteLine(string.Format("Congratulations! You've found the treasure at X:{0} and Y{1}", treasureX, treasureY));
            continueSearching = false;
        }
        else
        {
            Console.WriteLine(string.Format("\n\nYou are {0}m away", (int)Math.Sqrt(Math.Pow((treasureX - currentX), 2) + Math.Pow((treasureY - currentY), 2))));
            Console.WriteLine("Which way now?");
            continueSearching = true;
        }
    }
}