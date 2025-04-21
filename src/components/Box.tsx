type Props = {
  title: string;
  children: React.ReactNode,
  width?: string | number,
}

export default function TopPicks(props: Props) {
  const style = props.width ? {width: props.width} : undefined
  return <div className="m-4 p-2 flex-col flex-1 flex-shrink bg-stone-900" style={style}>
    <div className='title'>{props.title}</div>
    {props.children}
  </div>
}