
export function sud_tab(array, index){
  var tab = [];
  for (let i = 0; i < array.length; i++) {
    if (i != index) {
      tab.push(array[i]);
    }
  }
  //console.log(tab);
  return tab;
}
export function pile_tab(array, element){
  var tab = [ element ];
  tab = tab.concat( array.map( item => item ) );
  //console.log(tab);
  return tab;
}
export function getDateTimeSpan( date ) {
  return Math.floor(date.getTime()/ 1000);
}

export function timeRem( end, time ){
    let currentDate = Math.floor( Date.now() / 1000 );
    let date = getDateTimeSpan( new Date( end ) );
  
    let timeRem = date - currentDate ;
    let ds = timeRem - time;
  
    return ( ds ) ;
}