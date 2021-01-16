import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { HOBART_HURRICANES } from '../data/bbl2020/hobartHurricanes/hobartHurricanes';
import { Batting, PlayerData } from '../data/bbl2020/data';
import Chip from '@material-ui/core/Chip';
import { GenerateHobartHurricanesPlayerData } from '../data/bbl2020/hobartHurricanes/GenerateHobartHurricanesPlayerData';
import { getWindowDimensions, removeUnderScore } from '../utils';
import { getBsForm, getBgBasedOnForm, getBgBasedOnRunsScored } from './BattingUtils';

let columns: any = ["Player"];
let players: any = [];
let playersAnalysisData: any = {};

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: getWindowDimensions().height,
    },
  });
  

function createColumnData(){
    Object.keys(HOBART_HURRICANES).forEach((teamData: string)=>{
        Object.keys(HOBART_HURRICANES[teamData]).forEach((matchId: string)=>{
            if(!columns.includes(matchId)){columns.push(matchId)}
        })
    });
    columns.push("Prediction");
}

function createPlayersData(){
    Object.keys(HOBART_HURRICANES).forEach((teamData: string)=>{
        players.push(teamData);
    });
}


(function initiateBattingTable(){
    createColumnData();
    createPlayersData();
})();


function getPlayerScoreTemplate(playerData: PlayerData) {
    let batting: Batting | null = playerData!.batting;
    let outByBowler = batting!.bowler;
    outByBowler = (!batting!.bowler)?"Not Out":batting!.bowler;
    let dismissalMode = batting?.outBy;
    return (
        <>  
        <span>
            <span>{batting!.runs}{outByBowler === "Not Out" && <sup>*</sup>}({batting!.balls})</span>
            <Chip className="ml-1" size="small" label={`4's - ${batting!.fours}`}/>
            <Chip className="ml-1" size="small" label={`6's - ${batting!.sixes}`}/>
        </span>
        <div className="capitalize">{removeUnderScore(outByBowler)}</div>
        <div>{dismissalMode}</div>
        <span className="battingOrder text-center">{batting?.position}</span>
        </>
    )
}

export default function StickyHeadTable() {
  const classes = useStyles();

  console.log(HOBART_HURRICANES);
  let generateData = new GenerateHobartHurricanesPlayerData();
  console.log("data is: ",generateData.hobartHurricanes());
  
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" size="small" className="table-bordered table table-condensed">
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableCell
                  key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player: string, index: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell className="capitalize" key={index}>
                      {removeUnderScore(player)}
                      {getBsForm(player) && <Chip className={`ml-1 ${getBgBasedOnForm(getBsForm(player))}`} size="small" label={getBsForm(player)}/>}
                  </TableCell>
                  {columns.slice(1, columns.length).map((column: any, index: number) => {
                     if(HOBART_HURRICANES[player].hasOwnProperty(column)){
                        
                      return (<TableCell className={`${getBgBasedOnRunsScored(HOBART_HURRICANES[player][column].batting)} position-relative`} key={index}>
                          {HOBART_HURRICANES[player][column].batting && (
                          <>
                          {getPlayerScoreTemplate(HOBART_HURRICANES[player][column])}
                          </>
                          )}
                          {!HOBART_HURRICANES[player][column].batting && "DNB"}
                      </TableCell>)
                     }else{
                      return <TableCell>DNP</TableCell>
                     }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
