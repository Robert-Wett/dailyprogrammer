# http://www.reddit.com/r/dailyprogrammer/comments/1t0r09/121613_challenge_145_easy_tree_generation/
import sys


levels, trunk, leaves = sys.argv[1].split(" ")
levels = int(levels)
top = levels // 2 + 1
for x in range(top):
    pad = " "*(top-x)
    print(pad+(leaves*(x * 2 + 1))+pad)
pad = " "*((levels - 3)//2)
print(pad+" "+trunk*3+pad)

# http://ideone.com/JUy4Mu
#           *           
#          ***          
#         *****         
#        *******        
#       *********       
#      ***********      
#     *************     
#    ***************    
#   *****************   
#  *******************  
# ********************* 
#          ===         

# Live Blockspring Example:
# https://python.blockspring.com/blocks/115
