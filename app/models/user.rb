class User < ApplicationRecord
	has_many :clients

  validates :email, uniqueness: true, presence: true
  validates :name, presence: true
end
