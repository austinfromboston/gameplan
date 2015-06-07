# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Project.where(designation: :unassigned).empty?
  Project.create(name: 'Unassigned', designation: :unassigned).tap do |p|
    CapacityPlan.create quantity: 2, project: p, start_date: 1.month.ago
  end
end

if Project.where(designation: :vacation).empty?
  Project.create(name: 'Vacation', designation: :vacation).tap do |p|
    CapacityPlan.create quantity: 2, project: p, start_date: 1.month.ago
  end
end
