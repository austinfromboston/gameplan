ActiveAdmin.register Project do
  permit_params :name


  controller do
    def create
      create! do |success, failure|
        success.html do
          default_plan = Project.unassigned.capacity_plans.first
          @project.capacity_plans.create(start_date: 1.month.ago, quantity: 2)
          redirect_to admin_projects_path
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
