// ============================================================
// Laravel — Home Dashboard (home-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

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
})();
