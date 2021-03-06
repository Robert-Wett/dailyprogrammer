# Falling-sand Games are particle-simulation games that focus on the interaction 
# between particles in a 2D-world. Sand, as an example, might fall to the ground 
# forming a pile. Other particles might be much more complex, like fire, that 
# might spread depending on adjacent particle types.
# Your goal is to implement a mini falling-sand simulation for just sand and stone. 
# The simulation is in 2D-space on a uniform grid, where we are viewing this grid 
# from the side. Each type's simulation properties are as follows:
# Stone always stays where it was originally placed. It never moves.
# Sand keeps moving down through air, one step at a time, until it either hits the 
# bottom of the grid, other sand, or stone.
# 
# Input Description
# On standard console input, you will be given an integer N which represents 
# the N x N grid of ASCII characters. This means there will be N-lines of N-characters 
# long. This is the starting grid of your simulated world: the character ' ' (space) 
# means an empty space, while '.' (dot) means sand, and '#' (hash or pound) means stone. 
# Once you parse this input, simulate the world until all particles are settled (e.g. 
# the sand has fallen and either settled on the ground or on stone). "Ground" is defined 
# as the solid surface right below the last row.
# 
# Output Description
# Print the end result of all particle positions using the input format for particles.
# Sample Inputs & Outputs
# Sample Input
# 5
# .....
#   #  
# #    
# 
#     .
# Sample Output
#   .  
# . #  
# #    
#     .
#  . ..

f = open("files/fallingsand.txt")
# Use a list comprehension to read in a transposed array
# (We use python unpacking behavior (  zip(*args))  ) to transpose)
raw_data = [list(x) for x in zip(*[list(x) for x in f.readlines()][1:])]
for row in raw_data:
    # The grain will fall at least one position. If not, the
    # below function will redraw it.
    row[0] = ' '
    # For columns with '#', and '.', they have a 'ground'. Set this to False
    # first, and assume False until True
    has_ground = False 
    for idx, char in enumerate(row):
        # If we have already established a ground, there's no need to
        # draw anything further - it's already sitting on the ground.
        if char in ('#', '.') and has_ground == False:
            # Since the array of values is transposed, we can access
            # the column value by common index. Set the index before
            # the '#' or '.' value to the grain of sand, and set the
            # has_ground variable to true, because we found a ground.
            row[idx - 1] = '.'
            has_ground = True
    # If we looped through and didn't find a ground character, then we
    # assume we need to draw the grain of sand at the bottom, because
    # there was no ground to stop it.
    if has_ground == False:
        row[-1] = '.'

# Cheap way of printing it out, I got lazy :)
# Note: Notice the transpose method list(zip(*raw_data))  
for row in [''.join(list(x)) for x in list(zip(*raw_data))]:
    print(row)


# This solution assumes 1 grain of sand is dropped from each column
#
# http://ideone.com/4tHRoN
#
# OUTPUTS
# http://i.imgur.com/JU1mO3k.png
# http://i.imgur.com/MSGYqlU.png
# http://i.imgur.com/hkf0M8b.png
# http://i.imgur.com/gixOCFM.png
