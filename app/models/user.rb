class User < ActiveRecord::Base
  before_create :default_privilege

  class << self
    def find_or_create_from_auth_hash!(auth_hash)
      where(email: auth_hash[:email]).first_or_create!(auth_hash.slice(:first_name, :name, :image))
    end
  end

  def default_privilege
    self.admin = true if ENV['ADMIN_BY_DEFAULT']
  end

  def display_name
    first_name || name || email
  end
end
