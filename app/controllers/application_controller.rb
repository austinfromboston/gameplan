class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  class PermissionDenied < StandardError; end

  protect_from_forgery with: :exception

  before_filter :require_login

  def require_login
    redirect_to new_session_path unless current_user
  end

  def require_admin_login
    raise PermissionDenied unless current_user && current_user.admin?
  end

  def current_user
    return unless session[:current_user_id]
    @current_user ||= User.find session[:current_user_id]
  end
  helper_method :current_user
end
