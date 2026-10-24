

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { KolnerAdressenSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('DatastoreSearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when KOLNER_ADRESSEN_TEST_LIVE=TRUE.
  afterEach(liveDelay('KOLNER_ADRESSEN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = KolnerAdressenSDK.test()
    const ent = testsdk.DatastoreSearch()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = KolnerAdressenSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DatastoreSearch().load({"field":1,"resource_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.KOLNER_ADRESSEN_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'datastore_search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"Number of records returned per page","t":"`$INTEGER`","key$":"limit","index$":0},"offset":{"a":true,"h":"Offset","n":"offset","r":false,"sh":"Current offset for pagination","t":"`$INTEGER`","key$":"offset","index$":1},"records":{"a":true,"h":"Records","n":"records","r":false,"sh":"Array of address records","t":"`$ARRAY`","key$":"records","index$":2},"total":{"a":true,"h":"Total","n":"total","r":false,"sh":"Total number of records matching the query","t":"`$INTEGER`","key$":"total","index$":3}},"name":"datastore_search","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/3/action/datastore_search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"filter","or":"filters","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":"c2f2e522-00c5-4c0c-9168-d60e716020a3","k":"query","n":"resource_id","or":"resource_id","r":true,"t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/api/3/action/datastore_search","q":{"exist":["resource_id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"3"},{"lit":"action"},{"lit":"datastore_search"}],"t":{"req":"`reqdata`","res":"`body.result`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"datastore_search","name__orig":"datastore_search","Name":"DatastoreSearch","name_":"datastore_search","name-":"datastore-search","NAME":"DATASTORE_SEARCH","index$":1}, {"active":true,"entity":"datastore_search","key$":"BasicDatastoreSearchFlow","kind":"basic","name":"BasicDatastoreSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"datastore_search_ref01","srcdatavar":"datastore_search_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-datastore_search_ref01"}}],"index$":0}]}, 'DatastoreSearch', {"GET /api/3/action/datastore_search":{"protocol":"http","parameters":[{"name":"resource_id","in":"query","description":"Resource ID for the addresses dataset","required":true,"schema":{"type":"string","example":"c2f2e522-00c5-4c0c-9168-d60e716020a3"},"index$":0},{"name":"limit","in":"query","description":"Maximum number of results to return","required":false,"schema":{"type":"integer","default":100,"minimum":1,"maximum":1000},"index$":1},{"name":"offset","in":"query","description":"Offset for pagination","required":false,"schema":{"type":"integer","default":0,"minimum":0},"index$":2},{"name":"q","in":"query","description":"Search query string","required":false,"schema":{"type":"string"},"index$":3},{"name":"filters","in":"query","description":"JSON string of field filters","required":false,"schema":{"type":"string"},"index$":4},{"name":"fields","in":"query","description":"Comma-separated list of fields to return","required":false,"schema":{"type":"string"},"index$":5}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let datastore_search_ref01_data = Object.values(setup.data.existing.datastore_search)[0] as any

    // LOAD
    const datastore_search_ref01_ent = client.DatastoreSearch()
    const datastore_search_ref01_match_dt0: any = {}
    const datastore_search_ref01_data_dt0 = (await datastore_search_ref01_ent.load(datastore_search_ref01_match_dt0)).data()
    assert(null != datastore_search_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/datastore_search/DatastoreSearchTestData.json')

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
    ['datastore_search01','datastore_search02','datastore_search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID': idmap,
    'KOLNER_ADRESSEN_TEST_LIVE': 'FALSE',
    'KOLNER_ADRESSEN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID']

  const live = 'TRUE' === env.KOLNER_ADRESSEN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['KOLNER_ADRESSEN_TEST_DATASTORE_SEARCH_ENTID']
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
  
