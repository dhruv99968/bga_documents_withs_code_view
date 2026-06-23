// ============================================================
// CODE DATA - Laravel/PHP
// ============================================================
// Contains all Laravel/PHP code samples for the code preview viewer.
//
// FORMAT: add("slide-key", "laravel", "filename", `code`)
//   slide-key : slide identifier (e.g. "sslide-0")
//   stack     : "laravel"
//   filename  : displayed in file tab
//   code      : source in backtick literal
//
// TO EDIT: Find the section, edit code between backticks.
// Escape inside backticks: backtick as \`  backslash as \\
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function(){
  function add(k,s,n,c){
    window.CODE_DATA[k]=window.CODE_DATA[k]||{};
    window.CODE_DATA[k][s]=window.CODE_DATA[k][s]||[];
    window.CODE_DATA[k][s].push({name:n,code:c});
  }

  // -- addbets-detail : Add Bets Screen -- (3 files)
  add("addbets-detail", "laravel", "BetController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\StoreBetRequest;
use App\\Models\\Bet;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class BetController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $bets = Bet::where('game_id', $request->game_id)
            ->with('creator', 'participants')
            ->when($request->status, fn($q, $v) => $q->where('status', $v))
            ->when($request->my_bets, fn($q) => $q->where('creator_id', $request->user()->id))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(['status' => true, 'data' => $bets]);
    }

    public function store(StoreBetRequest $request): JsonResponse
    {
        $bet = Bet::create($request->validated() + ['creator_id' => $request->user()->id]);

        return response()->json([
            'status' => true,
            'message' => 'Bet created',
            'data'    => $bet,
        ], 201);
    }
}`);
  add("addbets-detail", "laravel", "StoreBetRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class StoreBetRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'game_id'       => ['required', 'exists:games,id'],
            'bet_type'      => ['required', 'string', 'in:win_lose,over_under,skins'],
            'amount'        => ['required', 'numeric', 'min:1'],
            'participants'  => ['required', 'array', 'min:2'],
            'participants.*'=> ['exists:users,id'],
        ];
    }
}`);
  add("addbets-detail", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\BetController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('bets', [BetController::class, 'index']);
    Route::post('bets', [BetController::class, 'store']);
});`);

  // -- agenda-detail : Agenda Tab -- (3 files)
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

  // -- cgslide-0 : Create Game Wizard (Step 1 - Event) -- (3 files)
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

  // -- cgslide-1 : Create Game Wizard (Step 2 - Tee Sheet) -- (3 files)
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

  // -- cgslide-2 : Create Game Wizard (Step 3 - Game Name & Type) -- (3 files)
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

  // -- cgslide-3 : Create Game Wizard (Step 4 - Match Details) -- (3 files)
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

  // -- cgslide-4 : Create Game Wizard (Step 5 - Start Date & Time) -- (3 files)
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

  // -- cgslide-5 : Create Game Wizard (Step 6 - Handicap Method) -- (3 files)
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

  // -- cgslide-6 : Create Game Wizard (Step 7 - Holes & Players) -- (3 files)
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

  // -- cgslide-7 : Create Game Wizard (Step 8 - Amount For Each) -- (3 files)
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

  // -- cgslide-8 : Create Game Wizard (Step 9 - Set Points) -- (3 files)
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

  // -- cgslide-9 : Create Game Wizard (Step 10 - Create & Success) -- (3 files)
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

  // -- home-detail : Home Screen (General Tab) -- (2 files)
  add("home-detail", "laravel", "DashboardController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Event;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $activeEvent = Event::where('status', 'active')
            ->orderBy('start_date', 'desc')
            ->first();

        $generalItems = [
            ['title' => 'Create Game', 'icon' => 'plus-circle'],
            ['title' => 'Agenda',      'icon' => 'calendar'],
            ['title' => 'View Game',   'icon' => 'eye'],
            ['title' => 'Add Bets',    'icon' => 'cash-stack'],
        ];

        return response()->json([
            'status' => true,
            'data'   => [
                'active_event' => $activeEvent,
                'menu_items'   => $generalItems,
            ],
        ]);
    }
}`);
  add("home-detail", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\DashboardController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
});`);

  // -- sslide-0 : Account Details -- (3 files)
  add("sslide-0", "laravel", "AuthController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\RegisterRequest;
use App\\Models\\User;
use App\\Services\\OtpService;
use Illuminate\\Http\\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private OtpService $otp) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        $this->otp->sendTo($user);

        return response()->json([
            'status'  => true,
            'message' => 'OTP sent to your email',
            'data'    => [
                'user_id' => $user->id,
                'email'   => $user->email,
            ],
        ], 201);
    }
}`);
  add("sslide-0", "laravel", "RegisterRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'unique:users,email'],
            'name'  => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:20'],
        ];
    }
}`);
  add("sslide-0", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\AuthController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
});`);

  // -- sslide-1 : OTP Verify -- (3 files)
  add("sslide-1", "laravel", "OtpController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\VerifyOtpRequest;
use App\\Services\\OtpService;
use Illuminate\\Http\\JsonResponse;

class OtpController extends Controller
{
    public function __construct(private OtpService $otp) {}

    public function verify(VerifyOtpRequest $request): JsonResponse
    {
        $ok = $this->otp->verify($request->email, $request->otp);

        if (! $ok) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid or expired OTP',
            ], 400);
        }

        return response()->json([
            'status'  => true,
            'message' => 'OTP verified successfully',
            'data'    => ['verified' => true],
        ]);
    }

    public function resend(VerifyOtpRequest $request): JsonResponse
    {
        $this->otp->resend($request->email);

        return response()->json(['status' => true, 'message' => 'OTP resent']);
    }
}`);
  add("sslide-1", "laravel", "VerifyOtpRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users,email'],
            'otp'   => ['sometimes', 'digits:6'],
        ];
    }
}`);
  add("sslide-1", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\OtpController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/verify-otp', [OtpController::class, 'verify']);
    Route::post('/resend-otp', [OtpController::class, 'resend']);
});`);

  // -- sslide-2 : Set Password -- (3 files)
  add("sslide-2", "laravel", "PasswordController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Http\\Requests\\SetPasswordRequest;
use App\\Models\\User;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Support\\Facades\\Hash;

class PasswordController extends Controller
{
    public function setPassword(SetPasswordRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $user->update(['password' => Hash::make($request->password)]);

        return response()->json([
            'status'  => true,
            'message' => 'Password set successfully',
            'data'    => ['token' => $user->createToken('api')->plainTextToken],
        ]);
    }
}`);
  add("sslide-2", "laravel", "SetPasswordRequest.php", `<?php

namespace App\\Http\\Requests;

use Illuminate\\Foundation\\Http\\FormRequest;

class SetPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'    => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'confirmed', 'min:8'],
        ];
    }
}`);
  add("sslide-2", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\PasswordController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/set-password', [PasswordController::class, 'setPassword']);
});`);

  // -- sslide-3 : Home Course -- (3 files)
  add("sslide-3", "laravel", "CourseController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Course;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class CourseController extends Controller
{
    public function nearby(Request $request): JsonResponse
    {
        $courses = Course::query()
            ->select('id', 'name', 'city')
            ->orderBy('name')
            ->limit(50)
            ->get();

        return response()->json(['status' => true, 'data' => $courses]);
    }

    public function setHomeCourse(Request $request): JsonResponse
    {
        $request->validate(['course_id' => ['required', 'exists:courses,id']]);

        $request->user()->update(['home_course_id' => $request->course_id]);

        return response()->json([
            'status'  => true,
            'message' => 'Home course updated',
        ]);
    }
}`);
  add("sslide-3", "laravel", "User.php", `<?php

namespace App\\Models;

use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;
use Laravel\\Sanctum\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = ['email', 'name', 'phone', 'password', 'home_course_id'];
    protected $hidden   = ['password'];

    public function homeCourse(): BelongsTo
    {
        return $this->belongsTo(Course::class, 'home_course_id');
    }
}`);
  add("sslide-3", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\CourseController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('v1')->group(function () {
    Route::get('/courses/nearby', [CourseController::class, 'nearby']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/user/home-course', [CourseController::class, 'setHomeCourse']);
    });
});`);

  // -- viewgame-detail : Game Overview / View Game -- (2 files)
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

  // vlslide-* (View Ledger) and vrslide-* (View Results) are now in:
  //   JavaScripts/laravel/view-ledger.js
  //   JavaScripts/laravel/view-results.js

  // -- welcome-detail : Welcome Screen -- (2 files)
  add("welcome-detail", "laravel", "AuthController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\User;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Hash;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'status' => true,
            'data'   => [
                'token' => $user->createToken('auth')->plainTextToken,
                'user'  => $user,
            ],
        ]);
    }
}`);
  add("welcome-detail", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\AuthController;
use Illuminate\\Support\\Facades\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});`);

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


  // Game-type-specific steps (calcutta, ryder_cup, horse_race) are now in:
  //   JavaScripts/laravel/add-score-calcutta.js
  //   JavaScripts/laravel/add-score-ryder-cup.js
  //   JavaScripts/laravel/add-score-horse-race.js

})();
