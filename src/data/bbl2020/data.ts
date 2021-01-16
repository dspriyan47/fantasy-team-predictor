export enum MATCHES {
	MATCH_1 = "match-1",
	MATCH_2 = "match-2",
	MATCH_3 = "match-3",
	MATCH_4 = "match-4",
	MATCH_5 = "match-5",
	MATCH_6 = "match-6",
	MATCH_7 = "match-7",
	MATCH_8 = "match-8",
	MATCH_9 = "match-9",
	MATCH_10 = "match-10",
	MATCH_11 = "match-11",
	MATCH_12 = "match-12",
	MATCH_13 = "match-13",
	MATCH_14 = "match-14",
	MATCH_15 = "match-15",
	MATCH_16 = "match-16",
	MATCH_17 = "match-17",
	MATCH_18 = "match-18",
	MATCH_19 = "match-19",
	MATCH_20 = "match-20",
	MATCH_21 = "match-21",
	MATCH_22 = "match-22",
	MATCH_23 = "match-23",
	MATCH_24 = "match-24",
	MATCH_25 = "match-25",
	MATCH_26 = "match-26",
	MATCH_27 = "match-27",
	MATCH_28 = "match-28",
	MATCH_29 = "match-29",
	MATCH_30 = "match-30",
 }

 export enum HH_Players {
	DARCY_SHORT = "darcy_short",
	WILL_JACKS = "will_jacks",
	BEN_MCDERMOTT = "ben_mcdermott",
	COLIN_INGRAM = "colin_ingram",
	PETER_HANDSCOMB = "peter_handscomb",
	MACALISTER_WRIGHT = "macalister_wright",
	TIM_DAVID = "tim_david",
	KEEMO_PAUL = "keemo_paul",
	JAMES_FAULKNER = "james_faulkner",
	NATHAN_ELLIS = "nathan_ellis",
	JOHAN_BOTHA = "johan_botha",
	SCOTT_BOLAND = "scott_boland",
	RILEY_MEREDITH = "riley_meredith"
}

export interface Batting {
	position: number;
	runs: number;
	balls: number;
	fours: number;
	sixes: number;
	outAt: number | null;
	outBy: string | null;
	bowler: string | null;
}

export interface Bowling {
	overs: number;
	runs: number;
	maiden: number;
	wickets: number;
}

export interface PlayerData {
	batting: Batting | null;
	bowling: Bowling | null;
}

export interface MatchData  {
	[key: string]: PlayerData;
};

export interface TeamData {
	[key: string]: MatchData;
}