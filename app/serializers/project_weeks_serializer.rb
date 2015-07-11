class ProjectWeeksSerializer < ActiveModel::Serializer
  self.root = false
  attributes :id, :person_id, :person_name, :person_abbreviation

  delegate :person, to: :object
  delegate :name, :abbreviation, to: :person, prefix: true
end
