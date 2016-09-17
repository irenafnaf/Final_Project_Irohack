# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(name: "Irene", email: "irenafnaf@gmail.com")


clients = [
	["Martha Sanchez", "marthas@gmail.com", 1],
	["Key Point Academy Coral Gables", "keypointcg@gmail.com", 1],
	["Priscilla Andres", "priscilla@hotmail.com", 1],
	["Southern Wine & Spirits", "southernwine@sws.com", 1]
]

clients.each do |name, email, user_id|
	Client.create(name: name, email: email, user_id: user_id)
end


types = [
	"Logo", "Stationery", "Business Card",
	"Post Card",
	"Flyer",
	"Brochure",
	"Print Advertisement",
	"Hang Tag/Label",
	"Photo Touch-ups/Corrections",
	"Poster",
	"Banner",
	"Menu",
	"Invitation",
	"Web Design",
]

types.each do |name|
	Type.create(name: name)
end