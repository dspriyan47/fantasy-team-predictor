from espncricinfo.match import Match
from espncricinfo.summary import Summary
from espncricinfo.series import Series
import json

# m = Match('1226851')

# s1 = json.dumps(m.api_json)
# y = json.loads(s1)

# print(y["matchcards"])

# s = Series('1226769')
# print(s.name)
print("EXecuting CRICINFO")

from espncricinfo.series import Series
s = Series('1226769')
# print(s.name)
# print(s.short_name)
# print(s.abbreviation)
# print(s.slug)
# print(s.is_tournament)
# print(s.url)
# print(s.events_json)
print(s.series_data)