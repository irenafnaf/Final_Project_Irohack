class ThumbnailsController < ApplicationController

	def new
		@project = Project.find_by(id: params[:project_id])
		
		@upload = @project.thumbnails.new
	end

	def create
		project = Project.find_by(id: params[:project_id])
		thumbnail = project.thumbnails.create!(thumbnail_params)
		render json: thumbnail
	end

	def update
		thumbnail = Thumbnail.find_by(id: params[:id])

		if thumbnail.update(thumbnail_params)
			render json: thumbnail
		else
			render json: {error: "Image Not Found"},
			status: 404
		end
	end

	def destroy
		thumbnail = Thumbnail.find_by(id: params[:id])

		if thumbnail.destroy
			render json: thumbnail
		else
			render json: {error: "Image Not Found"},
			status: 404
		end
	end

		private

	def thumbnail_params
		params.require(:thumbnail).permit(:name, :description, :image, :project_id)
	end
end
