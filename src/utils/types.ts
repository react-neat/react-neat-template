import { ValueOf } from "type-fest"

export type URLType = `${"http" | "https"}://${string}`


export type URLData = `data:${string};${string}`
export type URLDataBase64 = `data:${string};base64,${string}`


export type OrderingType<U extends string> = U | `-${U}`

/**
 * https://stackoverflow.com/questions/50158272/what-is-the-type-of-an-enum-in-typescript
 */
export type EnumType<E> = Record<keyof E, number | string> & { [k: number]: string }
export type ExtractArrayType<T> = T extends readonly (infer S)[] ? S : never

export type RecordAny = Record<keyof never, unknown>

export type Mixed<T> = T | MixedMarker
export type MixedObject<T> = { [K in keyof T]: Mixed<T[K]> }
export type MixedMarker = { readonly MIXED: true }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NoInfer<T> = [T][T extends any ? 0 : never];


export type StringIncudes<T extends string, V extends string> = T extends (`${string}${V}${string}` & `${string}`) ? true : false

/**
 * Extracts `{variable}` from `string`.
 */
export type ExtractVariables<T extends string> = T extends `${string}{${infer V}}${infer Tail}` ? V | ExtractVariables<Tail> : never
export type ReplaceVariables<
  Input extends string,
  Variables extends Record<string, string | number>,
> =
  Input extends `${infer Head}{${keyof Variables extends string ? keyof Variables : never}}${infer Tail}` ?
  `${Head}${ValueOf<Variables>}${ReplaceVariables<Tail, Variables>}` :
  Input
