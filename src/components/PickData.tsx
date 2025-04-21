import { ordinal } from '@/lib/utils';

type Props = {
  rank: number;
  agentName: string;
  data: {[key: number]: number} & {total: number};
  type: 'pick' | 'ban'
}

export default function PickData(props: Props) {
  const { rank, agentName, data, type } = props;
  const sorted = Object.keys(data).filter(key => key !== 'total').sort((a, b): number => {
    // @ts-ignore
    return data[b] - data[a];
  });
  return <div>
    <div className="flex justify-between">
      <div className="text-lg text-cyan-400">{rank}. {props.agentName}</div>
      <div className="text-lg text-cyan-400 text-right">{data.total}</div>
    </div>
    {/*// @ts-ignore */}
    <div className='text-sm'><span className="font-bold">Peak:</span> {ordinal(sorted[0])} {type} ({data[sorted[0]]})</div>
    {/*// @ts-ignore */}
    <div className='text-xs text-stone-500'>{sorted.map(idx => `${ordinal(idx)} ${type}: ${data[idx]}`).join(' - ')}</div>
  </div>
}