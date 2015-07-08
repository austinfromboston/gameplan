FactoryGirl.define do
  factory :assignment do
    start_date Date.new(2012, 1, 21)

    trait :with_person do
      association :person
    end

    trait :with_project do
      association :capacity_plan, :with_project
    end
  end
end