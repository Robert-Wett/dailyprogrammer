# http://www.reddit.com/r/dailyprogrammer/comments/1k7s7p/081313_challenge_135_easy_arithmetic_equations/
# Unix, the famous multitasking and multi-user operating system, has several standards 
# that defines Unix commands, system calls, subroutines, files, etc. Specifically within 
# Version 7 (though this is included in many other Unix standards), there is a game called 
# "arithmetic". To quote the Man Page:
# Arithmetic types out simple arithmetic problems, and waits for an answer to be typed in. 
# If the answer is correct, it types back "Right!", and a new problem. If the answer is wrong, 
# it replies "What?", and waits for another answer. Every twenty problems, it publishes statistics 
# on correctness and the time required to answer.
# Your goal is to implement this game, with some slight changes, to make this an [Easy]-level challenge. 
# You will only have to use three arithmetic operators (addition, subtraction, multiplication) with 
# four integers. An example equation you are to generate is "2 x 4 + 2 - 5".
# Problem Author: nint22
#
# unfinished

class Challenge135

  @ops = [ multiply: '*', subtract: '-', add: '+' ]

  def GenQuestion()
    @container = ['', 0]
    i = 0
    while i < 4 do
      case [1..3].sample
        when 1
          @container = Multiply(@container[0], @container[1], [1..10].sample)
        when 2
          @container = Subtract(@container[0], @container[1], [1..10].sample)
        when 3
          @container = Add(@container[0], @container[1], [1..10].sample)
      end
      i += 1
    end
  end

  def Operands( arrContainer, )

  # @param q        String that will be output as the final question
  # @param total    Result of the previous calculation, or 0
  # @param nextNum  Amount to apply the current operand against
  # @return         Array with the question output string and the result of the method operation
  def Multiply( q, total, nextNum = nil )
    q << " #{ @ops["Multiply"] } #{ nextNum }"
    return [q, total * nextNum]
  end

  # @param q        String that will be output as the final question
  # @param total    Result of the previous calculation, or 0
  # @param nextNum  Amount to apply the current operand against
  # @return         Array with the question output string and the result of the method operation
  def Subtract( q, total, nextNum = nil )
    q << " #{ @ops["Subtract"] } #{ nextNum }"
    return [q, total - nextNum]
  end

  # @param q        String that will be output as the final question
  # @param total    Result of the previous calculation, or 0
  # @param nextNum  Amount to apply the current operand against
  # @return         Array with the question output string and the result of the method operation
  def Add( q, total, nextNum = nil )
    q << " #{ @ops["Add"] } #{ nextNum }"
    return [q, total + nextNum]
  end

end
