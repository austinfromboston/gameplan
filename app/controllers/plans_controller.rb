class PlansController < ApplicationController
  def show
    @projects = Project.all
    @weeks = ([Time.now.beginning_of_week(:monday)] * 12).map.with_index { |x, i| x.advance(weeks: i) }
    # @unassigned = Person.unassigned
  end

  def demo

  end
end
