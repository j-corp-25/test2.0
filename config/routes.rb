Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resources :videos
    resource :session, only: [:create, :show, :destroy]
  end

  # post 'api/test', to: 'application#test'
end
