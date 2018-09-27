import Model from './Model.js'

class Api {
  get (uri, param) { throw `don't impolemented` }
  post (uri, param) { throw `don't impolemented` }
  put (uri, param) { throw `don't impolemented` }
  delete (uri) { throw `don't impolemented` }
}

class TestApi extends Api {
  constructor () {
    Model.init()
  }
  postMember (data) {
    
  }
}

class RestApi extends Api {

}

const api = new TestApi()

export default api;