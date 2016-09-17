class Project < ApplicationRecord
  belongs_to :client
  has_many :project_types
  has_many :types, through: :project_types

  validates :client_id, presence: true
  
end
