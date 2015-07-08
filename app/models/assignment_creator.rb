AssignmentCreator ||= Struct.new(:attrs)

class AssignmentCreator
  def save
    Assignment.transaction do
      prior_assignment.update_attributes end_date: new_assignment_start
      person.assignments.create start_date: new_assignment_start, capacity_plan: new_capacity_plan
    end
  end
  
  def prior_assignment
    person.assignments.for_week(new_assignment_start).first
  end
  
  def new_capacity_plan
    @plan ||= project.capacity_plans.for_week(new_assignment_start).first
  end

  def project
    @project = Project.find(attrs[:project_id])
  end

  def new_assignment_start
    Time.parse(attrs[:timeslot]).beginning_of_week
  end
  
  def person
    @person ||= Person.find(attrs[:person_id])
  end
end