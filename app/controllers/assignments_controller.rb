class AssignmentsController < ApplicationController
  def create
    AssignmentCreator.new(assignment_params).save
    render json: {}
  end

  private

  def assignment_params
    params.permit(:timeslot, :project_id, :person_id)
  end
end