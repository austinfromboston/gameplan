FROM gameplan-bundle

RUN apt-get -y install build-essential openssl libssl-dev pkg-config python2.7
RUN apt-get -y remove nodejs
RUN wget http://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz
RUN tar xfz node-v0.12.7.tar.gz && ln -s /usr/bin/python2.7 /usr/bin/python
RUN cd node-v0.12.7 && ./configure && make && make install
RUN node --version
RUN which node
RUN rm -rf node-v0.12.7 node-v0.12.7.tar.gz

RUN mkdir /tmp/bundled
RUN cp /var/myapp/* /tmp/bundled/
ADD . /var/myapp
WORKDIR /var/myapp
RUN cp /tmp/bundled/* /var/myapp/
RUN bundle exec rake assets:precompile

CMD ["/bin/bash", "container_friendly_start"]
