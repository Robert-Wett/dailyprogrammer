# http://www.reddit.com/r/dailyprogrammer/comments/15ul7q/122013_challenge_115_easy_guessthatnumber_game/
# 
# A "guess-that-number" game is exactly what it sounds like: a number is guessed at random by the computer, 
# and you must guess that number to win! The only thing the computer tells you is if your guess is below or 
# above the number.
# 
# Your goal is to write a program that, upon initialization, guesses a number between 1 and 100 (inclusive), 
# and asks you for your guess. If you type a number, the program must either tell you if you won (you guessed 
# the computer's number), or if your guess was below the computer's number, or if your guess was above the 
# computer's number. If the user ever types "exit", the program must terminate.

random_number = [*1..100].sample
guess = nil
while guess != random_number do
	p 'Guess a number between 1-100'
	guess = gets.chomp.to_i	
	if guess == 0
		abort("Exiting")
	end
	p guess > random_number ? 'Lower..' : 'Higher..'
end
p 'You got it pal'
