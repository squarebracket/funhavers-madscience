import data from '../../mad-science-draft-2.vetos.json';
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
  const byAgent: ByAgent = {};
  const byAgentTeam: ByAgentTeam = {};

  data.forEach(draft => {
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

        // @ts-ignore
        if (byAgentTeam[state.agent][state.action.toLowerCase()][team] === undefined) {
          // @ts-ignore
          byAgentTeam[state.agent][state.action.toLowerCase()][team] = 0;
        }
        // @ts-ignore
        byAgentTeam[state.agent][state.action.toLowerCase()][team]++;

        if (byAgent[state.agent] === undefined) {
          byAgent[state.agent] = {
            // @ts-ignore
            pick: {},
            // @ts-ignore
            ban: {},
          }
        }
        const number = phaseMapper[state.phase];
        if (number === undefined) {
        }
        // @ts-ignore
        if (byAgent[state.agent][state.action.toLowerCase()][number] === undefined) {
          // @ts-ignore
          byAgent[state.agent][state.action.toLowerCase()][number] = 0;
        }
        // @ts-ignore
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
      // @ts-ignore
      idk[a].push(team);
    }
    const idk2 = [];
    for (const team in byAgentTeam[agent].ban) {
      const a = byAgentTeam[agent].ban[team];
      if (!idk2[a]) {
        idk2[a] = [];
      }
      // @ts-ignore
      idk2[a].push(team);
    }
    // @ts-ignore
    byAgentTeam[agent].pick = idk;
    // @ts-ignore
    byAgentTeam[agent].ban = idk2;
  }

  return {
    byAgent,
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