class Plan < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  def self.master
    friendly.find('master')
  end
end
