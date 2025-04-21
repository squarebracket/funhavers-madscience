import Box from '@/components/Box';
import TeamPick from '@/components/TeamPick';

type Props = {
  data: any;
}

export default function TeamPreferences(props: Props) {
  const { data } = props;
  const sortedA = Object.keys(data.byAgentTeam).sort((a, b) => {
    return data.byAgentTeam[b].pick.length - data.byAgentTeam[a].pick.length;
  });
  console.log(sortedA, data.byAgentTeam['Yoru']);
  const sortedB = Object.keys(data.byAgentTeam).sort((a, b) => {
    return data.byAgentTeam[b].ban.length - data.byAgentTeam[a].ban.length;
  });
  console.log(sortedB, data.byAgentTeam['Fade']);

  return (
    <Box title='Team Preferences'>
      <TeamPick type="pick" data={data} amount={5}></TeamPick>
      <TeamPick type="ban" data={data} amount={5}></TeamPick>
    </Box>
  )
}