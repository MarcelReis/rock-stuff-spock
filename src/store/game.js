import { writable } from "svelte/store";

const NORMAL_MODE = [
  { value: "rock" },
  { value: "paper" },
  { value: "scissors" },
];
const SPOCK_MODE = [...NORMAL_MODE, { value: "lizard" }, { value: "spock" }];

const uninitializedGame = {
  mode: undefined,
  player: {
    selected: undefined,
    score: 0,
  },
  opponent: {
    selected: undefined,
    score: 0,
  },
  cards: [],
  showRules: false,
};

const { subscribe, set, update } = writable(uninitializedGame);

const init = (mode = "normal") => {
  if (mode === "normal") {
    return set({ ...uninitializedGame, cards: NORMAL_MODE, mode: "normal" });
  }
  return set({ ...uninitializedGame, cards: SPOCK_MODE, mode: "spock" });
};

const reset = () => set(uninitializedGame);

const toggleRules = () =>
  update((state) => ({ ...state, showRules: !state.showRules }));

const playerChoose = (selected) => {
  update((state) => ({ ...state, player: { ...state.player, selected } }));

  setTimeout(() => {
    const i = Math.floor(Math.random() * 3);
    update((state) => ({
      ...state,
      opponent: { ...state.opponent, selected: NORMAL_MODE[i].value },
    }));
  }, 1000);
};

export default {
  subscribe,
  init,
  reset,
  toggleRules,
  playerChoose,
};
