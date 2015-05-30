namespace :populate do
  desc 'make fake data to populate a plan'
  task plan: :environment do
    @projects = Project.create Array.new(4) { {name: Faker::Lorem.word.capitalize } }
    @people = Person.create Array.new(8) { {first_name: Faker::Name.first_name, last_name: Faker::Name.last_name } }
    @plans = @projects.map do |p|
      CapacityPlan.create project_id: p.id, start_date: 1.month.ago, quantity: rand(8)
    end
    @assignments = @people.map do |p|
      Assignment.create person_id: p.id, capacity_plan_id: @plans.sample.id, start_date: 1.month.ago
    end
  end
end