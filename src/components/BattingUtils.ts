import { Batting, PlayerData } from "../data/bbl2020/data";
import { HOBART_HURRICANES } from "../data/bbl2020/hobartHurricanes/hobartHurricanes";

export function getBsForm(player: string){
    let playerScores: number[] = [];
    let fifties: number = 0;
    let thirties: number = 0;
    let matchesBatted: number = 0;
    let formType: string = "";
    let sixesAtThirties: number = 0;

    Object.keys(HOBART_HURRICANES[player]).forEach((matchId: string)=>{
        let playerData: PlayerData = HOBART_HURRICANES[player][matchId];
        let batting: Batting | null = playerData.batting;
        if(batting){
            let runs: number = batting.runs;
            let sixes: number = batting.sixes;
            if(runs >= 50) fifties++;
            if(runs >= 30){
                thirties++;
                sixesAtThirties = sixes;
            }
            playerScores.push(batting.runs);
            matchesBatted++;
        }
    });

    if(fifties >=1 || (matchesBatted >=2 && thirties >= 2)){
        formType = "in-form";
    }

    if(matchesBatted >=2 && thirties === 1 && sixesAtThirties >= 2){
        formType = "partial-form";
    }

    return formType;
}

export function getBgBasedOnForm(form: string){
    let bgClass = "";
    switch(form){
        case "in-form":
            bgClass = "bg-success";
            break;
        case "partial-form":
            bgClass = "bg-warning";
            break;
        default:
            break;
    }
    return bgClass;
}

export function getBgBasedOnRunsScored(playerData: Batting | null){
    if(!playerData) return;
    let runs = playerData.runs;
    let notOut = (playerData.bowler === null);
    let className = "";
    switch(true){
        case (notOut && runs>20):
        case (runs>30):
            className = "bg-success";
            break;
        case (runs===0):
            className = "bg-danger";
            break;
        default:
            break;

    }
    return className;
}