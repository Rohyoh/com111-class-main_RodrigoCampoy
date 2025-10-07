/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

var sieve = function (n) {
  "use strict";

  let isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

window.onload = function () {
  document.getElementById('btn').onclick = function () {
    let val = parseInt(document.getElementById('num').value);
    let primes = sieve(val);
    document.getElementById('primes').innerHTML = primes.join(', ');
  };
};
console.log(sieve(1000000));
