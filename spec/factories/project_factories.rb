FactoryGirl.define do
  factory :project do
    name "Excel 2034"

    factory :unassigned do
      name "Unassigned"
      designation "unassigned"
    end

    trait :with_capacity_plan do
      association :capacity_plan
    end

  end
end