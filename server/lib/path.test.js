const assert = require('chai').assert
const getExtension = require('./path')

describe('Server', () => {
  describe('#getExtension', () => {
    it(`should return '' when the file does'nt have any extension`, () => {
      assert(getExtension('frfetgr'), -1, 'hello')
    })

    it('should return .extension when the file has an extension', () => {
      assert(getExtension('frfetgr.js'), '.js', 'hello')
    })
  })
})
