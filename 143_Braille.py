# http://www.reddit.com/r/dailyprogrammer/comments/1s061q/120313_challenge_143_easy_braille

# Braille is a writing system based on a series of raised / lowered 
# bumps on a material, for the purpose of being read through touch 
# rather than sight. It's an incredibly powerful reading & writing 
# system for those who are blind / visually impaired. Though the 
# letter system has up to 64 unique glyph, 26 are used in English 
# Braille for letters. The rest are used for numbers, words, accents, 
# ligatures, etc.
# 
# Your goal is to read in a string of Braille characters (using standard 
# English Braille defined here) and print off the word in standard English 
# letters. You only have to support the 26 English letters.
# 
# Formal Inputs & Outputs
# 
# Input Description
# Input will consistent of an array of 2x6 space-delimited Braille characters. 
# This array is always on the same line, so regardless of how long the text is, 
# it will always be on 3-rows of text. A lowered bump is a dot character '.', 
# 
# 
# Output Description
# Print the transcribed Braille.
# 
# Sample Inputs & Outputs
# Sample Input
# O. O. O. O. O. .O O. O. O. OO 
# OO .O O. O. .O OO .O OO O. .O
# .. .. O. O. O. .O O. O. O. ..
# 
# Sample Output:
# helloworld

import re


f = open("files/braille.txt")
raw_data = [x.strip().split(" ") for x in f.readlines()]

alphabet = "abcdefghijklmnopqrstuvwxyz "
space = "      "

braille_data = \
["O.....", "O.O...", "OO....", "OO.O..", "O..O..", 
"OOO...", "OOOO..", "O.OO..", ".OO...", ".OOO..",
"O...O.", "O.O.O.", "OO..O.", "OO.OO.", "O..OO.",
"OOO.O.", "OOOOO.", "O.OOO.", ".OO.O.", ".OOOO.",
"O...OO", "O.O.OO", ".OOO.O", "OO..OO", "OO.OOO",
"O..OOO", space]

letter_lookup = {k:v for (k, v) in zip(braille_data, alphabet)}
togethered = "".join([letter_lookup["".join(x)] for x in list(zip(*raw_data))])
print(togethered, end="\n\n")

#--------------------------------------
# Now we implement the reverse function
#
# This is me just messing around with something
# and iterating over it to make it better. I'm 
# really experimenting with args and kwargs and 
# whatnot and what have you
#--------------------------------------

# Add a couple other lists to build a dictionary/lookup with
# TODO: Generate lists based on a char for raised and a char
#       for lowered.
poundlabel="'#' for raised, '.' for lowered"
braille_pound = \
["#.....", "#.#...", "##....", "##.#..", "#..#..", 
"###...", "####..", "#.##..", ".##...", ".###..",
"#...#.", "#.#.#.", "##..#.", "##.##.", "#..##.",
"###.#.", "#####.", "#.###.", ".##.#.", ".####.",
"#...##", "#.#.##", ".###.#", "##..##", "##.###",
"#..###", space]

binlabel="'1' for raised and '0' for lowered"
braille_binary = \
["100000", "101000", "110000", "110100", "100100", 
"111000", "111100", "101100", "011000", "011100",
"100010", "101010", "110010", "110110", "100110",
"111010", "111110", "101110", "011010", "011110",
"100011", "101011", "011101", "110011", "110111",
"100111", space]

lookup   = {k:v for (k, v) in zip(alphabet, braille_data)}
lookup_p = {k:v for (k, v) in zip(alphabet, braille_pound)}
lookup_b = {k:v for (k, v) in zip(alphabet, braille_binary)}

def pad(string, length=2, delim=' '):
    """ Take a string and add a specified character every nth index """
    return delim+delim.join(string[i:i+length] for i in range(0,len(string),length))+delim

def get_braille(sentence, *args, bmap=lookup, 
                delimchar=' ', lname="'O' for raised and '.' for lowered", ljust=True):
#    """This takes a string and returns the English Braille
#       representation in three lines of text. It supports
#       [aA-zZ] and spaces. It assumes the lookups passed
#       or built already."""
    
    r1, r2, r3, r4 = [], [], [], []
    for c in sentence.lower():
       if ljust:
           r1+=c+" "
       else:
           r1+=" "+c
       translated = re.findall('..', bmap[c])
       r2+=translated[0]
       r3+=translated[1]
       r4+=translated[2]
    print("Translating '", sentence.upper(), "' to braille, with ", lname, sep='')
    if args:
        for line in ["".join(x) for x in args]: print(line)
    print("{0:3}".format(pad("".join(r1), delim=delimchar)), 
          "{0:3}".format(pad("".join(r2), delim=delimchar)), 
          "{0:3}".format(pad("".join(r3), delim=delimchar)), 
          "{0:3}".format(pad("".join(r4), delim=delimchar)), 
          sep="\n", end="\n\n")

# Demonstrate the different usages
get_braille("Hello World")
get_braille("Hello World", bmap=lookup_p, lname=poundlabel)
get_braille("Hello World", bmap=lookup_b, lname=binlabel)
get_braille("Rob Wett")
get_braille("Rob Wett", bmap=lookup_p, lname=poundlabel)
get_braille("Rob Wett", "Using '|' as a delimiting character: ",
           "Lets add another line, just args stuff an all", 
           bmap=lookup_p, lname=poundlabel, delimchar='|')
get_braille("Rob Wett", "Using '+' as a delimiting character: ", 
            bmap=lookup_b, lname=binlabel, delimchar='+')
get_braille("Rob Wett", "Using '-' as a delimiting character: ", 
            bmap=lookup_b, lname=binlabel, delimchar='-')
get_braille("Rob Wett", "Using '-' as a delimiting character: ", 
            bmap=lookup_b, lname=binlabel, delimchar='-', ljust=False)
get_braille("braille")
# messin
messin_args="library\ncards\nr\n4\ntards"
get_braille("braille", messin_args, bmap=lookup_p, lname=poundlabel)
get_braille("braille", bmap=lookup_b, lname=binlabel)
get_braille("j is nonsense", messin_args)
get_braille("j is nonsense", bmap=lookup_p, lname=poundlabel, ljust=False)
get_braille("j is nonsense", bmap=lookup_b, lname=binlabel)

# http://ideone.com/gQdsB1
