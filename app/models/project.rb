class Project < ActiveRecord::Base
  has_many :capacity_plans
  has_many :assignments, through: :capacity_plans

  def self.unassigned
    where(designation: :unassigned).first
  end

  def self.vacation
    where(designation: :vacation).first
  end
end
