class AddPlanIdToAssignments < ActiveRecord::Migration
  def change
    add_column :assignments, :plan_id, :integer
  end
end
