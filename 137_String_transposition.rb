# http://www.reddit.com/r/dailyprogrammer/comments/1m1jam/081313_challenge_137_easy_string_transposition/

# It can be helpful sometimes to rotate a string 90-degrees, like a big vertical 
# "SALES" poster or your business name on vertical neon lights, like this image 
# from Las Vegas [http://i.imgur.com/766x8uM.jpg] . Your goal is to write a program 
# that does this, but for multiples lines of text. This is very similar to a Matrix 
# Transposition[http://en.wikipedia.org/wiki/Transpose] , since the order we want 
# returned is not a true 90-degree rotation of text.
# Problem Author: nint22

def challenge137(input)
    # Using the built-in transpose method.
    # Could have used the 'safe transpose' method found in http://www.matthewbass.com/2009/05/02/how-to-safely-transpose-ruby-arrays/
    # but I figured I'd go the padding route to learn something (I'm new to ruby).
    transposed_array = normalize_array(input.lines).transpose
    transposed_array.each { |line| p line }
end

def normalize_array(lines)
    _, sentence_entries = lines.shift.split(//).pad(sentence_entries)
end

def pad(sentence_entries)
    max = sentence_entries.group_by(&:size).max.last
    sentence_entries.each { |line| line += (line.size < max) ? [""] * (max - line.size) : [] }
end
