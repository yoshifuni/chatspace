class MessagesController < ApplicationController
  
  def index
    
    @messages = Message.new
  end
  
  def create
  end

  
end
