// ============================================================
// Flutter — Add Score: RYDER CUP game type (unique steps 0–9)
// ============================================================
// Keys: asslide-ryder_cup-0 … asslide-ryder_cup-9
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Step 0 — Captain Selection ────────────────────────────
  add("asslide-ryder_cup-0", "flutter", "add_score.dart",
    '// Ryder Cup — Captain Selection\n// Reuses add_score.dart — see asslide-0 for full source.\n// The screen shows two team panels; captain is highlighted with a crown icon.\n');
  add("asslide-ryder_cup-0", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Captain Selection\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 1 — Pick Players (Draft) ─────────────────────────
  add("asslide-ryder_cup-1", "flutter", "add_score.dart",
    '// Ryder Cup — Pick Players (draft)\n// Reuses add_score.dart — see asslide-0 for full source.\n// Captains alternate picks; screen shows remaining pool and drafted lists.\n');
  add("asslide-ryder_cup-1", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Pick Players\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 2 — Select Players (final confirmation) ──────────
  add("asslide-ryder_cup-2", "flutter", "pick_player_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/pick_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PickPlayerBottomSheet extends GetView<PickBottomSheetController> {
  const PickPlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Select Players', style: CustomStyle.heading5Style),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(child: _teamColumn('Team A', controller.teamA)),
              const VerticalDivider(),
              Expanded(child: _teamColumn('Team B', controller.teamB)),
            ],
          ),
          const SizedBox(height: 12),
          CustomButton(
            label: 'Confirm Selection',
            onTap: controller.confirmSelection,
          ),
        ],
      )),
    );
  }

  Widget _teamColumn(String label, List players) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(label, style: CustomStyle.heading6Style.copyWith(color: ColorCode.primaryColor)),
      const SizedBox(height: 6),
      ...players.map((p) => ListTile(
        dense: true,
        title: Text(p.name ?? ''),
        leading: p.isCaptain == true
            ? const Icon(Icons.star, color: Colors.amber, size: 16)
            : const SizedBox(width: 16),
      )),
    ],
  );
}
`);
  add("asslide-ryder_cup-2", "flutter", "pick_bottom_sheet_controller.dart", `import 'package:bga_flutter_app/models/ryder_cup_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class PickBottomSheetController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<RyderCupPlayerModel> teamA = <RyderCupPlayerModel>[].obs;
  RxList<RyderCupPlayerModel> teamB = <RyderCupPlayerModel>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadSelectedPlayers();
  }

  Future<void> loadSelectedPlayers() async {
    final result = await apiService.getRyderCupSelectedPlayers(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) {
      teamA.assignAll(result.teamA ?? []);
      teamB.assignAll(result.teamB ?? []);
    }
  }

  Future<void> confirmSelection() async {
    await apiService.confirmRyderCupPlayers(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    Get.back(result: true);
  }
}
`);

  // ── Step 3 — Tee Time (reuses pick_player_bottom_sheet) ───
  add("asslide-ryder_cup-3", "flutter", "pick_player_bottom_sheet.dart",
    '// Ryder Cup — Tee Time\n// Reuses PickPlayerBottomSheet layout — see asslide-ryder_cup-2 for full source.\n// Each foursome row shows a time-picker instead of a captain icon.\n');
  add("asslide-ryder_cup-3", "flutter", "pick_bottom_sheet_controller.dart",
    '// Ryder Cup Controller — Tee Time\n// Extends PickBottomSheetController with tee-time saving.\n// See asslide-ryder_cup-2 for full controller source.\n');

  // ── Step 4 — Player Selection (Foursomes) ─────────────────
  add("asslide-ryder_cup-4", "flutter", "select_single_player_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/single_player_select_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SelectSinglePlayerBottomSheet
    extends GetView<SinglePlayerSelectBottomController> {
  const SelectSinglePlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Assign Players to Foursomes', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.foursomes.length,
              itemBuilder: (ctx, fi) {
                final foursome = controller.foursomes[fi];
                return ExpansionTile(
                  title: Text('Foursome \${fi + 1}'),
                  children: foursome.players.map((p) => ListTile(
                    title: Text(p.name ?? ''),
                    subtitle: Text('Team: \${p.team ?? "—"}'),
                  )).toList(),
                );
              },
            ),
          ),
          CustomButton(
            label: 'Confirm Foursomes',
            onTap: controller.confirmFoursomes,
          ),
        ],
      )),
    );
  }
}
`);
  add("asslide-ryder_cup-4", "flutter", "single_player_select_bottom_controller.dart", `import 'package:bga_flutter_app/models/foursome_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class SinglePlayerSelectBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<FoursomeModel> foursomes = <FoursomeModel>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadFoursomes();
  }

  Future<void> loadFoursomes() async {
    final result = await apiService.getRyderCupFoursomes(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) foursomes.assignAll(result.foursomes ?? []);
  }

  Future<void> assignPlayer(int foursomeId, int playerId) async {
    await apiService.assignRyderCupPlayerToFoursome(
      gameId: Get.arguments['game_id'],
      foursomeId: foursomeId,
      playerId: playerId,
    );
    loadFoursomes();
  }

  Future<void> confirmFoursomes() async {
    await apiService.confirmRyderCupFoursomes(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    Get.back(result: true);
  }
}
`);

  // ── Step 5 — All Foursomes Done (reuses step-4) ───────────
  add("asslide-ryder_cup-5", "flutter", "pick_player_bottom_sheet.dart",
    '// Ryder Cup — All Foursomes Done\n// Reuses PickPlayerBottomSheet for summary view — see asslide-ryder_cup-2.\n// Read-only; button navigates to Generate Match step.\n');
  add("asslide-ryder_cup-5", "flutter", "pick_bottom_sheet_controller.dart",
    '// Ryder Cup Controller — All Foursomes Done\n// Reuses PickBottomSheetController — see asslide-ryder_cup-2 for full source.\n');

  // ── Step 6 — Generate Match ───────────────────────────────
  add("asslide-ryder_cup-6", "flutter", "add_score.dart",
    '// Ryder Cup — Generate Match\n// Reuses add_score.dart — see asslide-0 for full source.\n// Calls generateRyderCupMatches() on load.\n');
  add("asslide-ryder_cup-6", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Generate Match\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 7 — Confirm ──────────────────────────────────────
  add("asslide-ryder_cup-7", "flutter", "add_score.dart",
    '// Ryder Cup — Confirm Matches\n// Reuses add_score.dart — see asslide-0 for full source.\n// Shows generated match pairs; confirm button locks in the draw.\n');
  add("asslide-ryder_cup-7", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Confirm\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 8 — Match Config ─────────────────────────────────
  add("asslide-ryder_cup-8", "flutter", "ryder_cup_custom_match_bottom.dart", `import 'package:bga_flutter_app/controllers/add_score/ryder_custom_match_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_dropdown.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RyderCupCustomMatchBottom extends GetView<RyderCustomMatchBottomController> {
  const RyderCupCustomMatchBottom({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Match Config', style: CustomStyle.heading5Style),
          const SizedBox(height: 16),
          CustomDropdown(
            label: 'Format',
            value: controller.selectedFormat.value,
            items: const ['Foursomes', 'Fourball', 'Singles'],
            onChanged: (v) => controller.selectedFormat.value = v ?? 'Singles',
          ),
          const SizedBox(height: 12),
          CustomDropdown(
            label: 'Holes',
            value: controller.selectedHoles.value,
            items: const ['9', '18'],
            onChanged: (v) => controller.selectedHoles.value = v ?? '18',
          ),
          const SizedBox(height: 20),
          CustomButton(label: 'Save Config', onTap: controller.saveConfig),
        ],
      )),
    );
  }
}
`);
  add("asslide-ryder_cup-8", "flutter", "ryder_custom_match_bottom_controller.dart", `import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class RyderCustomMatchBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxString selectedFormat = 'Singles'.obs;
  RxString selectedHoles  = '18'.obs;

  Future<void> saveConfig() async {
    await apiService.saveRyderCupMatchConfig(
      gameId:         Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
      format:         selectedFormat.value,
      holes:          selectedHoles.value,
    );
    Get.back(result: true);
  }
}
`);

  // ── Step 9 — Add Score Entry (shared) ────────────────────
  add("asslide-ryder_cup-9", "flutter", "add_score.dart",
    '// Ryder Cup — Add Score Entry\n// Reuses add_score.dart — see asslide-0 for full source.\n');
  add("asslide-ryder_cup-9", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Add Score Entry\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

})();
