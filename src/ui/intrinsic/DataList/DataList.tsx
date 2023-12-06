import UnreachableCodeError from "@/shared/errors/UnreachableCodeError"
import { isRecord } from "@/utils/common"

import { DataListValues } from "./DataList.types"

interface DataListProps {
  id: string
  values: DataListValues
}

function DataList(props: DataListProps) {
  if (props.values instanceof Array) {
    return (
      <datalist id={props.id}>
        {props.values.map((value, index) => (
          <option value={value.toString()} key={index} />
        ))}
      </datalist>
    )
  }

  if (isRecord(props.values)) {
    return (
      <datalist id={props.id}>
        {Object.entries(props.values).map(([key, value], index) => (
          <option value={value.toString()} key={index}>{key}</option>
        ))}
      </datalist>
    )
  }

  throw new UnreachableCodeError
}

export default DataList
