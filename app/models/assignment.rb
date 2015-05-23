class Assignment < ActiveRecord::Base
  belongs_to :person
  belongs_to :capacity_plan
  has_one :project, through: :capacity_plan
end
