// ============================================================
// Flutter — Add Score: CALCUTTA game type (unique steps 0–17)
// ============================================================
// Keys: asslide-calcutta-0 … asslide-calcutta-17
//
// Shared screens (add_score.dart / add_score_controller.dart)
// are referenced with a note pointing to asslide-0 for the
// full source — no duplicate code stored here.
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Shared note helper ─────────────────────────────────────
  function sharedNote(filename, refKey) {
    return (
      '// This step reuses ' + filename + '\n' +
      '// Full source: see "' + refKey + '" (asslide-0 / asslide-1 entries)\n' +
      '// The screen and controller are identical; only the step title differs.\n'
    );
  }

  // ── Step 0 — Round-1 Select ────────────────────────────────
  // Uses add_score.dart + add_score_controller.dart (shared)
  add("asslide-calcutta-0", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-0", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // ── Step 1 — Player Sheet (Round-1) ───────────────────────
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/calcutta_round_one_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CalcuttaRoundOneBottomSheet extends GetView<CalcuttaRoundOneBottomSheetController> {
  const CalcuttaRoundOneBottomSheet({super.key});

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
          Text('Round-1 Player Sheet', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.round1Players.length,
              itemBuilder: (ctx, i) {
                final player = controller.round1Players[i];
                return ListTile(
                  title: Text(player.name ?? '', style: CustomStyle.bodyStyle),
                  subtitle: Text('Handicap: \${player.handicap ?? 0}'),
                  trailing: Text(
                    player.bidAmount != null ? '\$\${player.bidAmount}' : '—',
                    style: CustomStyle.bodyStyle.copyWith(color: ColorCode.primaryColor),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          CustomButton(
            label: 'Next',
            onTap: controller.onNext,
          ),
        ],
      )),
    );
  }
}
`);
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet_controller.dart", `import 'package:bga_flutter_app/models/calcutta_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class CalcuttaRoundOneBottomSheetController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<CalcuttaPlayerModel> round1Players = <CalcuttaPlayerModel>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadRound1Sheet();
  }

  Future<void> loadRound1Sheet() async {
    final result = await apiService.getCalcuttaRound1Sheet(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) {
      round1Players.assignAll(result.players ?? []);
    }
  }

  void onNext() {
    Get.back();
  }
}
`);

  // ── Step 2 — Select & Bid ──────────────────────────────────
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/calcutta_round_select_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

class CalcuttaRoundSelectPlayerBottomSheet
    extends GetView<CalcuttaRoundSelectPlayerBottomSheetController> {
  const CalcuttaRoundSelectPlayerBottomSheet({super.key});

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
          Text('Select & Bid', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.availablePlayers.length,
              itemBuilder: (ctx, i) {
                final player = controller.availablePlayers[i];
                return ListTile(
                  title: Text(player.name ?? ''),
                  subtitle: Text('Handicap: \${player.handicap ?? 0}'),
                  trailing: SizedBox(
                    width: 80,
                    child: TextFormField(
                      keyboardType: TextInputType.number,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      decoration: const InputDecoration(
                        hintText: 'Bid \$',
                        isDense: true,
                        border: OutlineInputBorder(),
                      ),
                      onChanged: (v) => controller.setBid(player.id ?? 0, v),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          CustomButton(label: 'Submit Bids', onTap: controller.submitBids),
        ],
      )),
    );
  }
}
`);
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart", `import 'package:bga_flutter_app/models/calcutta_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class CalcuttaRoundSelectPlayerBottomSheetController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<CalcuttaPlayerModel> availablePlayers = <CalcuttaPlayerModel>[].obs;
  final Map<int, int> _bids = {};

  @override
  void onReady() {
    super.onReady();
    loadAvailablePlayers();
  }

  Future<void> loadAvailablePlayers() async {
    final result = await apiService.getCalcuttaAvailablePlayers(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) availablePlayers.assignAll(result.players ?? []);
  }

  void setBid(int playerId, String amount) {
    _bids[playerId] = int.tryParse(amount) ?? 0;
  }

  Future<void> submitBids() async {
    final bids = _bids.entries
        .map((e) => {'player_id': e.key, 'amount': e.value})
        .toList();
    await apiService.submitCalcuttaBids(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
      bids: bids,
    );
    Get.back();
  }
}
`);

  // ── Step 3 — Round-1 Done (reuses round-1 sheet screens) ──
  add("asslide-calcutta-3", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-1 Done reuses CalcuttaRoundOneBottomSheet for the summary view.\n' +
    '// See asslide-calcutta-1 for the full source.\n' +
    '// The controller loads results with status=complete instead of open bids.\n');
  add("asslide-calcutta-3", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // ── Step 4 — Match Config ──────────────────────────────────
  // Uses add_score.dart (shared — config section rendered inline)
  add("asslide-calcutta-4", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-4", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // ── Step 5 — Player Selection ──────────────────────────────
  add("asslide-calcutta-5", "flutter", "calcutta_select_player_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/calcutta_player_select_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CalcuttaSelectPlayerBottomSheet
    extends GetView<CalcuttaPlayerSelectBottomController> {
  const CalcuttaSelectPlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Select Players for Groups', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.availablePlayers.length,
              itemBuilder: (ctx, i) {
                final player = controller.availablePlayers[i];
                final selected = controller.selectedIds.contains(player.id);
                return CheckboxListTile(
                  value: selected,
                  onChanged: (_) => controller.toggleSelection(player.id ?? 0),
                  title: Text(player.name ?? ''),
                  subtitle: Text('Handicap: \${player.handicap ?? 0}'),
                );
              },
            ),
          ),
          CustomButton(label: 'Confirm', onTap: controller.confirmSelection),
        ],
      )),
    );
  }
}
`);
  add("asslide-calcutta-5", "flutter", "calcutta_player_select_bottom_controller.dart", `import 'package:bga_flutter_app/models/calcutta_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class CalcuttaPlayerSelectBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<CalcuttaPlayerModel> availablePlayers = <CalcuttaPlayerModel>[].obs;
  RxSet<int> selectedIds = <int>{}.obs;

  @override
  void onReady() {
    super.onReady();
    loadPlayers();
  }

  Future<void> loadPlayers() async {
    final result = await apiService.getCalcuttaAvailablePlayers(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) availablePlayers.assignAll(result.players ?? []);
  }

  void toggleSelection(int id) {
    selectedIds.contains(id) ? selectedIds.remove(id) : selectedIds.add(id);
  }

  Future<void> confirmSelection() async {
    await apiService.saveCalcuttaPlayerGroups(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
      playerIds: selectedIds.toList(),
    );
    Get.back();
  }
}
`);

  // ── Step 6 — Card Distribution ────────────────────────────
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/shuffle_cards_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ShuffleCardsBottomSheet extends GetView<ShuffleCardsBottomController> {
  const ShuffleCardsBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Card Distribution', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.groups.length,
              itemBuilder: (ctx, gi) {
                final group = controller.groups[gi];
                return ExpansionTile(
                  title: Text('Group \${gi + 1}'),
                  children: group.map((player) => ListTile(
                    title: Text(player.name ?? ''),
                    trailing: Text('Card #\${player.cardNumber ?? "—"}'),
                  )).toList(),
                );
              },
            ),
          ),
          CustomButton(label: 'Shuffle & Assign', onTap: controller.shuffleCards),
        ],
      )),
    );
  }
}
`);
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_controller.dart", `import 'package:bga_flutter_app/models/calcutta_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class ShuffleCardsBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<List<CalcuttaPlayerModel>> groups = <List<CalcuttaPlayerModel>>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadGroups();
  }

  Future<void> loadGroups() async {
    final result = await apiService.getCalcuttaCardGroups(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) groups.assignAll(result.groups ?? []);
  }

  Future<void> shuffleCards() async {
    await apiService.saveCalcuttaCards(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
      cards: groups.expand((g) => g).map((p) => {
        'player_id': p.id, 'card_number': p.cardNumber
      }).toList(),
    );
    Get.back();
  }
}
`);

  // ── Step 7 — Foursomes ────────────────────────────────────
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/Calcutta_foursome_match_config_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CalcuttaFoursomeMatchConfigBottomSheet
    extends GetView<CalcuttaFoursomeMatchConfigBottomSheetController> {
  const CalcuttaFoursomeMatchConfigBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Foursomes', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.foursomes.length,
              itemBuilder: (ctx, fi) {
                final foursome = controller.foursomes[fi];
                return Card(
                  child: ListTile(
                    title: Text('Foursome \${fi + 1}'),
                    subtitle: Text(
                      foursome.players.map((p) => p.name).join(', '),
                    ),
                  ),
                );
              },
            ),
          ),
          CustomButton(label: 'Confirm Foursomes', onTap: controller.confirmFoursomes),
        ],
      )),
    );
  }
}
`);
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet_controller.dart", `import 'package:bga_flutter_app/models/foursome_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class CalcuttaFoursomeMatchConfigBottomSheetController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<FoursomeModel> foursomes = <FoursomeModel>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadFoursomes();
  }

  Future<void> loadFoursomes() async {
    final result = await apiService.getCalcuttaFoursomes(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) foursomes.assignAll(result.foursomes ?? []);
  }

  Future<void> confirmFoursomes() async {
    Get.back(result: true);
  }
}
`);

  // ── Step 8 — Generate Matches ─────────────────────────────
  add("asslide-calcutta-8", "flutter", "calcutta_generate_match_config_bottom_sheet.dart", `import 'package:bga_flutter_app/controllers/add_score/calcutta_generate_match_config_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CalcuttaGenerateMatchConfigBottomSheet
    extends GetView<CalcuttaGenerateMatchConfigBottomController> {
  const CalcuttaGenerateMatchConfigBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Generated Matches', style: CustomStyle.heading5Style),
            const SizedBox(height: 12),
            Expanded(
              child: ListView.builder(
                itemCount: controller.matches.length,
                itemBuilder: (ctx, i) {
                  final match = controller.matches[i];
                  return Card(
                    child: ListTile(
                      title: Text('\${match.team1} vs \${match.team2}'),
                      subtitle: Text('Holes: \${match.holeStart}–\${match.holeEnd}'),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 12),
            CustomButton(label: 'Start Scoring', onTap: controller.startScoring),
          ],
        );
      }),
    );
  }
}
`);
  add("asslide-calcutta-8", "flutter", "calcutta_generate_match_config_bottom_controller.dart", `import 'package:bga_flutter_app/models/match_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class CalcuttaGenerateMatchConfigBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<MatchModel> matches = <MatchModel>[].obs;
  RxBool isLoading = false.obs;

  @override
  void onReady() {
    super.onReady();
    generateMatches();
  }

  Future<void> generateMatches() async {
    isLoading.value = true;
    final result = await apiService.generateCalcuttaMatches(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) matches.assignAll(result.matches ?? []);
    isLoading.value = false;
  }

  void startScoring() => Get.back(result: true);
}
`);

  // ── Steps 9–17 — Round-2 / Round-3 / Add Score ────────────
  // Steps 9, 13 (Round-X Select) reuse add_score.dart
  add("asslide-calcutta-9",  "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-9",  "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // Step 10 — Round-2 Sheet (reuses step-1 screen)
  add("asslide-calcutta-10", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-2 Sheet reuses CalcuttaRoundOneBottomSheet.\n' +
    '// See asslide-calcutta-1 for full source.\n');
  add("asslide-calcutta-10", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 11 — Select Player Round-2 (reuses step-2 screen)
  add("asslide-calcutta-11", "flutter", "calcutta_round_select_player_bottom_sheet.dart",
    '// Select Player (Round-2) reuses CalcuttaRoundSelectPlayerBottomSheet.\n' +
    '// See asslide-calcutta-2 for full source.\n');
  add("asslide-calcutta-11", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_select_player_bottom_sheet_controller.dart", "asslide-calcutta-2"));

  // Step 12 — Round-2 Done (reuses step-1 summary)
  add("asslide-calcutta-12", "flutter", "calcutta_round_one_bottom_sheet.dart",
    sharedNote("calcutta_round_one_bottom_sheet.dart", "asslide-calcutta-1"));
  add("asslide-calcutta-12", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 13 — Round-3 Select
  add("asslide-calcutta-13", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-13", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // Step 14 — Round-3 Sheet
  add("asslide-calcutta-14", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-3 Sheet reuses CalcuttaRoundOneBottomSheet.\n' +
    '// See asslide-calcutta-1 for full source.\n');
  add("asslide-calcutta-14", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 15 — Select Player Round-3
  add("asslide-calcutta-15", "flutter", "calcutta_round_select_player_bottom_sheet.dart",
    '// Select Player (Round-3) reuses CalcuttaRoundSelectPlayerBottomSheet.\n' +
    '// See asslide-calcutta-2 for full source.\n');
  add("asslide-calcutta-15", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_select_player_bottom_sheet_controller.dart", "asslide-calcutta-2"));

  // Step 16 — Round-3 Done
  add("asslide-calcutta-16", "flutter", "calcutta_round_one_bottom_sheet.dart",
    sharedNote("calcutta_round_one_bottom_sheet.dart", "asslide-calcutta-1"));
  add("asslide-calcutta-16", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 17 — Add Score Entry (shared screen)
  add("asslide-calcutta-17", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-17", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

})();
