class Type < ApplicationRecord
	has_many :project_types
	has_many :projects, through: :project_types
end
