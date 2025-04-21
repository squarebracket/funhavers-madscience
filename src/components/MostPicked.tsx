import Box from './Box';
import { ordinal, titleCase } from '@/lib/utils';

type Props = {
  type: 'ban' | 'pick';
  agent: string;
  data: {[key: string]: number}
}

export default function MostPicked(props: Props) {
  const { agent, data, type } = props;
  const title = `Top ${titleCase(type)}`;
  const sorted = Object.keys(data).filter(key => key !== 'total').sort((a, b): number => {
    return data[b] - data[a];
  });
  return (
    <Box title={title}>
      <div className='text-lg'>{agent}: {data.total} {type}s</div>
      <div className='text-sm'><span className="font-bold">Peak:</span> {ordinal(sorted[0])} {type} ({data[sorted[0]]})</div>
    </Box>

  )
}