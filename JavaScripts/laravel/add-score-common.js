// ============================================================
// Laravel — Add Score: Common steps (asslide-0 … asslide-11)
// Applies to all game types (321 Milo, Vegas, Scramble,
// Progressive Skins, Regular Skins, Stroke Play, Stableford, Wolf)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── asslide-0 — Select Foursome ────────────────────────────
  add("asslide-0", "laravel", "FoursomeController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use App\\Models\\Foursome;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: FoursomeController | Method: getPlayers / store
class FoursomeController extends Controller
{
    public function getPlayers(Request $request)
    {
        $request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        $game    = Game::with('players')->findOrFail($request->game_id);
        $players = $game->players->map(fn($p) => [
            'id'       => $p->id,
            'name'     => $p->name,
            'handicap' => $p->handicap,
        ]);

        return response()->json(['error' => false, 'data' => $players]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'game_id'          => 'required|exists:games,id',
            'organization_id'  => 'required|exists:organizations,id',
            'player_ids'       => 'required|array|min:2|max:4',
            'player_ids.*'     => 'required|exists:users,id',
        ]);

        $foursome = Foursome::create(['game_id' => $request->game_id]);
        $foursome->players()->attach($request->player_ids);

        return response()->json([
            'error'   => false,
            'message' => 'Foursome created.',
            'data'    => $foursome->load('players'),
        ], 201);
    }
}`);
  add("asslide-0", "laravel", "routes/api.php", `<?php
use App\\Http\\Controllers\\Api\\V1\\FoursomeController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/players', [FoursomeController::class, 'getPlayers']);
    Route::post('foursomes',              [FoursomeController::class, 'store']);
});`);

  // ── asslide-1 — Generate Matches ──────────────────────────
  add("asslide-1", "laravel", "FoursomeController.php", `<?php
// Module: Add Score | Controller: FoursomeController | Method: generateMatches
class FoursomeController extends Controller
{
    public function generateMatches(Request $request, int $gameId)
    {
        $request->validate([
            'foursome_ids'   => 'required|array',
            'foursome_ids.*' => 'required|exists:foursomes,id',
        ]);

        $matches = [];
        foreach ($request->foursome_ids as $fsId) {
            $foursome = Foursome::with('players')->findOrFail($fsId);
            $players  = $foursome->players->toArray();

            $matches[] = GameMatch::create([
                'game_id'    => $gameId,
                'foursome_id'=> $fsId,
                'team1'      => ($players[0]['name'] ?? '') . ' / ' . ($players[1]['name'] ?? ''),
                'team2'      => ($players[2]['name'] ?? '') . ' / ' . ($players[3]['name'] ?? ''),
                'hole'       => 1,
            ])->toArray();
        }

        return response()->json(['error' => false, 'data' => $matches]);
    }
}`);
  add("asslide-1", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games/{game_id}/generate-matches', [FoursomeController::class, 'generateMatches']);
});`);

  // ── asslide-2 — Match Configuration ──────────────────────
  add("asslide-2", "laravel", "GameController.php", `<?php
// Module: Add Score | Controller: GameController | Method: saveMatchConfig
class GameController extends Controller
{
    public function saveMatchConfig(Request $request, int $gameId)
    {
        $request->validate([
            'play_type'       => 'required|in:COD,2v2 Teams,Individual,Random',
            'holes_per_match' => 'required|string',
            'handicap_method' => 'nullable|string',
        ]);

        \\App\\Models\\Game::findOrFail($gameId)->update([
            'play_type'       => $request->play_type,
            'holes_per_match' => $request->holes_per_match,
            'handicap_method' => $request->handicap_method,
        ]);

        return response()->json(['error' => false, 'message' => 'Match config saved.']);
    }
}`);
  add("asslide-2", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games/{game_id}/match-config', [GameController::class, 'saveMatchConfig']);
});`);

  // ── asslide-3 — Add Foursome Setting ─────────────────────
  add("asslide-3", "laravel", "FoursomeController.php", `<?php
// Module: Add Score | Controller: FoursomeController | Method: update
class FoursomeController extends Controller
{
    public function update(Request $request, int $foursomeId)
    {
        $request->validate([
            'game_id'    => 'required|exists:games,id',
            'tee_box'    => 'nullable|string',
            'start_hole' => 'nullable|integer|between:1,18',
        ]);

        $foursome = Foursome::findOrFail($foursomeId);
        $foursome->update($request->only('tee_box', 'start_hole'));

        return response()->json(['error' => false, 'message' => 'Foursome setting updated.']);
    }
}`);
  add("asslide-3", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::patch('foursomes/{foursome_id}', [FoursomeController::class, 'update']);
});`);

  // ── asslide-4 — Foursome Settings / Rule Toggles ─────────
  add("asslide-4", "laravel", "FoursomeBetController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\FoursomeBet;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: FoursomeBetController | Method: store (standard bets)
class FoursomeBetController extends Controller
{
    public function store(Request $request, int $foursomeId)
    {
        $request->validate([
            'game_id'    => 'required|exists:games,id',
            'rebit'      => 'boolean',
            'cheken'     => 'boolean',
            'dot_game'   => 'boolean',
            'newt'       => 'boolean',
            'towfer'     => 'boolean',
            'bet_amount' => 'required|numeric|min:0',
        ]);

        FoursomeBet::updateOrCreate(
            ['foursome_id' => $foursomeId, 'game_id' => $request->game_id],
            $request->only('rebit','cheken','dot_game','newt','towfer','bet_amount')
        );

        return response()->json(['error' => false, 'message' => 'Foursome bets saved.']);
    }

    // Wolf-specific variant
    public function storeWolf(Request $request, int $foursomeId)
    {
        $request->validate([
            'game_id'      => 'required|exists:games,id',
            'wolf_enabled' => 'boolean',
            'wolf_amount'  => 'required|numeric|min:0',
            'blind_wolf'   => 'boolean',
        ]);

        FoursomeBet::updateOrCreate(
            ['foursome_id' => $foursomeId, 'game_id' => $request->game_id],
            $request->only('wolf_enabled','wolf_amount','blind_wolf')
        );

        return response()->json(['error' => false, 'message' => 'Wolf bets saved.']);
    }
}`);
  add("asslide-4", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('foursomes/{foursome_id}/bets',      [FoursomeBetController::class, 'store']);
    Route::post('foursomes/{foursome_id}/wolf-bets', [FoursomeBetController::class, 'storeWolf']);
});`);

  // ── asslide-5 — Add Score CTA ─────────────────────────────
  add("asslide-5", "laravel", "FoursomeController.php", `<?php
// Module: Add Score | Controller: FoursomeController | Method: index (game foursomes)
class FoursomeController extends Controller
{
    public function index(Request $request, int $gameId)
    {
        $foursomes = Foursome::where('game_id', $gameId)
            ->with('players')
            ->get()
            ->map(fn($f) => [
                'id'      => $f->id,
                'players' => $f->players->map(fn($p) => [
                    'id'       => $p->id,
                    'name'     => $p->name,
                    'handicap' => $p->handicap,
                ]),
                'scored'  => \\App\\Models\\Score::where('foursome_id', $f->id)->exists(),
                'tee_box' => $f->tee_box,
            ]);

        return response()->json(['error' => false, 'data' => $foursomes]);
    }
}`);
  add("asslide-5", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/foursomes', [FoursomeController::class, 'index']);
});`);

  // ── asslide-6 — 18-Hole Score Grid ───────────────────────
  add("asslide-6", "laravel", "CourseHoleController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\CourseHole;
use App\\Models\\Score;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: CourseHoleController | Method: index
class CourseHoleController extends Controller
{
    public function index(Request $request, int $courseId)
    {
        $holes = CourseHole::where('course_id', $courseId)
            ->when($request->tee_box, fn($q, $v) => $q->where('tee_box', $v))
            ->orderBy('hole_number')
            ->get()
            ->map(fn($h) => [
                'hole_number'      => $h->hole_number,
                'par'              => $h->par,
                'handicap_index'   => $h->handicap_index,
                'distance_yards'   => $h->distance_yards,
            ]);

        return response()->json(['error' => false, 'data' => $holes]);
    }

    public function foursomeScores(Request $request, int $foursomeId)
    {
        $scores = Score::where('foursome_id', $foursomeId)
            ->with('player')
            ->get()
            ->groupBy('player_id')
            ->map(fn($rows, $pid) => [
                'player_id'   => $pid,
                'player_name' => $rows->first()->player->name,
                'scores'      => $rows->map(fn($r) => [
                    'hole'  => $r->hole_number,
                    'score' => $r->score,
                ])->values(),
            ])->values();

        return response()->json(['error' => false, 'data' => $scores]);
    }
}`);
  add("asslide-6", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('courses/{course_id}/holes',          [CourseHoleController::class, 'index']);
    Route::get('foursomes/{foursome_id}/scores',     [CourseHoleController::class, 'foursomeScores']);
});`);

  // ── asslide-7 — Scorecard (per-hole entry) ────────────────
  add("asslide-7", "laravel", "ScoreController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Score;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: ScoreController | Method: store / update
class ScoreController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'game_id'     => 'required|exists:games,id',
            'foursome_id' => 'required|exists:foursomes,id',
            'player_id'   => 'required|exists:users,id',
            'hole_number' => 'required|integer|between:1,27',
            'score'       => 'required|integer|min:1|max:20',
            'putts'       => 'nullable|integer|min:0|max:10',
            'fairway_hit' => 'nullable|boolean',
            'gir'         => 'nullable|boolean',
        ]);

        $score = Score::updateOrCreate(
            [
                'game_id'     => $request->game_id,
                'foursome_id' => $request->foursome_id,
                'player_id'   => $request->player_id,
                'hole_number' => $request->hole_number,
            ],
            $request->only('score','putts','fairway_hit','gir')
        );

        return response()->json([
            'error'   => false,
            'message' => 'Score saved.',
            'data'    => $score,
        ], 201);
    }

    public function update(Request $request, int $scoreId)
    {
        $score = Score::findOrFail($scoreId);
        $score->update($request->only('score','putts','fairway_hit','gir'));

        return response()->json(['error' => false, 'message' => 'Score updated.', 'data' => $score]);
    }
}`);
  add("asslide-7", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('scores',          [ScoreController::class, 'store']);
    Route::put('scores/{score_id}',[ScoreController::class, 'update']);
});`);

  // ── asslide-8 — Skode & Junk Rewards ─────────────────────
  add("asslide-8", "laravel", "JunkController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\JunkOption;
use App\\Models\\JunkReward;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: JunkController | Method: options / store
class JunkController extends Controller
{
    public function options(Request $request, int $gameId)
    {
        $options = JunkOption::where('game_id', $gameId)
            ->orWhere('is_global', true)
            ->get()
            ->map(fn($o) => [
                'id'     => $o->id,
                'name'   => $o->name,
                'type'   => $o->type,   // MADE | MISSED | EARNED
                'amount' => $o->amount,
            ]);

        return response()->json(['error' => false, 'data' => $options]);
    }

    public function store(Request $request, int $scoreId)
    {
        $request->validate([
            'game_id'        => 'required|exists:games,id',
            'junk_option_id' => 'required|exists:junk_options,id',
            'type'           => 'required|in:MADE,MISSED,EARNED',
        ]);

        JunkReward::create([
            'score_id'       => $scoreId,
            'game_id'        => $request->game_id,
            'junk_option_id' => $request->junk_option_id,
            'type'           => $request->type,
        ]);

        return response()->json(['error' => false, 'message' => 'Junk reward recorded.']);
    }
}`);
  add("asslide-8", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/junk-options',    [JunkController::class, 'options']);
    Route::post('scores/{score_id}/junk',         [JunkController::class, 'store']);
});`);

  // ── asslide-9 — Leaderboard ───────────────────────────────
  add("asslide-9", "laravel", "LeaderboardController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Score;
use App\\Models\\Game;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: LeaderboardController | Method: index
class LeaderboardController extends Controller
{
    public function index(Request $request, int $gameId)
    {
        $game    = Game::with(['players', 'foursomes.players'])->findOrFail($gameId);

        $standings = $game->players->map(function ($player) use ($gameId) {
            $scores = Score::where('game_id', $gameId)
                ->where('player_id', $player->id)
                ->get();

            $gross = $scores->sum('score');
            $net   = $gross - ($player->handicap ?? 0);
            $thru  = $scores->count();

            return [
                'player_id'   => $player->id,
                'player_name' => $player->name,
                'gross'       => $gross,
                'net'         => $net,
                'thru'        => $thru,
            ];
        })->sortBy('net')->values();

        $standings = $standings->map(fn($s, $i) => array_merge($s, ['rank' => $i + 1]));

        return response()->json(['error' => false, 'data' => $standings]);
    }
}`);
  add("asslide-9", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/leaderboard', [LeaderboardController::class, 'index']);
});`);

  // ── asslide-10 — View Results Tab ─────────────────────────
  add("asslide-10", "laravel", "GameResultController.php", `<?php
namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use App\\Models\\Score;
use Illuminate\\Http\\Request;

// Module: Add Score | Controller: GameResultController | Method: show
class GameResultController extends Controller
{
    public function show(Request $request, int $gameId)
    {
        $game    = Game::with('players')->findOrFail($gameId);

        $players = $game->players->map(function ($p) use ($gameId) {
            $scores   = Score::where('game_id', $gameId)->where('player_id', $p->id)->get();
            $gross    = $scores->sum('score');
            $net      = $gross - ($p->handicap ?? 0);

            return [
                'id'       => $p->id,
                'name'     => $p->name,
                'gross'    => $gross,
                'net'      => $net,
                'points'   => 0, // calculated by game-type logic
                'winnings' => 0.00,
            ];
        })->sortBy('net')->values();

        return response()->json([
            'error' => false,
            'data'  => [
                'winner'  => $players->first(),
                'players' => $players,
                'skins'   => [],
            ],
        ]);
    }
}`);
  add("asslide-10", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/results', [GameResultController::class, 'show']);
});`);

  // ── asslide-11 — All Holes Done / Finish ─────────────────
  add("asslide-11", "laravel", "FoursomeController.php", `<?php
// Module: Add Score | Controller: FoursomeController | Method: complete / finalize
class FoursomeController extends Controller
{
    public function complete(Request $request, int $foursomeId)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id',
        ]);

        $foursome = Foursome::findOrFail($foursomeId);
        $foursome->update(['status' => 'complete']);

        $allComplete = !Foursome::where('game_id', $request->game_id)
            ->where('status', '!=', 'complete')
            ->exists();

        return response()->json([
            'error'   => false,
            'message' => 'Foursome scoring complete.',
            'data'    => [
                'all_foursomes_complete' => $allComplete,
                'game_status'            => $allComplete ? 'completed' : 'in_progress',
            ],
        ]);
    }

    public function finalize(Request $request, int $gameId)
    {
        $request->validate(['confirm' => 'required|boolean|accepted']);

        Game::findOrFail($gameId)->update(['status' => 'completed']);

        return response()->json([
            'error'   => false,
            'message' => 'Game finalized. Results and ledger are available.',
            'data'    => ['game_id' => $gameId, 'status' => 'completed'],
        ]);
    }
}`);
  add("asslide-11", "laravel", "routes/api.php", `<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('foursomes/{foursome_id}/complete', [FoursomeController::class, 'complete']);
    Route::post('games/{game_id}/finalize',         [FoursomeController::class, 'finalize']);
});`);

})();
