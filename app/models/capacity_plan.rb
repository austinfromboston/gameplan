class CapacityPlan < ActiveRecord::Base
  belongs_to :project

  def name
    "#{start_date.strftime("%m-%d-%Y")} #{project.name}"
  end
end
