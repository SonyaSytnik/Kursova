'use strict';

const memo = fn => {
  const cache = {};
  return (...args) => {
    const key = args.toString();
    if (cache[key]) {
      console.log('You have already found this path');
      return cache[key];
    }
    console.log('Okey, lets find a best fly for you');
    cache[key] = fn(...args);
    return cache[key];
  };
};

const curry = (fn, numb) => (...args) => {
  if (numb > args.length) {
    console.log('I need more cities for work');
    const fNew = fn.bind(null, ...args);
    return curry(fNew, numb - 1);
  } else {
    console.log('You have entered the required number of settlements');
    return fn(...args);
  }
};


const cout = road => {
  let str = 'Best fly: ';
  for (const i in road) {
    if (i !== road.length - 1) {
      str = str + road[i] + ' => ';
    } else {
      str += road[i];
    }
  }
  console.log(str);
  console.log();
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

const shortWays2 = (from, to) => {
  const costs = {};
  const now = { '0': [from] };
  const history = {};
  let keys;

  costs[from] = 0;

  while (true) {
    keys = Object.keys(now);
    if (!keys.length) break;
    keys.sort();
    const node = now[keys[0]];
    const nowCost = parseFloat(keys[0]);
    const adjNodes = global.cities[node];
    delete now[keys[0]];
    for (const city in adjNodes) {
      const allCost = adjNodes[city] + nowCost;
      const cityCost = costs[city];
      if ((cityCost === undefined) || (cityCost > allCost)) {
        costs[city] = allCost;
        if (!now[allCost]) now[allCost] = [];
        now[allCost].push(city);
        history[city] = node;
      }
    }
  }
  if (costs[to] === undefined) return null;
  return history;
};

const shortWays1 = (...needWay) => {
  let from = needWay.shift();
  let to;
  let history;
  const allWay = [];
  let way;

  while (needWay.length) {
    to = needWay.shift();
    history = shortWays2(from, to);
    if (!history) return null;
    way = catchWay(history, to);
    if (needWay.length) {
      allWay.push(...way.slice(0, -1));
    } else {
      return allWay.concat(way);
    }
    from = to;
  }
};

global.cities = {
  SanFrancisco: { NewYork: 7, Miami: 9, Texas: 14 },
  NewYork: { SanFrancisco: 7, Miami: 10, LosAngeles: 15 },
  Miami: { SanFrancisco: 9, NewYork: 10, LosAngeles: 11, Texas: 2 },
  LosAngeles: { NewYork: 15, Miami: 11, California: 6 },
  California: { LosAngeles: 6, Texas: 9 },
  Texas: { SanFrancisco: 14, Miami: 2, California: 9 },
};
const curryMemoWay3 = curry(memo(shortWays1), 3);
const curryMemoWay2 = curry(memo(shortWays1), 2);

cout(curryMemoWay2('SanFrancisco', 'California'));
cout(curryMemoWay2('SanFrancisco', 'California'));

cout(curryMemoWay3('SanFrancisco')('LosAngeles')('Texas'));
cout(curryMemoWay3('SanFrancisco', 'LosAngeles', 'Texas'));
