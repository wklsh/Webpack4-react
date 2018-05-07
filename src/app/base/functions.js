
//scroll to the very top
//will be called every time the page changes in routes.js 
let scrollToTopTimer
export const scrollToTop = () => {
	if(scrollToTopTimer) clearTimeout(scrollToTopTimer);
	scrollToTopTimer = setTimeout(()=>{
		let top = window.pageYOffset || document.documentElement.scrollTop;
		top += -top * .3;

		if(top<5 || isNaN(top)){
			clearTimeout(scrollToTopTimer);
			scrollToTopTimer = null;
			top = 0;
			window.scrollTo(0, 0);
			return;
		}
		window.scrollTo(0, top);
		scrollToTop();
	}, 1000/60)
}

//stop the scrolling to the top
//use this if need to scroll elsewhere on page load
export const stopScrollToTop = () => {
	if(scrollToTopTimer) clearTimeout(scrollToTopTimer);
	scrollToTopTimer = null;
}

//scroll to position
let scrollTopTimer
export const scrollTop = (to, cb) => {
	stopScrollTop();

	let top = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
	if(to<0) to = 0;
	if(to>document.body.scrollHeight -window.innerHeight){
		to = document.body.scrollHeight - window.innerHeight;
	}

	scrollTopTimer = setTimeout(()=>{
		window.scrollTo(0, top + (to - top) * .3);
		if (Math.abs(top - to)<4){
			stopScrollTop();
			window.scrollTo(0, to);
			if(cb) cb();
			return;
		}
		scrollTop(to, cb);
	}, 1000/60);
}
export const stopScrollTop = () => {
	if(scrollTopTimer) clearTimeout(scrollTopTimer);
	scrollTopTimer = null;
}

//scroll to element scroll pos
let scrollElemTopTimer
export const scrollElemTop = (elem, to, cb) => {
	stopScrollTop();

	let top = elem.scrollTop;
	if(to<0) to = 0;
	if(to>elem.scrollHeight - elem.clientHeight){
		to = elem.scrollHeight - elem.clientHeight;
	}

	scrollElemTopTimer = setTimeout(()=>{
		elem.scrollTop += (to - elem.scrollTop)*.3;
		if (Math.abs(top - to)<4){
			stopScrollTop();
			elem.scrollTop = to;
			if(cb) cb();
			return;
		}
		scrollElemTop(elem, to, cb);
	}, 1000/45);
}
export const stopElemScrollTop = () => {
	if(scrollElemTopTimer) clearTimeout(scrollElemTopTimer);
	scrollElemTopTimer = null;
}




//put zeroes in front of string when needed
export const pad = (n, width, z) => {
	z = z || '0'
	  n = n + ''
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

//uppercase first character
export const ucfirst = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//convert string into url-friendly format
export const slugify = (text) => {
	return text.toString().toLowerCase()
	    .replace(/\s+/g, '-')    
	    .replace(/[^\w\-]+/g, '')
	    .replace(/\-\-+/g, '-')  
	    .replace(/^-+/, '')      
	    .replace(/-+$/, '');     
}

//add thousand delimiter and optional 2 decimal places
export const formatPrice = (v, decimal) => {
	if(decimal==undefined) decimal = 2
	return Number(v).toLocaleString('en-US', {minimumFractionDigits: decimal});
}

//convert thousands to use 'k'
export const formatThousands = v => {
	if(v<999) return v;
	else{
		v /= 1000;
		if(v == v.toFixed(1)) return v+'k';
		else return v.toFixed(1)+'k';
	}
}

//forEach polyfill for IE11
export const polyfillForEach = () => {
	if ( typeof NodeList.prototype.forEach === "function" ) return false;
	NodeList.prototype.forEach = Array.prototype.forEach;
}

//custom event polyfill
export const polyfillEvent = () => {
	if ( typeof window.CustomEvent === "function" ) return false; //If not IE
	function CustomEvent ( event, params ) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };
		var evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	}
  	CustomEvent.prototype = window.Event.prototype;
  	window.CustomEvent = CustomEvent;
}

//parse query string as object
export const readQueryString = qs => {
	let queryArr = qs.replace('?', '').split('&');
	let queryObj = {};
	queryArr.filter(q => {return q}).forEach(q => {
		let query = q.split('=');
		queryObj[query[0]] = query[1];
	});
	return queryObj;
}

//loop through array of dates and group sequential dates together
export const groupDates = (dates) => {
	if(!dates || dates.length<1) return;

	//convert to ticks for easy calcuation
	//remove duplicates
	//sort in ascending order
	//group by dates
	//then convert back to date
	let groupIndex = -1;
	let stackLast;
	
	return dates
		.map(d => { return d.getTime() })
		.filter(function (d, i, arr) {return arr.indexOf(d) === i;})
		.sort()
		.reduce(function(stack, next) {
        	stackLast = stack[groupIndex];
            stackLast = stackLast ? stackLast[stackLast.length-1] : 0;

			if (next - stackLast > 86400000) groupIndex++;
			if (!stack[groupIndex]) stack[groupIndex] = [];
			stack[groupIndex].push(next);

			return stack;
		}, [])
		.map(g => { return g.map(d => { return new Date(d) }) } );	
}

//compare 2 arrays to see if they are different
export const areArraysDifferent = (arr1, arr2) => {
    if (!arr1 || !arr2) return false;
    if (arr1.length != arr2.length) return true;

    for (var i = 0, l=arr1.length; i < l; i++) {
        // Check if we have nested arrays
        if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arr1[i].equals(arr2[i]))
                return true;       
        }           
        else if (arr1[i] != arr2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return true;   
        }           
    }       
    return false;
}

