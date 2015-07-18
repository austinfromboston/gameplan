FROM ubuntu:14.04

RUN echo start \
  && apt-get update \
  && apt-get -y install build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev wget
RUN wget http://ftp.ruby-lang.org/pub/ruby/2.2/ruby-2.2.2.tar.gz \
  && tar -xvzf ruby-2.2.2.tar.gz \
  && cd ruby-2.2.2 \
  && ./configure --prefix=/usr/local \
  && make \
  && make install


RUN wget http://production.cf.rubygems.org/rubygems/rubygems-2.4.8.tgz \
  && tar xfz rubygems-2.4.8.tgz \
  && cd rubygems-2.4.8 \
  && ruby setup.rb \
  && cd .. \
  && gem install bundler

RUN apt-get -y install libpq-dev nodejs git libsqlite3-dev

RUN mkdir /var/myapp
ADD Gemfile /var/myapp/Gemfile

RUN cd /var/myapp && bundle install
