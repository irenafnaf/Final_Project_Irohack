class Project < ApplicationRecord
  belongs_to :client

  validates :client_id, presence: true
  
end
