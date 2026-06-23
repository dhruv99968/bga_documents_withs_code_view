// ============================================================
// Laravel — Add Score: CALCUTTA game type (unique steps 0–17)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Step 0 — Round-1 Select ────────────────────────────────
  add("asslide-calcutta-0", "laravel", "CalcuttaController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use App\\Models\\CalcuttaRound;
use Illuminate\\Http\\Request;

// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Players
class CalcuttaController extends Controller
{
    public function getRound1Players(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        $game = Game::with('players')->findOrFail($request->game_id);

        return response()->json([
            'status'  => true,
            'message' => 'Round 1 players fetched successfully.',
            'data'    => $game->players->map(fn($p) => [
                'id'       => $p->id,
                'name'     => $p->name,
                'handicap' => $p->handicap,
            ]),
        ]);
    }
}`);
  add("asslide-calcutta-0", "laravel", "routes/api.php", `<?php
// Calcutta — Round-1 Select routes
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-players',  [CalcuttaController::class, 'getRound1Players']);
    Route::post('round1-select',  [CalcuttaController::class, 'saveRound1Selection']);
});`);

  // ── Step 1 — Player Sheet ──────────────────────────────────
  add("asslide-calcutta-1", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Sheet
class CalcuttaController extends Controller
{
    public function getRound1Sheet(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        $sheet = CalcuttaRound::where('game_id', $request->game_id)
            ->where('round', 1)->with('player')->get()
            ->map(fn($r) => [
                'id'         => $r->player->id,
                'name'       => $r->player->name,
                'handicap'   => $r->player->handicap,
                'bid_amount' => $r->bid_amount,
                'buyer_id'   => $r->buyer_id,
            ]);

        return response()->json(['status' => true, 'data' => $sheet]);
    }
}`);
  add("asslide-calcutta-1", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-sheet', [CalcuttaController::class, 'getRound1Sheet']);
});`);

  // ── Step 2 — Select & Bid ──────────────────────────────────
  add("asslide-calcutta-2", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: submitBids
class CalcuttaController extends Controller
{
    public function submitBids(Request $request)
    {
        $request->validate([
            'game_id'          => 'required|exists:games,id',
            'organization_id'  => 'required|exists:organizations,id',
            'bids'             => 'required|array',
            'bids.*.player_id' => 'required|exists:users,id',
            'bids.*.amount'    => 'required|numeric|min:0',
        ]);

        foreach ($request->bids as $bid) {
            CalcuttaBid::updateOrCreate(
                ['game_id' => $request->game_id, 'player_id' => $bid['player_id']],
                ['amount' => $bid['amount'], 'organization_id' => $request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Bids submitted successfully.']);
    }
}`);
  add("asslide-calcutta-2", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('submit-bids', [CalcuttaController::class, 'submitBids']);
});`);

  // ── Step 3 — Round-1 Done ──────────────────────────────────
  add("asslide-calcutta-3", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Results
class CalcuttaController extends Controller
{
    public function getRound1Results(Request $request)
    {
        $results = CalcuttaBid::where('game_id', $request->game_id)
            ->with(['player', 'buyer'])->get()
            ->map(fn($b) => [
                'player_name' => $b->player->name,
                'buyer_name'  => $b->buyer->name ?? '—',
                'final_bid'   => $b->amount,
            ]);

        return response()->json(['status' => true, 'data' => $results]);
    }
}`);
  add("asslide-calcutta-3", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-results', [CalcuttaController::class, 'getRound1Results']);
});`);

  // ── Step 4 — Match Config ──────────────────────────────────
  add("asslide-calcutta-4", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: saveMatchConfig
class CalcuttaController extends Controller
{
    public function saveMatchConfig(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
            'play_type'       => 'required|in:COD,2v2 Teams,Individual',
            'holes_per_match' => 'required|in:3 Holes,6 Holes,9 Holes,18 Holes',
        ]);

        CalcuttaConfig::updateOrCreate(
            ['game_id' => $request->game_id],
            ['play_type' => $request->play_type, 'holes_per_match' => $request->holes_per_match,
             'organization_id' => $request->organization_id]
        );

        return response()->json(['status' => true, 'message' => 'Match config saved.']);
    }
}`);
  add("asslide-calcutta-4", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('match-config', [CalcuttaController::class, 'saveMatchConfig']);
});`);

  // ── Step 5 — Player Selection ──────────────────────────────
  add("asslide-calcutta-5", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: savePlayerGroupAssignment
class CalcuttaController extends Controller
{
    public function savePlayerGroupAssignment(Request $request)
    {
        $request->validate([
            'game_id'                  => 'required|exists:games,id',
            'organization_id'          => 'required|exists:organizations,id',
            'assignments'              => 'required|array',
            'assignments.*.player_id'  => 'required|exists:users,id',
            'assignments.*.group'      => 'required|integer|between:1,4',
        ]);

        foreach ($request->assignments as $a) {
            CalcuttaPlayerGroup::updateOrCreate(
                ['game_id' => $request->game_id, 'player_id' => $a['player_id']],
                ['group' => $a['group'], 'organization_id' => $request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Player groups saved.']);
    }
}`);
  add("asslide-calcutta-5", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('player-groups',     [CalcuttaController::class, 'savePlayerGroupAssignment']);
    Route::get('available-players',  [CalcuttaController::class, 'getAvailablePlayers']);
});`);

  // ── Steps 6–17 (Card Distribution through Add Score) ──────
  add("asslide-calcutta-6", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getCardGroups / saveCards
class CalcuttaController extends Controller
{
    public function getCardGroups(Request $request)
    {
        $groups = CalcuttaPlayerGroup::where('game_id', $request->game_id)
            ->with('players')->get()->groupBy('group')
            ->map(fn($g) => ['players' => $g->map(fn($p) => [
                'id' => $p->player_id, 'name' => $p->player->name, 'card_number' => $p->card_number,
            ])]);
        return response()->json(['status' => true, 'data' => $groups->values()]);
    }

    public function saveCards(Request $request)
    {
        foreach ($request->cards as $c) {
            CalcuttaPlayerGroup::where('game_id', $request->game_id)
                ->where('player_id', $c['player_id'])
                ->update(['card_number' => $c['card_number']]);
        }
        return response()->json(['status' => true, 'message' => 'Cards distributed.']);
    }
}`);
  add("asslide-calcutta-6", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('card-groups',  [CalcuttaController::class, 'getCardGroups']);
    Route::post('save-cards',  [CalcuttaController::class, 'saveCards']);
});`);

  add("asslide-calcutta-7", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getFoursomes
class CalcuttaController extends Controller
{
    public function getFoursomes(Request $request)
    {
        $foursomes = Foursome::where('game_id', $request->game_id)->with('players')->get()
            ->map(fn($f) => ['id' => $f->id, 'players' => $f->players->map(fn($p) => [
                'id' => $p->id, 'name' => $p->name, 'handicap' => $p->handicap])]);
        return response()->json(['status' => true, 'data' => $foursomes]);
    }
}`);
  add("asslide-calcutta-7", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('foursomes', [CalcuttaController::class, 'getFoursomes']);
});`);

  add("asslide-calcutta-8", "laravel", "CalcuttaController.php", `<?php
// Module: Calcutta | Controller: CalcuttaController | Method: generateMatches
class CalcuttaController extends Controller
{
    public function generateMatches(Request $request)
    {
        $config    = CalcuttaConfig::where('game_id', $request->game_id)->firstOrFail();
        $foursomes = Foursome::where('game_id', $request->game_id)->with('players')->get();
        $matches   = [];

        foreach ($foursomes as $fs) {
            $players   = $fs->players->toArray();
            $matches[] = CalcuttaMatch::create([
                'game_id'    => $request->game_id,
                'team1'      => $players[0]['name'] . ' / ' . $players[1]['name'],
                'team2'      => $players[2]['name'] . ' / ' . $players[3]['name'],
                'hole_start' => 1,
                'hole_end'   => (int) $config->holes_per_match,
            ]);
        }

        return response()->json(['status' => true, 'data' => $matches]);
    }
}`);
  add("asslide-calcutta-8", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('generate-matches', [CalcuttaController::class, 'generateMatches']);
});`);

  // Rounds 2 & 3 reuse the same controller methods — note references
  ['9','10','11','12','13','14','15','16','17'].forEach(function(n) {
    var labels = {
      '9':  ['Round-2 Select',        'getRound2Players'],
      '10': ['Round-2 Sheet',          'getRound2Sheet'],
      '11': ['Select Player Round-2',  'completeRound2'],
      '12': ['Round-2 Done',           'getRound2Results'],
      '13': ['Round-3 Select',         'getRound3Players'],
      '14': ['Round-3 Sheet',          'getRound3Sheet'],
      '15': ['Select Player Round-3',  'completeRound3'],
      '16': ['Round-3 Done',           'getRound3Results'],
      '17': ['Add Score Entry',        'getScoreFoursomes'],
    };
    var info  = labels[n];
    var label = info[0], method = info[1];
    add("asslide-calcutta-" + n, "laravel", "CalcuttaController.php",
      '<?php\n// Module: Calcutta | Controller: CalcuttaController | Method: ' + method + '\n' +
      '// See asslide-calcutta-0 … asslide-calcutta-8 for the full class.\n' +
      '// Method ' + method + '() handles the "' + label + '" step.\n');
    add("asslide-calcutta-" + n, "laravel", "routes/api.php",
      '<?php\n// Calcutta — ' + label + ' route\n' +
      '// All Calcutta routes are registered under v1/calcutta in routes/api.php.\n' +
      '// See asslide-calcutta-0 for the full route group.\n');
  });

})();
