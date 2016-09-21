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
		types = 
		if project.types != 0
			project.types.all
		else
			"None"
		end
		project_types = {"project" => project,
						  "types" => types}
		if project
			render json: project_types
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
