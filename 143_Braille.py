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

f = open("files/braille.txt")

braille_data = ["O.....", "O.O...", "OO....", "OO.O..", "O..O..", 
                "OOO...", "OOOO..", "O.OO..", ".OO...", ".OOO..",
                "O...O.", "O.O.O.", "OO..O.", "OO.OO.", "O..OO.",
                "OOO.O.", "OOOOO.", "O.OOO.", ".OO.O.", ".OOOO.",
                "O...OO", "O.O.OO", ".OOO.O", "OO..OO", "OO.OOO",
                "O..OOO"]

letter_lookup = {k:v for (k, v) in zip(braille_data, "abcdefghijklmnopqrstuvwxyz")}

raw_data = [x.strip().split(" ") for x in f.readlines()]
togethered = "".join([letter_lookup["".join(x)] for x in list(zip(*raw_data))])
print(togethered)
