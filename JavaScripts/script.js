window.Prism = window.Prism || {}; if(window.Prism) window.Prism.manual = true;

    // ── PROGRESS BAR ──
    window.addEventListener('scroll', function(){
      var s = document.documentElement.scrollTop || document.body.scrollTop;
      var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      document.getElementById('progress-bar').style.width = (s/h*100)+'%';
      var btn = document.getElementById('back-to-top');
      btn.classList.toggle('show', s > 300);
    });
    document.getElementById('back-to-top').addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });

    // ── MOBILE SIDEBAR ──
    document.getElementById('mob-toggle').addEventListener('click', function(){
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('mob-overlay').style.display = document.getElementById('sidebar').classList.contains('open') ? 'block' : 'none';
    });
    document.getElementById('mob-overlay').addEventListener('click', function(){
      document.getElementById('sidebar').classList.remove('open');
      this.style.display = 'none';
    });

    // ── SIDEBAR DROPDOWN ──
    function toggleDrop(btn){
      btn.classList.toggle('open');
      var d = btn.nextElementSibling;
      d.classList.toggle('open');
    }

    // ── FAQ ──
    function toggleFaq(header){
      var item = header.parentElement;
      item.classList.toggle('open');
    }

    // ── COLLAPSIBLE API CARDS ──
    // For any screen panel (.slide-api) that documents 2+ API calls, turn each
    // API card into an FAQ-style accordion item: collapsed by default, click the
    // header to expand its details. Single-API screens are left fully expanded.
    (function setupApiAccordions(){
      // A card counts as an "API card" if it contains an endpoint code like /api/...
      function isApiCard(el){
        if(!el || el.nodeType !== 1) return false;
        var codes = el.querySelectorAll('code');
        for(var i = 0; i < codes.length; i++){
          if(/\/api\//i.test(codes[i].textContent)) return true;
        }
        return false;
      }
      var panels = document.querySelectorAll('.slide-api');
      Array.prototype.forEach.call(panels, function(panel){
        var cards = Array.prototype.filter.call(panel.children, isApiCard);
        if(cards.length < 2) return; // only collapse when the screen has multiple APIs
        cards.forEach(function(card){
          if(card.classList.contains('api-card')) return; // idempotent
          var head = card.firstElementChild;
          if(!head) return;
          card.classList.add('api-card');
          head.classList.add('api-card-head');
          if(!head.querySelector('.api-chevron')){
            var chev = document.createElement('i');
            chev.className = 'bi bi-chevron-down api-chevron';
            head.appendChild(chev);
          }
          // Move everything after the header into a collapsible body
          var body = document.createElement('div');
          body.className = 'api-card-body';
          while(head.nextSibling){ body.appendChild(head.nextSibling); }
          card.appendChild(body);
          head.addEventListener('click', function(){ card.classList.toggle('open'); });
          // collapsed by default (matches the FAQ behaviour)
        });
      });
    })();

    // ── CLAUDE-STYLE CODE / PREVIEW VIEWER ──
    // Add a pink "property" token for field/getter access (e.g. ColorCode.buttonBgColor,
    // CustomStyle.heading6Style) so fields stand out like in Android Studio.
    // PHP already emits a `property` token for ->member access; Dart needs one added.
    (function addPinkTokens(){
      if(!window.Prism || !Prism.languages) return;
      try {
        if(Prism.languages.dart){
          Prism.languages.insertBefore('dart','punctuation',{
            // identifier after a dot that is NOT a method call ( "(" or "<" ) = a field/getter
            'property': { pattern:/(\.\s*)[A-Za-z_$][\w$]*(?!\s*[(<])/, lookbehind:true }
          });
        }
      } catch(e){}
    })();
    // Builds an App Screen (screenshot) + Code (Flutter/Dart, Laravel/PHP) viewer
    // into every .code-preview-mount, sourcing code from the text/x-code blocks.
    (function setupCodeViewers(){
      var SHOTS = {
        'sslide-0': { src:'images/signUpScreen.png',          alt:'Account Details Screen' },
        'sslide-1': { src:'images/otpVerificationScreen.png',  alt:'OTP Verification Screen' },
        'sslide-2': { src:'images/setPasswordScreen.png',      alt:'Set Password Screen' },
        'sslide-3': { src:'images/courseSelectionScreen.png',  alt:'Course Selection Screen' },
        'cgslide-0': { src:'images/selectEvent.png', alt:'Create or Select Event' },
        'cgslide-1': { src:'images/selectNewTeeSheetImg.png', alt:'Create or Select Tee Sheet' },
        'cgslide-2': { src:'images/321_milo_image/321MiloCreateGame.png', alt:'Set Game Name & Game Type' },
        'cgslide-3': { src:'images/321_milo_image/321MiloSetMatchDetails.png', alt:'Set Match Details' },
        'cgslide-4': { src:'images/selectStartDateTime.png', alt:'Select Start Date & Time' },
        'cgslide-5': { src:'images/321_milo_image/321MiloSetPerMatchHoles.png', alt:'Set Per Match Holes' },
        'cgslide-6': { src:'images/321_milo_image/321MiloSetAmountforEach.png', alt:'Set Amount for Each' },
        'cgslide-7': { src:'images/321_milo_image/321MiloSetPoints.png', alt:'Set Points' },
        'cgslide-8': { src:'images/chooseGameThumbnail.png', alt:'Choose Game Thumbnail' },
        'cgslide-9': { src:'images/321_milo_image/321MiloGameCreatedSuccessfully.png', alt:'Game Created Successfully' },
        'asslide-321milo-0':  { src:'images/321MiloSelectFoursome.png', alt:'Select Foursome' },
        'asslide-321milo-1':  { src:'images/321MiloFoursomePlayers.png', alt:'Generate Matches' },
        'asslide-321milo-2':  { src:'images/321MiloMatchConfiguration.png', alt:'Match Configuration' },
        'asslide-321milo-3':  { src:'images/321MiloSelectFoursomeProgress.png', alt:'Add Foursome Setting' },
        'asslide-321milo-4':  { src:'images/321MiloFoursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-321milo-5':  { src:'images/321_milo_image/321MiloTapAddScore.png', alt:'Tap Add Score' },
        'asslide-321milo-6':  { src:'images/321_milo_image/321Milo-18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-321milo-7':  { src:'images/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-321milo-8':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-321milo-9':  { src:'images/leaderboard.png', alt:'Leaderboard' },
        'asslide-321milo-10': { src:'images/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-321milo-11': { src:'images/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-vegas-0':  { src:'images/vegas_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-vegas-1':  { src:'images/vegas_image/foursomePlayers.png', alt:'Generate Matches' },
        'asslide-vegas-2':  { src:'images/vegas_image/matchConfiguration.png', alt:'Match Configuration' },
        'asslide-vegas-3':  { src:'images/vegas_image/selectFoursomeProgress.png', alt:'Add Foursome Setting' },
        'asslide-vegas-4':  { src:'images/vegas_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-vegas-5':  { src:'images/vegas_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-vegas-6':  { src:'images/vegas_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-vegas-7':  { src:'images/vegas_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-vegas-8':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-vegas-9':  { src:'images/vegas_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-vegas-10': { src:'images/vegas_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-vegas-11': { src:'images/vegas_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-scramble-0':  { src:'images/vegas_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-scramble-1':  { src:'images/vegas_image/foursomePlayers.png', alt:'Generate Matches' },
        'asslide-scramble-2':  { src:'images/vegas_image/matchConfiguration.png', alt:'Match Configuration' },
        'asslide-scramble-3':  { src:'images/vegas_image/selectFoursomeProgress.png', alt:'Add Foursome Setting' },
        'asslide-scramble-4':  { src:'images/scramble_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-scramble-5':  { src:'images/vegas_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-scramble-6':  { src:'images/vegas_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-scramble-7':  { src:'images/scramble_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-scramble-8':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-scramble-9':  { src:'images/vegas_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-scramble-10': { src:'images/scramble_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-scramble-11': { src:'images/vegas_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-progskins-0':  { src:'images/progressive_skins_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-progskins-1':  { src:'images/progressive_skins_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-progskins-2':  { src:'images/progressive_skins_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-progskins-3':  { src:'images/progressive_skins_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-progskins-4':  { src:'images/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-progskins-5':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-progskins-6':  { src:'images/leaderboard.png', alt:'Leaderboard' },
        'asslide-progskins-7':  { src:'images/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-progskins-8':  { src:'images/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-regular_skins-0':  { src:'images/regular_skins_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-regular_skins-1':  { src:'images/regular_skins_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-regular_skins-2':  { src:'images/regular_skins_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-regular_skins-3':  { src:'images/regular_skins_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-regular_skins-4':  { src:'images/regular_skins_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-regular_skins-5':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-regular_skins-6':  { src:'images/regular_skins_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-regular_skins-7':  { src:'images/regular_skins_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-regular_skins-8':  { src:'images/regular_skins_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-stroke_play-0':  { src:'images/regular_skins_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-stroke_play-1':  { src:'images/stroke_play_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-stroke_play-2':  { src:'images/regular_skins_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-stroke_play-3':  { src:'images/regular_skins_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-stroke_play-4':  { src:'images/stroke_play_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-stroke_play-5':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-stroke_play-6':  { src:'images/regular_skins_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-stroke_play-7':  { src:'images/stroke_play_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-stroke_play-8':  { src:'images/regular_skins_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-stableford-0':  { src:'images/regular_skins_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-stableford-1':  { src:'images/stroke_play_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-stableford-2':  { src:'images/regular_skins_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-stableford-3':  { src:'images/regular_skins_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-stableford-4':  { src:'images/stableford_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-stableford-5':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-stableford-6':  { src:'images/regular_skins_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-stableford-7':  { src:'images/stableford_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-stableford-8':  { src:'images/regular_skins_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-wolf-0':  { src:'images/regular_skins_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-wolf-1':  { src:'images/wolf_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-wolf-2':  { src:'images/regular_skins_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-wolf-3':  { src:'images/regular_skins_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-wolf-4':  { src:'images/wolf_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-wolf-5':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-wolf-6':  { src:'images/regular_skins_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-wolf-7':  { src:'images/wolf_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-wolf-8':  { src:'images/regular_skins_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-horse_race-0':  { src:'images/horse_race_image/hrGameSetupSteps.png', alt:'Game Setup' },
        'asslide-horse_race-1':  { src:'images/horse_race_image/selectAcrossFoursomeTeams1.png', alt:'Across Teams' },
        'asslide-horse_race-2':  { src:'images/horse_race_image/assignTeamsPerPlayer.png', alt:'Assign Teams' },
        'asslide-horse_race-3':  { src:'images/horse_race_image/reviewTeamAssignments.png', alt:'Team Selection' },
        'asslide-horse_race-4':  { src:'images/horse_race_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-horse_race-5':  { src:'images/horse_race_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-horse_race-6':  { src:'images/horse_race_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-horse_race-7':  { src:'images/horse_race_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-horse_race-8':  { src:'images/horse_race_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-horse_race-9':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-horse_race-10': { src:'images/horse_race_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-horse_race-11': { src:'images/horse_race_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-horse_race-12': { src:'images/horse_race_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-ryder_cup-0':  { src:'images/ryder_cup_image/ryderCupCaptainSelected.png', alt:'Captain Selection' },
        'asslide-ryder_cup-1':  { src:'images/ryder_cup_image/ryderCupPickPlayersStep.png', alt:'Pick Players' },
        'asslide-ryder_cup-2':  { src:'images/ryder_cup_image/ryderCupSelectPlayers.png', alt:'Select Players' },
        'asslide-ryder_cup-3':  { src:'images/ryder_cup_image/ryderCupTeeTimeSelection.png', alt:'Tee Time' },
        'asslide-ryder_cup-4':  { src:'images/ryder_cup_image/ryderCupGameWizardPlayerSelection.png', alt:'Player Selection' },
        'asslide-ryder_cup-5':  { src:'images/ryder_cup_image/allFoursomesSelectionDone.png', alt:'Select Players' },
        'asslide-ryder_cup-6':  { src:'images/ryder_cup_image/ryderCupGameWizardGenerateMatch.png', alt:'Generate Match' },
        'asslide-ryder_cup-7':  { src:'images/ryder_cup_image/ryderCupGameWizardConfirmGenerate.png', alt:'Confirm' },
        'asslide-ryder_cup-8':  { src:'images/ryder_cup_image/ryderCupGameWizardMatchConfiguration.png', alt:'Match Config' },
        'asslide-ryder_cup-9':  { src:'images/ryder_cup_image/ryderCupGameWizardAddScore.png', alt:'Add Score' },
        'asslide-ryder_cup-10': { src:'images/ryder_cup_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-ryder_cup-11': { src:'images/ryder_cup_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-ryder_cup-12': { src:'images/ryder_cup_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-ryder_cup-13': { src:'images/ryder_cup_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-ryder_cup-14': { src:'images/ryder_cup_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-ryder_cup-15': { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-ryder_cup-16': { src:'images/ryder_cup_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-ryder_cup-17': { src:'images/ryder_cup_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-ryder_cup-18': { src:'images/ryder_cup_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-calcutta-0':  { src:'images/calcutta_image/round1PlayerSelection.png', alt:'Round-1 Select' },
        'asslide-calcutta-1':  { src:'images/calcutta_image/round1PlayerSheet.png', alt:'Player List' },
        'asslide-calcutta-2':  { src:'images/calcutta_image/round1SelectPlayer.png', alt:'Select & Bid' },
        'asslide-calcutta-3':  { src:'images/calcutta_image/completeRound1Sheet.png', alt:'Round-1 Done' },
        'asslide-calcutta-4':  { src:'images/calcutta_image/matchConfigurationStep.png', alt:'Match Config' },
        'asslide-calcutta-5':  { src:'images/calcutta_image/matchConfigurationPlayerSelection.png', alt:'Player Selection' },
        'asslide-calcutta-6':  { src:'images/calcutta_image/cardDistribution.png', alt:'Card Distribution' },
        'asslide-calcutta-7':  { src:'images/calcutta_image/matchConfigurationWithCardDistribution.png', alt:'Foursomes' },
        'asslide-calcutta-8':  { src:'images/calcutta_image/generateMacthes.png', alt:'Generate Matches' },
        'asslide-calcutta-9':  { src:'images/calcutta_image/round2PlayerSelection.png', alt:'Round-2 Select' },
        'asslide-calcutta-10': { src:'images/calcutta_image/round2PlayerSelectionSheet.png', alt:'Round-2 Sheet' },
        'asslide-calcutta-11': { src:'images/calcutta_image/round2SelectPlayer.png', alt:'Select Player (R2)' },
        'asslide-calcutta-12': { src:'images/calcutta_image/completeRound2PlayerSelection.png', alt:'Round-2 Done' },
        'asslide-calcutta-13': { src:'images/calcutta_image/round3PlayerSelectionStep.png', alt:'Round-3 Select' },
        'asslide-calcutta-14': { src:'images/calcutta_image/round3PlayerSelection.png', alt:'Round-3 Sheet' },
        'asslide-calcutta-15': { src:'images/calcutta_image/round3SelectPlayer.png', alt:'Select Player (R3)' },
        'asslide-calcutta-16': { src:'images/calcutta_image/completeRound3PlayerSelection.png', alt:'Round-3 Done' },
        'asslide-calcutta-17': { src:'images/calcutta_image/addScoreStep.png', alt:'Add Score Entry' },
        'asslide-calcutta-18': { src:'images/calcutta_image/selectFoursome.png', alt:'Select Foursome' },
        'asslide-calcutta-19': { src:'images/calcutta_image/foursomeSettingsBottomSheet.png', alt:'Foursome Settings' },
        'asslide-calcutta-20': { src:'images/calcutta_image/tapAddScore.png', alt:'Tap Add Score' },
        'asslide-calcutta-21': { src:'images/calcutta_image/18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-calcutta-22': { src:'images/calcutta_image/scoreEntryScreen.png', alt:'Scorecard' },
        'asslide-calcutta-23': { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-calcutta-24': { src:'images/calcutta_image/leaderboard.png', alt:'Leaderboard' },
        'asslide-calcutta-25': { src:'images/calcutta_image/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-calcutta-26': { src:'images/calcutta_image/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'asslide-0':  { src:'images/321MiloSelectFoursome.png', alt:'Select Foursome' },
        'asslide-1':  { src:'images/321MiloFoursomePlayers.png', alt:'Generate Matches' },
        'asslide-2':  { src:'images/321MiloMatchConfiguration.png', alt:'Match Configuration' },
        'asslide-3':  { src:'images/321MiloSelectFoursomeProgress.png', alt:'Add Foursome Setting' },
        'asslide-4':  { src:'images/321MiloFoursomeSettingsBottomSheet.png', alt:'Foursome Settings (Bottom Sheet)' },
        'asslide-5':  { src:'images/321_milo_image/321MiloTapAddScore.png', alt:'Tap Add Score' },
        'asslide-6':  { src:'images/321_milo_image/321Milo-18-HoleScoreGrid.png', alt:'18-Hole Score Grid' },
        'asslide-7':  { src:'images/scoreEntryScreen.png', alt:'Scorecard — Enter & Save Score' },
        'asslide-8':  { src:'images/skode&JunkRewards.png', alt:'Skode & Junk Rewards' },
        'asslide-9':  { src:'images/leaderboard.png', alt:'Leaderboard' },
        'asslide-10': { src:'images/viewAddScoreResultsTab.png', alt:'View Results Tab' },
        'asslide-11': { src:'images/allHolesScoreAdded.png', alt:'All Holes Score Added' },
        'vrslide-0': { src:'images/321_milo_image/321MiloAllPlayersResult.png', alt:'All Players Result' },
        'vrslide-1': { src:'images/321_milo_image/321MiloFoursomeTab.png', alt:'Foursome Tab' },
        'vrslide-2': { src:'images/321_milo_image/321MiloFoursomeScorecard.png', alt:'Foursome Scorecard' },
        'vrslide-3': { src:'images/321_milo_image/321MiloFoursomeWinners.png', alt:'Foursome Winners' },
        'vlslide-0': { src:'images/321_milo_image/321MiloLedgerPageView.png', alt:'Ledger Page View' },
        'vlslide-1': { src:'images/viewPayAmount.png', alt:'Tap Pay — Bottom Sheet' },
        'vlslide-2': { src:'images/viewWinningAmount.png', alt:'Tap View — Winning Amount' },
        'vlslide-3': { src:'images/payViaPayPal.png', alt:'Pay via PayPal' },
        'vlslide-4': { src:'images/payConfirmed.png', alt:'Pay Confirmed' },
        'welcome-detail': { src:'images/welcome.png', alt:'Welcome Screen' },
        'agenda-detail': { src:'images/agendaTab.png', alt:'Agenda Tab' },
        'home-detail': { src:'images/homeDashboard.png', alt:'Home Dashboard' },
        'viewgame-detail': { src:'images/321_milo_image/321MiloGameOverview.png', alt:'Game Overview' },
        'addbets-detail': { src:'images/321_milo_image/321MiloAddBetsScreen.png', alt:'Add Bets Screen' },
        'wslide-0': { src:'images/welcome.png', alt:'Welcome Screen' },
        'wslide-1': { src:'images/signUpScreen.png', alt:'Sign Up' },
        'wslide-2': { src:'images/courseSelectionScreen.png', alt:'Course Selection' },
        'wslide-3': { src:'images/homeDashboard.png', alt:'Home Dashboard' },
        'wslide-4': { src:'images/createGameScreen.png', alt:'Create Game' },
        'wslide-5': { src:'images/gameCreated.png', alt:'Game Created' },
        'wslide-6': { src:'images/321_milo_image/321MiloGameOverview.png', alt:'Game Overview' },
        'wslide-7': { src:'images/321_milo_image/321MiloAddBetsScreen.png', alt:'Add Bets' },
        'wslide-8': { src:'images/321MiloSelectFoursome.png', alt:'Select Foursome' },
        'wslide-9': { src:'images/scoreEntryScreen.png', alt:'Score Entry' }
      };
      var STACKS = [
        { id:'flutter', label:'Flutter / Dart', cls:'cp-flutter', svg:'<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>', dot:'#02569B' },
        { id:'laravel', label:'Laravel / PHP',  cls:'cp-laravel', svg:'<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="#FF2D20" d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/></svg>', dot:'#FF2D20' },
        { id:'apis', label:'APIs', cls:'cp-api', svg:'<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path fill="#10b981" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>', dot:'#10b981' }
      ];

      // Collect code from external data files: CODE_DATA[key][stack] = [{name, code}, ...]
      var data = window.CODE_DATA || {};

      // Maps asslide-{gametype}-N to the base asslide-N key that has code data.
      // 9-step games skip the "Generate Matches / Match Config / Foursome Setting" steps.
      // Game-type-unique steps (Calcutta rounds, Ryder Cup captains, Horse Race teams)
      // fall back to the nearest logical equivalent from the 12-step base flow.
      function asslideBaseKey(key) {
        var m = key.match(/^asslide-([a-z0-9_]+)-(\d+)$/);
        if (!m) return null;
        var type = m[1], n = parseInt(m[2], 10);
        // 12-step types: direct 1-to-1
        if (type === '321milo' || type === 'vegas' || type === 'scramble') return 'asslide-' + n;
        // 9-step types: [Select Foursome, Foursome Settings, Add Score, Holes Grid, Scorecard, Skode&Junk, Leaderboard, Results, All Holes Done]
        //               map to base indices [0, 4, 5, 6, 7, 8, 9, 10, 11]
        if (type === 'progskins' || type === 'regular_skins' || type === 'stroke_play' || type === 'stableford' || type === 'wolf') {
          var map9 = [0, 4, 5, 6, 7, 8, 9, 10, 11];
          return 'asslide-' + (map9[n] !== undefined ? map9[n] : 0);
        }
        // horse_race (13): steps 0-3 unique setup → fall back to asslide-0; steps 4-12 → base 0,4,5,6,7,8,9,10,11
        if (type === 'horse_race') {
          var mapHR = [0, 0, 0, 0,  0, 4, 5, 6, 7, 8, 9, 10, 11];
          return 'asslide-' + (mapHR[n] !== undefined ? mapHR[n] : 0);
        }
        // ryder_cup (19): steps 0-9 unique → fall back to asslide-0; steps 10-18 → base 0,4,5,6,7,8,9,10,11
        if (type === 'ryder_cup') {
          var mapRC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 4, 5, 6, 7, 8, 9, 10, 11];
          return 'asslide-' + (mapRC[n] !== undefined ? mapRC[n] : 0);
        }
        // calcutta (27): steps 0-17 unique → fall back to asslide-0; steps 18-26 → base 0,4,5,6,7,8,9,10,11
        if (type === 'calcutta') {
          var mapCA = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,4,5,6,7,8,9,10,11];
          return 'asslide-' + (mapCA[n] !== undefined ? mapCA[n] : 0);
        }
        return null;
      }

      function build(mount){
        var key = mount.getAttribute('data-key');
        var shot = SHOTS[key] || {};
        var files = data[key] || {};
        // Fall back to base asslide-N code data when no game-type-specific entry exists
        if (!Object.keys(files).length) {
          var fbKey = asslideBaseKey(key);
          if (fbKey) files = data[fbKey] || {};
        }

        var wrap = document.createElement('div');
        wrap.className = 'code-preview';
        wrap.setAttribute('data-key', key);

        // Toolbar (Claude artifact-panel style)
        var tb = document.createElement('div');
        tb.className = 'cp-toolbar';

        // LEFT: eye / code segmented toggle
        var tabs = document.createElement('div');
        tabs.className = 'cp-tabs';
        tabs.innerHTML =
          '<button class="cp-tab active" data-view="design" title="App Screen"><i class="bi bi-eye"></i></button>' +
          '<button class="cp-tab" data-view="code" title="Code"><i class="bi bi-code-slash"></i></button>';
        tb.appendChild(tabs);

        // CENTER: title (screen name · type)
        var screenTitle = (shot.alt || 'Screen').replace(/\s*Screen$/i, '');
        var titleEl = document.createElement('div');
        titleEl.className = 'cp-title';
        tb.appendChild(titleEl);

        // RIGHT: controls
        var right = document.createElement('div');
        right.className = 'cp-right';

        // stack logos (code view only)
        var stacksEl = document.createElement('div');
        stacksEl.className = 'cp-stacks';
        STACKS.forEach(function(st, i){
          if(!files[st.id]) return;
          var b = document.createElement('button');
          b.className = 'cp-stack ' + st.cls + (i===0 ? ' active' : '');
          b.setAttribute('data-stack', st.id);
          b.innerHTML = (st.svg || ('<i class="bi ' + st.icon + '"></i>')) + '<span class="cp-tip">' + st.label + '</span>';
          stacksEl.appendChild(b);
        });
        right.appendChild(stacksEl);

        // theme toggle (code view only)
        var themeEl = document.createElement('div');
        themeEl.className = 'cp-theme';
        themeEl.innerHTML =
          '<button class="cp-theme-btn active" data-theme="island-light" title="IsLand Light"><i class="bi bi-sun-fill"></i></button>' +
          '<button class="cp-theme-btn" data-theme="island-dark" title="IsLand Dark"><i class="bi bi-moon-stars-fill"></i></button>';
        right.appendChild(themeEl);

        var divider = document.createElement('span'); divider.className = 'cp-divider'; right.appendChild(divider);

        // Copy pill (code view only)
        var copyBtn = document.createElement('button');
        copyBtn.className = 'cp-copy';
        copyBtn.innerHTML = '<span class="cp-copy-lbl"><i class="bi bi-clipboard"></i> Copy</span><span class="cp-caret"><i class="bi bi-chevron-down"></i></span>';
        var copyLbl = copyBtn.querySelector('.cp-copy-lbl');
        right.appendChild(copyBtn);

        // refresh
        var refreshBtn = document.createElement('button');
        refreshBtn.className = 'cp-icbtn'; refreshBtn.title = 'Refresh';
        refreshBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
        right.appendChild(refreshBtn);

        // expand / close
        var exp = document.createElement('button');
        exp.className = 'cp-icbtn cp-expand'; exp.title = 'Expand';
        exp.innerHTML = '<i class="bi bi-arrows-angle-expand"></i>';
        right.appendChild(exp);

        tb.appendChild(right);
        wrap.appendChild(tb);

        // Body
        var body = document.createElement('div');
        body.className = 'cp-body';

        // App Screen pane = screenshot + screen details (from the hidden cp-details-src)
        var design = document.createElement('div');
        design.className = 'cp-pane cp-design active';
        var detailsSrc = document.querySelector('.cp-details-src[data-key="' + key + '"]');
        var detailsHtml = detailsSrc ? detailsSrc.innerHTML.replace(/<!--[\s\S]*?-->/g, '').trim() : '';
        var hasDetails = !!detailsHtml;
        design.innerHTML =
          '<div class="cp-screen-row' + (hasDetails ? '' : ' cp-screen-row--no-details') + '">' +
            '<div class="cp-shot">' +
              (shot.src
                ? '<div class="image-placeholder"><img src="' + shot.src + '" alt="' + (shot.alt||'') + '" class="app-image" /></div>'
                : '<div class="cp-details-empty">No screenshot</div>') +
            '</div>' +
            (hasDetails ? '<div class="cp-details">' + detailsHtml + '</div>' : '') +
          '</div>';
        body.appendChild(design);

        // code pane — screenshot sidebar (stays visible) + code editor
        var codePane = document.createElement('div');
        codePane.className = 'cp-pane cp-code island-light';

        var codeRow = document.createElement('div');
        codeRow.className = 'cp-code-row';

        var codeShot = document.createElement('div');
        codeShot.className = 'cp-code-shot';
        codeShot.innerHTML = shot.src
          ? '<div class="image-placeholder"><img src="' + shot.src + '" alt="' + (shot.alt||'') + '" class="app-image" /></div>'
          : '<div class="cp-details-empty">No screenshot</div>';
        codeRow.appendChild(codeShot);

        var codeMain = document.createElement('div');
        codeMain.className = 'cp-code-main';

        var filesBar = document.createElement('div');
        filesBar.className = 'cp-files';
        var editor = document.createElement('div');
        editor.className = 'cp-editor';
        var fileBar = document.createElement('div');
        fileBar.className = 'cp-filebar';
        var fname = document.createElement('span');
        fname.className = 'cp-filename';
        fileBar.appendChild(fname);
        var scroll = document.createElement('div');
        scroll.className = 'cp-code-scroll';
        var pre = document.createElement('pre');
        var codeEl = document.createElement('code');
        pre.appendChild(codeEl);
        scroll.appendChild(pre);
        editor.appendChild(fileBar);
        editor.appendChild(scroll);
        codeMain.appendChild(filesBar);
        codeMain.appendChild(editor);
        codeRow.appendChild(codeMain);
        codePane.appendChild(codeRow);
        body.appendChild(codePane);
        wrap.appendChild(body);

        // ── state + rendering ──
        var state = { view:'design', stack: (files.flutter ? 'flutter' : Object.keys(files)[0]), fileIdx:0, theme:'island-light' };
        var LANG = { flutter:'dart', laravel:'php', apis:'dart' };

        function renderFiles(){
          var list = files[state.stack] || [];
          var dot = (STACKS.filter(function(s){return s.id===state.stack;})[0]||{}).dot || '#888';
          filesBar.innerHTML = '';
          list.forEach(function(f, i){
            var b = document.createElement('button');
            b.className = 'cp-file' + (i===state.fileIdx ? ' active' : '');
            b.innerHTML = '<span class="cp-dot" style="background:'+dot+'"></span>' + f.name;
            b.addEventListener('click', function(){ state.fileIdx = i; renderCode(); });
            filesBar.appendChild(b);
          });
        }
        function renderCode(){
          var list = files[state.stack] || [];
          var f = list[state.fileIdx] || list[0] || { name:'', code:'' };
          Array.prototype.forEach.call(filesBar.children, function(b, i){
            b.classList.toggle('active', i===state.fileIdx);
          });
          fname.textContent = f.name;
          var lang = LANG[state.stack] || 'clike';
          codeEl.className = 'language-' + lang;

          function applyCode(src) {
            codeEl.textContent = src;
            if(window.Prism && Prism.languages && Prism.languages[lang] && Prism.highlightElement){
              try { Prism.highlightElement(codeEl); } catch(e){}
            }
            copyBtn.classList.remove('copied');
            if(copyLbl) copyLbl.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
          }

          if(f.code !== null && f.code !== undefined) {
            applyCode(f.code);
          } else if(f.url) {
            codeEl.textContent = 'Loading...';
            fetch(f.url)
              .then(function(r){ return r.ok ? r.text() : Promise.reject(r.status); })
              .then(function(src){ f.code = src; applyCode(src); })
              .catch(function(){ codeEl.textContent = 'Could not load file from GitHub.'; });
          } else {
            applyCode(f.code || '');
          }
        }
        function renderTitle(){
          var type = state.view === 'design'
            ? 'App Screen'
            : (state.stack === 'flutter' ? 'Dart' : (state.stack === 'laravel' ? 'PHP' : (state.stack === 'apis' ? 'API' : state.stack)));
          titleEl.innerHTML =
            '<span class="cp-title-name">' + screenTitle + '</span>' +
            '<span class="cp-title-sep">·</span>' +
            '<span class="cp-title-type">' + type + '</span>';
        }
        function setTheme(t){
          state.theme = t;
          codePane.classList.remove('island-light','island-dark');
          codePane.classList.add(t);
          Array.prototype.forEach.call(themeEl.children, function(b){
            b.classList.toggle('active', b.getAttribute('data-theme')===t);
          });
        }
        function setView(v){
          state.view = v;
          wrap.classList.toggle('show-code', v==='code');
          Array.prototype.forEach.call(tabs.children, function(t){
            t.classList.toggle('active', t.getAttribute('data-view')===v);
          });
          design.classList.toggle('active', v==='design');
          codePane.classList.toggle('active', v==='code');
          if(v==='code'){ renderFiles(); renderCode(); }   // default stack = flutter
          renderTitle();
          // propagate show-code to parent for two-column layout
          if(key.indexOf('vrslide')===0){
            var ps = wrap.closest('.wizard-slide');
            if(ps) ps.classList.toggle('vr-show-code', v==='code');
          }
          if(key==='viewgame-detail'){
            var pc = wrap.closest('.content-card');
            if(pc) pc.classList.toggle('vg-show-code', v==='code');
          }
        }
        function setStack(id){
          state.stack = id; state.fileIdx = 0;
          Array.prototype.forEach.call(stacksEl.children, function(b){
            b.classList.toggle('active', b.getAttribute('data-stack')===id);
          });
          renderFiles(); renderCode(); renderTitle();
        }

        // wire interactions
        Array.prototype.forEach.call(tabs.children, function(t){
          t.addEventListener('click', function(){ setView(t.getAttribute('data-view')); });
        });
        Array.prototype.forEach.call(stacksEl.children, function(b){
          b.addEventListener('click', function(){ setStack(b.getAttribute('data-stack')); });
        });
        Array.prototype.forEach.call(themeEl.children, function(b){
          b.addEventListener('click', function(){ setTheme(b.getAttribute('data-theme')); });
        });
        copyBtn.addEventListener('click', function(){
          var text = codeEl.textContent;
          var done = function(){
            copyBtn.classList.add('copied');
            if(copyLbl) copyLbl.innerHTML = '<i class="bi bi-check2"></i> Copied';
            setTimeout(function(){
              copyBtn.classList.remove('copied');
              if(copyLbl) copyLbl.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
            }, 1600);
          };
          if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(text).then(done, function(){ fallbackCopy(text); done(); });
          } else { fallbackCopy(text); done(); }
        });
        function fallbackCopy(text){
          var ta = document.createElement('textarea');
          ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch(e){}
          document.body.removeChild(ta);
        }
        // refresh → reset to App Screen + default stack/file/theme (like reloading the artifact)
        refreshBtn.addEventListener('click', function(){
          state.stack = files.flutter ? 'flutter' : Object.keys(files)[0];
          state.fileIdx = 0;
          setTheme('island-light');
          Array.prototype.forEach.call(stacksEl.children, function(b){
            b.classList.toggle('active', b.getAttribute('data-stack')===state.stack);
          });
          setView('design');
          refreshBtn.classList.add('spin');
          setTimeout(function(){ refreshBtn.classList.remove('spin'); }, 520);
        });
        // expand → minimize sidebar (zen mode)
        exp.addEventListener('click', function(){
          var on = !wrap.classList.contains('zen');
          wrap.classList.toggle('zen', on);
          document.body.classList.toggle('viewer-zen', on);
          exp.querySelector('i').className = on ? 'bi bi-arrows-angle-contract' : 'bi bi-arrows-angle-expand';
          exp.title = on ? 'Collapse' : 'Expand';
        });

        renderFiles(); renderCode();   // preload default file so Copy works in either view
        renderTitle();   // initial title (App Screen view)
        mount.replaceWith(wrap);
      }

      document.querySelectorAll('.code-preview-mount').forEach(build);
      window.buildCodePreview = build;
      window.buildCodePreview = build;

      // Esc exits zen mode
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
          var zen = document.querySelector('.code-preview.zen');
          if(zen){
            zen.classList.remove('zen');
            document.body.classList.remove('viewer-zen');
            var i = zen.querySelector('.cp-expand i'); if(i) i.className = 'bi bi-arrows-angle-expand';
            var xb = zen.querySelector('.cp-expand'); if(xb) xb.title = 'Expand';
          }
        }
      });
    })();

    // ── SIDEBAR ACTIVE LINK ──
    var sections = document.querySelectorAll('.doc-section, .gm-hero');
    var navLinks = document.querySelectorAll('.snav-link');
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          navLinks.forEach(function(l){ l.classList.remove('active-link'); });
          var id = e.target.id;
          var active = document.querySelector('.snav-link[href="#'+id+'"]');
          if(active) active.classList.add('active-link');
        }
      });
    },{threshold:.3, rootMargin:'-60px 0px -60% 0px'});
    sections.forEach(function(s){ observer.observe(s); });

    // ── SIDEBAR SEARCH ──
    document.getElementById('searchDocs').addEventListener('input', function(){
      var q = this.value.toLowerCase();
      document.querySelectorAll('.snav-link, .snav-dropdown a').forEach(function(a){
        var txt = a.textContent.toLowerCase();
        a.style.display = (!q || txt.includes(q)) ? '' : 'none';
      });
    });

    // ── LIGHTBOX ──
    document.querySelectorAll('.step-img-box img, .wizard-slide-img img').forEach(function(img){
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(){
        document.getElementById('lb-img').src = this.src;
        document.getElementById('lightbox').classList.add('open');
      });
    });
    document.getElementById('lb-close').addEventListener('click', function(){ document.getElementById('lightbox').classList.remove('open'); });
    document.getElementById('lightbox').addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });

    // ── WIZARD ──
    var NUM_SLIDES = 10;
    window.wizardGoTo = function(n){
      var steps = document.querySelectorAll('#wizardTabs .wstep');

      for(var i=0;i<NUM_SLIDES;i++){
        var s = document.getElementById('wslide-'+i);
        var t = document.querySelectorAll('.wstep')[i];
        if(s) s.classList.toggle('active', i===n);
        if(t) t.classList.toggle('active', i===n);
      }
      for(var i=0;i<NUM_SLIDES;i++){
        var dc = document.getElementById('wdots-'+i);
        if(!dc) continue;
        dc.innerHTML = '';
        for(var j=0;j<NUM_SLIDES;j++){
          var d = document.createElement('div');
          d.className = 'wdot'+(j===n?' active':'');
          dc.appendChild(d);
        }
      }
      if(steps[n]){
        steps[n].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',   // center it nicely
          block: 'nearest'
        });
      }
    };
    wizardGoTo(0);

    // ── COPY CODE ──
    document.querySelectorAll('.copy-btn-code').forEach(function(btn){
      btn.addEventListener('click', function(){
        var pre = this.closest('.code-block-wrap').querySelector('pre');
        if(pre){
          navigator.clipboard.writeText(pre.textContent).then(function(){
            btn.textContent = 'Copied!';
            setTimeout(function(){ btn.textContent = 'Copy'; }, 2000);
          });
        }
      });
    });

    // ── SIGNUP SUB-WIZARD ──
    var NUM_SIGNUP_SLIDES = 4;
    window.signupGoTo = function(n) {
      for (var i = 0; i < NUM_SIGNUP_SLIDES; i++) {
        var s = document.getElementById('sslide-' + i);
        var t = document.querySelectorAll('#signupTabs .wstep')[i];
        if (s) s.classList.toggle('active', i === n);
        if (t) t.classList.toggle('active', i === n);
      }
      for (var i = 0; i < NUM_SIGNUP_SLIDES; i++) {
        var dc = document.getElementById('sdots-' + i);
        if (!dc) continue;
        dc.innerHTML = '';
        for (var j = 0; j < NUM_SIGNUP_SLIDES; j++) {
          var d = document.createElement('div');
          d.className = 'wdot' + (j === n ? ' active' : '');
          dc.appendChild(d);
        }
      }
      var steps = document.querySelectorAll('#signupTabs .wstep');
      if (steps[n]) {
        steps[n].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    };
    signupGoTo(0);


    // ── ADD SCORE WIZARD (9 steps) ──
    <!--var NUM_AS = 9;-->
    <!--321 Milo Cod 6 Holes Matches-->
    <!--var NUM_AS = 12;-->
    var NUM_AS = 30;
    window.NUM_AS = NUM_AS;
    window.asGoTo = function(n) {

      for (var i = 0; i < window.NUM_AS; i++) {
        var s = document.getElementById('asslide-' + i);
        var t = document.querySelectorAll('#asTabs .wstep')[i];
        if (s) s.classList.toggle('active', i === n);
        if (t) t.classList.toggle('active', i === n);
      }
      for (var i = 0; i < window.NUM_AS; i++) {
        var dc = document.getElementById('asdots-' + i);
        if (!dc) continue;
        dc.innerHTML = '';
        for (var j = 0; j < window.NUM_AS; j++) {
          var d = document.createElement('div');
          d.className = 'wdot' + (j === n ? ' active' : '');
          dc.appendChild(d);
        }
      }
      var tabs = document.querySelectorAll('#asTabs .wstep');
      if (tabs[n]) tabs[n].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };
    asGoTo(0);

    // ── VIEW RESULT WIZARD (4 steps) ──
    var NUM_VR = 4;
    window.vrGoTo = function(n) {
      for (var i = 0; i < NUM_VR; i++) {
        var s = document.getElementById('vrslide-' + i);
        var t = document.querySelectorAll('#vrTabs .wstep')[i];
        if (s) s.classList.toggle('active', i === n);
        if (t) t.classList.toggle('active', i === n);
      }
      for (var i = 0; i < NUM_VR; i++) {
        var dc = document.getElementById('vrdots-' + i);
        if (!dc) continue;
        dc.innerHTML = '';
        for (var j = 0; j < NUM_VR; j++) {
          var d = document.createElement('div');
          d.className = 'wdot' + (j === n ? ' active' : '');
          dc.appendChild(d);
        }
      }
      var tabs = document.querySelectorAll('#vrTabs .wstep');
      if (tabs[n]) tabs[n].scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
    };
    vrGoTo(0);


    // ── VIEW LEDGER WIZARD (5 steps) ──
    var NUM_VL = 5;
    window.vlGoTo = function(n) {
      for (var i = 0; i < NUM_VL; i++) {
        var s = document.getElementById('vlslide-' + i);
        var t = document.querySelectorAll('#vlTabs .wstep')[i];
        if (s) s.classList.toggle('active', i === n);
        if (t) t.classList.toggle('active', i === n);
      }
      for (var i = 0; i < NUM_VL; i++) {
        var dc = document.getElementById('vldots-' + i);
        if (!dc) continue;
        dc.innerHTML = '';
        for (var j = 0; j < NUM_VL; j++) {
          var d = document.createElement('div');
          d.className = 'wdot' + (j === n ? ' active' : '');
          dc.appendChild(d);
        }
      }
      var tabs = document.querySelectorAll('#vlTabs .wstep');
      if (tabs[n]) tabs[n].scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
    };

    // ── SCROLL RESTORATION ──
    window.scrollTo(0,0);