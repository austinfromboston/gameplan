class ProjectWeeksController < ApplicationController
  def show
    @project = Project.find(params[:project_id])
    @assignments = @project.assignments.for_week(Time.parse(params[:id]))
    render json: @assignments.map { |a| ProjectWeeksSerializer.new(a) }
  end
end