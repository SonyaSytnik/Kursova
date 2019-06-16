'use strict';

const cout = road => {
  console.log('Best fly: ' + road.join(' => '));
};

const catchWay = (history, to) => {
  const way = [];
  let i = to;

  while (i !== undefined) {
    way.push(i);
    i = history[i];
  }

  way.reverse();
  return way;
};

class Dijkstra {
  constructor(cities) {
    this.cities = cities;
  }

  shortWays1(...needWay) {
    let from = needWay.shift();
    let to;
    let history;
    const allWay = [];
    let way;

    while (needWay.length) {
      to = needWay.shift();
      history = this.shortWays2(from, to);
      if (!history) return null;
      way = catchWay(history, to);
      if (needWay.length) {
        allWay.push(...way.slice(0, -1));
      } else {
        return allWay.concat(way);
      }
      from = to;
    }
  }

  shortWays2(from, to) {
    const costs = {};
    const now = { '0': [from] };
    const history = {};
    let keys;

    const addCity = function (cost, city) {
      const key = cost;
      if (!now[key]) now[key] = [];
      now[key].push(city);
    };

    costs[from] = 0;

    while (true) {
      keys = Object.keys(now);
      if (!keys.length) break;
      keys.sort();
      const key = keys[0];
      const bucket = now[key];
      const node = bucket.shift();
      const nowCost = parseFloat(key);
      const adjacentNodes = this.cities[node];
      if (!bucket.length) delete now[key];
      for (const city in adjacentNodes) {
        const cost = adjacentNodes[city];
        const allCost = cost + nowCost;
        const cityCost = costs[city];
        if ((cityCost === undefined) || (cityCost > allCost)) {
          costs[city] = allCost;
          addCity(allCost, city);
          history[city] = node;
        }
      }
    }

    if (costs[to] === undefined) return null;
    return history;
  }
}

const cities = {
  SanFrancisco: { NewYork: 7, Miami: 9, Texas: 14 },
  NewYork: { SanFrancisco: 7, Miami: 10, LosAngeles: 15 },
  Miami: { SanFrancisco: 9, NewYork: 10, LosAngeles: 11, Texas: 2 },
  LosAngeles: { NewYork: 15, Miami: 11, California: 6 },
  California: { LosAngeles: 6, Texas: 9 },
  Texas: { SanFrancisco: 14, Miami: 2, California: 9 },
};

const usa = new Dijkstra(cities);
//console.log(usa.cities);

cout(usa.shortWays1('SanFrancisco', 'California'));
cout(usa.shortWays1('SanFrancisco', 'LosAngeles', 'Texas'));
cout(usa.shortWays1('SanFrancisco', 'Texas'));
