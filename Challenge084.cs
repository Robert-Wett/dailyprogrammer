// http://www.reddit.com/r/dailyprogrammer/comments/xilfu/812012_challenge_84_easy_searching_text_adventure/

/*
	Like many people who program, I got started doing this because I wanted to learn 
	how to make video games. As a result, my first ever 'project' was also my first video game. 
	It involved a simple text adventure I called "The adventure of the barren moor"
	In "The adventure of the barren moor" the player is in the middle of an infinite grey swamp. 
	This grey swamp has few distinguishing characteristics, other than the fact that it is large 
	and infinite and dreary. However, the player DOES have a magic compass that tells the player 
	how far away the next feature of interest is. The player can go north,south,east,or west. In 
	my original version of the game, there was only one feature of interest, a treasure chest at a 
	random point in the world.

	Here is an example playthrough of my old program:

	You awaken to find yourself in a barren moor.  Try "look"
	> look
	Grey foggy clouds float oppressively close to you, 
	reflected in the murky grey water which reaches up your shins.
	Some black plants barely poke out of the shallow water.
	Try "north","south","east",or "west"
	You notice a small watch-like device in your left hand.  
	It has hands like a watch, but the hands don't seem to tell time. 

	The dial reads '5m'

	>north
	The dial reads '4.472m'
	>north
	The dial reads '4.123m'
	>n
	The dial reads '4m'
	>n
	The dial reads '4.123m'
	>south
	The dial reads '4m'
	>e
	The dial reads '3m'
	>e
	The dial reads '2m'
	>e
	The dial reads '1m'
	>e

	You see a box sitting on the plain.   Its filled with treasure!  You win!  The end.

	The dial reads '0m'
	Obviously, you do not have to use my flavor text, or my feature points. As a matter of fact, its 
	probably more interesting if you don't!
*/

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
