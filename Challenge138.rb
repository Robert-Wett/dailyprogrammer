# http://www.reddit.com/r/dailyprogrammer/comments/1ml669/091713_challenge_138_easy_repulsionforce/
# 
# Colomb's Law[2] describes the repulsion force for two electrically charged particles. 
# In very general terms, it describes the rate at which particles move away from each-other 
# based on each particle's mass and distance from one another.
# 
# Your goal is to compute the repulsion force for two electrons in 2D space. Assume that 
# the two particles have the same mass and charge. The function that computes force is as follows:
# Force = (Particle 1's mass x Particle 2's mass) / Distance^2
# 
# Note that Colomb's Law uses a constant, but we choose to omit that for the sake of simplicity. 
# For those not familiar with vector math, you can compute the distance between two points in 2D space using the following formula:
# deltaX = (Particle 1's x-position - Particle 2's x-position)
# deltaY = (Particle 1's y-position - Particle 2's y-position)
# Distance = Square-root( deltaX * deltaX + deltaY * deltaY )
#
# unfinished, just a simple class
class particle
  attr_accessor :mass, :x, :y
  def initialize(mass, x, y)
    @mass, @x, @y = mass, x, y  # Ruby multiple assignment
  end

  def get_distance(particle)
    mass, x, y = particle.to_a  # more Ruby multiple assignment fun
    (@mass * mass) / (@x - x) * (@x - x) + (@y - y) * (@y - y) 
  end

  def to_a
    [@mass, @x, @y]
  end
end
