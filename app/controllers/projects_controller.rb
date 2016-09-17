class ProjectsController < ApplicationController
	
	def index
		all_projects = Client.find_by(id: params[:client_id]).projects
		render json: all_projects
	end

	def create
		project = Project.create(project_params)
		render json: project
	end

	def show
		project = Project.find_by(id: params[:id])
		if project
			render json: project
		else
			render json: {error: "Project Not Found"},
			status: 404
		end
	end

	def update
		project = Project.find_by(id: params[:id])

		if project.update(project_params)
			render json: project
		else
			render json: {error: "Project Not Found"},
			status: 404
		end
	end

	def destroy
		project = Project.find_by(id: params[:id])

		if project.destroy
			render json: sandwich
		else
			rendor json: {error: "Project Not Fount"},
			status: 404
		end
	end


	private

	def project_params
		params.require(:project).permit(:client_id, :name, :description, :due_date, type_ids:[])
	end


end
