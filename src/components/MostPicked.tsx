import Box from './Box';
import { ordinal, titleCase } from '@/lib/utils';

type Props = {
  type: 'ban' | 'pick';
  // agent: string;
  data: any;
}

export default function MostPicked(props: Props) {
  const { data, type } = props;
  const sortedAgents = Object.keys(data.byAgent).sort((a, b) => {
    return data.byAgent[b][type].total - data.byAgent[a][type].total;
  });
  const agent = sortedAgents[0];
  const agentData = data.byAgent[agent][type];
  const sorted = Object.keys(agentData).filter(key => key !== 'total').sort((a, b): number => {
    return data[b] - data[a];
  });
  const title = `Top ${titleCase(type)}`;
  return (
    <Box title={title}>
      <div className='text-lg'>{agent}: {agentData.total} {type}s</div>
      <div className='text-sm'><span className="font-bold">Peak:</span> {ordinal(sorted[0])} {type} ({agentData[sorted[0]]})</div>
    </Box>

  )
}