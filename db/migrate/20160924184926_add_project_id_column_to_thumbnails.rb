class AddProjectIdColumnToThumbnails < ActiveRecord::Migration[5.0]
  def change
    add_column :thumbnails, :project_id, :integer
  end
end
