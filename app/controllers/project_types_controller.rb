class ProjectTypesController < ApplicationController
	def index
		project = Project.find_by(id: params[:project_id])
		project_types = project.types
		# typeNames = project_types.map do |type|
		# 				type.name
		# 			end
		render json: project_types
	end
end
