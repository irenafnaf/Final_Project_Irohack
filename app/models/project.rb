class Project < ApplicationRecord
  belongs_to :client
  has_many :project_types
  has_many :types, through: :project_types
  has_many :thumbnails

  validates :client_id, presence: true
  
end
