class Person < ActiveRecord::Base

  before_create :sample_abbreviation

  def sample_abbreviation
    return if self.abbreviation.present?
    self.abbreviation = (first_name[0] + last_name[0]).upcase
  end

  def name
    "#{first_name} #{last_name} (#{abbreviation})"
  end
end
