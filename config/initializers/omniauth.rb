Rails.application.config.middleware.use OmniAuth::Builder do
  if ENV['GOOGLE_OAUTH2_CLIENT_ID'].present?
    provider :google_oauth2, ENV['GOOGLE_OAUTH2_CLIENT_ID'], ENV['GOOGLE_OAUTH2_CLIENT_SECRET'], {
                             scope: 'userinfo.email, userinfo.profile',
                             hd: ENV['GOOGLE_OAUTH2_REQUIRED_DOMAIN'],
                             access_type: 'offline'}
  else
    provider :developer
  end
end
