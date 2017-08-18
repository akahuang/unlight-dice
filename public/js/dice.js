function RollDice(number) {
  console.info("RollDice");
  var ret = 0;
  for (var i = 0; i < number; i++) {
    console.info(i.toString() + " " + ret.toString());
    if (Math.random() * 3 > 1) {
      ret += 1;
      console.info("Hit");
    }
  }
  return ret;
}
