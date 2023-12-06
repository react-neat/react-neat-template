import "./Loader.scss"

import { classMerge } from "@/utils/bem"

interface LoaderProps {
  className?: string
}

function Loader(props: LoaderProps) {
  return (
    <div className={classMerge("loader", props.className)} />
  )
}

export default Loader
