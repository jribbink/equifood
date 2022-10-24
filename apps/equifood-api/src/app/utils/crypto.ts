import { createHash } from "crypto";

export function hashPassword(password: string, salt: string) {
  return createHash("sha512").update(`${salt}${password}`).digest().toString("hex")
}
