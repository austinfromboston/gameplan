FactoryGirl.define do
  factory :capacity_plan do
    start_date Date.new(2012, 1, 21)
    quantity 2

    trait :with_project do
      association :project
    end

    trait :fully_staffed do
      after :create do |cp|
        create :assignment, :with_person, capacity_plan: cp
        create :assignment, :with_person, capacity_plan: cp
      end
    end
  end
end