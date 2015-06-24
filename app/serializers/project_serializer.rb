class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name
  self.root = false
end
