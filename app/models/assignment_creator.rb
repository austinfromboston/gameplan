AssignmentCreator ||= Struct.new(:attrs)

class AssignmentCreator
  def save
    Assignment.transaction do
      make_assignment_continuous || prepend_to_next_assignment || create_new_assignment
    end
  end

  def terminate_prior_assignment
    prior_assignment.update_attributes end_date: new_assignment_start
  end

  def prepend_to_next_assignment
    return unless next_assignment && next_assignment.project == project
    next_assignment.tap do |a|
      a.update_attributes start_date: new_assignment_start
    end
  end

  def make_assignment_continuous
    if last_weeks_assignment && next_assignment && project.assignments.include?(last_weeks_assignment) && project.assignments.include?(next_assignment)
      last_weeks_assignment.tap do |a|
        prior_assignment.destroy unless last_weeks_assignment == prior_assignment
        a.update_attributes end_date: next_assignment.end_date
        next_assignment.destroy
      end
    else
      terminate_prior_assignment and return
    end
  end

  def create_new_assignment
    person.assignments.create start_date: new_assignment_start, end_date: new_assignment_end, capacity_plan: new_capacity_plan
  end
  
  def prior_assignment
    @prior_assignment ||= person.assignments.for_week(new_assignment_start).first
  end

  def last_weeks_assignment
    @last_weeks_assignment ||= person.assignments.where("start_date < ?", new_assignment_start).order(start_date: :desc).first
  end

  def next_assignment
    @next_assignment ||= person.assignments.where("start_date > ?", new_assignment_start).order(:start_date).first
  end
  
  def new_capacity_plan
    @plan ||= project.capacity_plans.for_week(new_assignment_start).first
  end

  def project
    @project ||= Project.find(attrs[:project_id])
  end

  def new_assignment_start
    Date.parse(attrs[:timeslot]).beginning_of_week
  end

  def new_assignment_end
    next_assignment && next_assignment.start_date.yesterday
  end
  
  def person
    @person ||= Person.find(attrs[:person_id])
  end
end
