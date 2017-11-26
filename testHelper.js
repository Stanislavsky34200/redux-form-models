import chai from 'chai'
import deepEqual from 'chai-shallow-deep-equal'
import sinonChai from 'sinon-chai'
import sinon from 'sinon'


chai.use(deepEqual)
chai.use(sinonChai)

global.chai = chai
global.sinon = sinon

global.assert = chai.assert
global.expect = chai.expect
