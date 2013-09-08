// http://www.reddit.com/r/dailyprogrammer/comments/zfe7v/9052012_challenge_96_easy_controller_chains/
public int howManyPlayers(int money) {
    if (money < controllerPrice){return players;}
    dollars = money;
    dollars = dollars - extraPlayer;
    players = (int) ((dollars / fullTeam) * 4) + (dollars % fullTeam) / controllerPrice + 2;
    return players;
}