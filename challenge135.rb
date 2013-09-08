class Challenge135
  # Reddit /r/dailyprogrammer challenge 135

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