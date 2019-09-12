class PokemonsController < ApplicationController
    def index
        pokemon = Pokemon.all
        render json: pokemon, include: [:trainers]
        # byebug
    end

    def create
        trainer_id = params[:trainer_id]
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        new_pokemon = Pokemon.create(
            nickname: name, 
            species: species, 
            trainer_id: trainer_id
        )
        render json: new_pokemon
    end

    def destroy
        pokemon_id = params[:pokemon_id]
        deleted_pokemon = Pokemon.find(pokemon_id);
        Pokemon.destroy(pokemon_id);
        render json: deleted_pokemon
    end
end
