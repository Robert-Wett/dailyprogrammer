# /r/DailyProgrammer #115
# (Guess that number game)
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
