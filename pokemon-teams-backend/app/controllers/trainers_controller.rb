class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers, include: [:pokemon]
        # byebug
    end
end
