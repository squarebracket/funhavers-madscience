import { CSSProperties } from "react";

type Props = {
  title: string;
  children: React.ReactNode,
  style?: CSSProperties,
}

export default function TopPicks(props: Props) {
  const style = props.style ? props.style : {};
  return <div className="m-4 p-4 flex-col flex-1 flex-shrink bg-stone-900" style={style}>
    <div className='title'>{props.title}</div>
    {props.children}
  </div>
}