@videos.each do |video|
  json.set! video.id do
    json.extract! video, :id, :title, :description, :author_id
  end
end
