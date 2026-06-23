// ============================================================
// Laravel — View Results (vrslide-0 … vrslide-3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // -- vrslide-0 : View Result - Overview (Tab 1) -- (2 files)
  add("vrslide-0", "laravel", "ResultController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class ResultController extends Controller
{
    public function allPlayers(Request $request, $gameId): JsonResponse
    {
        $game = Game::with(['players.scores', 'players.foursome'])->findOrFail($gameId);

        $results = $game->players->map(function ($player) {
            return [
                'player'    => $player->name,
                'foursome'  => $player->foursome?->name,
                'gross'     => $player->scores->sum('score'),
                'net'       => $player->scores->sum('score') - ($player->handicap ?? 0),
                'points'    => $player->scores->sum('points'),
            ];
        });

        return response()->json(['status' => true, 'data' => $results]);
    }

    public function foursomeTab(Request $request, $gameId): JsonResponse
    {
        $game = Game::with('foursomes.players.scores')->findOrFail($gameId);

        return response()->json([
            'status' => true,
            'data'   => $game->foursomes->map(fn($f) => [
                'name'    => $f->name,
                'players' => $f->players->map(fn($p) => [
                    'name'  => $p->name,
                    'score' => $p->scores->sum('score'),
                ]),
            ]),
        ]);
    }
}`);
  add("vrslide-0", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\ResultController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/results/all', [ResultController::class, 'allPlayers']);
    Route::get('games/{gameId}/results/foursome', [ResultController::class, 'foursomeTab']);
});`);

  // -- vrslide-1 : View Result - Scorecard (Tab 2) -- (1 file)
  add("vrslide-1", "laravel", "routes/api.php", `<?php
// Uses same ResultController as vrslide-0.
// Endpoint: GET /api/v1/games/{gameId}/results/foursome`);

  // -- vrslide-2 : View Result - Stats (Tab 3) -- (2 files)
  add("vrslide-2", "laravel", "ScorecardController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Foursome;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class ScorecardController extends Controller
{
    public function show(Request $request, $foursomeId): JsonResponse
    {
        $foursome = Foursome::with(['players.scores' => fn($q) => $q->orderBy('hole_number')])
            ->findOrFail($foursomeId);

        $holes = collect(range(1, 18))->map(fn($hole) => [
            'hole'    => $hole,
            'par'     => $foursome->course->holes->where('number', $hole)->first()?->par,
            'scores'  => $foursome->players->map(fn($p) => [
                'player' => $p->name,
                'score'  => $p->scores->where('hole_number', $hole)->first()?->score,
                'skins'  => $p->scores->where('hole_number', $hole)->first()?->skins_value,
            ]),
        ]);

        return response()->json(['status' => true, 'data' => $holes]);
    }
}`);
  add("vrslide-2", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\ScorecardController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('foursomes/{foursomeId}/scorecard', [ScorecardController::class, 'show']);
});`);

  // -- vrslide-3 : View Result - Leaderboard (Tab 4) -- (2 files)
  add("vrslide-3", "laravel", "routes/api.php", `<?php
// Uses ResultController::winners from the same controller as vrslide-0.
// Endpoint: GET /api/v1/games/{gameId}/results/winners
// Returns foursome winners with Gross, Net, Points, Skode & Junk winners.`);
  add("vrslide-3", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\ResultController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/results/winners', [ResultController::class, 'winners']);
});`);

})();
