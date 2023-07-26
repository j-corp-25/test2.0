# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ActiveRecord::Base.transaction do
  puts "Destroying tables..."

  User.destroy_all

  puts "Resetting primary keys..."

  ActiveRecord::Base.connection.reset_pk_sequence!("users")

  puts "Creating users..."

  User.create!(
    username: 'Demo-lition',
    email: 'demo@user.io',
    password: 'password',
    first_name: 'Demo',
    last_name: 'User'
  )

  # More users
  10.times do
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    })
  end
  
  puts "Done!"
end
