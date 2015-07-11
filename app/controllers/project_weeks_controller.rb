class ProjectWeeksController < ApplicationController
  before_action :load_project
  def show
    @assignments = @project.assignments.for_week(Time.parse(params[:id]))
    render json: @assignments.map { |a| ProjectWeeksSerializer.new(a) }
  end

  def index
    start_date = Date.parse(params[:start_date])
    end_date = Date.parse(params[:end_date])
    @assignments = {}
    (start_date..end_date).step(7).each do |week_start|
      @assignments[week_start.strftime('%Y-%m-%d')] = @project.assignments.includes(:person).for_week(week_start).order('people.abbreviation').map do |a|
        ProjectWeeksSerializer.new(a)
      end
    end
    render json: @assignments
  end

  def load_project
    @project = Project.find(params[:project_id])
  end
end
