const expect    = require("chai").expect
const getExtension = require('./path')

describe('Server', () => {
  describe('#getExtension', () => {

    it("should return '' when the file does\'nt have any extension", () => {
      expect(getExtension('frfetgr')).to.equal('')
    })


    it('should return .extension when the file has an extension', () => {
      expect(getExtension('frfetgr.js')).to.equal('.js')
    })
  })

})
