class CreateCapacityPlans < ActiveRecord::Migration
  def change
    create_table :capacity_plans do |t|
      t.integer :project_id
      t.date :start_date
      t.date :end_date
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
