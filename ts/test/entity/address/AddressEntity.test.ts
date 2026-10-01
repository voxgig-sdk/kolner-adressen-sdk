

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KolnerAdressenSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('AddressEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KOLNER_ADRESSEN_TEST_LIVE=TRUE.
  afterEach(liveDelay('KOLNER_ADRESSEN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KolnerAdressenSDK.test()
    const ent = testsdk.Address()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KOLNER_ADRESSEN_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'address.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Resource description","t":"`$STRING`","key$":"description","index$":0},"format":{"a":true,"h":"Format","n":"format","r":false,"sh":"Data format","t":"`$STRING`","key$":"format","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Resource identifier","t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Resource name","t":"`$STRING`","key$":"name","index$":3},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"Resource download or access URL","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"address","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /dataset/adressen-k%C3%B6ln","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"html","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/dataset/adressen-k%C3%B6ln","q":{"exist":["format"]},"r":{},"s":[{"lit":"dataset"},{"lit":"adressen-k%C3%B6ln"}],"t":{"req":"`reqdata`","res":"`body.resources`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"address","name__orig":"address","Name":"Address","name_":"address","name-":"address","NAME":"ADDRESS","index$":0}, {"active":true,"entity":"address","key$":"BasicAddressFlow","kind":"basic","name":"BasicAddressFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"address_ref01"}}],"index$":0}]}, 'Address', {"GET /dataset/adressen-k%C3%B6ln":{"protocol":"http","parameters":[{"name":"format","in":"query","description":"Format of the response","required":false,"schema":{"type":"string","enum":["html","json","rdf","dcat-ap"],"default":"html"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let address_ref01_data = Object.values(setup.data.existing.address)[0] as any

    // LIST
    const address_ref01_ent = client.Address()
    const address_ref01_match: any = {}

    const address_ref01_list = (await address_ref01_ent.list(address_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/address/AddressTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = KolnerAdressenSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['address01','address02','address03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KOLNER_ADRESSEN_TEST_ADDRESS_ENTID': idmap,
    'KOLNER_ADRESSEN_TEST_LIVE': 'FALSE',
    'KOLNER_ADRESSEN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KOLNER_ADRESSEN_TEST_ADDRESS_ENTID']

  const live = 'TRUE' === env.KOLNER_ADRESSEN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KOLNER_ADRESSEN_TEST_ADDRESS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new KolnerAdressenSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.KOLNER_ADRESSEN_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
