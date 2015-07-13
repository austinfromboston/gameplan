class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :require_login
  layout 'basic'

  def create
    @current_user = User.find_or_create_from_auth_hash!(auth_hash)
    session[:current_user_id] = @current_user.to_param
    redirect_to session.delete(:redirect_to) || root_path
  rescue ActiveRecord::RecordInvalid
    render text: "Unable to find or create user"
  end

  def destroy
    session[:current_user_id] = nil
    @current_user = nil
    redirect_to new_session_path
  end
  protected

  def auth_hash
    request.env["omniauth.auth"][:info].to_h.symbolize_keys
  end
end
