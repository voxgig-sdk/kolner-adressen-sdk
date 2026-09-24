
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KolnerAdressenSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = KolnerAdressenSDK.test()
    equal(testsdk instanceof KolnerAdressenSDK, true,
      'KolnerAdressenSDK.test() must return a client synchronously')
  })

})
