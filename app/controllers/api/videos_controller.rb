class Api::VideosController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]
  def index
    @videos = Video.all
    render :index
  end

  def show
    @video = Video.find(params[:id])
    render :show
  end

  def create
    @video = current_user.videos.new(video_params)

    if @video.save
      # render json: { "video has been created": @video }, status: :created
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @video = current_user.videos.find(params[:id])

    if @video.update(video_params)
      render :show
    else
      render json: { errors: @video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @video = current_user.videos.find(params[:id])
    @video.delete
    render :show
  end

  private

  def video_params
    params.require(:video).permit(:title, :description)
  end


end
