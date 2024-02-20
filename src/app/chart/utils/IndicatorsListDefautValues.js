const IndicatorsListValues = [
  {
    name: "RSI",
    fullName: "Relative Strength Index",
    pane: 1,
    params: {
      name: "Relative Strength Index",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "blue",
        data: [],
      },
    ],
  },
  {
    name: "SMA",
    fullName: "Simple Moving Average",
    pane: 0,
    params: {
      name: "Simple Moving Average",
      kwargs: { timeperiod: 10 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 10,
        type: "line",
        color: "black",
        data: [],
      },
    ],
  },
  {
    name: "EMA",
    fullName: "Exponential Moving Average",
    pane: 1,
    params: {
      name: "Exponential Moving Average",
      kwargs: { timeperiod: 50 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 50,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "MACD",
    fullName: "Moving Average Convergence Divergence",
    pane: 1,
    params: {
      name: "Moving Average Convergence Divergence",
      kwargs: { fastperiod: 12, slowperiod: 26, signalperiod: 9 },
    },
    lines: [
      {
        name: "fastperiod",
        arg: 12,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "slowperiod",
        arg: 26,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "signalperiod",
        arg: 9,
        type: "line",
        color: "red",
        data: [],
        type: "histogram",
      },
    ],
  },
  {
    name: "ATR",
    fullName: "Average True Range",
    pane: 1,
    params: {
      name: "Average True Range",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "ADX",
    fullName: "Average Directional Movement Index",
    pane: 1,
    params: {
      name: "Average Directional Movement Index",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "BBANDS",
    fullName: "Bollinger Bands",
    pane: 1,
    params: {
      name: "Bollinger Bands",
      kwargs: { timeperiod: 20, nbdevup: 2, nbdevdn: 2 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 20,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "nbdevup",
        arg: 2,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "nbdevdn",
        arg: 2,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "CCI",
    fullName: "Commodity Channel Index",
    pane: 1,
    params: {
      name: "Commodity Channel Index",
      kwargs: { timeperiod: 20 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 20,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "STOCH",
    fullName: "Stochastic Oscillator",
    pane: 1,
    params: {
      name: "Stochastic Oscillator",
      kwargs: { fastk_period: 14, slowk_period: 3, slowd_period: 3 },
    },
    lines: [
      {
        name: "fastk_period",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "slowk_period",
        arg: 3,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "slowd_period",
        arg: 3,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "MFI",
    fullName: "Money Flow Index",
    pane: 1,
    params: {
      name: "Money Flow Index",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "ROC",
    fullName: "Rate of Change",
    pane: 1,
    params: {
      name: "Rate of Change",
      kwargs: { timeperiod: 12 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 12,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "WILLR",
    fullName: "Williams %R",
    pane: 1,
    params: {
      name: "Williams %R",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "ULTOSC",
    fullName: "Ultimate Oscillator",
    pane: 1,
    params: {
      name: "Ultimate Oscillator",
      kwargs: { timeperiod1: 7, timeperiod2: 14, timeperiod3: 28 },
    },
    lines: [
      {
        name: "timeperiod1",
        arg: 7,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "timeperiod2",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "timeperiod3",
        arg: 28,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "CMO",
    fullName: "Chande Momentum Oscillator",
    pane: 1,
    params: {
      name: "Chande Momentum Oscillator",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "TRIX",
    fullName: "Triple Exponential Average",
    pane: 1,
    params: {
      name: "Triple Exponential Average",
      kwargs: { timeperiod: 20 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 20,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "PPO",
    fullName: "Percentage Price Oscillator",
    pane: 1,
    params: {
      name: "Percentage Price Oscillator",
      kwargs: { fastperiod: 12, slowperiod: 26, matype: 0 },
    },
    lines: [
      {
        name: "fastperiod",
        arg: 12,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "slowperiod",
        arg: 26,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "matype",
        arg: 0,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "NATR",
    fullName: "Normalized Average True Range",
    pane: 1,
    params: {
      name: "Normalized Average True Range",
      kwargs: { timeperiod: 14 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 14,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "MOM",
    fullName: "Momentum",
    pane: 1,
    params: {
      name: "Momentum",
      kwargs: { timeperiod: 10 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 10,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "AROON",
    fullName: "Aroon",
    pane: 1,
    params: {
      name: "Aroon",
      kwargs: { timeperiod: 25 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 25,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "ADX",
    fullName: "Average Directional Index",
    pane: 1,
    params: {
      name: "Average Directional Index",
      kwargs: { timeperiod: 6 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 6,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "TRIMA",
    fullName: "Triangular Moving Average",
    pane: 1,
    params: {
      name: "Triangular Moving Average",
      kwargs: { timeperiod: 30 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 30,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "TEMA",
    fullName: "Triple Exponential Moving Average",
    pane: 1,
    params: {
      name: "Triple Exponential Moving Average",
      kwargs: { timeperiod: 15 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 15,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "KAMA",
    fullName: "Kaufman Adaptive Moving Average",
    pane: 1,
    params: {
      name: "Kaufman Adaptive Moving Average",
      kwargs: { timeperiod: 10 },
    },
    lines: [
      {
        name: "timeperiod",
        arg: 10,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "SAR",
    fullName: "Parabolic SAR",
    pane: 1,
    params: {
      name: "Parabolic SAR",
      kwargs: { acceleration: 0.02, maximum: 0.2 },
    },
    lines: [
      {
        name: "acceleration",
        arg: 0.02,
        type: "line",
        color: "red",
        data: [],
      },
      {
        name: "maximum",
        arg: 0.2,
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
  {
    name: "BOP",
    fullName: "Balance of Power",
    pane: 1,
    params: {
      name: "Balance of Power",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_TRENDLINE",
    fullName: "Hilbert Transform - Instantaneous Trendline",
    pane: 1,
    params: {
      name: "Hilbert Transform - Instantaneous Trendline",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_TRENDMODE",
    fullName: "Hilbert Transform - Trend vs Cycle Mode",
    pane: 1,
    params: {
      name: "Hilbert Transform - Trend vs Cycle Mode",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_DCPERIOD",
    fullName: "Hilbert Transform - Dominant Cycle Period",
    pane: 1,
    params: {
      name: "Hilbert Transform - Dominant Cycle Period",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_DCPHASE",
    fullName: "Hilbert Transform - Dominant Cycle Phase",
    pane: 1,
    params: {
      name: "Hilbert Transform - Dominant Cycle Phase",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_PHASOR",
    fullName: "Hilbert Transform - Phasor Components",
    pane: 1,
    params: {
      name: "Hilbert Transform - Phasor Components",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_SINE",
    fullName: "Hilbert Transform - SineWave",
    pane: 1,
    params: {
      name: "Hilbert Transform - SineWave",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "HT_TRENDCOMP",
    fullName: "Hilbert Transform - Trendline by - Trend vs Cycle Mode",
    pane: 1,
    params: {
      name: "Hilbert Transform - Trendline by - Trend vs Cycle Mode",
      kwargs: {},
    },
    lines: [],
  },
  {
    name: "VSA",
    fullName: "Volume Spread Indicator",
    pane: 1,
    params: {
      name: "Volume Spread Indicator",
      kwargs: {},
    },
    lines: [
      {
        name: "vsa",
        type: "line",
        color: "red",
        data: [],
      },
    ],
  },
];

export default IndicatorsListValues;
