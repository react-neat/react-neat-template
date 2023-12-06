class UnreachableCodeError extends Error {
  constructor() {
    super("This code can't be reached, probably something is breaking rules.")

    this.name = UnreachableCodeError.name
  }
}

export default UnreachableCodeError
