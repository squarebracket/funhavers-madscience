import PickData from '@/components/PickData';
import Box from './Box';
import { titleCase } from '@/lib/utils';

type AgentData = {
  agent: string;
  data: any;
};

type props = {
  data: any;
  type: 'pick' | 'ban';
  amount: number;
}

export default function TopPicks(props: props) {
  const { amount, data, type } = props;
  const title = `Top ${amount} Agent ${titleCase(type)}s`;
  const sortedAgents = Object.keys(data.byAgent).sort((a, b) => {
    return data.byAgent[b][type].total - data.byAgent[a][type].total;
  });
  const top = sortedAgents.slice(0, amount).map((agent) => {
    return {
      agent: agent,
      data: data.byAgent[agent][type]
    }
  });
  return (
    <Box title={title} style={{ minWidth: '250px' }}>
      {top.map((agentData, idx) => {
        return (
          <div key={idx} className='py-2 [&:not(:last-child)]:border-b-1 border-stone-700'>
            <PickData key={idx} agentName={agentData.agent} rank={idx + 1} type={props.type} data={agentData.data} />
          </div>
        )
      })}
    </Box>
  )
}