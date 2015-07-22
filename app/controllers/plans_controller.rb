class PlansController < ApplicationController
  def show
    @plan = Plan.friendly.find(params[:id])
    @projects = Project.order(:designation, :name)
    @weeks = ([Time.now.beginning_of_week(:monday)] * 12).map.with_index { |x, i| x.advance(weeks: i) }
  end

end
