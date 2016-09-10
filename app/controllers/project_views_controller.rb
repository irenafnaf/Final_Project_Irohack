class ProjectViewsController < ApplicationController
	def index
		@projects = Projects.all
	end

	def show
		@project = Project.find_by(id: params[:id])
	end
end
