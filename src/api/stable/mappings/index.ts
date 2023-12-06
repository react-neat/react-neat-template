import { mapUser } from "./user"

import { APIDocsSwagger } from "../APIStable"


interface BiMapInverse {
  inverse<A1, A2>(value: A1): A2
}

type SwaggerSchemas = typeof APIDocsSwagger["schemas"]

type SchemaMappings = {
  [K in keyof SwaggerSchemas]?:
  | ((plain: SwaggerSchemas[K]["_plain"], schema: SwaggerSchemas[K]["schema"]) => unknown)
  | BiMapInverse
}

const mappings: SchemaMappings = {
  User: mapUser,
}

export default mappings
