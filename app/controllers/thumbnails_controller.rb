class ThumbnailsController < ApplicationController
	def create
		thumbnail = Thumbnail.create(thumbnail_params)
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

	def project_params
		params.require(:thumbnails).permit(:name, :description, :image)
	end
end
