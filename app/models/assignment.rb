class Assignment < ActiveRecord::Base
  belongs_to :person
  belongs_to :capacity_plan
  has_one :project, through: :capacity_plan
  scope :for_week, ->(week) { where("assignments.start_date <= ? AND (assignments.end_date is ? OR assignments.end_date > ?)", week, nil, week.advance(days: 6))}

end
