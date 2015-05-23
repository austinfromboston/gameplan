class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.date :start_date
      t.boolean :enabled, default: true
      t.string :abbreviation

      t.timestamps null: false
    end
  end
end
