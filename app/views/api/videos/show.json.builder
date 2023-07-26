json.set! @video.id do
  json.extract! @video, :id, :title, :description, :author_id, :created_at, :updated_at
end
