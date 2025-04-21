import * as data from '../../mad-science-draft-2.vetos.json';
import { Agent, agents } from './agents';

type DraftState = {
  phase: number;
  agent: Agent;
  team: 'A' | 'B';
  action: 'pick' | 'ban';
};

type Draft = {
  _id: string;
  status: string;
  draft_data: {
    team_a: string;
    team_b: string;
    state: DraftState[];
  }
};

type ByTeam = {
  [key: string]: {
    pick: { [key: string]: number }
    ban: { [key: string]: number }
  }
}


type ByAgent = {
  [key: string]: {
    pick: { [key: number]: number; total: number }
    ban: { [key: number]: number; total: number }
  }
}

type ByAgentTeam = {
  [key: string]: {
    pick: { [key: string]: number }
    ban: { [key: string]: number }
  }
}

const phaseMapper = [1, 2, 1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 5, 6, 9, 10];

// @ts-ignore
const initialData: { [key in Agent]: 0 } = {};
agents.forEach((agent) => { initialData[agent] = 0 });

export function munchData(filename: string) {
  const byTeam: ByTeam = {}
  const byAgent: ByAgent = {};
  const byAgentTeam: ByAgentTeam = {};

  data.default.forEach(draft => {
    console.log(`draft ${draft._id}`);
    const teamA = draft.draft_data.team_a;
    const teamB = draft.draft_data.team_b;
    draft.draft_data.state.forEach(states => {
    // const states = draft.draft_data.state[0];
      states.forEach((state, idx) => {
        const team = state.team === 'A' ? teamA : teamB;

        if (byAgentTeam[state.agent] === undefined) {
          byAgentTeam[state.agent] = {
            pick: {},
            ban: {},
          };
        }

        if (byAgentTeam[state.agent][state.action.toLowerCase()][team] === undefined) {
          byAgentTeam[state.agent][state.action.toLowerCase()][team] = 0;
        }
        byAgentTeam[state.agent][state.action.toLowerCase()][team]++;

        if (!byTeam[team]) {
          byTeam[team] = {
            pick: {},
            ban: {},
          }
        }
        // @ts-ignore
        if (byTeam[team][state.action.toLowerCase()][state.agent] === undefined) {
          // @ts-ignore
          byTeam[team][state.action.toLowerCase()][state.agent] = 0;
        }
        // @ts-ignore
        byTeam[team][state.action.toLowerCase()][state.agent]++;

        if (byAgent[state.agent] === undefined) {
          // console.log(`init 1 ${state.agent}`)
          byAgent[state.agent] = {
            pick: {},
            ban: {},
          }
        }
        const number = phaseMapper[state.phase];
        if (number === undefined) {
          console.log('fuck');
        }
        if (byAgent[state.agent][state.action.toLowerCase()][number] === undefined) {
          // console.log(`init 2 ${state.agent} ${state.action.toLowerCase()} ${number}`);
          byAgent[state.agent][state.action.toLowerCase()][number] = 0;
        }
        if (state.agent === 'Sage') {
          console.log(state.agent, state.action.toLowerCase(), number, byAgent[state.agent][state.action.toLowerCase()][number])
        }
        byAgent[state.agent][state.action.toLowerCase()][number]++;
      });
    });
  });

  for (const agent in byAgent) {
    byAgent[agent].pick.total = Object.values(byAgent[agent].pick).reduce((a, b) => a + b);
    byAgent[agent].ban.total = Object.values(byAgent[agent].ban).reduce((a, b) => a + b);
    const idk = [];
    for (const team in byAgentTeam[agent].pick) {
      const a = byAgentTeam[agent].pick[team];
      if (!idk[a]) {
        idk[a] = [];
      }
      idk[a].push(team);
    }
    const idk2 = [];
    for (const team in byAgentTeam[agent].ban) {
      const a = byAgentTeam[agent].ban[team];
      if (!idk2[a]) {
        idk2[a] = [];
      }
      idk2[a].push(team);
    }
    byAgentTeam[agent].pick = idk;
    byAgentTeam[agent].ban = idk2;
  }

  return {
    byAgent,
    byTeam,
    byAgentTeam,
  };
}


export function munchData2(filename: string) {
  // @ts-ignore
  const bans: {
    [key in Agent]: {
      [key: number]: number
    }
  } = {};
  // @ts-ignore
  const picks: {
    [key in Agent]: {
      [key: number]: number
    }
  } = {};
  agents.forEach((agent) => {
    bans[agent] = {};
    picks[agent] = {};
  });


}