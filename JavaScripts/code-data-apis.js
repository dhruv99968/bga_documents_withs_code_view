// ============================================================
// CODE DATA - APIs
// ============================================================
// Contains all APIs code samples for the code preview viewer.
//
// FORMAT: add("slide-key", "apis", "filename", `code`)
//   slide-key : slide identifier (e.g. "sslide-0")
//   stack     : "apis"
//   filename  : displayed in file tab
//   code      : source in backtick literal
//
// TO EDIT: Find the section, edit code between backticks.
// Escape inside backticks: backtick as \`  backslash as \\
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function(){
  function add(k,s,n,c){
    window.CODE_DATA[k]=window.CODE_DATA[k]||{};
    window.CODE_DATA[k][s]=window.CODE_DATA[k][s]||[];
    window.CODE_DATA[k][s].push({name:n,code:c});
  }

  // These sections are now in separate files under JavaScripts/api/
      
                
                
  
  
      
        
                                                                                                  

  // vlslide-* (View Ledger) and vrslide-* (View Results) are now in:
  //   JavaScripts/api/view-ledger.js
  //   JavaScripts/api/view-results.js



  // Game-type-specific steps (calcutta, ryder_cup, horse_race) are now in:
  //   JavaScripts/api/add-score-calcutta.js
  //   JavaScripts/api/add-score-ryder-cup.js
  //   JavaScripts/api/add-score-horse-race.js

})();
