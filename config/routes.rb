Rails.application.routes.draw do
  
  resources :users, only: [:show]
  resources :projects, only: [:index, :show], controller: "project_views"
  
  scope '/api' do
  	resources :clients, only: [:index] do
  		resources :projects, except: [:new, :edit]
  	end
  end



  
end
