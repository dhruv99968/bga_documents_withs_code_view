// ============================================================
// Laravel — Account Setup (sslide-0 … sslide-3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

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
})();
