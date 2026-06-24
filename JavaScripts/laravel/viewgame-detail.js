// ============================================================
// Laravel — View Game Detail (viewgame-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("viewgame-detail", "laravel", "GameDetailsController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class GameDetailsController extends Controller
{
    public function show(Request $request, $id): JsonResponse
    {
        $game = Game::with(['course', 'players', 'scores', 'bets'])
            ->findOrFail($id);

        $this->authorize('view', $game);

        return response()->json([
            'status' => true,
            'data'   => [
                'game'        => $game,
                'overview'    => $this->overview($game),
                'results'     => $this->results($game),
                'leaderboard' => $this->leaderboard($game),
                'ledger'      => $this->ledger($game),
            ],
        ]);
    }

    private function overview(Game $game): array
    {
        return [
            'course'    => $game->course->name,
            'format'    => $game->format,
            'players'   => $game->players->count(),
            'buy_in'    => $game->buy_in,
            'status'    => $game->status,
        ];
    }

    private function results(Game $game): array
    {
        return $game->scores->groupBy('player_id')->map(function ($scores) {
            return ['total' => $scores->sum('score')];
        })->toArray();
    }

    private function leaderboard(Game $game): array
    {
        return $game->players->sortBy('pivot.score')->values()->toArray();
    }

    private function ledger(Game $game): array
    {
        return $game->transactions->groupBy('player_id')->map(function ($txns) {
            return ['balance' => $txns->sum('amount')];
        })->toArray();
    }
}`);

  add("viewgame-detail", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameDetailsController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{id}/details', [GameDetailsController::class, 'show']);
});`);
})();
