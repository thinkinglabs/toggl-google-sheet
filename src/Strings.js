
//TODO: rename to zeroPadLeft??
var padStart = function(str, targetLength, padchar) {
  var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
  var pad = new Array(1 + targetLength).join(pad_char);
  return (pad + str).slice(-pad.length);
}

export { padStart };
