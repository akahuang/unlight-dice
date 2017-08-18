function RollDice(number) {
  var ret = 0;
  for (var i = 0; i < number; i++) {
    if (Math.random() * 3 > 1) {
      ret += 1;
    }
  }
  return ret;
}
