class ThumbnailsController < ApplicationController
	def index
		project = Project.find_by(id: params[:project_id])
		project_types = project.types.each do |type|
							type.name
						end

		
		# byebug
		lastThumbnail = Thumbnail.order(created_at: :desc).where(:name => project_types)
		group_by_name = lastThumbnail.group_by{ |d| d[:name] }
		test = [] 
		displayed_thumbnails = group_by_name.each do |group_key, group_value|
									p group_value
									puts ""
									test.push(group_value[0])
								end
		# give me the most recent one out of each
		render json: test
		# render json: displayed_thumbnails

	end

	def new
		@project = Project.find_by(id: params[:project_id])
		
		@upload = @project.thumbnails.new
	end

	def create
		project = Project.find_by(id: params[:project_id])
		thumbnail = project.thumbnails.create!(thumbnail_params)
		render json: thumbnail, status: 200
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
		params.require(:thumbnail).permit(:name, :image, :project_id)
	end
end
