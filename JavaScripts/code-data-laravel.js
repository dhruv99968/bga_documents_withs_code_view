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

  add("sslide-0", "laravel", "AuthController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\RegisterRequest;
use App\\\\Models\\\\User;
use App\\\\Services\\\\OtpService;
use Illuminate\\\\Http\\\\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private OtpService \$otp) {}

    public function register(RegisterRequest \$request): JsonResponse
    {
        \$user = User::create(\$request->validated());

        \$this->otp->sendTo(\$user);

        return response()->json([
            'status'  => true,
            'message' => 'OTP sent to your email',
            'data'    => [
                'user_id' => \$user->id,
                'email'   => \$user->email,
            ],
        ], 201);
    }
}
`);

  add("sslide-0", "laravel", "RegisterRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("sslide-0", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\AuthController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
});
`);

  add("sslide-1", "laravel", "OtpController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\VerifyOtpRequest;
use App\\\\Services\\\\OtpService;
use Illuminate\\\\Http\\\\JsonResponse;

class OtpController extends Controller
{
    public function __construct(private OtpService \$otp) {}

    public function verify(VerifyOtpRequest \$request): JsonResponse
    {
        \$ok = \$this->otp->verify(\$request->email, \$request->otp);

        if (! \$ok) {
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

    public function resend(VerifyOtpRequest \$request): JsonResponse
    {
        \$this->otp->resend(\$request->email);

        return response()->json(['status' => true, 'message' => 'OTP resent']);
    }
}
`);

  add("sslide-1", "laravel", "VerifyOtpRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users,email'],
            'otp'   => ['sometimes', 'digits:6'],
        ];
    }
}
`);

  add("sslide-1", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\OtpController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/verify-otp', [OtpController::class, 'verify']);
    Route::post('/resend-otp', [OtpController::class, 'resend']);
});
`);

  add("sslide-2", "laravel", "PasswordController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\SetPasswordRequest;
use App\\\\Models\\\\User;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Support\\\\Facades\\\\Hash;

class PasswordController extends Controller
{
    public function setPassword(SetPasswordRequest \$request): JsonResponse
    {
        \$user = User::where('email', \$request->email)->firstOrFail();
        \$user->update(['password' => Hash::make(\$request->password)]);

        return response()->json([
            'status'  => true,
            'message' => 'Password set successfully',
            'data'    => ['token' => \$user->createToken('api')->plainTextToken],
        ]);
    }
}
`);

  add("sslide-2", "laravel", "SetPasswordRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

class SetPasswordRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email'    => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'confirmed', 'min:8'],
        ];
    }
}
`);

  add("sslide-2", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\PasswordController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/set-password', [PasswordController::class, 'setPassword']);
});
`);

  add("sslide-3", "laravel", "CourseController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Course;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class CourseController extends Controller
{
    public function nearby(Request \$request): JsonResponse
    {
        \$courses = Course::query()
            ->select('id', 'name', 'city')
            ->orderBy('name')
            ->limit(50)
            ->get();

        return response()->json(['status' => true, 'data' => \$courses]);
    }

    public function setHomeCourse(Request \$request): JsonResponse
    {
        \$request->validate(['course_id' => ['required', 'exists:courses,id']]);

        \$request->user()->update(['home_course_id' => \$request->course_id]);

        return response()->json([
            'status'  => true,
            'message' => 'Home course updated',
        ]);
    }
}
`);

  add("sslide-3", "laravel", "User.php", `
<?php

namespace App\\\\Models;

use Illuminate\\\\Foundation\\\\Auth\\\\User as Authenticatable;
use Illuminate\\\\Database\\\\Eloquent\\\\Relations\\\\BelongsTo;
use Laravel\\\\Sanctum\\\\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected \$fillable = ['email', 'name', 'phone', 'password', 'home_course_id'];
    protected \$hidden   = ['password'];

    public function homeCourse(): BelongsTo
    {
        return \$this->belongsTo(Course::class, 'home_course_id');
    }
}
`);

  add("sslide-3", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\CourseController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::prefix('v1')->group(function () {
    Route::get('/courses/nearby', [CourseController::class, 'nearby']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/user/home-course', [CourseController::class, 'setHomeCourse']);
    });
});
`);

  add("asslide-calcutta-0", "laravel", "CalcuttaController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use App\\\\Models\\\\CalcuttaRound;
use Illuminate\\\\Http\\\\Request;

// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Players
class CalcuttaController extends Controller
{
    public function getRound1Players(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        \$game = Game::with('players')->findOrFail(\$request->game_id);

        return response()->json([
            'status'  => true,
            'message' => 'Round 1 players fetched successfully.',
            'data'    => \$game->players->map(fn(\$p) => [
                'id'       => \$p->id,
                'name'     => \$p->name,
                'handicap' => \$p->handicap,
            ]),
        ]);
    }
}
`);

  add("asslide-calcutta-0", "laravel", "routes/api.php", `
<?php
// Calcutta — Round-1 Select routes
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-players',  [CalcuttaController::class, 'getRound1Players']);
    Route::post('round1-select',  [CalcuttaController::class, 'saveRound1Selection']);
});
`);

  add("asslide-calcutta-1", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Sheet
class CalcuttaController extends Controller
{
    public function getRound1Sheet(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        \$sheet = CalcuttaRound::where('game_id', \$request->game_id)
            ->where('round', 1)->with('player')->get()
            ->map(fn(\$r) => [
                'id'         => \$r->player->id,
                'name'       => \$r->player->name,
                'handicap'   => \$r->player->handicap,
                'bid_amount' => \$r->bid_amount,
                'buyer_id'   => \$r->buyer_id,
            ]);

        return response()->json(['status' => true, 'data' => \$sheet]);
    }
}
`);

  add("asslide-calcutta-1", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-sheet', [CalcuttaController::class, 'getRound1Sheet']);
});
`);

  add("asslide-calcutta-2", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: submitBids
class CalcuttaController extends Controller
{
    public function submitBids(Request \$request)
    {
        \$request->validate([
            'game_id'          => 'required|exists:games,id',
            'organization_id'  => 'required|exists:organizations,id',
            'bids'             => 'required|array',
            'bids.*.player_id' => 'required|exists:users,id',
            'bids.*.amount'    => 'required|numeric|min:0',
        ]);

        foreach (\$request->bids as \$bid) {
            CalcuttaBid::updateOrCreate(
                ['game_id' => \$request->game_id, 'player_id' => \$bid['player_id']],
                ['amount' => \$bid['amount'], 'organization_id' => \$request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Bids submitted successfully.']);
    }
}
`);

  add("asslide-calcutta-2", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('submit-bids', [CalcuttaController::class, 'submitBids']);
});
`);

  add("asslide-calcutta-3", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getRound1Results
class CalcuttaController extends Controller
{
    public function getRound1Results(Request \$request)
    {
        \$results = CalcuttaBid::where('game_id', \$request->game_id)
            ->with(['player', 'buyer'])->get()
            ->map(fn(\$b) => [
                'player_name' => \$b->player->name,
                'buyer_name'  => \$b->buyer->name ?? '—',
                'final_bid'   => \$b->amount,
            ]);

        return response()->json(['status' => true, 'data' => \$results]);
    }
}
`);

  add("asslide-calcutta-3", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('round1-results', [CalcuttaController::class, 'getRound1Results']);
});
`);

  add("asslide-calcutta-4", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: saveMatchConfig
class CalcuttaController extends Controller
{
    public function saveMatchConfig(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
            'play_type'       => 'required|in:COD,2v2 Teams,Individual',
            'holes_per_match' => 'required|in:3 Holes,6 Holes,9 Holes,18 Holes',
        ]);

        CalcuttaConfig::updateOrCreate(
            ['game_id' => \$request->game_id],
            ['play_type' => \$request->play_type, 'holes_per_match' => \$request->holes_per_match,
             'organization_id' => \$request->organization_id]
        );

        return response()->json(['status' => true, 'message' => 'Match config saved.']);
    }
}
`);

  add("asslide-calcutta-4", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('match-config', [CalcuttaController::class, 'saveMatchConfig']);
});
`);

  add("asslide-calcutta-5", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: savePlayerGroupAssignment
class CalcuttaController extends Controller
{
    public function savePlayerGroupAssignment(Request \$request)
    {
        \$request->validate([
            'game_id'                  => 'required|exists:games,id',
            'organization_id'          => 'required|exists:organizations,id',
            'assignments'              => 'required|array',
            'assignments.*.player_id'  => 'required|exists:users,id',
            'assignments.*.group'      => 'required|integer|between:1,4',
        ]);

        foreach (\$request->assignments as \$a) {
            CalcuttaPlayerGroup::updateOrCreate(
                ['game_id' => \$request->game_id, 'player_id' => \$a['player_id']],
                ['group' => \$a['group'], 'organization_id' => \$request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Player groups saved.']);
    }
}
`);

  add("asslide-calcutta-5", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('player-groups',     [CalcuttaController::class, 'savePlayerGroupAssignment']);
    Route::get('available-players',  [CalcuttaController::class, 'getAvailablePlayers']);
});
`);

  add("asslide-calcutta-6", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getCardGroups / saveCards
class CalcuttaController extends Controller
{
    public function getCardGroups(Request \$request)
    {
        \$groups = CalcuttaPlayerGroup::where('game_id', \$request->game_id)
            ->with('players')->get()->groupBy('group')
            ->map(fn(\$g) => ['players' => \$g->map(fn(\$p) => [
                'id' => \$p->player_id, 'name' => \$p->player->name, 'card_number' => \$p->card_number,
            ])]);
        return response()->json(['status' => true, 'data' => \$groups->values()]);
    }

    public function saveCards(Request \$request)
    {
        foreach (\$request->cards as \$c) {
            CalcuttaPlayerGroup::where('game_id', \$request->game_id)
                ->where('player_id', \$c['player_id'])
                ->update(['card_number' => \$c['card_number']]);
        }
        return response()->json(['status' => true, 'message' => 'Cards distributed.']);
    }
}
`);

  add("asslide-calcutta-6", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('card-groups',  [CalcuttaController::class, 'getCardGroups']);
    Route::post('save-cards',  [CalcuttaController::class, 'saveCards']);
});
`);

  add("asslide-calcutta-7", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: getFoursomes
class CalcuttaController extends Controller
{
    public function getFoursomes(Request \$request)
    {
        \$foursomes = Foursome::where('game_id', \$request->game_id)->with('players')->get()
            ->map(fn(\$f) => ['id' => \$f->id, 'players' => \$f->players->map(fn(\$p) => [
                'id' => \$p->id, 'name' => \$p->name, 'handicap' => \$p->handicap])]);
        return response()->json(['status' => true, 'data' => \$foursomes]);
    }
}
`);

  add("asslide-calcutta-7", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::get('foursomes', [CalcuttaController::class, 'getFoursomes']);
});
`);

  add("asslide-calcutta-8", "laravel", "CalcuttaController.php", `
<?php
// Module: Calcutta | Controller: CalcuttaController | Method: generateMatches
class CalcuttaController extends Controller
{
    public function generateMatches(Request \$request)
    {
        \$config    = CalcuttaConfig::where('game_id', \$request->game_id)->firstOrFail();
        \$foursomes = Foursome::where('game_id', \$request->game_id)->with('players')->get();
        \$matches   = [];

        foreach (\$foursomes as \$fs) {
            \$players   = \$fs->players->toArray();
            \$matches[] = CalcuttaMatch::create([
                'game_id'    => \$request->game_id,
                'team1'      => \$players[0]['name'] . ' / ' . \$players[1]['name'],
                'team2'      => \$players[2]['name'] . ' / ' . \$players[3]['name'],
                'hole_start' => 1,
                'hole_end'   => (int) \$config->holes_per_match,
            ]);
        }

        return response()->json(['status' => true, 'data' => \$matches]);
    }
}
`);

  add("asslide-calcutta-8", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/calcutta')->group(function () {
    Route::post('generate-matches', [CalcuttaController::class, 'generateMatches']);
});
`);

  add("asslide-0", "laravel", "FoursomeController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use App\\\\Models\\\\Foursome;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: FoursomeController | Method: getPlayers / store
class FoursomeController extends Controller
{
    public function getPlayers(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        \$game    = Game::with('players')->findOrFail(\$request->game_id);
        \$players = \$game->players->map(fn(\$p) => [
            'id'       => \$p->id,
            'name'     => \$p->name,
            'handicap' => \$p->handicap,
        ]);

        return response()->json(['error' => false, 'data' => \$players]);
    }

    public function store(Request \$request)
    {
        \$request->validate([
            'game_id'          => 'required|exists:games,id',
            'organization_id'  => 'required|exists:organizations,id',
            'player_ids'       => 'required|array|min:2|max:4',
            'player_ids.*'     => 'required|exists:users,id',
        ]);

        \$foursome = Foursome::create(['game_id' => \$request->game_id]);
        \$foursome->players()->attach(\$request->player_ids);

        return response()->json([
            'error'   => false,
            'message' => 'Foursome created.',
            'data'    => \$foursome->load('players'),
        ], 201);
    }
}
`);

  add("asslide-0", "laravel", "routes/api.php", `
<?php
use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\FoursomeController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/players', [FoursomeController::class, 'getPlayers']);
    Route::post('foursomes',              [FoursomeController::class, 'store']);
});
`);

  add("asslide-1", "laravel", "FoursomeController.php", `
<?php
// Module: Add Score | Controller: FoursomeController | Method: generateMatches
class FoursomeController extends Controller
{
    public function generateMatches(Request \$request, int \$gameId)
    {
        \$request->validate([
            'foursome_ids'   => 'required|array',
            'foursome_ids.*' => 'required|exists:foursomes,id',
        ]);

        \$matches = [];
        foreach (\$request->foursome_ids as \$fsId) {
            \$foursome = Foursome::with('players')->findOrFail(\$fsId);
            \$players  = \$foursome->players->toArray();

            \$matches[] = GameMatch::create([
                'game_id'    => \$gameId,
                'foursome_id'=> \$fsId,
                'team1'      => (\$players[0]['name'] ?? '') . ' / ' . (\$players[1]['name'] ?? ''),
                'team2'      => (\$players[2]['name'] ?? '') . ' / ' . (\$players[3]['name'] ?? ''),
                'hole'       => 1,
            ])->toArray();
        }

        return response()->json(['error' => false, 'data' => \$matches]);
    }
}
`);

  add("asslide-1", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games/{game_id}/generate-matches', [FoursomeController::class, 'generateMatches']);
});
`);

  add("asslide-2", "laravel", "GameController.php", `
<?php
// Module: Add Score | Controller: GameController | Method: saveMatchConfig
class GameController extends Controller
{
    public function saveMatchConfig(Request \$request, int \$gameId)
    {
        \$request->validate([
            'play_type'       => 'required|in:COD,2v2 Teams,Individual,Random',
            'holes_per_match' => 'required|string',
            'handicap_method' => 'nullable|string',
        ]);

        \\\\App\\\\Models\\\\Game::findOrFail(\$gameId)->update([
            'play_type'       => \$request->play_type,
            'holes_per_match' => \$request->holes_per_match,
            'handicap_method' => \$request->handicap_method,
        ]);

        return response()->json(['error' => false, 'message' => 'Match config saved.']);
    }
}
`);

  add("asslide-2", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games/{game_id}/match-config', [GameController::class, 'saveMatchConfig']);
});
`);

  add("asslide-3", "laravel", "FoursomeController.php", `
<?php
// Module: Add Score | Controller: FoursomeController | Method: update
class FoursomeController extends Controller
{
    public function update(Request \$request, int \$foursomeId)
    {
        \$request->validate([
            'game_id'    => 'required|exists:games,id',
            'tee_box'    => 'nullable|string',
            'start_hole' => 'nullable|integer|between:1,18',
        ]);

        \$foursome = Foursome::findOrFail(\$foursomeId);
        \$foursome->update(\$request->only('tee_box', 'start_hole'));

        return response()->json(['error' => false, 'message' => 'Foursome setting updated.']);
    }
}
`);

  add("asslide-3", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::patch('foursomes/{foursome_id}', [FoursomeController::class, 'update']);
});
`);

  add("asslide-4", "laravel", "FoursomeBetController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\FoursomeBet;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: FoursomeBetController | Method: store (standard bets)
class FoursomeBetController extends Controller
{
    public function store(Request \$request, int \$foursomeId)
    {
        \$request->validate([
            'game_id'    => 'required|exists:games,id',
            'rebit'      => 'boolean',
            'cheken'     => 'boolean',
            'dot_game'   => 'boolean',
            'newt'       => 'boolean',
            'towfer'     => 'boolean',
            'bet_amount' => 'required|numeric|min:0',
        ]);

        FoursomeBet::updateOrCreate(
            ['foursome_id' => \$foursomeId, 'game_id' => \$request->game_id],
            \$request->only('rebit','cheken','dot_game','newt','towfer','bet_amount')
        );

        return response()->json(['error' => false, 'message' => 'Foursome bets saved.']);
    }

    // Wolf-specific variant
    public function storeWolf(Request \$request, int \$foursomeId)
    {
        \$request->validate([
            'game_id'      => 'required|exists:games,id',
            'wolf_enabled' => 'boolean',
            'wolf_amount'  => 'required|numeric|min:0',
            'blind_wolf'   => 'boolean',
        ]);

        FoursomeBet::updateOrCreate(
            ['foursome_id' => \$foursomeId, 'game_id' => \$request->game_id],
            \$request->only('wolf_enabled','wolf_amount','blind_wolf')
        );

        return response()->json(['error' => false, 'message' => 'Wolf bets saved.']);
    }
}
`);

  add("asslide-4", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('foursomes/{foursome_id}/bets',      [FoursomeBetController::class, 'store']);
    Route::post('foursomes/{foursome_id}/wolf-bets', [FoursomeBetController::class, 'storeWolf']);
});
`);

  add("asslide-5", "laravel", "FoursomeController.php", `
<?php
// Module: Add Score | Controller: FoursomeController | Method: index (game foursomes)
class FoursomeController extends Controller
{
    public function index(Request \$request, int \$gameId)
    {
        \$foursomes = Foursome::where('game_id', \$gameId)
            ->with('players')
            ->get()
            ->map(fn(\$f) => [
                'id'      => \$f->id,
                'players' => \$f->players->map(fn(\$p) => [
                    'id'       => \$p->id,
                    'name'     => \$p->name,
                    'handicap' => \$p->handicap,
                ]),
                'scored'  => \\\\App\\\\Models\\\\Score::where('foursome_id', \$f->id)->exists(),
                'tee_box' => \$f->tee_box,
            ]);

        return response()->json(['error' => false, 'data' => \$foursomes]);
    }
}
`);

  add("asslide-5", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/foursomes', [FoursomeController::class, 'index']);
});
`);

  add("asslide-6", "laravel", "CourseHoleController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\CourseHole;
use App\\\\Models\\\\Score;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: CourseHoleController | Method: index
class CourseHoleController extends Controller
{
    public function index(Request \$request, int \$courseId)
    {
        \$holes = CourseHole::where('course_id', \$courseId)
            ->when(\$request->tee_box, fn(\$q, \$v) => \$q->where('tee_box', \$v))
            ->orderBy('hole_number')
            ->get()
            ->map(fn(\$h) => [
                'hole_number'      => \$h->hole_number,
                'par'              => \$h->par,
                'handicap_index'   => \$h->handicap_index,
                'distance_yards'   => \$h->distance_yards,
            ]);

        return response()->json(['error' => false, 'data' => \$holes]);
    }

    public function foursomeScores(Request \$request, int \$foursomeId)
    {
        \$scores = Score::where('foursome_id', \$foursomeId)
            ->with('player')
            ->get()
            ->groupBy('player_id')
            ->map(fn(\$rows, \$pid) => [
                'player_id'   => \$pid,
                'player_name' => \$rows->first()->player->name,
                'scores'      => \$rows->map(fn(\$r) => [
                    'hole'  => \$r->hole_number,
                    'score' => \$r->score,
                ])->values(),
            ])->values();

        return response()->json(['error' => false, 'data' => \$scores]);
    }
}
`);

  add("asslide-6", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('courses/{course_id}/holes',          [CourseHoleController::class, 'index']);
    Route::get('foursomes/{foursome_id}/scores',     [CourseHoleController::class, 'foursomeScores']);
});
`);

  add("asslide-7", "laravel", "ScoreController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Score;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: ScoreController | Method: store / update
class ScoreController extends Controller
{
    public function store(Request \$request)
    {
        \$request->validate([
            'game_id'     => 'required|exists:games,id',
            'foursome_id' => 'required|exists:foursomes,id',
            'player_id'   => 'required|exists:users,id',
            'hole_number' => 'required|integer|between:1,27',
            'score'       => 'required|integer|min:1|max:20',
            'putts'       => 'nullable|integer|min:0|max:10',
            'fairway_hit' => 'nullable|boolean',
            'gir'         => 'nullable|boolean',
        ]);

        \$score = Score::updateOrCreate(
            [
                'game_id'     => \$request->game_id,
                'foursome_id' => \$request->foursome_id,
                'player_id'   => \$request->player_id,
                'hole_number' => \$request->hole_number,
            ],
            \$request->only('score','putts','fairway_hit','gir')
        );

        return response()->json([
            'error'   => false,
            'message' => 'Score saved.',
            'data'    => \$score,
        ], 201);
    }

    public function update(Request \$request, int \$scoreId)
    {
        \$score = Score::findOrFail(\$scoreId);
        \$score->update(\$request->only('score','putts','fairway_hit','gir'));

        return response()->json(['error' => false, 'message' => 'Score updated.', 'data' => \$score]);
    }
}
`);

  add("asslide-7", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('scores',          [ScoreController::class, 'store']);
    Route::put('scores/{score_id}',[ScoreController::class, 'update']);
});
`);

  add("asslide-8", "laravel", "JunkController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\JunkOption;
use App\\\\Models\\\\JunkReward;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: JunkController | Method: options / store
class JunkController extends Controller
{
    public function options(Request \$request, int \$gameId)
    {
        \$options = JunkOption::where('game_id', \$gameId)
            ->orWhere('is_global', true)
            ->get()
            ->map(fn(\$o) => [
                'id'     => \$o->id,
                'name'   => \$o->name,
                'type'   => \$o->type,   // MADE | MISSED | EARNED
                'amount' => \$o->amount,
            ]);

        return response()->json(['error' => false, 'data' => \$options]);
    }

    public function store(Request \$request, int \$scoreId)
    {
        \$request->validate([
            'game_id'        => 'required|exists:games,id',
            'junk_option_id' => 'required|exists:junk_options,id',
            'type'           => 'required|in:MADE,MISSED,EARNED',
        ]);

        JunkReward::create([
            'score_id'       => \$scoreId,
            'game_id'        => \$request->game_id,
            'junk_option_id' => \$request->junk_option_id,
            'type'           => \$request->type,
        ]);

        return response()->json(['error' => false, 'message' => 'Junk reward recorded.']);
    }
}
`);

  add("asslide-8", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/junk-options',    [JunkController::class, 'options']);
    Route::post('scores/{score_id}/junk',         [JunkController::class, 'store']);
});
`);

  add("asslide-9", "laravel", "LeaderboardController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Score;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: LeaderboardController | Method: index
class LeaderboardController extends Controller
{
    public function index(Request \$request, int \$gameId)
    {
        \$game    = Game::with(['players', 'foursomes.players'])->findOrFail(\$gameId);

        \$standings = \$game->players->map(function (\$player) use (\$gameId) {
            \$scores = Score::where('game_id', \$gameId)
                ->where('player_id', \$player->id)
                ->get();

            \$gross = \$scores->sum('score');
            \$net   = \$gross - (\$player->handicap ?? 0);
            \$thru  = \$scores->count();

            return [
                'player_id'   => \$player->id,
                'player_name' => \$player->name,
                'gross'       => \$gross,
                'net'         => \$net,
                'thru'        => \$thru,
            ];
        })->sortBy('net')->values();

        \$standings = \$standings->map(fn(\$s, \$i) => array_merge(\$s, ['rank' => \$i + 1]));

        return response()->json(['error' => false, 'data' => \$standings]);
    }
}
`);

  add("asslide-9", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/leaderboard', [LeaderboardController::class, 'index']);
});
`);

  add("asslide-10", "laravel", "GameResultController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use App\\\\Models\\\\Score;
use Illuminate\\\\Http\\\\Request;

// Module: Add Score | Controller: GameResultController | Method: show
class GameResultController extends Controller
{
    public function show(Request \$request, int \$gameId)
    {
        \$game    = Game::with('players')->findOrFail(\$gameId);

        \$players = \$game->players->map(function (\$p) use (\$gameId) {
            \$scores   = Score::where('game_id', \$gameId)->where('player_id', \$p->id)->get();
            \$gross    = \$scores->sum('score');
            \$net      = \$gross - (\$p->handicap ?? 0);

            return [
                'id'       => \$p->id,
                'name'     => \$p->name,
                'gross'    => \$gross,
                'net'      => \$net,
                'points'   => 0, // calculated by game-type logic
                'winnings' => 0.00,
            ];
        })->sortBy('net')->values();

        return response()->json([
            'error' => false,
            'data'  => [
                'winner'  => \$players->first(),
                'players' => \$players,
                'skins'   => [],
            ],
        ]);
    }
}
`);

  add("asslide-10", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{game_id}/results', [GameResultController::class, 'show']);
});
`);

  add("asslide-11", "laravel", "FoursomeController.php", `
<?php
// Module: Add Score | Controller: FoursomeController | Method: complete / finalize
class FoursomeController extends Controller
{
    public function complete(Request \$request, int \$foursomeId)
    {
        \$request->validate([
            'game_id' => 'required|exists:games,id',
        ]);

        \$foursome = Foursome::findOrFail(\$foursomeId);
        \$foursome->update(['status' => 'complete']);

        \$allComplete = !Foursome::where('game_id', \$request->game_id)
            ->where('status', '!=', 'complete')
            ->exists();

        return response()->json([
            'error'   => false,
            'message' => 'Foursome scoring complete.',
            'data'    => [
                'all_foursomes_complete' => \$allComplete,
                'game_status'            => \$allComplete ? 'completed' : 'in_progress',
            ],
        ]);
    }

    public function finalize(Request \$request, int \$gameId)
    {
        \$request->validate(['confirm' => 'required|boolean|accepted']);

        Game::findOrFail(\$gameId)->update(['status' => 'completed']);

        return response()->json([
            'error'   => false,
            'message' => 'Game finalized. Results and ledger are available.',
            'data'    => ['game_id' => \$gameId, 'status' => 'completed'],
        ]);
    }
}
`);

  add("asslide-11", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('foursomes/{foursome_id}/complete', [FoursomeController::class, 'complete']);
    Route::post('games/{game_id}/finalize',         [FoursomeController::class, 'finalize']);
});
`);

  add("asslide-horse_race-0", "laravel", "HorseRaceController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\HorseRaceConfig;
use Illuminate\\\\Http\\\\Request;

// Module: Horse Race | Controller: HorseRaceController | Method: saveSetup
class HorseRaceController extends Controller
{
    public function saveSetup(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
            'number_of_teams' => 'required|integer|between:2,4',
            'holes'           => 'required|integer|in:9,18,27',
            'bet_amount'      => 'required|numeric|min:0',
        ]);

        HorseRaceConfig::updateOrCreate(
            ['game_id' => \$request->game_id],
            ['number_of_teams' => \$request->number_of_teams,
             'holes'           => \$request->holes,
             'bet_amount'      => \$request->bet_amount,
             'organization_id' => \$request->organization_id]
        );

        return response()->json(['status' => true, 'message' => 'Game setup saved.']);
    }

    public function getConfig(Request \$request)
    {
        \$config = HorseRaceConfig::where('game_id', \$request->game_id)->firstOrFail();
        return response()->json(['status' => true, 'data' => \$config]);
    }
}
`);

  add("asslide-horse_race-0", "laravel", "routes/api.php", `
<?php
// Horse Race — Game Setup routes
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::post('setup',  [HorseRaceController::class, 'saveSetup']);
    Route::get('config',  [HorseRaceController::class, 'getConfig']);
});
`);

  add("asslide-horse_race-1", "laravel", "HorseRaceController.php", `
<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getTeams
class HorseRaceController extends Controller
{
    public function getTeams(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        \$config = HorseRaceConfig::where('game_id', \$request->game_id)->firstOrFail();

        \$teams = HorseRaceTeam::where('game_id', \$request->game_id)->with('players')->get()
            ->map(fn(\$t) => ['id' => \$t->id, 'team_no' => \$t->team_number,
                'players' => \$t->players->map(fn(\$p) => [
                    'id' => \$p->id, 'name' => \$p->name, 'handicap' => \$p->handicap])]);

        return response()->json([
            'status' => true, 'data' => \$teams,
            'number_of_teams' => \$config->number_of_teams,
        ]);
    }
}
`);

  add("asslide-horse_race-1", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('teams', [HorseRaceController::class, 'getTeams']);
});
`);

  add("asslide-horse_race-2", "laravel", "HorseRaceController.php", `
<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getGamePlayers / saveTeamAssignments
class HorseRaceController extends Controller
{
    public function getGamePlayers(Request \$request)
    {
        \$game    = \\\\App\\\\Models\\\\Game::with('players')->findOrFail(\$request->game_id);
        \$players = \$game->players->map(fn(\$p) => [
            'id' => \$p->id, 'name' => \$p->name, 'handicap' => \$p->handicap]);
        return response()->json(['status' => true, 'data' => \$players]);
    }

    public function saveTeamAssignments(Request \$request)
    {
        \$request->validate([
            'game_id'                 => 'required|exists:games,id',
            'organization_id'         => 'required|exists:organizations,id',
            'assignments'             => 'required|array',
            'assignments.*.player_id' => 'required|exists:users,id',
            'assignments.*.team'      => 'required|integer|between:1,4',
        ]);

        foreach (\$request->assignments as \$a) {
            HorseRacePlayerTeam::updateOrCreate(
                ['game_id' => \$request->game_id, 'player_id' => \$a['player_id']],
                ['team' => \$a['team'], 'organization_id' => \$request->organization_id]
            );
        }

        return response()->json(['status' => true, 'message' => 'Team assignments saved.']);
    }
}
`);

  add("asslide-horse_race-2", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('game-players',      [HorseRaceController::class, 'getGamePlayers']);
    Route::post('team-assignments', [HorseRaceController::class, 'saveTeamAssignments']);
});
`);

  add("asslide-horse_race-3", "laravel", "HorseRaceController.php", `
<?php
// Module: Horse Race | Controller: HorseRaceController | Method: getFinalAssignments / confirmTeams
class HorseRaceController extends Controller
{
    public function getFinalAssignments(Request \$request)
    {
        \$config = HorseRaceConfig::where('game_id', \$request->game_id)->firstOrFail();

        \$teams = collect(range(1, \$config->number_of_teams))->map(fn(\$t) => [
            'team_number' => \$t,
            'players'     => HorseRacePlayerTeam::where('game_id', \$request->game_id)
                ->where('team', \$t)->with('player')->get()
                ->map(fn(\$r) => ['id' => \$r->player->id, 'name' => \$r->player->name]),
        ]);

        return response()->json(['status' => true, 'data' => \$teams]);
    }

    public function confirmTeams(Request \$request)
    {
        HorseRaceConfig::where('game_id', \$request->game_id)->update(['teams_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Teams confirmed. Ready to score.']);
    }
}
`);

  add("asslide-horse_race-3", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/horse-race')->group(function () {
    Route::get('final-assignments', [HorseRaceController::class, 'getFinalAssignments']);
    Route::post('confirm-teams',    [HorseRaceController::class, 'confirmTeams']);
});
`);

  add("asslide-ryder_cup-0", "laravel", "RyderCupController.php", `
<?php
namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use App\\\\Models\\\\RyderCupTeam;
use Illuminate\\\\Http\\\\Request;

// Module: Ryder Cup | Controller: RyderCupController | Method: getTeams / setCaptains
class RyderCupController extends Controller
{
    public function getTeams(Request \$request)
    {
        \$request->validate([
            'game_id'         => 'required|exists:games,id',
            'organization_id' => 'required|exists:organizations,id',
        ]);

        \$teamA = RyderCupTeam::where('game_id', \$request->game_id)->where('team', 'A')
            ->with('player')->get()->map(fn(\$r) => [
                'id' => \$r->player->id, 'name' => \$r->player->name,
                'handicap' => \$r->player->handicap, 'is_captain' => \$r->is_captain]);

        \$teamB = RyderCupTeam::where('game_id', \$request->game_id)->where('team', 'B')
            ->with('player')->get()->map(fn(\$r) => [
                'id' => \$r->player->id, 'name' => \$r->player->name,
                'handicap' => \$r->player->handicap, 'is_captain' => \$r->is_captain]);

        return response()->json(['status' => true, 'data' => ['teamA' => \$teamA, 'teamB' => \$teamB]]);
    }

    public function setCaptains(Request \$request)
    {
        \$request->validate([
            'game_id'           => 'required|exists:games,id',
            'team_a_captain_id' => 'required|exists:users,id',
            'team_b_captain_id' => 'required|exists:users,id',
            'organization_id'   => 'required|exists:organizations,id',
        ]);

        RyderCupTeam::where('game_id', \$request->game_id)->update(['is_captain' => false]);
        RyderCupTeam::where('game_id', \$request->game_id)
            ->whereIn('player_id', [\$request->team_a_captain_id, \$request->team_b_captain_id])
            ->update(['is_captain' => true]);

        return response()->json(['status' => true, 'message' => 'Captains set successfully.']);
    }
}
`);

  add("asslide-ryder_cup-0", "laravel", "routes/api.php", `
<?php
// Ryder Cup — Captain Selection routes
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('teams',         [RyderCupController::class, 'getTeams']);
    Route::post('set-captains', [RyderCupController::class, 'setCaptains']);
});
`);

  add("asslide-ryder_cup-1", "laravel", "RyderCupController.php", `
<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getDraftPool / draftPick
class RyderCupController extends Controller
{
    public function getDraftPool(Request \$request)
    {
        \$pickedIds = RyderCupDraftPick::where('game_id', \$request->game_id)->pluck('player_id');
        \$pool      = Game::findOrFail(\$request->game_id)->players()
            ->whereNotIn('users.id', \$pickedIds)->get()
            ->map(fn(\$p) => ['id' => \$p->id, 'name' => \$p->name, 'handicap' => \$p->handicap]);

        return response()->json(['status' => true, 'data' => \$pool]);
    }

    public function draftPick(Request \$request)
    {
        \$request->validate([
            'game_id'   => 'required|exists:games,id',
            'player_id' => 'required|exists:users,id',
            'team'      => 'required|in:A,B',
        ]);

        RyderCupDraftPick::create([
            'game_id'   => \$request->game_id,
            'player_id' => \$request->player_id,
            'team'      => \$request->team,
        ]);

        return response()->json(['status' => true, 'message' => 'Player drafted.']);
    }
}
`);

  add("asslide-ryder_cup-1", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('draft-pool',  [RyderCupController::class, 'getDraftPool']);
    Route::post('draft-pick', [RyderCupController::class, 'draftPick']);
});
`);

  add("asslide-ryder_cup-2", "laravel", "RyderCupController.php", `
<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getSelectedPlayers / confirmPlayers
class RyderCupController extends Controller
{
    public function getSelectedPlayers(Request \$request)
    {
        \$teamA = RyderCupDraftPick::where('game_id', \$request->game_id)->where('team', 'A')
            ->with('player')->get()->map(fn(\$r) => [
                'id' => \$r->player->id, 'name' => \$r->player->name,
                'handicap' => \$r->player->handicap, 'is_captain' => false]);

        \$teamB = RyderCupDraftPick::where('game_id', \$request->game_id)->where('team', 'B')
            ->with('player')->get()->map(fn(\$r) => [
                'id' => \$r->player->id, 'name' => \$r->player->name,
                'handicap' => \$r->player->handicap, 'is_captain' => false]);

        return response()->json(['status' => true, 'data' => ['teamA' => \$teamA, 'teamB' => \$teamB]]);
    }

    public function confirmPlayers(Request \$request)
    {
        Game::findOrFail(\$request->game_id)->update(['draft_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Player selection confirmed.']);
    }
}
`);

  add("asslide-ryder_cup-2", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('selected-players',  [RyderCupController::class, 'getSelectedPlayers']);
    Route::post('confirm-players',  [RyderCupController::class, 'confirmPlayers']);
});
`);

  add("asslide-ryder_cup-3", "laravel", "RyderCupController.php", `
<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: setTeeTimes
class RyderCupController extends Controller
{
    public function setTeeTimes(Request \$request)
    {
        \$request->validate([
            'game_id'                    => 'required|exists:games,id',
            'tee_times'                  => 'required|array',
            'tee_times.*.foursome_id'    => 'required|integer',
            'tee_times.*.tee_time'       => 'required|string',
        ]);

        foreach (\$request->tee_times as \$t) {
            Foursome::where('id', \$t['foursome_id'])->where('game_id', \$request->game_id)
                ->update(['tee_time' => \$t['tee_time']]);
        }

        return response()->json(['status' => true, 'message' => 'Tee times saved.']);
    }
}
`);

  add("asslide-ryder_cup-3", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::post('tee-times',          [RyderCupController::class, 'setTeeTimes']);
    Route::get('tee-time-foursomes',  [RyderCupController::class, 'getTeeTimeFoursomes']);
});
`);

  add("asslide-ryder_cup-4", "laravel", "RyderCupController.php", `
<?php
// Module: Ryder Cup | Controller: RyderCupController | Method: getFoursomes / assignPlayerToFoursome / confirmFoursomes
class RyderCupController extends Controller
{
    public function getFoursomes(Request \$request)
    {
        \$foursomes = Foursome::where('game_id', \$request->game_id)->with('players')->get()
            ->map(fn(\$f) => ['id' => \$f->id, 'players' => \$f->players->map(fn(\$p) => [
                'id' => \$p->id, 'name' => \$p->name, 'team' => \$p->pivot->team ?? '—'])]);
        return response()->json(['status' => true, 'data' => \$foursomes]);
    }

    public function assignPlayerToFoursome(Request \$request)
    {
        \$request->validate([
            'game_id'     => 'required|exists:games,id',
            'foursome_id' => 'required|integer',
            'player_id'   => 'required|exists:users,id',
        ]);
        FoursomePlayer::updateOrCreate(
            ['foursome_id' => \$request->foursome_id, 'player_id' => \$request->player_id],
            ['game_id' => \$request->game_id]
        );
        return response()->json(['status' => true, 'message' => 'Player assigned.']);
    }

    public function confirmFoursomes(Request \$request)
    {
        Game::findOrFail(\$request->game_id)->update(['foursomes_confirmed' => true]);
        return response()->json(['status' => true, 'message' => 'Foursomes confirmed.']);
    }
}
`);

  add("asslide-ryder_cup-4", "laravel", "routes/api.php", `
<?php
Route::middleware('auth:sanctum')->prefix('v1/ryder-cup')->group(function () {
    Route::get('foursomes',               [RyderCupController::class, 'getFoursomes']);
    Route::post('assign-player-foursome', [RyderCupController::class, 'assignPlayerToFoursome']);
    Route::post('confirm-foursomes',      [RyderCupController::class, 'confirmFoursomes']);
});
`);

  add("addbets-detail", "laravel", "BetController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreBetRequest;
use App\\\\Models\\\\Bet;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class BetController extends Controller
{
    public function index(Request \$request): JsonResponse
    {
        \$bets = Bet::where('game_id', \$request->game_id)
            ->with('creator', 'participants')
            ->when(\$request->status, fn(\$q, \$v) => \$q->where('status', \$v))
            ->when(\$request->my_bets, fn(\$q) => \$q->where('creator_id', \$request->user()->id))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(['status' => true, 'data' => \$bets]);
    }

    public function store(StoreBetRequest \$request): JsonResponse
    {
        \$bet = Bet::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        return response()->json([
            'status' => true,
            'message' => 'Bet created',
            'data'    => \$bet,
        ], 201);
    }
}
`);

  add("addbets-detail", "laravel", "StoreBetRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("addbets-detail", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\BetController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('bets', [BetController::class, 'index']);
    Route::post('bets', [BetController::class, 'store']);
});
`);

  add("agenda-detail", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function index(Request \$request): JsonResponse
    {
        \$games = Game::with('course')
            ->where('user_id', \$request->user()->id)
            ->orWhereHas('players', fn(\$q) => \$q->where('user_id', \$request->user()->id))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json(['status' => true, 'data' => \$games]);
    }
}
`);

  add("agenda-detail", "laravel", "EventController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Event;
use Illuminate\\\\Http\\\\JsonResponse;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        \$events = Event::orderBy('start_date', 'desc')->paginate(20);

        return response()->json(['status' => true, 'data' => \$events]);
    }
}
`);

  add("agenda-detail", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\EventController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::apiResource('games', GameController::class)->only(['index']);
    Route::get('events', [EventController::class, 'index']);
});
`);

  add("cgslide-0", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-0", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-0", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-1", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-1", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-1", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-2", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-2", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-2", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-3", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-3", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-3", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-4", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-4", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-4", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-5", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-5", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-5", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-6", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-6", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-6", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-7", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-7", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-7", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-8", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-8", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-8", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("cgslide-9", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("cgslide-9", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("cgslide-9", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("home-detail", "laravel", "DashboardController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Event;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class DashboardController extends Controller
{
    public function index(Request \$request): JsonResponse
    {
        \$activeEvent = Event::where('status', 'active')
            ->orderBy('start_date', 'desc')
            ->first();

        \$generalItems = [
            ['title' => 'Create Game', 'icon' => 'plus-circle'],
            ['title' => 'Agenda',      'icon' => 'calendar'],
            ['title' => 'View Game',   'icon' => 'eye'],
            ['title' => 'Add Bets',    'icon' => 'cash-stack'],
        ];

        return response()->json([
            'status' => true,
            'data'   => [
                'active_event' => \$activeEvent,
                'menu_items'   => \$generalItems,
            ],
        ]);
    }
}
`);

  add("home-detail", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\DashboardController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index']);
});
`);

  add("wslide-0", "laravel", "routes/api.php", `
<?php
// References same AuthController as welcome-detail.
// Routes:
//   POST /api/v1/auth/login
//   POST /api/v1/auth/register
`);

  add("wslide-1", "laravel", "routes/api.php", `
<?php
// References same controllers as sslide-0.
// Routes:
//   POST /api/v1/auth/register
//   POST /api/v1/auth/otp/send
//   POST /api/v1/auth/otp/verify
`);

  add("wslide-2", "laravel", "routes/api.php", `
<?php
// References same CourseController as sslide-3.
// Routes:
//   GET  /api/v1/courses/nearby
//   POST /api/v1/user/home-course
`);

  add("wslide-3", "laravel", "routes/api.php", `
<?php
// References same DashboardController as home-detail.
// Routes:
//   GET /api/v1/dashboard
`);

  add("wslide-4", "laravel", "GameController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreGameRequest;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameController extends Controller
{
    public function store(StoreGameRequest \$request): JsonResponse
    {
        \$game = Game::create(\$request->validated() + ['creator_id' => \$request->user()->id]);

        if (\$request->has('player_ids')) {
            \$game->players()->attach(\$request->player_ids);
        }

        return response()->json([
            'status'  => true,
            'message' => 'Game created successfully',
            'data'    => \$game->load('course', 'players'),
        ], 201);
    }
}
`);

  add("wslide-4", "laravel", "StoreGameRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("wslide-4", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('games', [GameController::class, 'store']);
});
`);

  add("wslide-5", "laravel", "GameController.php", `
<?php
// Game creation confirmation â€” uses GameController::store from wslide-4
// The response includes the created game object with a shareable link.
// Endpoint: POST /api/v1/games
`);

  add("wslide-6", "laravel", "routes/api.php", `
<?php
// References same GameDetailsController as viewgame-detail.
// Routes:
//   GET /api/v1/games/{id}/details
`);

  add("wslide-7", "laravel", "routes/api.php", `
<?php
// References same BetController as addbets-detail.
// Routes:
//   GET  /api/v1/bets
//   POST /api/v1/bets
`);

  add("wslide-8", "laravel", "FoursomeController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Foursome;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class FoursomeController extends Controller
{
    public function index(Request \$request): JsonResponse
    {
        \$foursomes = Foursome::where('game_id', \$request->game_id)
            ->with('players')
            ->get();

        return response()->json(['status' => true, 'data' => \$foursomes]);
    }
}
`);

  add("wslide-8", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\FoursomeController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('foursomes', [FoursomeController::class, 'index']);
});
`);

  add("wslide-9", "laravel", "ScoreController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Http\\\\Requests\\\\StoreScoreRequest;
use App\\\\Models\\\\Score;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class ScoreController extends Controller
{
    public function store(StoreScoreRequest \$request): JsonResponse
    {
        \$score = Score::create(\$request->validated());

        return response()->json([
            'status'  => true,
            'message' => 'Score saved',
            'data'    => \$score,
        ], 201);
    }

    public function byGame(Request \$request, \$gameId): JsonResponse
    {
        \$scores = Score::where('game_id', \$gameId)
            ->with('player')
            ->orderBy('hole_number')
            ->get();

        return response()->json(['status' => true, 'data' => \$scores]);
    }
}
`);

  add("wslide-9", "laravel", "StoreScoreRequest.php", `
<?php

namespace App\\\\Http\\\\Requests;

use Illuminate\\\\Foundation\\\\Http\\\\FormRequest;

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
}
`);

  add("wslide-9", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\ScoreController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('scores', [ScoreController::class, 'store']);
    Route::get('games/{gameId}/scores', [ScoreController::class, 'byGame']);
});
`);

  add("vlslide-0", "laravel", "LedgerController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class LedgerController extends Controller
{
    public function index(Request \$request, \$gameId): JsonResponse
    {
        \$game = Game::with('players.transactions')->findOrFail(\$gameId);

        \$ledger = \$game->players->map(function (\$player) {
            return [
                'player'  => \$player->name,
                'buy_in'  => \$player->transactions->where('type', 'buy_in')->sum('amount'),
                'bets'    => \$player->transactions->where('type', 'bet')->sum('amount'),
                'payout'  => \$player->transactions->where('type', 'payout')->sum('amount'),
                'balance' => \$player->transactions->sum('amount'),
            ];
        });

        return response()->json(['status' => true, 'data' => \$ledger]);
    }
}
`);

  add("vlslide-0", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\LedgerController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/ledger', [LedgerController::class, 'index']);
    Route::get('games/{gameId}/ledger/player/{playerId}', [LedgerController::class, 'playerDetail']);
    Route::post('games/{gameId}/ledger/settle', [LedgerController::class, 'settle']);
});
`);

  add("vlslide-1", "laravel", "routes/api.php", `
<?php
// Uses same LedgerController as vlslide-0.
// Endpoint: POST /api/v1/games/{gameId}/ledger/pay
// Initiates a payment from the player to settle their balance.
`);

  add("vlslide-2", "laravel", "routes/api.php", `
<?php
// Uses same LedgerController as vlslide-0.
// Endpoint: GET /api/v1/games/{gameId}/ledger/player/{playerId}
// Returns the winning amount breakdown for a specific player.
`);

  add("vlslide-3", "laravel", "PaymentController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Transaction;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class PaymentController extends Controller
{
    public function paypalPay(Request \$request): JsonResponse
    {
        \$request->validate([
            'game_id'   => ['required', 'exists:games,id'],
            'player_id' => ['required', 'exists:users,id'],
            'amount'    => ['required', 'numeric', 'min:1'],
        ]);

        // Integrate with PayPal SDK here
        Transaction::create([
            'game_id'   => \$request->game_id,
            'player_id' => \$request->player_id,
            'type'      => 'payment',
            'method'    => 'paypal',
            'amount'    => -\$request->amount,
            'status'    => 'completed',
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Payment completed via PayPal',
        ]);
    }
}
`);

  add("vlslide-3", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\PaymentController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('payments/paypal', [PaymentController::class, 'paypalPay']);
});
`);

  add("vlslide-4", "laravel", "routes/api.php", `
<?php
// Payment confirmation — uses PaymentController::paypalPay from vlslide-3.
// On success returns: { status: true, message: 'Payment completed via PayPal' }
`);

  add("vrslide-0", "laravel", "ResultController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class ResultController extends Controller
{
    public function allPlayers(Request \$request, \$gameId): JsonResponse
    {
        \$game = Game::with(['players.scores', 'players.foursome'])->findOrFail(\$gameId);

        \$results = \$game->players->map(function (\$player) {
            return [
                'player'    => \$player->name,
                'foursome'  => \$player->foursome?->name,
                'gross'     => \$player->scores->sum('score'),
                'net'       => \$player->scores->sum('score') - (\$player->handicap ?? 0),
                'points'    => \$player->scores->sum('points'),
            ];
        });

        return response()->json(['status' => true, 'data' => \$results]);
    }

    public function foursomeTab(Request \$request, \$gameId): JsonResponse
    {
        \$game = Game::with('foursomes.players.scores')->findOrFail(\$gameId);

        return response()->json([
            'status' => true,
            'data'   => \$game->foursomes->map(fn(\$f) => [
                'name'    => \$f->name,
                'players' => \$f->players->map(fn(\$p) => [
                    'name'  => \$p->name,
                    'score' => \$p->scores->sum('score'),
                ]),
            ]),
        ]);
    }
}
`);

  add("vrslide-0", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\ResultController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/results/all', [ResultController::class, 'allPlayers']);
    Route::get('games/{gameId}/results/foursome', [ResultController::class, 'foursomeTab']);
});
`);

  add("vrslide-1", "laravel", "routes/api.php", `
<?php
// Uses same ResultController as vrslide-0.
// Endpoint: GET /api/v1/games/{gameId}/results/foursome
`);

  add("vrslide-2", "laravel", "ScorecardController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Foursome;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class ScorecardController extends Controller
{
    public function show(Request \$request, \$foursomeId): JsonResponse
    {
        \$foursome = Foursome::with(['players.scores' => fn(\$q) => \$q->orderBy('hole_number')])
            ->findOrFail(\$foursomeId);

        \$holes = collect(range(1, 18))->map(fn(\$hole) => [
            'hole'    => \$hole,
            'par'     => \$foursome->course->holes->where('number', \$hole)->first()?->par,
            'scores'  => \$foursome->players->map(fn(\$p) => [
                'player' => \$p->name,
                'score'  => \$p->scores->where('hole_number', \$hole)->first()?->score,
                'skins'  => \$p->scores->where('hole_number', \$hole)->first()?->skins_value,
            ]),
        ]);

        return response()->json(['status' => true, 'data' => \$holes]);
    }
}
`);

  add("vrslide-2", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\ScorecardController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('foursomes/{foursomeId}/scorecard', [ScorecardController::class, 'show']);
});
`);

  add("vrslide-3", "laravel", "routes/api.php", `
<?php
// Uses ResultController::winners from the same controller as vrslide-0.
// Endpoint: GET /api/v1/games/{gameId}/results/winners
// Returns foursome winners with Gross, Net, Points, Skode & Junk winners.
`);

  add("vrslide-3", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\ResultController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/results/winners', [ResultController::class, 'winners']);
});
`);

  add("viewgame-detail", "laravel", "GameDetailsController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\Game;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;

class GameDetailsController extends Controller
{
    public function show(Request \$request, \$id): JsonResponse
    {
        \$game = Game::with(['course', 'players', 'scores', 'bets'])
            ->findOrFail(\$id);

        \$this->authorize('view', \$game);

        return response()->json([
            'status' => true,
            'data'   => [
                'game'        => \$game,
                'overview'    => \$this->overview(\$game),
                'results'     => \$this->results(\$game),
                'leaderboard' => \$this->leaderboard(\$game),
                'ledger'      => \$this->ledger(\$game),
            ],
        ]);
    }

    private function overview(Game \$game): array
    {
        return [
            'course'    => \$game->course->name,
            'format'    => \$game->format,
            'players'   => \$game->players->count(),
            'buy_in'    => \$game->buy_in,
            'status'    => \$game->status,
        ];
    }

    private function results(Game \$game): array
    {
        return \$game->scores->groupBy('player_id')->map(function (\$scores) {
            return ['total' => \$scores->sum('score')];
        })->toArray();
    }

    private function leaderboard(Game \$game): array
    {
        return \$game->players->sortBy('pivot.score')->values()->toArray();
    }

    private function ledger(Game \$game): array
    {
        return \$game->transactions->groupBy('player_id')->map(function (\$txns) {
            return ['balance' => \$txns->sum('amount')];
        })->toArray();
    }
}
`);

  add("viewgame-detail", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\GameDetailsController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{id}/details', [GameDetailsController::class, 'show']);
});
`);

  add("welcome-detail", "laravel", "AuthController.php", `
<?php

namespace App\\\\Http\\\\Controllers\\\\Api\\\\V1;

use App\\\\Http\\\\Controllers\\\\Controller;
use App\\\\Models\\\\User;
use Illuminate\\\\Http\\\\JsonResponse;
use Illuminate\\\\Http\\\\Request;
use Illuminate\\\\Support\\\\Facades\\\\Hash;

class AuthController extends Controller
{
    public function login(Request \$request): JsonResponse
    {
        \$request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        \$user = User::where('email', \$request->email)->first();

        if (! \$user || ! Hash::check(\$request->password, \$user->password)) {
            return response()->json([
                'status'  => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'status' => true,
            'data'   => [
                'token' => \$user->createToken('auth')->plainTextToken,
                'user'  => \$user,
            ],
        ]);
    }
}
`);

  add("welcome-detail", "laravel", "routes/api.php", `
<?php

use App\\\\Http\\\\Controllers\\\\Api\\\\V1\\\\AuthController;
use Illuminate\\\\Support\\\\Facades\\\\Route;

Route::prefix('v1/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
`);

})();
