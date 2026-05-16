
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { KolnerAdressenSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await KolnerAdressenSDK.test()
    equal(null !== testsdk, true)
  })

})
