// ============================================================
// Laravel — View Ledger (vlslide-0 … vlslide-4)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // -- vlslide-0 : View Ledger - Summary (Tab 1) -- (2 files)
  add("vlslide-0", "laravel", "LedgerController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Game;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class LedgerController extends Controller
{
    public function index(Request $request, $gameId): JsonResponse
    {
        $game = Game::with('players.transactions')->findOrFail($gameId);

        $ledger = $game->players->map(function ($player) {
            return [
                'player'  => $player->name,
                'buy_in'  => $player->transactions->where('type', 'buy_in')->sum('amount'),
                'bets'    => $player->transactions->where('type', 'bet')->sum('amount'),
                'payout'  => $player->transactions->where('type', 'payout')->sum('amount'),
                'balance' => $player->transactions->sum('amount'),
            ];
        });

        return response()->json(['status' => true, 'data' => $ledger]);
    }
}`);
  add("vlslide-0", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\LedgerController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('games/{gameId}/ledger', [LedgerController::class, 'index']);
    Route::get('games/{gameId}/ledger/player/{playerId}', [LedgerController::class, 'playerDetail']);
    Route::post('games/{gameId}/ledger/settle', [LedgerController::class, 'settle']);
});`);

  // -- vlslide-1 : View Ledger - Player 1 (Tab 2) -- (1 file)
  add("vlslide-1", "laravel", "routes/api.php", `<?php
// Uses same LedgerController as vlslide-0.
// Endpoint: POST /api/v1/games/{gameId}/ledger/pay
// Initiates a payment from the player to settle their balance.`);

  // -- vlslide-2 : View Ledger - Player 2 (Tab 3) -- (1 file)
  add("vlslide-2", "laravel", "routes/api.php", `<?php
// Uses same LedgerController as vlslide-0.
// Endpoint: GET /api/v1/games/{gameId}/ledger/player/{playerId}
// Returns the winning amount breakdown for a specific player.`);

  // -- vlslide-3 : View Ledger - Player 3 (Tab 4) -- (2 files)
  add("vlslide-3", "laravel", "PaymentController.php", `<?php

namespace App\\Http\\Controllers\\Api\\V1;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Transaction;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class PaymentController extends Controller
{
    public function paypalPay(Request $request): JsonResponse
    {
        $request->validate([
            'game_id'   => ['required', 'exists:games,id'],
            'player_id' => ['required', 'exists:users,id'],
            'amount'    => ['required', 'numeric', 'min:1'],
        ]);

        // Integrate with PayPal SDK here
        Transaction::create([
            'game_id'   => $request->game_id,
            'player_id' => $request->player_id,
            'type'      => 'payment',
            'method'    => 'paypal',
            'amount'    => -$request->amount,
            'status'    => 'completed',
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'Payment completed via PayPal',
        ]);
    }
}`);
  add("vlslide-3", "laravel", "routes/api.php", `<?php

use App\\Http\\Controllers\\Api\\V1\\PaymentController;
use Illuminate\\Support\\Facades\\Route;

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::post('payments/paypal', [PaymentController::class, 'paypalPay']);
});`);

  // -- vlslide-4 : View Ledger - Settle Up (Tab 5) -- (1 file)
  add("vlslide-4", "laravel", "routes/api.php", `<?php
// Payment confirmation — uses PaymentController::paypalPay from vlslide-3.
// On success returns: { status: true, message: 'Payment completed via PayPal' }`);

})();
