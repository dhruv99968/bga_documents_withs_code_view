// ============================================================
// Laravel — Add Score: HORSE RACE game type (unique steps 0–3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("asslide-horse_race-0", "laravel", "HorseRaceController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\HorseRaceConfig;
use Illuminate\\Http\\Request;

// Module: Horse Race | Controller: HorseRaceController | Method: saveSetup
class HorseRaceController extends Controller
{
    public function saveSetup(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
            'number_of_teams' => 'required|integer|between:2,4',
            'holes'           => 'required|integer|in:9,18,27',
            'bet_amount'      => 'required|numeric|min:0',
        ]);

        HorseRaceConfig::updateOrCreate(
            ['game_id' => $request->game_id],
            ['number_of_teams' => $request->number_of_teams,
             'holes'           => $request->holes,
             'bet_amount'      => $request->bet_amount,
             'organization_id' => $request->organization_id]
        );

        return response()->json(['status' => true, 'message' => 'Game setup saved.']);
    }

    public function getConfig(Request $request)
    {
        $config = HorseRaceConfig::where('game_id', $request->game_id)->firstOrFail();
        return response()->json(['status' => true, 'data' => $config]);
    }
}`);
  add("asslide-horse_race-0", "laravel", "routes/api.php", `<?php
// Horse Race — Game Setup routes
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::post('setup',  [HorseRaceController::class, 'saveSetup']);
    Route::get('config',  [HorseRaceController::class, 'getConfig']);
});`);

  add("asslide-horse_race-1", "laravel", "HorseRaceController.php", `<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getTeams
class HorseRaceController extends Controller
{
    public function getTeams(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        $config = HorseRaceConfig::where('game_id', $request->game_id)->firstOrFail();

        $teams = HorseRaceTeam::where('game_id', $request->game_id)->with('players')->get()
            ->map(fn($t) => ['id' => $t->id, 'team_no' => $t->team_number,
                'players' => $t->players->map(fn($p) => [
                    'id' => $p->id, 'name' => $p->name, 'handicap' => $p->handicap])]);

        return response()->json([
            'status' => true, 'data' => $teams,
            'number_of_teams' => $config->number_of_teams,
        ]);
    }
}`);
  add("asslide-horse_race-1", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('teams', [HorseRaceController::class, 'getTeams']);
});`);

  add("asslide-horse_race-2", "laravel", "HorseRaceController.php", `<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getGamePlayers / saveTeamAssignments
class HorseRaceController extends Controller
{
    public function getGamePlayers(Request $request)
    {
        $game    = \\App\\Models\\Game::with('players')->findOrFail($request->game_id);
        $players = $game->players->map(fn($p) => [
            'id' => $p->id, 'name' => $p->name, 'handicap' => $p->handicap]);
        return response()->json(['status' => true, 'data' => $players]);
    }

    public function saveTeamAssignments(Request $request)
    {
        $request->validate([
            'game_id'                 => 'required|exists:games,id',
            'organization_id'         => 'required|exists:organizations,id',
            'assignments'             => 'required|array',
            'assignments.*.player_id' => 'required|exists:users,id',
            'assignments.*.team'      => 'required|integer|between:1,4',
        ]);

        foreach ($request->assignments as $a) {
            HorseRacePlayerTeam::updateOrCreate(
                ['game_id' => $request->game_id, 'player_id' => $a['player_id']],
                ['team' => $a['team'], 'organization_id' => $request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Team assignments saved.']);
    }
}`);
  add("asslide-horse_race-2", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('game-players',      [HorseRaceController::class, 'getGamePlayers']);
    Route::post('team-assignments', [HorseRaceController::class, 'saveTeamAssignments']);
});`);

  add("asslide-horse_race-3", "laravel", "HorseRaceController.php", `<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getFinalAssignments / confirmTeams
class HorseRaceController extends Controller
{
    public function getFinalAssignments(Request $request)
    {
        $config = HorseRaceConfig::where('game_id', $request->game_id)->firstOrFail();

        $teams = collect(range(1, $config->number_of_teams))->map(fn($t) => [
            'team_number' => $t,
            'players'     => HorseRacePlayerTeam::where('game_id', $request->game_id)
                ->where('team', $t)->with('player')->get()
                ->map(fn($r) => ['id' => $r->player->id, 'name' => $r->player->name]),
        ]);

        return response()->json(['status' => true, 'data' => $teams]);
    }

    public function confirmTeams(Request $request)
    {
        HorseRaceConfig::where('game_id', $request->game_id)->update(['teams_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Teams confirmed. Ready to score.']);
    }
}`);
  add("asslide-horse_race-3", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('final-assignments', [HorseRaceController::class, 'getFinalAssignments']);
    Route::post('confirm-teams',    [HorseRaceController::class, 'confirmTeams']);
});`);

})();
