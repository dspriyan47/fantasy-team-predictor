export class GenerateHobartHurricanesPlayerData {

    batting: any = {} || null;
    bowling: any = {} || null;
    playersData: any = {};
   
    createBattingData(position: number, runs: number, balls: number, 
       fours: number, sixes: number, outAt: number | null, outBy: string | null, bowler: string | null) {
     if (arguments.length === 0) {
       this.batting = null;
     } else {
       this.batting = { position, runs, balls, fours, sixes, outAt, outBy, bowler };
     }
   }
   
   didNotBat(){
       this.batting = null;
   }
   
   createBowlingData(overs: number, runs: number, maiden: number, wickets: number) {
     if (arguments.length === 0) {
       this.bowling = null;
     } else {
       this.bowling = { overs, runs, maiden, wickets };
     }
   }
   
   didNotBowl(){
       this.bowling = null;
   }
   
   createPlayerData(matchId: number, player: string) {
     let matchIdentifier: string = `match-${matchId}`;
     let playerData: any = {
       [matchIdentifier]: {
         batting: this.batting !== null ? { ...this.batting } : null,
         bowling: this.bowling !== null ? { ...this.bowling } : null
       }
     };
     if (!this.playersData.hasOwnProperty(player)) {
       this.playersData[player] = playerData;
     } else {
       this.playersData[player] = {
         ...this.playersData[player],
         [matchIdentifier]: playerData[matchIdentifier]
       };
     }
   }
   
   
   hobartHurricanes() {
       //darcy_short
       this.createBattingData(2, 0, 1, 0, 0, 1.1, "catch", "ben_dwarshius");
       this.createBowlingData(2, 15, 0, 0);
       this.createPlayerData(1, "darcy_short");
   
       this.createBattingData(2, 72, 48, 6, 4, 14.4, "catch", "wes_agar");
       this.createBowlingData(1, 17, 0, 0);
       this.createPlayerData(5, "darcy_short");
   
       this.createBattingData(2, 2, 5, 0, 0, 1.5, "catch", "peter_siddle");
       this.createBowlingData(2, 14, 0, 0);
       this.createPlayerData(8, "darcy_short");
   
       this.createBattingData(2, 1, 2, 0, 0, 0.3, "bowled", "josh_lalor");
       this.createBowlingData(1, 9, 0, 0);
       this.createPlayerData(10, "darcy_short");
   
       //will_jacks
       this.createBattingData(1, 0, 2, 0, 0, 0.2, "c&b", "ben_manenti");
       this.didNotBowl();
       this.createPlayerData(1, "will_jacks");
   
       this.createBattingData(1, 34, 25, 2, 2, 8.2, "catch", "wes_agar");
       this.didNotBowl();
       this.createPlayerData(5, "will_jacks");
   
       this.createBattingData(1, 0, 2, 0, 0, 0.4, "catch", "daniel_worrall");
       this.createBowlingData(1, 13, 0, 0);
       this.createPlayerData(8, "will_jacks");
   
       this.createBattingData(1, 10, 7, 1, 0, 3.1, "run_out", "josh_lalor");
       this.createBowlingData(2, 13, 0, 0);
       this.createPlayerData(10, "will_jacks");
   
       //ben_mcdermott
       this.createBattingData(3, 46, 33, 2, 3, 11.5, "catch", "rashid_khan");
       this.didNotBowl();
       this.createPlayerData(8, "ben_mcdermott");
   
       this.createBattingData(3, 89, 55, 7, 5, null, null, null);
       this.didNotBowl();
       this.createPlayerData(10, "ben_mcdermott");
   
       //colin_ingram
       this.createBattingData(3, 55, 42, 7, 1, 15.3, "catch", "daniel_christian");
       this.didNotBowl();
       this.createPlayerData(1, "colin_ingram");
   
       this.createBattingData(3, 25, 19, 1, 1, 15.5, "catch", "peter_siddle");
       this.didNotBowl();
       this.createPlayerData(5, "colin_ingram");
   
       this.createBattingData(5, 46, 35, 4, 2, 15.2, "catch", "wes_agar");
       this.didNotBowl();
       this.createPlayerData(8, "colin_ingram");
   
       this.createBattingData(5, 19, 18, 2, 1, 13.4, "catch", "kane_richardson");
       this.createBowlingData(3.4, 35, 0, 1);
       this.createPlayerData(10, "colin_ingram");
   
       //peter_handscomb
       this.createBattingData(4, 24, 20, 1, 1, 8.2, "stumped", "steve_o_keefe");
       this.didNotBowl();
       this.createPlayerData(1, "peter_handscomb");
   
       this.createBattingData(4, 4, 5, 0, 0, 16.1, "lbw", "rashid_khan");
       this.didNotBowl();
       this.createPlayerData(5, "peter_handscomb");
   
       this.createBattingData(4, 5, 6, 0, 0, 3.4, "catch", "wes_agar");
       this.didNotBowl();
       this.createPlayerData(8, "peter_handscomb");
   
       this.createBattingData(4, 13, 15, 2, 0, 7.4, "catch", "noor_ahmad");
       this.didNotBowl();
       this.createPlayerData(10, "peter_handscomb");
   
       //macalister_wright
       this.createBattingData(5, 8, 10, 0, 0, 11.1, "catch", "daniel_christian");
       this.didNotBowl();
       this.createPlayerData(1, "macalister_wright");
   
       this.createBattingData(6, 1, 3, 0, 0, 17.2, "bowled", "daniel_worrall");
       this.didNotBowl();
       this.createPlayerData(5, "macalister_wright");
   
       this.createBattingData(6, 15, 14, 1, 0, 17.1, "bowled", "peter_siddle");
       this.didNotBowl();
       this.createPlayerData(8, "macalister_wright");
   
       //tim_david
       this.createBattingData(6, 58, 33, 8, 1, 19.4, "catch", "daniel_christian");
       this.didNotBowl();
       this.createPlayerData(1, "tim_david");
   
       this.createBattingData(5, 21, 13, 0, 1, null, null, null);
       this.didNotBowl();
       this.createPlayerData(5, "tim_david");
   
       this.createBattingData(7, 24, 15, 3, 1, 19.2, "bowled", "peter_siddle");
       this.didNotBowl();
       this.createPlayerData(8, "tim_david");
   
       this.createBattingData(6, 21, 12, 0, 2, null, null, null);
       this.didNotBowl();
       this.createPlayerData(10, "tim_david");
   
       // keemo_paul
       this.didNotBat();
       this.createBowlingData(2, 27, 0, 0);
       this.createPlayerData(10, "keemo_paul");
   
       //james_faulkner
       this.createBattingData(7, 6, 4, 1, 0, 16.4, "catch", "ben_dwarshius");
       this.createBowlingData(4, 22, 0, 2);
       this.createPlayerData(1, "james_faulkner");
   
       this.createBattingData(7, 12, 9, 1, 0, null, null, null);
       this.createBowlingData(4, 21, 0, 3);
       this.createPlayerData(5, "james_faulkner");
   
       this.createBattingData(8, 0, 3, 0, 0, 17.4, "catch", "peter_siddle");
       this.createBowlingData(4, 35, 0, 2);
       this.createPlayerData(8, "james_faulkner");
   
       this.didNotBat();
       this.createBowlingData(4, 30, 0, 1);
       this.createPlayerData(10, "james_faulkner");
   
       //nathan_ellis
       this.createBattingData(8, 14, 5, 0, 2, 18.2, "catch", "ben_dwarshius");
       this.createBowlingData(4, 37, 0, 1);
       this.createPlayerData(1, "nathan_ellis");
   
       this.didNotBat();
       this.createBowlingData(4, 33, 0, 1);
       this.createPlayerData(5, "nathan_ellis");
   
       this.createBattingData(9, 1, 2, 0, 0, 18.3, "run-out", "matt_renshaw");
       this.createBowlingData(3.4, 36, 0, 2);
       this.createPlayerData(8, "nathan_ellis");
   
       this.didNotBat();
       this.createBowlingData(4, 28, 0, 1);
       this.createPlayerData(10, "nathan_ellis");
   
       //johan_botha
       this.createBattingData(9, 1, 1, 0, 0, 0, null, null);
       this.createBowlingData(2, 18, 0, 0);
       this.createPlayerData(1, "johan_botha");
   
       this.didNotBat();
       this.createBowlingData(3, 20, 0, 2);
       this.createPlayerData(5, "johan_botha");
   
       //scott_boland
       this.createBattingData(10, 6, 2, 1, 0, 0, null, null);
       this.createBowlingData(4, 39, 0, 1);
       this.createPlayerData(1, "scott_boland");
   
       this.didNotBat();
       this.createBowlingData(4, 39, 0, 0);
       this.createPlayerData(5, "scott_boland");
   
       this.createBattingData(10, 1, 1, 0, 0, 0, null, null);
       this.createBowlingData(4, 15, 0, 1);
       this.createPlayerData(8, "scott_boland");
   
       this.didNotBat();
       this.createBowlingData(4, 19, 1, 2);
       this.createPlayerData(10, "scott_boland");
   
       //riley_meredith
       this.didNotBat();
       this.createBowlingData(4, 29, 0, 2);
       this.createPlayerData(1, "riley_meredith");
   
       this.didNotBat();
       this.createBowlingData(4, 30, 0, 2);
       this.createPlayerData(5, "riley_meredith");
   
       this.createBattingData(11, 0, 1, 0, 0, 19.3, "bowled", "peter_siddle");
       this.createBowlingData(4, 32, 0, 0);
       this.createPlayerData(8, "riley_meredith");
   
       this.didNotBat();
       this.createBowlingData(3, 29, 0, 1);
       this.createPlayerData(10, "riley_meredith");
   
       //overs, runs, maiden, wickets
       //position, runs, balls, fours, sixes, outAt, outBy, bowler
       console.log(JSON.stringify(this.playersData));
       return this.playersData;
    }
   }