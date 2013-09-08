// http://www.reddit.com/r/dailyprogrammer/comments/wrqbr/7182012_challenge_78_easy_keyboard_locale/
// 
public char keyToChar(char c, bool shift, bool capslock)
{
    List<char> specialChars = new List<char>();
    specialChars.Add('`'); specialChars.Add('-'); specialChars.Add('='); specialChars.Add('[');
    specialChars.Add(']'); specialChars.Add('\\'); specialChars.Add(';'); specialChars.Add('\'');
    specialChars.Add(','); specialChars.Add('.'); specialChars.Add('/');
    if (specialChars.Contains(c)){
        char returnVal = shift == true ? (capslock == true ? c : char.ToUpperInvariant(c)) : (capslock == true ? char.ToUpperInvariant(c) : c);
        return returnVal;
    }
    else{
        char returnVal = shift == true ? (capslock == true ? c : char.ToUpper(c)) : (capslock == true ? char.ToUpper(c) : c);
        return returnVal;
    }
}