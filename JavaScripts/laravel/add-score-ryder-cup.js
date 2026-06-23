// ============================================================
// Laravel — Add Score: RYDER CUP game type (unique steps 0–9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("asslide-ryder_cup-0", "laravel", "RyderCupController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use App\\Models\\RyderCupTeam;
use Illuminate\\Http\\Request;

// Module: Ryder Cup | Controller: RyderCupController | Method: getTeams / setCaptains
class RyderCupController extends Controller
{
    public function getTeams(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        $teamA = RyderCupTeam::where('game_id', $request->game_id)->where('team', 'A')
            ->with('player')->get()->map(fn($r) => [
                'id' => $r->player->id, 'name' => $r->player->name,
                'handicap' => $r->player->handicap, 'is_captain' => $r->is_captain]);

        $teamB = RyderCupTeam::where('game_id', $request->game_id)->where('team', 'B')
            ->with('player')->get()->map(fn($r) => [
                'id' => $r->player->id, 'name' => $r->player->name,
                'handicap' => $r->player->handicap, 'is_captain' => $r->is_captain]);

        return response()->json(['status' => true, 'data' => ['teamA' => $teamA, 'teamB' => $teamB]]);
    }

    public function setCaptains(Request $request)
    {
        $request->validate([
            'game_id'           => 'required|exists:games,id',
            'team_a_captain_id' => 'required|exists:users,id',
            'team_b_captain_id' => 'required|exists:users,id',
            'organization_id'   => 'required|exists:organizations,id',
        ]);

        RyderCupTeam::where('game_id', $request->game_id)->update(['is_captain' => false]);
        RyderCupTeam::where('game_id', $request->game_id)
            ->whereIn('player_id', [$request->team_a_captain_id, $request->team_b_captain_id])
            ->update(['is_captain' => true]);

        return response()->json(['status' => true, 'message' => 'Captains set successfully.']);
    }
}`);
  add("asslide-ryder_cup-0", "laravel", "routes/api.php", `<?php
// Ryder Cup — Captain Selection routes
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('teams',         [RyderCupController::class, 'getTeams']);
    Route::post('set-captains', [RyderCupController::class, 'setCaptains']);
});`);

  add("asslide-ryder_cup-1", "laravel", "RyderCupController.php", `<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getDraftPool / draftPick
class RyderCupController extends Controller
{
    public function getDraftPool(Request $request)
    {
        $pickedIds = RyderCupDraftPick::where('game_id', $request->game_id)->pluck('player_id');
        $pool      = Game::findOrFail($request->game_id)->players()
            ->whereNotIn('users.id', $pickedIds)->get()
            ->map(fn($p) => ['id' => $p->id, 'name' => $p->name, 'handicap' => $p->handicap]);

        return response()->json(['status' => true, 'data' => $pool]);
    }

    public function draftPick(Request $request)
    {
        $request->validate([
            'game_id'   => 'required|exists:games,id',
            'player_id' => 'required|exists:users,id',
            'team'      => 'required|in:A,B',
        ]);

        RyderCupDraftPick::create([
            'game_id'   => $request->game_id,
            'player_id' => $request->player_id,
            'team'      => $request->team,
        ]);

        return response()->json(['status' => true, 'message' => 'Player drafted.']);
    }
}`);
  add("asslide-ryder_cup-1", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('draft-pool',  [RyderCupController::class, 'getDraftPool']);
    Route::post('draft-pick', [RyderCupController::class, 'draftPick']);
});`);

  add("asslide-ryder_cup-2", "laravel", "RyderCupController.php", `<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getSelectedPlayers / confirmPlayers
class RyderCupController extends Controller
{
    public function getSelectedPlayers(Request $request)
    {
        $teamA = RyderCupDraftPick::where('game_id', $request->game_id)->where('team', 'A')
            ->with('player')->get()->map(fn($r) => [
                'id' => $r->player->id, 'name' => $r->player->name,
                'handicap' => $r->player->handicap, 'is_captain' => false]);

        $teamB = RyderCupDraftPick::where('game_id', $request->game_id)->where('team', 'B')
            ->with('player')->get()->map(fn($r) => [
                'id' => $r->player->id, 'name' => $r->player->name,
                'handicap' => $r->player->handicap, 'is_captain' => false]);

        return response()->json(['status' => true, 'data' => ['teamA' => $teamA, 'teamB' => $teamB]]);
    }

    public function confirmPlayers(Request $request)
    {
        Game::findOrFail($request->game_id)->update(['draft_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Player selection confirmed.']);
    }
}`);
  add("asslide-ryder_cup-2", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('selected-players',  [RyderCupController::class, 'getSelectedPlayers']);
    Route::post('confirm-players',  [RyderCupController::class, 'confirmPlayers']);
});`);

  add("asslide-ryder_cup-3", "laravel", "RyderCupController.php", `<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: setTeeTimes
class RyderCupController extends Controller
{
    public function setTeeTimes(Request $request)
    {
        $request->validate([
            'game_id'                    => 'required|exists:games,id',
            'tee_times'                  => 'required|array',
            'tee_times.*.foursome_id'    => 'required|integer',
            'tee_times.*.tee_time'       => 'required|string',
        ]);

        foreach ($request->tee_times as $t) {
            Foursome::where('id', $t['foursome_id'])->where('game_id', $request->game_id)
                ->update(['tee_time' => $t['tee_time']]);
        }

        return response()->json(['status' => true, 'message' => 'Tee times saved.']);
    }
}`);
  add("asslide-ryder_cup-3", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::post('tee-times',          [RyderCupController::class, 'setTeeTimes']);
    Route::get('tee-time-foursomes',  [RyderCupController::class, 'getTeeTimeFoursomes']);
});`);

  add("asslide-ryder_cup-4", "laravel", "RyderCupController.php", `<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getFoursomes / assignPlayerToFoursome / confirmFoursomes
class RyderCupController extends Controller
{
    public function getFoursomes(Request $request)
    {
        $foursomes = Foursome::where('game_id', $request->game_id)->with('players')->get()
            ->map(fn($f) => ['id' => $f->id, 'players' => $f->players->map(fn($p) => [
                'id' => $p->id, 'name' => $p->name, 'team' => $p->pivot->team ?? '—'])]);
        return response()->json(['status' => true, 'data' => $foursomes]);
    }

    public function assignPlayerToFoursome(Request $request)
    {
        $request->validate([
            'game_id'     => 'required|exists:games,id',
            'foursome_id' => 'required|integer',
            'player_id'   => 'required|exists:users,id',
        ]);
        FoursomePlayer::updateOrCreate(
            ['foursome_id' => $request->foursome_id, 'player_id' => $request->player_id],
            ['game_id' => $request->game_id]
        );
        return response()->json(['status' => true, 'message' => 'Player assigned.']);
    }

    public function confirmFoursomes(Request $request)
    {
        Game::findOrFail($request->game_id)->update(['foursomes_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Foursomes confirmed.']);
    }
}`);
  add("asslide-ryder_cup-4", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('foursomes',               [RyderCupController::class, 'getFoursomes']);
    Route::post('assign-player-foursome', [RyderCupController::class, 'assignPlayerToFoursome']);
    Route::post('confirm-foursomes',      [RyderCupController::class, 'confirmFoursomes']);
});`);

  // Steps 5–9 reference earlier methods
  var refs = {
    '5': ['All Foursomes Done',  'getFoursomes (read-only summary)'],
    '6': ['Generate Match',      'generateMatches'],
    '7': ['Confirm Matches',     'confirmMatches'],
    '8': ['Match Config',        'saveMatchConfig'],
    '9': ['Add Score Entry',     'getScoringFoursomes'],
  };
  Object.keys(refs).forEach(function(n) {
    var label = refs[n][0], method = refs[n][1];
    add("asslide-ryder_cup-" + n, "laravel", "RyderCupController.php",
      '<?php\n// Module: Ryder Cup | Controller: RyderCupController | Method: ' + method + '\n' +
      '// Step: ' + label + '\n' +
      '// See asslide-ryder_cup-0 … asslide-ryder_cup-4 for the full class.\n');
    add("asslide-ryder_cup-" + n, "laravel", "routes/api.php",
      '<?php\n// Ryder Cup — ' + label + '\n' +
      '// All routes registered under v1/ryder-cup — see asslide-ryder_cup-0.\n');
  });

})();
