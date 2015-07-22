class PlanSerializer < ActiveModel::Serializer
  attributes :id, :name, :designation, :creator_id
end
