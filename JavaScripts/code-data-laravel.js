// ============================================================
// CODE DATA - Laravel/PHP
// ============================================================
// Contains all Laravel/PHP code samples for the code preview viewer.
//
// FORMAT: add("slide-key", "laravel", "filename", `code`)
//   slide-key : slide identifier (e.g. "sslide-0")
//   stack     : "laravel"
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

  // These sections are now in separate files under JavaScripts/laravel/
    
    
    
    
    
    
    
    
    
    
    
    
  
    
    
    
    
  
  // vlslide-* (View Ledger) and vrslide-* (View Results) are now in:
  //   JavaScripts/laravel/view-ledger.js
  //   JavaScripts/laravel/view-results.js
  
  // wslide-* (Quick Start Wizard) are now in:
  //   JavaScripts/laravel/quick-start-wizard.js

  // Game-type-specific steps (calcutta, ryder_cup, horse_race) are now in:
  //   JavaScripts/laravel/add-score-calcutta.js
  //   JavaScripts/laravel/add-score-ryder-cup.js
  //   JavaScripts/laravel/add-score-horse-race.js

})();