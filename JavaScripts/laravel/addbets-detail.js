// ============================================================
// Laravel — Add Bets (addbets-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

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
})();
