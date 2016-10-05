class Client < ApplicationRecord
	belongs_to :user
	has_many :projects
	has_many :comments, as: :commentable

	validates :name, presence: true, uniqueness: true
	
end
