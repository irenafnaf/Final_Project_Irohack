class CommentController < ApplicationController
	def index
		project = Project.find_by(id: params[:project_id])
		client = Client.find_by(id: params[:id])
		comment = Comment.find_by(id: params[:id])
		# project.comments.all
	end

	def create
		comment = Comment.create(comment_params)
		render json: comment
	end


	def destroy
		comment = Comment.find_by(id: params[:id])

		if comment.destroy
			render json: comment
		else
			rendor json: {error: "Comment Not Found"},
			status: 404
		end
	end

	private

	def comment_params
		params.require(:comment).permit(:body, :commentable_id, :commentable_type)
	end


end
