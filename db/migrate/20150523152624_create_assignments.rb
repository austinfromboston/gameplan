class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :capacity_plan_id
      t.date :start_date
      t.date :end_date
      t.integer :person_id

      t.timestamps null: false
    end
  end
end
