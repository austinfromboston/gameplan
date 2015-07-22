class SetDefaultPlanIdOnAssignments < ActiveRecord::Migration
  def up
    Assignment.update_all({plan_id: Plan.master.id})
  end
end
