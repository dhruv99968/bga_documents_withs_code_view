// ============================================================
// Flutter — Add Score: HORSE RACE game type (unique steps 0–3)
// ============================================================
// Keys: asslide-horse_race-0 … asslide-horse_race-3
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Step 0 — Game Setup ───────────────────────────────────
  add("asslide-horse_race-0", "flutter", "add_score.dart",
    '// Horse Race — Game Setup\n// Reuses add_score.dart — see asslide-0 for full source.\n// Shows number-of-teams, holes, and bet-amount config fields.\n');
  add("asslide-horse_race-0", "flutter", "add_score_controller.dart",
    '// Horse Race Controller — Game Setup\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 1 — Across Foursome Teams ───────────────────────
  add("asslide-horse_race-1", "flutter", "horse_acrrosse_select_team_bottom.dart", `import 'package:bga_flutter_app/controllers/add_score/horse_across_select_bottom_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HorseAcrosseSelectTeamBottom
    extends GetView<HorseAcrossSelectBottomController> {
  const HorseAcrosseSelectTeamBottom({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Across Foursome Teams', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.teams.length,
              itemBuilder: (ctx, ti) {
                final team = controller.teams[ti];
                return Card(
                  color: ColorCode.cardBgColor,
                  child: ExpansionTile(
                    title: Text(
                      'Team \${ti + 1}',
                      style: CustomStyle.heading6Style,
                    ),
                    children: team.players.map((p) => ListTile(
                      dense: true,
                      title: Text(p.name ?? ''),
                      subtitle: Text('Handicap: \${p.handicap ?? 0}'),
                    )).toList(),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          CustomButton(label: 'Next', onTap: controller.onNext),
        ],
      )),
    );
  }
}
`);
  add("asslide-horse_race-1", "flutter", "horse_across_select_bottom_controller.dart", `import 'package:bga_flutter_app/models/horse_race_team_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class HorseAcrossSelectBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<HorseRaceTeamModel> teams = <HorseRaceTeamModel>[].obs;

  @override
  void onReady() {
    super.onReady();
    loadTeams();
  }

  Future<void> loadTeams() async {
    final result = await apiService.getHorseRaceTeams(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) teams.assignAll(result.teams ?? []);
  }

  void onNext() => Get.back(result: true);
}
`);

  // ── Step 2 — Assign Teams ─────────────────────────────────
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom.dart", `import 'package:bga_flutter_app/controllers/add_score/horse_race_group_team_bottom_controller.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_dropdown.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HorseRaceGroupTeamBottom extends GetView<HorseRaceGroupTeamBottomController> {
  const HorseRaceGroupTeamBottom({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(16),
      child: Obx(() => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text('Assign Players to Teams', style: CustomStyle.heading5Style),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: controller.players.length,
              itemBuilder: (ctx, i) {
                final player = controller.players[i];
                return Row(
                  children: [
                    Expanded(child: Text(player.name ?? '', style: CustomStyle.bodyStyle)),
                    SizedBox(
                      width: 120,
                      child: CustomDropdown(
                        label: 'Team',
                        value: controller.getAssignment(player.id ?? 0),
                        items: List.generate(
                          controller.numberOfTeams.value,
                          (i) => 'Team \${i + 1}',
                        ),
                        onChanged: (v) => controller.assignTeam(player.id ?? 0, v),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          CustomButton(label: 'Save Assignments', onTap: controller.saveAssignments),
        ],
      )),
    );
  }
}
`);
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom_controller.dart", `import 'package:bga_flutter_app/models/horse_race_player_model.dart';
import 'package:bga_flutter_app/services/api_service.dart';
import 'package:get/get.dart';

class HorseRaceGroupTeamBottomController extends GetxController {
  final apiService = Get.find<ApiService>();

  RxList<HorseRacePlayerModel> players  = <HorseRacePlayerModel>[].obs;
  RxInt numberOfTeams                   = 2.obs;
  final Map<int, int> _assignments      = {};

  @override
  void onReady() {
    super.onReady();
    loadData();
  }

  Future<void> loadData() async {
    final config = await apiService.getHorseRaceConfig(
      gameId: Get.arguments['game_id'],
    );
    if (config != null) numberOfTeams.value = config.numberOfTeams ?? 2;

    final result = await apiService.getHorseRaceGamePlayers(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
    );
    if (result != null) players.assignAll(result.players ?? []);
  }

  String getAssignment(int playerId) {
    final t = _assignments[playerId];
    return t != null ? 'Team \$t' : 'Team 1';
  }

  void assignTeam(int playerId, String? teamLabel) {
    if (teamLabel == null) return;
    final num = int.tryParse(teamLabel.replaceAll('Team ', '')) ?? 1;
    _assignments[playerId] = num;
  }

  Future<void> saveAssignments() async {
    final list = _assignments.entries
        .map((e) => {'player_id': e.key, 'team': e.value})
        .toList();
    await apiService.saveHorseRaceTeamAssignments(
      gameId: Get.arguments['game_id'],
      organizationId: Get.arguments['organization_id'],
      assignments: list,
    );
    Get.back(result: true);
  }
}
`);

  // ── Step 3 — Team Selection / Review ─────────────────────
  // Reuses HorseAcrosseSelectTeamBottom for the final summary + confirm
  add("asslide-horse_race-3", "flutter", "horse_acrrosse_select_team_bottom.dart",
    '// Horse Race — Team Selection Review\n// Reuses HorseAcrosseSelectTeamBottom — see asslide-horse_race-1 for full source.\n// Read-only summary; "Confirm" button locks teams before scoring starts.\n');
  add("asslide-horse_race-3", "flutter", "horse_across_select_bottom_controller.dart",
    '// Horse Race Controller — Team Review / Confirm\n// Reuses HorseAcrossSelectBottomController — see asslide-horse_race-1 for full source.\n// onNext() calls confirmTeams() API instead of simple back().\n');

})();
