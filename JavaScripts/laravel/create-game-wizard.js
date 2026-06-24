// ============================================================
// Laravel — Create Game Wizard (cgslide-0 … cgslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("cgslide-0", "laravel", "GameController.php", `<?php

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

  add("cgslide-0", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-0", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-1", "laravel", "GameController.php", `<?php

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

  add("cgslide-1", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-1", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-2", "laravel", "GameController.php", `<?php

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

  add("cgslide-2", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-2", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-3", "laravel", "GameController.php", `<?php

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

  add("cgslide-3", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-3", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-4", "laravel", "GameController.php", `<?php

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

  add("cgslide-4", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-4", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-5", "laravel", "GameController.php", `<?php

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

  add("cgslide-5", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-5", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-6", "laravel", "GameController.php", `<?php

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

  add("cgslide-6", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-6", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-7", "laravel", "GameController.php", `<?php

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

  add("cgslide-7", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-7", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-8", "laravel", "GameController.php", `<?php

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

  add("cgslide-8", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-8", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);

  add("cgslide-9", "laravel", "GameController.php", `<?php

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

  add("cgslide-9", "laravel", "StoreGameRequest.php", `<?php

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

  add("cgslide-9", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\GameController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});`);
})();
