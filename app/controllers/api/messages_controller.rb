class Api::MessagesController < ApplicationController
  def index
    # @group = Group.find(params[:group_id]) 
    @messages = Message.includes(:user).where('id > ? and group_id = ?', params[:last_id], params[:group_id])  
  end
  
end