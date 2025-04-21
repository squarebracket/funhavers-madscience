import Image from "next/image";
import PickData from '@/components/PickData';
import { munchData } from "@/lib/munchdata";
import TopPicks from "@/components/TopPicks";
import { MyChart } from '@/components/Chart';
import MostPicked from "@/components/MostPicked";
import TeamPreferences from "@/components/TeamPreferences";

export default function Home() {
  const data = munchData('mad-science-draft-2.vetos.json');
  console.log(data);
  const sortedAgentPicks = Object.keys(data.byAgent).sort((a, b) => {
    return data.byAgent[b].pick.total - data.byAgent[a].pick.total;
  });
  const sortedAgentBans = Object.keys(data.byAgent).sort((a, b) => {
    return data.byAgent[b].ban.total - data.byAgent[a].ban.total;
  });
  const topFivePicks = sortedAgentPicks.slice(0, 5).map((agent) => {
    return {
      agent: agent,
      data: data.byAgent[agent].pick
    }
  });
  const topFiveBans = sortedAgentBans.slice(0, 5).map((agent) => {
    return {
      agent: agent,
      data: data.byAgent[agent].ban
    }
  });



  return <div>
    <h1 className="text-center text-4xl pt-5 text-cyan-400">Agent Pick/Bans</h1>
    <div className="flex flex-row flex-1">
      <div>
        <div className="flex flex-row flex-1">
          <MostPicked type="pick" agent={sortedAgentPicks[0]} data={data.byAgent[sortedAgentPicks[0]].pick}></MostPicked>
          <MostPicked type="ban" agent={sortedAgentBans[0]} data={data.byAgent[sortedAgentBans[0]].ban}></MostPicked>
        </div>
        <div className="flex flex-row flex-1">
          <TopPicks data={topFivePicks} type="pick"></TopPicks>
          <TopPicks data={topFiveBans} type="ban"></TopPicks>
        </div>
      </div>
      <div>
        <TeamPreferences data={data}></TeamPreferences>
      </div>
    </div>
    <MyChart data={data}></MyChart>
  </div>

}
