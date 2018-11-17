const $s = require('scriptjs')
const googleAuth = (function () {

  const installClient = () => new Promise(resolve => $s('/js/google.api.js', resolve))

  function initClient (config) {
    return new Promise(resolve => {
      window.gapi.load('client:auth2', async () => {
        await window.gapi.auth2.init(config)
        resolve(window.gapi.auth2.getAuthInstance())
      })
    })
  }
  return {
    GoogleAuthInstance: null,
    isLoaded () {
      return !!this.GoogleAuthInstance
    },
    async load (config) {
      await installClient()
      const instance = await initClient(config)
      this.GoogleAuthInstance = instance
    },
    
    signIn (successCallback, errorCallback) {
      return new Promise(async (resolve, reject) => {
        if (!this.GoogleAuthInstance) {
          if (typeof errorCallback === 'function') errorCallback(false)
          reject(false)
          return
        }
        try {
          const googleUser = await this.GoogleAuthInstance.signIn()
          if (typeof successCallback === 'function') successCallback(googleUser)
          resolve(googleUser)
        } catch (e) {
          if (typeof errorCallback === 'function') errorCallback(e)
          reject(e)
        }
      })
    },
    signOut (successCallback, errorCallback) {
      return new Promise(async (resolve, reject) => {
        if (!this.GoogleAuthInstance) {
          if (typeof errorCallback === 'function') errorCallback(false)
          reject(false)
          return
        }
        await this.GoogleAuthInstance.signOut()
        try {
          if (typeof successCallback === 'function') successCallback()
          resolve()
        } catch(e) {
          if (typeof errorCallback === 'function') errorCallback(e)
          reject(e)
        }
      })
    }
  }
})();
  
function installGoogleAuthPlugin (Vue, options) {
  //set config
  let GoogleAuthConfig = null
  const GoogleAuthDefaultConfig = {
    scope: 'profile email https://www.googleapis.com/auth/plus.login',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }
  if (typeof options === 'object') {
    GoogleAuthConfig = Object.assign(GoogleAuthDefaultConfig, options)
    if (!options.clientId) {
      /* eslint-disable */
      console.warn('clientId is required')
    }
  }else{
    console.warn('invalid option type. Object type accepted only')
  }
  
  //Install Vue plugin
  Vue.gAuth = googleAuth
  Object.defineProperties(Vue.prototype, {
    $gAuth: {
      get: () =>Vue.gAuth
    }
  })
  Vue.gAuth.load(GoogleAuthConfig)
}

export default installGoogleAuthPlugin