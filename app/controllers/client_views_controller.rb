class ClientViewsController < ApplicationController
	def client_home
		@client = Client.find_by(id: params[:client_id])
		@types = Type.all
	end
end
