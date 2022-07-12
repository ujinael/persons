
export const serializers = {
  bigint: (b: bigint) => b.toString(),
  undefined: (u: undefined) => 'undefined',
  function:(f:Function)=>f.toString(),
  string: (s: string) => `\'${s}\'`,
  number: (n: number) => n.toString(),
  boolean: (b: boolean) => b + '',
  symbol:(s:Symbol)=>s.toString(),
  object: (o:any) => {
    if (Array.isArray(o)) return `[${o}]`
    if (o === null) return 'null'
    let s = '{'
    
    for (const key in o) {
      const value = o[key]
      if (s.length > 1) s += ', '
      s += key + ':' + serialize(value)
    }
    const symbols = Object.getOwnPropertySymbols(o)
    for (const symbol of symbols) {
      const value = o[symbol]
      if (s.length > 1) s += ', '
      s += symbol.toString() + ':' + serialize(value)
    }
return s + '}'
  }
}

export const serialize = (obj: any) => {
  const type = typeof obj
  const serializer:(o:any)=>string = serializers[type]
  return serializer(obj)
}