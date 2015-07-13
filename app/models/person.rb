class Person < ActiveRecord::Base

  has_many :assignments, dependent: :destroy

  scope :unassigned_for_week, ->(week) { where.not(id: Assignment.for_week(week).select(:person_id))}
  before_create :sample_abbreviation


  def sample_abbreviation
    return if self.abbreviation.present?
    self.abbreviation = first_name
  end

  def name
    "#{first_name} #{last_name} (#{abbreviation})"
  end
end
