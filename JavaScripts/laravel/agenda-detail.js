// ============================================================
// Laravel — Agenda Detail (agenda-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("agenda-detail", "laravel", "GameController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class GameController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $games = Game::with('course')
            ->where('user_id', $request->user()->id)
            ->orWhereHas('players', fn($q) => $q->where('user_id', $request->user()->id))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(['status' => true, 'data' => $games]);
    }
}`);

  add("agenda-detail", "laravel", "EventController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Event;
use Illuminate\\Http\\JsonResponse;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        $events = Event::orderBy('start_date', 'desc')->paginate(20);

        return response()->json(['status' => true, 'data' => $events]);
    }
}`);

  add("agenda-detail", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use App\\Http\\Controllers\\Api\\V1\\EventController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::apiResource('games', GameController::class)->only(['index']);
    Route::get('events', [EventController::class, 'index']);
});`);
})();
