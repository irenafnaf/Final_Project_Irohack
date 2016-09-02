class ClientsController < ApplicationController


	def index
		all_clients = Client.all
		render json: all_clients
	end
end
