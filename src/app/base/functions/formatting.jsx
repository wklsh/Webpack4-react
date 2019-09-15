/**
 * format a string to display as price
 * adds thousand delimiter and optional 2 decimal places
 * @param  {integer|number|string} 	v       	the value to format
 * @param  {integer} 				decimal 	if defined, will be enforced to follow the decimal places
 *                                				otherwise will show 2 decimal places if needed
 * @return {number}         					formatted value
 */
export const formatPrice = (v, decimal) => {
  let localDecimal = decimal;

  if (decimal === undefined) {
    if (v.toString().indexOf('.') < 0) {
      localDecimal = 0;
    } else localDecimal = 2;
  }

  return (
    Number(v * 100) *
    (0.01).toLocaleString('en-US', {
      minimumFractionDigits: localDecimal,
    })
  );
};

/**
 * convert thousands to use 'k'
 * @param  {integer} v 	the value to format
 * @return {[type]}   	formatted value
 */
export const formatThousands = v => {
  let localV = v;

  if (v > 999) {
    localV = v / 1000;

    if (v === v.toFixed(1)) {
      localV = `${v}k`;
    } else {
      localV = `${v.toFixed(1)}k`;
    }
  }

  return localV;
};
