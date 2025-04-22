import { titleCase } from "@/lib/utils";
import TeamPickData from "./TeamPickData";
import Box from '@/components/Box';

type Props = {
  type: 'pick' | 'ban',
  data: any,
  amount: number,
}

export default function TeamPick(props: Props) {
  const { amount, data, type } = props;
  const sortedA = Object.keys(data.byAgentTeam).sort((a, b) => {
    return data.byAgentTeam[b][type].length - data.byAgentTeam[a][type].length;
  });
  const title = `Agent ${titleCase(type)}s By Team`;
  return (
    <Box title={title}>
      {sortedA.slice(0, amount).map((agent, idx) => {
        return (
          <TeamPickData key={idx} rank={idx + 1} agent={agent} teams={data.byAgentTeam[agent][type][data.byAgentTeam[agent][type].length - 1].join(', ')} times={data.byAgentTeam[agent][type].length - 1}></TeamPickData>
        )
      })}
    </Box>
  )
}