// import { APISchemas } from "@/api/data"
import { User, UserRole } from "@/store/reducers/user/types"
import BiMap from "@/utils/tools/bimap"


export function mapUser(schema: any): User {
  return {
    id: schema._id as unknown as string,

    // id: schema.id,

    avatar: schema.avatar,
    email: schema.username ?? "",
    firstName: "1-",
    lastName: "-3",

    // email: schema.email,
    // level: schema.rank,

    // createdAt: new Date(schema.date_of_creation),

    type: userTypeBiMap.inverse(schema.role),
    signed: schema.verified
  }
}

export const userTypeBiMap = new BiMap<string, UserRole>({
  "superAdmin": UserRole.SuperAdmin,
  "streamAdmin": UserRole.StreamAdmin,
  "manager": UserRole.Manager,
  "user": UserRole.User
})
