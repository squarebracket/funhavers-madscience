import PickData from '@/components/PickData';
import Box from './Box';
import { titleCase } from '@/lib/utils';

type AgentData = {
  agent: string;
  data: any;
};

type props = {
  data: AgentData[];
  type: 'pick' | 'ban';
}

export default function TopPicks(props: props) {
  const title = `Top ${props.data.length} Agent ${titleCase(props.type)}s`;
  return (
    <Box title={title}>
      {props.data.map((agentData, idx) => {
        return (
          <div key={idx} className='py-2 [&:not(:last-child)]:border-b-1 border-stone-700'>
            <PickData key={idx} agentName={agentData.agent} rank={idx + 1} type={props.type} data={agentData.data} />
          </div>
        )
      })}
    </Box>
  )
}