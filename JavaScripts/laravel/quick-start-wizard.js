// ============================================================
// Laravel — Quick Start Wizard (wslide-0 … wslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }
  // -- wslide-0 : Welcome (Main Wizard) -- (1 file)
  add("wslide-0", "laravel", "routes/api.php", `<?php
// References same AuthController as welcome-detail.
// Routes:
//   POST /api/v1/auth/login
//   POST /api/v1/auth/register`);

  // -- wslide-1 : Sign Up (Main Wizard) -- (1 file)
  add("wslide-1", "laravel", "routes/api.php", `<?php
// References same controllers as sslide-0.
// Routes:
//   POST /api/v1/auth/register
//   POST /api/v1/auth/otp/send
//   POST /api/v1/auth/otp/verify`);

  // -- wslide-2 : Course Selection (Main Wizard) -- (1 file)
  add("wslide-2", "laravel", "routes/api.php", `<?php
// References same CourseController as sslide-3.
// Routes:
//   GET  /api/v1/courses/nearby
//   POST /api/v1/user/home-course`);

  // -- wslide-3 : Home Dashboard (Main Wizard) -- (1 file)
  add("wslide-3", "laravel", "routes/api.php", `<?php
// References same DashboardController as home-detail.
// Routes:
//   GET /api/v1/dashboard`);

  // -- wslide-4 : Create Game (Main Wizard) -- (3 files)
  add("wslide-4", "laravel", "GameController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\StoreGameRequest;
use App\\Models\\Game;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest $request): JsonResponse
    {
        $game = Game::create($request->validated() + ['creator_id' => $request->user()->id]);

        if ($request->has('player_ids')) {
            $game->players()->attach($request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => $game->load('course', 'players'),
        ], 201);
    }
}`);
  add("wslide-4", "laravel", "StoreGameRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreGameRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'course_id'  => ['required', 'exists:courses,id'],
            'format'     => ['required', 'string'],
            'tee_box'    => ['required', 'string'],
            'buy_in'     => ['required', 'numeric', 'min:0'],
            'handicap'   => ['boolean'],
            'player_ids' => ['array'],
            'player_ids.*' => ['exists:users,id'],
        ];
    }
}`);
  add("wslide-4", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  // -- wslide-5 : Game Created (Main Wizard) -- (1 file)
  add("wslide-5", "laravel", "GameController.php", `<?php
// Game creation confirmation â€” uses GameController::store from wslide-4
// The response includes the created game object with a shareable link.
// Endpoint: POST /api/v1/games`);

  // -- wslide-6 : Game Overview (Main Wizard) -- (1 file)
  add("wslide-6", "laravel", "routes/api.php", `<?php
// References same GameDetailsController as viewgame-detail.
// Routes:
//   GET /api/v1/games/{id}/details`);

  // -- wslide-7 : Add Bets (Main Wizard) -- (1 file)
  add("wslide-7", "laravel", "routes/api.php", `<?php
// References same BetController as addbets-detail.
// Routes:
//   GET  /api/v1/bets
//   POST /api/v1/bets`);

  // -- wslide-8 : Select Foursome (Main Wizard) -- (2 files)
  add("wslide-8", "laravel", "FoursomeController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Foursome;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class FoursomeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $foursomes = Foursome::where('game_id', $request->game_id)
            ->with('players')
            ->get();

        return response()->json(['status' => true, 'data' => $foursomes]);
    }
}`);
  add("wslide-8", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\FoursomeController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('foursomes', [FoursomeController::class, 'index']);
});`);

  // -- wslide-9 : Scoring (Main Wizard) -- (3 files)
  add("wslide-9", "laravel", "ScoreController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\StoreScoreRequest;
use App\\Models\\Score;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class ScoreController extends Controller
{
    public function store(StoreScoreRequest $request): JsonResponse
    {
        $score = Score::create($request->validated());

        return response()->json([
            'status'  => true,
            'message' => 'Score saved',
            'data'    => $score,
        ], 201);
    }

    public function byGame(Request $request, $gameId): JsonResponse
    {
        $scores = Score::where('game_id', $gameId)
            ->with('player')
            ->orderBy('hole_number')
            ->get();

        return response()->json(['status' => true, 'data' => $scores]);
    }
}`);
  add("wslide-9", "laravel", "StoreScoreRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreScoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'game_id'     => ['required', 'exists:games,id'],
            'player_id'   => ['required', 'exists:users,id'],
            'hole_number' => ['required', 'integer', 'between:1,18'],
            'score'       => ['required', 'integer', 'min:1', 'max:20'],
        ];
    }
}`);
  add("wslide-9", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\ScoreController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('scores', [ScoreController::class, 'store']);
    Route::get('games/{gameId}/scores', [ScoreController::class, 'byGame']);
});`);


})();