ActiveAdmin.register Person do
  permit_params :first_name, :last_name, :start_date, :abbreviation, :enabled

  controller do
    def create
      create! do |success, failure|
        success.html do
          default_plan = Project.unassigned.capacity_plans.first
          @person.assignments.create(capacity_plan: default_plan, start_date: default_plan.start_date)
          redirect_to admin_people_path
        end
      end
    end
  end
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end


end
