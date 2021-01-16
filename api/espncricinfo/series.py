import gevent
from gevent import monkey

import requests
import grequests

from bs4 import BeautifulSoup
from espncricinfo.exceptions import MatchNotFoundError, NoSeriesError

import time
from tqdm import tqdm
from time import sleep
from tqdm import trange



class Series(object):

    def __init__(self, series_id):
        print("initiating series data fetch...")

        self.series_id = series_id
        self.json_url = "http://core.espnuk.org/v2/sports/cricket/leagues/{0}/".format(str(series_id))
        self.events_url = "http://core.espnuk.org/v2/sports/cricket/leagues/{0}/events".format(str(series_id))
        self.seasons_url = "http://core.espnuk.org/v2/sports/cricket/leagues/{0}/seasons".format(str(series_id))
        self.json = self.get_json(self.json_url)
        self.seasons = self._get_seasons()
        self.years = self._get_years_from_seasons()
        if self.json:
            self.name = self.json['name']
            self.short_name = self.json['shortName']
            self.abbreviation = self.json['abbreviation']
            self.slug = self.json['slug']
            self.is_tournament = self.json['isTournament']
            self.url = self.json['links'][0]['href']
            self.events_json = self._get_events()

        if self.events_json:
            self.events = self._build_events()

        if self.events:
            self.series_data = self._get_series_data(self.events[0]['season']['$ref'])
            

    def get_json(self, url):
        r = requests.get(url)
        if r.status_code == 404:
            raise "Not Found"
        else:
            return r.json()

    def get_events_for_season(self, season):
        responses = []
        season_events = []
        season_events_url = self.seasons_url+"/{0}/events".format(str(season))
        season_events_json = self.get_json(season_events_url)
        if season_events_json:
            gevent.monkey.patch_all()
            rs = (grequests.get(event['$ref']) for event in season_events_json['items'])
            responses = grequests.map(rs)
            for response in responses:
                event_json = response.json()
                venue_json = self.get_json(event_json['venues'][0]['$ref'])
                season_events.append({"url": event_json['$ref'], "match_id": event_json['id'], "class": event_json['competitions'][0]['class']['generalClassCard'], "date": event_json['date'], "description": event_json['shortDescription'], "venue_url": event_json['venues'][0]['$ref'], "venue": venue_json['fullName']})
            return season_events
        else:
            return None

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.name

    def _get_seasons(self):
        season_json = self.get_json(self.seasons_url)
        if season_json:
            return [x['$ref'] for x in season_json['items']]
        else:
            return None

    def _get_years_from_seasons(self):
        return [x.split('/')[9] for x in self.seasons]

    def _get_events(self):
        events_json = self.get_json(self.events_url)
        if events_json:
            return [x for x in events_json['items']]
        else:
            return None

    def _build_events(self):
        events = []
        for event in self.events_json:
            events.append(self.get_json(event['$ref']))
        return events
    
    def _build_series_info(self, seasonData):
        seasonInfo = {}
        seasonInfo['id'] = seasonData['id']
        seasonInfo['year'] = seasonData['year']
        seasonInfo['startDate'] = seasonData['startDate']
        seasonInfo['endDate'] = seasonData['endDate']
        seasonInfo['name'] = seasonData['name']
        seasonInfo['shortAlternateName'] = seasonData['shortAlternateName']
        seasonInfo['slug'] = seasonData['slug']
        seasonInfo['shortName'] = seasonData['shortName']
        seasonInfo['seriesId'] = self.series_id
        return seasonInfo

    def _get_series_data(self, eventsUrl):
        print("Fetching series data.....")
        seasonData = {}
        seasonData = self.get_json(eventsUrl)
        seasonInfo = self._build_series_info(seasonData)
        teamsDataUrl = seasonData['teams']['$ref']
        teamsData = self.get_json(teamsDataUrl)['items']
        teamInfoDetails = []

        index = 1
        pbar = tqdm(teamsData)

        for teamUrl in pbar:
            teamInfoData = self.get_json(teamUrl['$ref'])
            teamInfoDetails.append(self._construct_team_info(teamInfoData))
            sleep(0.25)
            pbar.set_description("Processing Team ",index)
            index = index+1
        return {"seriesInfo": seasonInfo, "teamInfo": teamInfoDetails}
        

    def _construct_team_info(self, teamInfoData):
        requiredFields = ["id", "location", "name", "abbreviation", "logos", "athletes"]
        teamInfo = {}
        for infoField in teamInfoData:
            if(infoField in requiredFields):
                fieldValue = teamInfoData[infoField]
                if infoField in ("id", "location", "name", "abbreviation"):
                    teamInfo[infoField] = fieldValue
                elif infoField == "logos":
                    teamInfo['logoHref'] = self._get_team_logo(fieldValue)
                elif infoField == "athletes":
                    teamInfo['squad'] = self._get_team_squad(fieldValue)
        return teamInfo


    def _get_team_logo(self, logoData):
        return logoData[0]['href']

    def _get_team_squad(self, squadData):
        squadUrl = squadData['$ref']
        squadData = self.get_json(squadUrl)['items']
        teamSquad = []
        for playerData in squadData:
            teamSquad.append(self._get_players_data(playerData['$ref']))
        return teamSquad

    def _get_players_data(self, playerUrl):
        requiredFields = ["id", "name", "fullName", "displayName", "captain", "keeper", 
        "styles", "position", "battingName", "fieldingName"]
        playerInfo = {}
        playerInfoData = self.get_json(playerUrl)
        for infoField in playerInfoData:
            if(infoField in requiredFields):
                fieldValue = playerInfoData[infoField]
                if infoField in ("id", "name", "fullName", "displayName", "captain", "keeper", "battingName", "fieldingName"):
                    playerInfo[infoField] = fieldValue
                elif infoField == "styles":
                    playerInfo.update(self._get_player_style(fieldValue))
                elif infoField == "position":
                    playerInfo.update(self._get_player_position(fieldValue))
        return playerInfo

    def _get_player_style(self, styleDetails):
        style = {}
        for playerStyle in styleDetails:
            playerType = playerStyle["type"]
            if playerType == "batting":
                style["battingStyleDesc"] = playerStyle["description"]
                style["battingStyleShDesc"] = playerStyle["shortDescription"]
            elif playerType == "bowling":
                style["bowlingStyleDesc"] = playerStyle["description"]
                style["bowlingStyleShortDesc"] = playerStyle["shortDescription"]
        return style

    def _get_player_position(self, positionDetails):
        position = {}
        position["positionId"] = positionDetails["id"]
        position["positionName"] = positionDetails["name"]
        position["positionAbbr"] = positionDetails["abbreviation"]
        return position



        