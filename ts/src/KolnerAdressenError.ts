
import { Context } from './Context'


class KolnerAdressenError extends Error {

  isKolnerAdressenError = true

  sdk = 'KolnerAdressen'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KolnerAdressenError
}

