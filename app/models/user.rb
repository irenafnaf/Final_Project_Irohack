class User < ApplicationRecord
	has_many :clients
	has_many :comments, as: :commentable

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true
end
