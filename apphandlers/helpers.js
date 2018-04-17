function IDfy(object) {
  var counter = 1;
  var ids = Object.keys(object);
  for (counter; counter <= ids.length; counter++) {
    if ( ids.indexOf(counter.toString()) == -1) {
      break;
    }
  }
  return counter.toString();
}

module.exports = {IDfy};
