type TypesBiMap<A1 extends keyof never, A2 extends keyof never> = { [x in A1]: A2 } & { [x in A2]: A1 }

/**
 * This class represent keys and values swapping.
 *
 * ### Research
 * - https://www.google.com/search?q=bidirectional+map+js&oq=bidirectional+map+js&aqs=chrome..69i57.2532j0j7&sourceid=chrome&ie=UTF-8
 * - https://www.google.com/search?q=bilateral+mapping+npm
 * - https://startfunction.com/2020/11/26/bidirectional-map-javascript/#initialize
 * - https://startfunction.com/bidirectional-map-javascript/
 * - https://www.npmjs.com/package/bi-directional-map
 */
class BiMap<A1 extends keyof never = keyof never, A2 extends keyof never = keyof never> {
  protected forwardMap: Record<A1, A2>
  protected backwardMap: Record<A2, A1>

  constructor(map: Record<A1, A2>) {
    const mapKeys = Object.keys(map) as A1[]

    this.forwardMap = { ...map }
    this.backwardMap = mapKeys.reduce((result, key) => ({ ...result, [map[key]]: key }), {} as Record<A2, A1>)
  }

  public inverse<Key extends A1 | A2>(key: Key): TypesBiMap<A1, A2>[Key] {
    if (key in this.backwardMap) {
      const value: A1 = this.backwardMap[key as A2]
      return value as never
    }

    const value: A2 = this.forwardMap[key as A1]
    return value as never
  }

  public forward(key: A1): A2 {
    return this.forwardMap[key]
  }

  public backward(key: A2): A1 {
    return this.backwardMap[key]
  }
}

export default BiMap
