class PlansController < ApplicationController
  def show
    @projects = Project.all
    # @unassigned = Person.unassigned
  end
end
