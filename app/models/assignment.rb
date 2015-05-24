class Assignment < ActiveRecord::Base
  belongs_to :person
  belongs_to :capacity_plan
  has_one :project, through: :capacity_plan
  scope :for_week, ->(week) { where("start_date < ? AND (end_date is ? OR end_date > ?)", week, nil, week.advance(weeks: 1))}

end
