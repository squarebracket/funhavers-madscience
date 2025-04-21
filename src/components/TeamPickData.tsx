type Props = {
  rank: number,
  agent: string,
  teams: string,
  times: number,
}

export default function TeamPickData(props: Props) {
  const { rank, agent, teams, times } = props;
  return (
    <div className="flex justify-between py-1 [&:not(:last-child)]:border-b-1 border-stone-700">
      <div className="text-sm flex-grow mr-10">{agent}</div>
      <div className="text-sm flex-shrink">{teams} ({times})</div>
    </div>
  )
}