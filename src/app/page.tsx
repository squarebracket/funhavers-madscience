import { munchData } from "@/lib/munchdata";
import TopPicks from "@/components/TopPicks";
import { MyChart } from '@/components/Chart';
import MostPicked from "@/components/MostPicked";
import TeamPick from '@/components/TeamPick';

export default function Home() {
  const data = munchData('mad-science-draft-2.vetos.json');

  return <div>
    <h1 className="text-center text-4xl pt-5 text-cyan-400">Agent Pick/Bans</h1>
    <div className="flex flex-row flex-1">
      <div>
        <div className="flex flex-row flex-1">
          <MostPicked type="ban" data={data}></MostPicked>
          <MostPicked type="pick" data={data}></MostPicked>
        </div>
        <div className="flex flex-row flex-1">
          <TopPicks data={data} type="ban" amount={5}></TopPicks>
          <TopPicks data={data} type="pick" amount={5}></TopPicks>
        </div>
      </div>
      <div style={{ minWidth: '250px' }}>
        <TeamPick type="ban" data={data} amount={5}></TeamPick>
        <TeamPick type="pick" data={data} amount={5}></TeamPick>
      </div>
    </div>
    <MyChart data={data}></MyChart>
  </div>

}
