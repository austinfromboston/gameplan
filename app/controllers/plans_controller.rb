class PlansController < ApplicationController
  def show
    @projects = Project.order(:designation, :name)
    @weeks = ([Time.now.beginning_of_week(:monday)] * 12).map.with_index { |x, i| x.advance(weeks: i) }
  end

end
