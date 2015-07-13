//= require sinon
//= require application

Spec = {
  render: function(template) {
    return React.addons.TestUtils.renderIntoDocument(template);
  },

  stubServer: function() {
    beforeEach(function() {
      this.xhr = sinon.useFakeXMLHttpRequest();
      var requests = this.requests = [];

      this.xhr.onCreate = function(xhr) {
        requests.push(xhr);
      };
    });


    afterEach(function() {
      this.xhr.restore();
    });

  }
}
