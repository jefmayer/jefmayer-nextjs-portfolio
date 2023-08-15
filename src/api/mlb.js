const date = new Date();
const currentYear = date.getFullYear();

const getWinsDataByTeam = (options) => {
  const {
    data,
    divisionId,
    teamId,
  } = options;
  try {
    return data.records
      .find((record) => record.division.id === divisionId)
      .teamRecords.find((record) => record.team.id === teamId)
      .wins;
  } catch (error) {
    return 0;
  }
};

const getMlbStandingsByYear = (year) => {
  const url = `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${year}&standingsTypes=regularSeason`;
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        reject(new Error({
          status: xhr.status,
          statusText: xhr.statusText,
        }));
      }
    };
    xhr.onerror = () => {
      reject(new Error({
        status: xhr.status,
        statusText: xhr.statusText,
      }));
    };
    xhr.send();
  });
};

const getTeamWinTotalSinceYear = (options) => {
  const {
    callback,
    divisionId,
    teamId,
    wins,
    year,
  } = options;
  const winTotal = wins || 0;
  getMlbStandingsByYear(year)
    .then((data) => {
      if (year + 1 <= currentYear) {
        getTeamWinTotalSinceYear({
          callback,
          divisionId,
          teamId,
          wins: winTotal + getWinsDataByTeam({
            data,
            divisionId,
            teamId,
          }),
          year: year + 1,
        });
        return;
      }
      callback(winTotal);
    })
    .catch(() => {
      callback(winTotal);
    });
};

export {
  getTeamWinTotalSinceYear,
  getWinsDataByTeam,
};
