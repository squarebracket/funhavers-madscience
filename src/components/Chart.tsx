'use client';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { ordinal } from '@/lib/utils';
import Box from './Box';



export const MyChart = (props: any) => {
  const data = props.data;

  const [showLabels, setShowLabels] = useState(false);

  const agents = Object.keys(data.byAgent);
  const sortedAgents = Object.keys(data.byAgent).sort((a, b) => {
    return (data.byAgent[b].pick.total + data.byAgent[b].ban.total) - (data.byAgent[a].pick.total + data.byAgent[a].ban.total);
  });
  const picks: { [key: string]: number[] } = {};
  const bans: { [key: string]: number[] } = {};
  const pickColors = ['#F74848', '#F77041', '#F7973B', '#F7BF34', '#F7E62D', '#D7E03F', '#B7DA50', '#97D362', '#77CD73', '#57C785'];
  const banColors = ['#F74848', '#F7973B', '#F7E62D', '#C2DC4A', '#8CD168', '#57C785'];
  for (let agent of sortedAgents) {
    const p = data.byAgent[agent].pick;
    const b = data.byAgent[agent].ban;
    for (let i = 1; i <= 10; i++) {
      if (!picks[`${ordinal(i)} pick`]) {
        picks[`${ordinal(i)} pick`] = [];
      }
      picks[`${ordinal(i)} pick`].push(p[i] ?? 0)
    }
    for (let i = 1; i <= 6; i++) {
      if (!bans[`${ordinal(i)} ban`]) {
        bans[`${ordinal(i)} ban`] = [];
      }
      bans[`${ordinal(i)} ban`].push(b[i] ? -1 * b[i] : 0)
    }
    // console.log('b', Object.keys(p).filter(key => key !== 'total'))
    // for (let n of Object.keys(p).filter(key => key !== 'total')) {
    //   console.log('c', n)
    //   if (!picks[`${n}th pick`]) {
    //     picks[`${n}th pick`] = [];
    //   }
    //   picks[`${n}th pick`].push(p[n]);
    // }
    // for (let n in Object.keys(b).filter(key => key !== 'total')) {
    //   if (!bans[`${n}th ban`]) {
    //     bans[`${n}th ban`] = [];
    //   }
    //   picks[`${n}th ban`].push(p[n]);
    // }
  }
  const picksSeries = Object.keys(picks).map((p, idx) => {
    return {
      name: p,
      data: picks[p],
      color: pickColors[idx],
    }
  });
  const bansSeries = Object.keys(bans).map((b, idx) => {
    return {
      name: b,
      data: bans[b],
      color: banColors[idx],
    }
  });
  const series = picksSeries.concat(bansSeries);
  const options: ApexCharts.ApexOptions = {
    chart: {
      background: 'transparent',
      type: 'bar',
      height: '400px',
      width: '400px',
      stacked: true
    },
    // colors: ['#008FFB', '#FF4560'],
    // colors: ['#57C785', '#8CD168', '#C2DC4A', '#F7E62D', '#F7973B', '#F74848', '#F74848', '#F77041', '#F7973B', '#F7BF34', '#F7E62D', '#D7E03F', '#B7DA50', '#97D362', '#77CD73', '#57C785'],
    // colors: ['#F74848', '#F77041', '#F7973B', '#F7BF34', '#F7E62D', '#D7E03F', '#B7DA50', '#97D362', '#77CD73', '#57C785'],
    // colors: ['#F74848', '#F7973B', '#F7E62D', '#C2DC4A', '#8CD168', '#57C785', '#F74848', '#F77041', '#F7973B', '#F7BF34', '#F7E62D', '#D7E03F', '#B7DA50', '#97D362', '#77CD73', '#57C785'],
    // colors: ['#F74848', '#F7973B', '#F7E62D', '#C2DC4A', '#8CD168', '#57C785', '#57C785', '#57C785', '#57C785', '#57C785'],
    plotOptions: {
      bar: {
        // borderRadius: 5,
        // borderRadiusApplication: 'end', // 'around', 'end'
        // borderRadiusWhenStacked: 'all', // 'all', 'last'
        horizontal: true,
        barHeight: '80%',
        columnWidth: '50%',
        dataLabels: {
          hideOverflowingLabels: true,
          total: {
            enabled: false,
            offsetX: 5,
          }
        }
      },
    },
    dataLabels: {
      formatter: (val, opts) => {
        // @ts-ignore
        const abs = Math.abs(parseInt(val));
        return abs > 3 ? abs : '';
      },
      enabled: showLabels,
    },
    // stroke: {
    //   width: 1,
    //   colors: ["#fff"]
    // },

    grid: {
      xaxis: {
        lines: {
          show: true,
        }
      },
      yaxis: {
        lines: {
          show: false,
        }
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      // stepSize: 1
    },
    annotations: {
      xaxis: [{
        x: 0,
        label: {
          borderWidth: 0,
          orientation: 'horizontal',
          text: "< bans picks >",
          offsetY: -10,
          style: {
            background: 'transparent',
          }
        }
      }]
    },
    legend: {
      show: false,
    },
    theme: {
      mode: 'dark',
    },
    tooltip: {
      theme: 'dark',
      shared: false,
      x: {
        formatter: function (val) {
          return val.toString();
        }
      },
      y: {
        formatter: function (val) {
          return Math.abs(val).toString();
        }
      }
    },
    xaxis: {
      categories: sortedAgents,
      labels: {
        formatter: function (val) {
          return Math.abs(parseInt(val)).toString();
        }
      }
    },
  };


  return (
    <Box title='Picks/Bans Graph' width="80%">
      <div>
        <div id="chart">
          <div className='text-center'><button className='bg-cyan-600 rounded hover:bg-cyan-400 p-1' onClick={() => setShowLabels(!showLabels)}>Toggle Data Labels</button></div>
          <ReactApexChart options={options} series={series} type="bar" height={600} width="100%" />
          
        </div>
        <div id="html-dist"></div>
      </div>
    </Box>
  );
}