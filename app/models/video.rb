# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  description :text             not null
#  author_id   :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
  belongs_to :author,
  foreign_key: :author_id,
  class_name: 'User'

  validates :title, presence: true
  validates :description, presence: true
end
