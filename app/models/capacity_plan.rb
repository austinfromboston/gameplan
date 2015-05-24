class CapacityPlan < ActiveRecord::Base
  belongs_to :project
  has_many :assignments

  scope :for_week, ->(week) { where("start_date < ? AND (end_date is ? OR end_date > ?)", week, nil, week.advance(weeks: 1))}

  def name
    "#{start_date.strftime("%m-%d-%Y")} #{project.name}"
  end

  def slots_for_week(week)
    assigned = assignments.for_week(week)
    names = assigned.map {|a| a.person.abbreviation}
    names + (["open"] * (quantity - names.count))
  end
end
