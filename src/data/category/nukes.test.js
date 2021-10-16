const nukes = require("./nukes")
// @ponicode
describe("getValue", () => {
    let inst

    beforeEach(() => {
        inst = new nukes.GENERIC_NUKE()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getValue()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getValue", () => {
    let inst

    beforeEach(() => {
        inst = new nukes.OUGI_ECHO()
    })

    test("0", () => {
        let callFunction = () => {
            inst.getValue()
        }
    
        expect(callFunction).not.toThrow()
    })
})
