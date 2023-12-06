class Percentage {
  /**
   * Adds `percent` to `value`.
   *
   * @example
   * 250 + 10% => 275
   */
  static add(percent: number, value: number): number {
    return value + (value * Percentage.multiplier(percent))
  }

  /**
   * Subtracts `percent` from `value`.
   *
   * @example
   * 250 - 10% => 225
   */
  static subtract(percent: number, value: number): number {
    return value - (value * Percentage.multiplier(percent))
  }

  /**
   * Normalizes and converts percentage to convenient multiplier (from 0 to 1).
   */
  static multiplier(percent: number): number {
    const normalizedPercent = Percentage.normalize(percent)

    return normalizedPercent / 100
  }

  /**
   * Makes the percent be not less than 0 nor less than 100.
   */
  static normalize(percent: number): number {
    if (percent < 0) percent = 0
    if (percent > 100) percent = 100

    return percent
  }

  /**
   * Finds percentage difference between `a` and `b`.
   */
  static difference(a: number, b: number): number {
    const max = Math.max(a, b)
    const min = Math.min(a, b)

    return (1 - (min / max)) * 100
  }
}

export default Percentage
