// http://www.reddit.com/r/dailyprogrammer/comments/yqydh/8242012_challenge_91_easy_sleep_sort/
// Trying out java
public class RedditChallenge91 {
    public static void main(String[] args) {        
        for (String s : args) {
            final int value = Integer.parseInt(s) * 1000;
            new Thread() {
                public void run() {
                    try {
                        this.sleep(value);
                        System.out.println(value / 1000);
                    }  catch (InterruptedException ex) {}
                }}.start();              
        }        
    }
}