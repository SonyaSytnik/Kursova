'use strict';

class Dijkstra {

  constructor(cities) {
    this.cities = cities;
  }

  cout(road) {

    let str = 'Best fly: ';
    for (const i in road) {
      if (i != road.length - 1) {
        str = str + road[i] + ' => ';
      } else {
        str += road[i];
      }
    }
    console.log(str);
    return;
  }

  road(from, to) {

    if (arguments.length === 2) {
      return this.shortWays1(this.cities, [from, to]);
    } else {
      return this.shortWays1(this.cities, [].slice.call(arguments));
    }
  }


  catchKeys(obj) {
    let keys = [], key;
    for (key in obj) {
      keys.push(key);
    }
    return keys;
  }

  catchWay(history, to) {
    let way = [],
      i = to;

    while (i !== undefined) {
      way.push(i);
      i = history[i];
    }

    way.reverse();
    return way;
  }


  shortWays1(cities, NeedWay) {
    let from = NeedWay.shift(),
      to,
      history,
      AllWay = [],
      way;

    while (NeedWay.length) {
      to = NeedWay.shift();
      history = this.shortWays2(cities, from, to);

      if (history) {
        way = this.catchWay(history, to);
        if (NeedWay.length) {
          AllWay.push.apply(AllWay, way.slice(0, -1));
        } else {

          return AllWay.concat(way);
        }
      } else {
        return null;
      }

      from = to;
    }
  }


  shortWays2(cities, from, to) {

    let costs = {},
      NOW = { '0': [from] },
      history = {},
      keys;

    const addCity = function (cost, city) {
      const key = cost;
      key.toString;

      if (!NOW[key]) NOW[key] = [];
      NOW[key].push(city);

    };

    costs[from] = 0;

    while (NOW) {
      if (!(keys = this.catchKeys(NOW)).length) break;
      keys.sort();
      const key = keys[0],
        bucket = NOW[key],
        node = bucket.shift(),
        nowCost = parseFloat(key),
        adjacentNodes = cities[node];
      if (!bucket.length) delete NOW[key];

      for (const city in adjacentNodes) {

        const cost = adjacentNodes[city],
          allCost = cost + nowCost,
          cityCost = costs[city];

        if ((cityCost === undefined) || (cityCost > allCost)) {
          costs[city] = allCost;
          addCity(allCost, city);
          history[city] = node;
        }

      }
    }

    if (costs[to] === undefined) {
      return null;
    } else {

      return history;
    }

  }

}

const cities = {
  SanFrancisco: { NewYork: 7, Miami: 9, Texas: 14 },
  NewYork: { SanFrancisco: 7, Miami: 10, LosAngeles: 15 },
  Miami: { SanFrancisco: 9, NewYork: 10, LosAngeles: 11, Texas: 2 },
  LosAngeles: { NewYork: 15, Miami: 11, California: 6 },
  California: { LosAngeles: 6, Texas: 9 },
  Texas: { SanFrancisco: 14, Miami: 2, California: 9 }
},
  USA = new Dijkstra(cities);
//console.log(USA.cities);

USA.cout(USA.road('SanFrancisco', 'California'));
USA.cout(USA.road('SanFrancisco', 'LosAngeles', 'Texas'));
USA.cout(USA.road('SanFrancisco', 'Texas')); 
