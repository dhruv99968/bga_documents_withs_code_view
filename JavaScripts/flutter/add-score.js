// ============================================================
// Flutter — Add Score (asslide-0 … asslide-11)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }
  // -- asslide-0 : Step 1: Select Foursome (12-step: 321 Milo/Vegas/Scramble | 9-step: Skins/Stroke/Stableford/Wolf | 19-step: Ryder Cup | 13-step: Horse Race | 27-step: Calcutta) -- (2 files)
  add("asslide-0", "flutter", "add_score.dart", `import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/score/add_score_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_style.dart';
import '../../voice_control/draggable_mic_view.dart';
import '../common_views/app_toolbar.dart';
import '../common_views/drawer_screen.dart';
import '../common_views/no_data_view.dart';

class AddScoreScreen extends GetView&lt;AddScoreController&gt; {
  const AddScoreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    return Row(
      children: [
        if (isWebScreen()) DrawerScreen(),
        Expanded(
          child: Stack(
            children: [
              Scaffold(
                key: controller.scaffoldKey,
                backgroundColor: ColorCode.bgColor,
                appBar: PreferredSize(
                  preferredSize: const Size.fromHeight(kToolbarHeight),
                  child: Obx(() =&gt; AppToolbar().get(
                      showArrow: true,
                      profile: true,
                      elevation: 0,
                      title: "Select Foursome",
                      drawerOpen: (bool) {})),
                ),
                body: SafeArea(
                  child: SingleChildScrollView(
                    child: Obx(() =&gt; ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: controller.fourSomeList.length,
                      itemBuilder: (context, index) {
                        var foursome = controller.fourSomeList[index];
                        return Card(
                          margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          color: ColorCode.white,
                          elevation: 0,
                          child: ListTile(
                            title: Text(foursome.foursomeName ?? 'Foursome \${index + 1}',
                                style: CustomStyle.gameDetailsSubTitle),
                            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                            onTap: () =&gt; controller.selectFoursome(foursome),
                          ),
                        );
                      },
                    )),
                  ),
                ),
              ),
              DraggableMicView(controller: controller),
            ],
          ),
        ),
      ],
    );
  }
}`);
  add("asslide-0", "flutter", "add_score_controller.dart", `import 'package:get/get.dart';
import '../../apis/api_services.dart';
import '../../model/game_models/calcutta_foursome_model.dart';
import '../../model/game_models/game_details.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/socket_utils.dart';
import 'package:pusher_client_socket/pusher_client_socket.dart';

class AddScoreController extends GetxController {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  var progressDialog = ShowProgressDialog();
  var apiService     = ApiServices();
  var socketUtils    = SocketUtils();
  PrivateChannel?    privateChannel;

  RxList&lt;CalcuttaFoursomeData&gt; fourSomeList  = &lt;CalcuttaFoursomeData&gt;[].obs;
  RxList&lt;bool&gt;                 collapsedList = &lt;bool&gt;[].obs;
  RxList&lt;bool&gt;                 isFoursomeEnded = &lt;bool&gt;[].obs;

  var gameData  = Game().obs;
  var gameId    = 0;
  String gameType       = "";
  String organizationId = "";
  String playType       = "";
  String holesPerMatch  = "";

  RxString selectedHole = "01".obs;
  RxBool   isGameStarted = false.obs;
  RxBool   isMatchGenerate = false.obs;

  @override
  void onInit() {
    super.onInit();
    final args = Get.arguments ?? {};
    gameId         = args["gameId"];
    gameType       = args["gameType"];
    playType       = args["playType"];
    organizationId = args["organizationId"] ?? '';
    holesPerMatch  = args["holesPerMatch"];
    isGameStarted.value = args["isGameStarted"];
  }

  @override
  void onReady() {
    super.onReady();
    getData();
    socketUtils.initializePusher(onPusherInitialize);
  }

  void onPusherInitialize(PusherClient pusherClient) {
    privateChannel = pusherClient.private('game.status', subscribe: true);
    privateChannel?.bind('game.foursome_end', (data) {
      if (gameId.toString() == data["game_id"].toString()) {
        getData(showProgress: false);
      }
    });
  }

  Future&lt;void&gt; getData({bool showProgress = true}) async {
    if (showProgress) progressDialog.show();
    if (gameType == "ryder_cup" || gameType == "calcutta" || gameType == "horse_race") {
      await setData(gameId);
    }
    await getFourSome(showProgress: false);
    await getCompletedHoles(showProgress: false);
    if (showProgress) progressDialog.hide();
  }

  Future&lt;void&gt; getFourSome({bool showProgress = true}) async {
    final response = await apiService.getCalcuttaFoursome(
        gameId: gameId, organizationId: organizationId);
    if (response.error == false) {
      fourSomeList.assignAll(response.data ?? []);
      collapsedList.assignAll(List.generate(fourSomeList.length, (_) =&gt; true));
      isFoursomeEnded.assignAll(
          fourSomeList.map((f) =&gt; f.isFoursomeEnded ?? false).toList());
    }
  }

  Future&lt;void&gt; setData(int id) async {
    final response = await apiService.getGameDetails(
        gameId: id, organizationId: organizationId);
    if (response.error == false) {
      gameData.value = response.data ?? Game();
    }
  }
}`);

  // -- asslide-1 : Step 2: Generate Matches (12-step: 321 Milo/Vegas/Scramble | 19-step: Ryder Cup) -- (2 files)
  add("asslide-1", "flutter", "foursome_bottom.dart", `// asslide-1: Generate Matches â€” Foursome Players bottom sheet.
// Assigns Driver/Passenger roles then generates pairings.

Obx(() =&gt; Visibility(
  visible: controller.showFoursomePlayers.value,
  child: DraggableScrollableSheet(
    initialChildSize: 0.85,
    minChildSize: 0.5,
    maxChildSize: 0.95,
    builder: (_, sc) =&gt; Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Foursome Players', style: CustomStyle.bottomSheetTitle),
          ),
          Expanded(
            child: ListView.builder(
              controller: sc,
              itemCount: controller.foursomePlayers.length,
              itemBuilder: (context, index) {
                var player = controller.foursomePlayers[index];
                return ListTile(
                  title: Text(player.name ?? '', style: CustomStyle.gameDetailsSubTitle),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      _radioRow('Driver',    player.role == 'Driver',    () =&gt; controller.setRole(index, 'Driver')),
                      _radioRow('Passenger', player.role == 'Passenger', () =&gt; controller.setRole(index, 'Passenger')),
                    ],
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: CustomButtonNew(
              text: 'GENERATE MATCHES',
              borderColor: ColorCode.borderColor,
              onPressed: controller.generateMatches,
            ),
          ),
        ],
      ),
    ),
  ),
))`);
  add("asslide-1", "flutter", "foursome_bottom_controller.dart", `// asslide-1: Generate Matches â€” foursome player roles + generateMatches API call.

RxList&lt;CalcuttaPlayers&gt; foursomePlayers = &lt;CalcuttaPlayers&gt;[].obs;
RxBool showFoursomePlayers = false.obs;

void setRole(int index, String role) {
  foursomePlayers[index] = foursomePlayers[index].copyWith(role: role);
  foursomePlayers.refresh();
}

Future&lt;void&gt; generateMatches() async {
  try {
    progressDialog.show();
    final response = await apiService.generateFoursomeMatches(
      gameId: gameId,
      foursomeId: int.parse(foursomeid.value),
      players: foursomePlayers,
      organizationId: organizationId,
      holesPerMatch: holesPerMatch,
    );
    progressDialog.hide();
    if (response.error == false) {
      isMatchGenerate.value = true;
      showFoursomePlayers.value = false;
      showMatchConfig.value = true;
      matchList.assignAll(response.data ?? []);
    }
  } catch (e) {
    progressDialog.hide();
  }
}`);

  // -- asslide-10 : Step 11: Results â€” front 9 / all players (All game types) -- (2 files)
  add("asslide-10", "flutter", "add_score.dart", `// asslide-10: View Results Tab â€” final standings with net scores and rankings.

Obx(() =&gt; Column(
  children: [
    Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      color: ColorCode.white,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text('Results',     style: CustomStyle.gameDetailsSubTitle),
          Text('All Players', style: CustomStyle.otherTextStyle),
        ],
      ),
    ),
    ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: controller.resultsList.length,
      itemBuilder: (context, index) {
        var result = controller.resultsList[index];
        return ListTile(
          leading: Text('\${index + 1}', style: CustomStyle.heading7Style),
          title: Text(result.playerName ?? '', style: CustomStyle.gameDetailsSubTitle),
          subtitle: Text('Net: \${result.netScore}  Points: \${result.points}',
              style: CustomStyle.otherTextStyle),
          trailing: Text(result.rankLabel ?? '',
              style: CustomStyle.amountTextStyle2.copyWith(color: ColorCode.mainColor)),
        );
      },
    ),
  ],
))`);
  add("asslide-10", "flutter", "add_score_controller.dart", `// asslide-10: Results tab â€” getAllPlayersResult loaded after foursome ends.

RxList&lt;ResultData&gt; resultsList = &lt;ResultData&gt;[].obs;

Future&lt;void&gt; getAllPlayersResult() async {
  final response = await apiService.getAllPlayersResult(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    resultsList.assignAll(response.data ?? []);
  }
}

// Called automatically when foursome_end Pusher event fires:
// privateChannel?.bind('game.foursome_end', (data) {
//   if (gameId.toString() == data["game_id"].toString()) {
//     getData(showProgress: false);
//     getAllPlayersResult();
//   }
 //});
 `);

  // -- asslide-11 : Step 12: All Holes Done â€” Finish Foursome (All game types) -- (2 files)
  add("asslide-11", "flutter", "add_score.dart", `// asslide-11: All Holes Score Added â€” green ticks on all 18 holes, Finish Foursome.

Obx(() =&gt; Column(
  children: [
    SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: DataTable(
        columnSpacing: 4,
        columns: [
          const DataColumn(label: Text('Player')),
          ...List.generate(18, (i) =&gt; DataColumn(label: Text('\${i + 1}'))),
          const DataColumn(label: Text('Total')),
        ],
        rows: controller.scorePlayers.map((player) =&gt; DataRow(
          cells: [
            DataCell(Text(player.name ?? '')),
            ...List.generate(18, (i) =&gt; DataCell(
              const Icon(Icons.check_circle, color: Color(0xFF15803D), size: 16),
            )),
            DataCell(Text('\${player.total ?? 0}')),
          ],
        )).toList(),
      ),
    ),
    const SizedBox(height: 20),
    Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: CustomButtonNew(
        text: 'FINISH FOURSOME',
        borderColor: ColorCode.borderColor,
        onPressed: controller.finishFoursome,
      ),
    ),
  ],
))`);
  add("asslide-11", "flutter", "add_score_controller.dart", `// asslide-11: Finish Foursome â€” marks all 18 holes complete, redirects to Results Tab.

Future&lt;void&gt; finishFoursome() async {
  try {
    progressDialog.show();
    final response = await apiService.endFoursome(
      gameId:         gameId,
      foursomeId:     int.parse(foursomeid.value),
      organizationId: organizationId,
    );
    progressDialog.hide();
    if (response.error == false) {
      final idx = fourSomeList.indexWhere(
          (f) =&gt; f.id.toString() == foursomeid.value);
      if (idx != -1) isFoursomeEnded[idx] = true;

      Get.offAllNamed(
        RoutsNames.gameDetails,
        arguments: {"id": gameId, "organizationId": organizationId, "tab": "result"},
      );
    }
  } catch (e) {
    progressDialog.hide();
  }
}

RxList&lt;bool&gt; isFoursomeEnded = &lt;bool&gt;[].obs;`);

  // -- asslide-2 : Step 3: Match Config (12-step: 321 Milo/Vegas/Scramble | 19-step: Ryder Cup | 27-step: Calcutta) -- (2 files)
  // -- ((gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "cod")  ==>> vegas_match_config_bottom & vegas_match_config_bottom_controller
  add("asslide-2", "flutter", "vegas_match_config_bottom.dart", `// asslide-2: Match Configuration â€” displays generated 6-hole matches.

// -- ((gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "cod")  ==>> vegas_match_config_bottom & vegas_match_config_bottom_controller

Obx(() =&gt; Visibility(
  visible: controller.showMatchConfig.value,
  child: Container(
    color: ColorCode.bgColor,
    child: Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Text('Foursome Matches', style: CustomStyle.gameDetailsSubTitle),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: controller.generatedMatches.length,
            itemBuilder: (context, index) {
              var match = controller.generatedMatches[index];
              return Card(
                color: ColorCode.white,
                margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                elevation: 0,
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Match \${index + 1} â€” Holes \${match.startHole}â€“\${match.endHole}',
                          style: CustomStyle.groupTextStyle),
                      const SizedBox(height: 6),
                      Text('\${match.team1} vs \${match.team2}',
                          style: CustomStyle.gameDetailsSubTitle),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: CustomButtonNew(
            text: 'DONE',
            borderColor: ColorCode.borderColor,
            onPressed: controller.confirmMatchConfig,
          ),
        ),
      ],
    ),
  ),
))`);
  add("asslide-2", "flutter", "vegas_match_config_bottom_controller.dart", `// asslide-2: Match Configuration â€” generatedMatches list + confirmMatchConfig.

// -- ((gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "cod")  ==>> vegas_match_config_bottom & vegas_match_config_bottom_controller

RxBool showMatchConfig = false.obs;
List&lt;CalcuttaMatchData&gt; matchList = &lt;CalcuttaMatchData&gt;[].obs;

List&lt;CalcuttaMatchData&gt; get generatedMatches =&gt; matchList;

void confirmMatchConfig() {
  showMatchConfig.value = false;
  // advance stepper to "Add Foursome Setting"
  final step = currentStepPerFoursome[int.parse(foursomeid.value)];
  if (step != null) step.value = 2;
}

Future&lt;void&gt; getCompletedHoles({bool showProgress = true}) async {
  final response = await apiService.getCompletedHoles(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    completedHolesMap.clear();
    for (var entry in (response.data ?? [])) {
      completedHolesMap[entry.foursomeId] = entry.completedHoles ?? [];
    }
  }
}`);
  // -- ((gameType == "3_2_1" && playType == "random") || (gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "2v2")  ==>>  foursome_override_2v2_bottom & foursome_override_2v2_bottom_controller
  add("asslide-2", "flutter", "foursome_override_2v2_bottom.dart", `// asslide-2: Match Configuration â€” generatedMatches list + confirmMatchConfig.

// -- ((gameType == "3_2_1" && playType == "random") || (gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "2v2")  ==>>  foursome_override_2v2_bottom & foursome_override_2v2_bottom_controller

RxBool showMatchConfig = false.obs;
List&lt;CalcuttaMatchData&gt; matchList = &lt;CalcuttaMatchData&gt;[].obs;

List&lt;CalcuttaMatchData&gt; get generatedMatches =&gt; matchList;

void confirmMatchConfig() {
  showMatchConfig.value = false;
  // advance stepper to "Add Foursome Setting"
  final step = currentStepPerFoursome[int.parse(foursomeid.value)];
  if (step != null) step.value = 2;
}

Future&lt;void&gt; getCompletedHoles({bool showProgress = true}) async {
  final response = await apiService.getCompletedHoles(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    completedHolesMap.clear();
    for (var entry in (response.data ?? [])) {
      completedHolesMap[entry.foursomeId] = entry.completedHoles ?? [];
    }
  }
}`);
  add("asslide-2", "flutter", "foursome_override_2v2_bottom_controller.dart", `// asslide-2: Match Configuration â€” generatedMatches list + confirmMatchConfig.

// -- ((gameType == "3_2_1" && playType == "random") || (gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "2v2")  ==>>  foursome_override_2v2_bottom & foursome_override_2v2_bottom_controller

RxBool showMatchConfig = false.obs;
List&lt;CalcuttaMatchData&gt; matchList = &lt;CalcuttaMatchData&gt;[].obs;

List&lt;CalcuttaMatchData&gt; get generatedMatches =&gt; matchList;

void confirmMatchConfig() {
  showMatchConfig.value = false;
  // advance stepper to "Add Foursome Setting"
  final step = currentStepPerFoursome[int.parse(foursomeid.value)];
  if (step != null) step.value = 2;
}

Future&lt;void&gt; getCompletedHoles({bool showProgress = true}) async {
  final response = await apiService.getCompletedHoles(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    completedHolesMap.clear();
    for (var entry in (response.data ?? [])) {
      completedHolesMap[entry.foursomeId] = entry.completedHoles ?? [];
    }
  }
}`);

  // -- asslide-3 : Step 4: Foursome Setting (12-step: 321 Milo/Vegas/Scramble) -- (2 files)
  add("asslide-3", "flutter", "add_score.dart", `// asslide-3: Add Foursome Setting â€” step progress card before opening settings.

Obx(() =&gt; Visibility(
  visible: controller.showFoursomeSettings.value,
  child: DraggableScrollableSheet(
    initialChildSize: 0.75,
    builder: (_, sc) =&gt; Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: SingleChildScrollView(
        controller: sc,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Foursome Settings', style: CustomStyle.bottomSheetTitle),
              const SizedBox(height: 16),
              _settingToggleRow('Rebit &amp; Cheken Rule',              controller.rebitChekenEnabled),
              _settingToggleRow('Dot Game',                          controller.dotGameEnabled),
              _settingToggleRow('Newt &amp; Towfer Junk (18th hole only)', controller.newtTowferEnabled),
              const SizedBox(height: 20),
              CustomButtonNew(
                text: 'DONE',
                borderColor: ColorCode.borderColor,
                onPressed: controller.saveFoursomeSettings,
              ),
            ],
          ),
        ),
      ),
    ),
  ),
))`);
  add("asslide-3", "flutter", "add_score_controller.dart", `// asslide-3: Step tracking â€” currentStepPerFoursome + stepCompletionStatus map.

RxBool showFoursomeSettings = false.obs;
RxBool rebitChekenEnabled   = false.obs;
RxBool dotGameEnabled       = false.obs;    // maps to isDotsEnabled
RxBool newtTowferEnabled    = false.obs;

bool isDotsEnabled = false;

Future&lt;void&gt; saveFoursomeSettings() async {
  isDotsEnabled = dotGameEnabled.value;
  try {
    progressDialog.show();
    final response = await apiService.saveFoursomeSettings(
      gameId:       gameId,
      foursomeId:   int.parse(foursomeid.value),
      isRabbitChickenEnabled: rebitChekenEnabled.value,
      isDotsEnabled:          dotGameEnabled.value,
      isNewtTowfer:           newtTowferEnabled.value,
      organizationId: organizationId,
    );
    progressDialog.hide();
    if (response.error == false) {
      showFoursomeSettings.value = false;
      final step = currentStepPerFoursome[int.parse(foursomeid.value)];
      if (step != null) step.value = 3; // advance to "Add Score"
    }
  } catch (e) {
    progressDialog.hide();
  }
}`);

  // -- asslide-4 : Step 5: Foursome Settings â€” Rule Toggles (All game types; Rebit & Cheken, Dot Game, Newt & Towfer) -- (2 files)
  // -- (gameType != "wolf") ==>> foursome_bet_bottom_sheet & foursome_bet_bottom_controller
  add("asslide-4", "flutter", "foursome_bet_bottom_sheet.dart", `// asslide-4: Foursome Settings â€” rule toggles saved before opening score grid.

// -- (gameType != "wolf") ==>> foursome_bet_bottom_sheet & foursome_bet_bottom_controller

RxMap&lt;int, RxInt&gt; currentStepPerFoursome = RxMap&lt;int, RxInt&gt;();
RxList&lt;bool&gt; showStepperList = &lt;bool&gt;[].obs;

Map&lt;String, bool&gt; calcuttaStepCompletionStatus = {
  "Round-1 player selection": false,
  "Match configuration":      false,
  "Round-2 player selection": false,
  "Round-3 player selection": false,
  "Add Score":                false,
};

RxInt calcuttaCurrentStep = 0.obs;

void initStepperForFoursome(int foursomeId) {
  if (!currentStepPerFoursome.containsKey(foursomeId)) {
    currentStepPerFoursome[foursomeId] = 0.obs;
  }
}

void resetCalcuttaStepperIfNeeded() {
  calcuttaStepCompletionStatus.updateAll((key, _) =&gt; false);
  calcuttaCurrentStep.value = 0;
}

bool isStepDone(int foursomeId, int step) {
  final current = currentStepPerFoursome[foursomeId]?.value ?? 0;
  return current &gt; step;
}`);
  add("asslide-4", "flutter", "foursome_bet_bottom_controller.dart", `// asslide-4: Foursome Settings â€” rule toggles saved before opening score grid.

// -- (gameType != "wolf") ==>> foursome_bet_bottom_sheet & foursome_bet_bottom_controller

RxMap&lt;int, RxInt&gt; currentStepPerFoursome = RxMap&lt;int, RxInt&gt;();
RxList&lt;bool&gt; showStepperList = &lt;bool&gt;[].obs;

Map&lt;String, bool&gt; calcuttaStepCompletionStatus = {
  "Round-1 player selection": false,
  "Match configuration":      false,
  "Round-2 player selection": false,
  "Round-3 player selection": false,
  "Add Score":                false,
};

RxInt calcuttaCurrentStep = 0.obs;

void initStepperForFoursome(int foursomeId) {
  if (!currentStepPerFoursome.containsKey(foursomeId)) {
    currentStepPerFoursome[foursomeId] = 0.obs;
  }
}

void resetCalcuttaStepperIfNeeded() {
  calcuttaStepCompletionStatus.updateAll((key, _) =&gt; false);
  calcuttaCurrentStep.value = 0;
}

bool isStepDone(int foursomeId, int step) {
  final current = currentStepPerFoursome[foursomeId]?.value ?? 0;
  return current &gt; step;
}`);
  // -- (gameType == "wolf") ==>> bet_wolf_bottom_sheet & bet_wolf_bottom_controller
  add("asslide-4", "flutter", "bet_wolf_bottom_sheet.dart", `// asslide-4: Foursome Settings â€” bottom sheet with rule toggles.

// -- (gameType == "wolf") ==>> bet_wolf_bottom_sheet & bet_wolf_bottom_controller

Obx(() =&gt; Card(
  color: ColorCode.white,
  elevation: 0,
  margin: const EdgeInsets.all(12),
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Select Foursome', style: CustomStyle.gameDetailsSubTitle),
        const SizedBox(height: 12),
        _stepRow(done: true,  label: '1. Select Cart &amp; Driver'),
        _stepRow(done: true,  label: '2. Generate Matches'),
        _stepRow(done: false, label: '3. Add Foursome Setting', active: true),
      ],
    ),
  ),
))`);
  add("asslide-4", "flutter", "bet_wolf_bottom_controller.dart", `// asslide-4: Foursome Settings â€” rule toggles saved before opening score grid.

// -- (gameType == "wolf") ==>> bet_wolf_bottom_sheet & bet_wolf_bottom_controller

RxMap&lt;int, RxInt&gt; currentStepPerFoursome = RxMap&lt;int, RxInt&gt;();
RxList&lt;bool&gt; showStepperList = &lt;bool&gt;[].obs;

Map&lt;String, bool&gt; calcuttaStepCompletionStatus = {
  "Round-1 player selection": false,
  "Match configuration":      false,
  "Round-2 player selection": false,
  "Round-3 player selection": false,
  "Add Score":                false,
};

RxInt calcuttaCurrentStep = 0.obs;

void initStepperForFoursome(int foursomeId) {
  if (!currentStepPerFoursome.containsKey(foursomeId)) {
    currentStepPerFoursome[foursomeId] = 0.obs;
  }
}

void resetCalcuttaStepperIfNeeded() {
  calcuttaStepCompletionStatus.updateAll((key, _) =&gt; false);
  calcuttaCurrentStep.value = 0;
}

bool isStepDone(int foursomeId, int step) {
  final current = currentStepPerFoursome[foursomeId]?.value ?? 0;
  return current &gt; step;
}`);

  // -- asslide-5 : Step 6: Add Score CTA (All game types) -- (2 files)
  add("asslide-5", "flutter", "add_score.dart", `// asslide-5: Tap Add Score â€” primary CTA to open the 18-hole score grid.

Obx(() =&gt; Padding(
  padding: const EdgeInsets.all(16),
  child: CustomButtonNew(
    text: 'ADD SCORE',
    borderColor: ColorCode.borderColor,
    onPressed: controller.openScoreGrid,
  ),
))`);
  add("asslide-5", "flutter", "add_score_controller.dart", `// asslide-5: Open Score Grid â€” navigates into the 18-hole score entry screen.

RxString foursomeid = ''.obs;

void openScoreGrid(CalcuttaFoursomeData foursome) {
  foursomeid.value = foursome.id.toString();
  // Ensure isHolePressed map initialised for this foursome
  if (!isHolePressed.containsKey(foursome.id)) {
    isHolePressed[foursome.id!] = List.generate(18, (_) =&gt; false).obs;
  }
  Get.toNamed(RoutsNames.scoreEntry, arguments: {
    "gameId":         gameId,
    "foursomeId":     foursome.id,
    "gameType":       gameType,
    "organizationId": organizationId,
    "holesPerMatch":  holesPerMatch,
  });
}

RxMap&lt;int, RxList&lt;bool&gt;&gt; isHolePressed = RxMap&lt;int, RxList&lt;bool&gt;&gt;();`);

  // -- asslide-6 : Step 7: Holes Grid â€” 18-hole score grid (All game types; 27 holes for Horse Race) -- (2 files)
  add("asslide-6", "flutter", "add_score.dart", `// asslide-6: 18-Hole Score Grid â€” horizontal DataTable with hole-complete indicators.

Obx(() =&gt; SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  child: DataTable(
    columnSpacing: 8,
    columns: [
      const DataColumn(label: Text('Player')),
      ...List.generate(18, (i) =&gt; DataColumn(
        label: GestureDetector(
          onTap: () =&gt; controller.openScorecard(i + 1),
          child: Text('\${i + 1}',
            style: TextStyle(
              color: controller.isHoleComplete(i + 1) ? ColorCode.mainColor : Colors.black,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      )),
    ],
    rows: controller.scorePlayers.map((player) =&gt; DataRow(
      cells: [
        DataCell(Text(player.name ?? '', style: CustomStyle.otherTextStyle)),
        ...List.generate(18, (i) =&gt; DataCell(
          controller.isHoleComplete(i + 1)
              ? const Icon(Icons.check_circle, color: Color(0xFF15803D), size: 18)
              : Text('â€”', style: CustomStyle.informationDetails),
        )),
      ],
    )).toList(),
  ),
))`);
  add("asslide-6", "flutter", "add_score_controller.dart", `// asslide-6: Score Grid helpers â€” completedHolesMap, isHoleComplete, openScorecard.

RxMap&lt;int, List&lt;int&gt;&gt; completedHolesMap = &lt;int, List&lt;int&gt;&gt;{}.obs;
RxList&lt;CalcuttaPlayers&gt; scorePlayers = &lt;CalcuttaPlayers&gt;[].obs;

bool isHoleComplete(int hole) {
  final completed = completedHolesMap[int.parse(foursomeid.value)] ?? [];
  return completed.contains(hole);
}

void openScorecard(int hole) {
  selectedHole.value = hole.toString().padLeft(2, '0');
  Get.toNamed(RoutsNames.scoreCard, arguments: {
    "gameId":         gameId,
    "foursomeId":     foursomeid.value,
    "hole":           hole,
    "gameType":       gameType,
    "organizationId": organizationId,
    "par":            holesPar.value,
  });
}

Future&lt;void&gt; getCompletedHoles({bool showProgress = false}) async {
  final response = await apiService.getCompletedHoles(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    completedHolesMap.clear();
    for (var entry in (response.data ?? [])) {
      completedHolesMap[entry.foursomeId] = entry.completedHoles ?? [];
    }
    completedHolesMap.refresh();
  }
}`);

  // -- asslide-7 : Step 8: Scorecard â€” per-hole score entry (All game types) -- (2 files)
  add("asslide-7", "flutter", "input_score.dart", `// asslide-7: Scorecard â€” enter hole score per player, Save / Next buttons.

Obx(() =&gt; Padding(
  padding: const EdgeInsets.all(16),
  child: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('Hole \${controller.currentHole.value}', style: CustomStyle.gameDetailsSubTitle),
      const SizedBox(height: 12),
      ...controller.scorePlayers.asMap().entries.map((e) {
        int idx = e.key;
        var player = e.value;
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Row(
            children: [
              Expanded(child: Text(player.name ?? '', style: CustomStyle.otherTextStyle)),
              SizedBox(
                width: 80,
                child: TextField(
                  controller: controller.scoreControllers[idx],
                  keyboardType: TextInputType.number,
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                    hintText: '0',
                  ),
                ),
              ),
            ],
          ),
        );
      }).toList(),
      const SizedBox(height: 16),
      Row(
        children: [
          Expanded(child: CustomButtonNew(text: 'SAVE', borderColor: ColorCode.borderColor,
              onPressed: controller.saveHoleScore)),
          const SizedBox(width: 12),
          Expanded(child: CustomButtonNew(text: 'NEXT', borderColor: ColorCode.borderColor,
              onPressed: controller.nextHole)),
        ],
      ),
    ],
  ),
))`);
  add("asslide-7", "flutter", "input_score_controller.dart", `// asslide-7: Save hole score + move to next hole.

RxInt currentHole = 1.obs;
List&lt;TextEditingController&gt; scoreControllers = [];

Future&lt;void&gt; saveHoleScore() async {
  final scores = scoreControllers.asMap().entries.map((e) =&gt; {
    "playerId": scorePlayers[e.key].id,
    "score":    int.tryParse(e.value.text) ?? 0,
  }).toList();

  try {
    progressDialog.show();
    final response = await apiService.saveHoleScore(
      gameId:         gameId,
      foursomeId:     int.parse(foursomeid.value),
      hole:           currentHole.value,
      scores:         scores,
      organizationId: organizationId,
    );
    progressDialog.hide();
    if (response.error == false) {
      // Mark hole as complete
      final list = completedHolesMap[int.parse(foursomeid.value)] ?? [];
      if (!list.contains(currentHole.value)) list.add(currentHole.value);
      completedHolesMap[int.parse(foursomeid.value)] = list;
      completedHolesMap.refresh();
    }
  } catch (e) {
    progressDialog.hide();
  }
}

void nextHole() {
  if (currentHole.value &lt; 18) currentHole.value++;
  for (var c in scoreControllers) c.clear();
}`);

  // -- asslide-8 : Step 9: Skode & Junk â€” side rewards (All game types; MADE/MISSED/EARNED) -- (2 files)
  add("asslide-8", "flutter", "input_score.dart", `// asslide-8: Skode &amp; Junk Rewards â€” accordion for side rewards after each hole.

Obx(() =&gt; ExpansionTile(
  title: Text('Skode &amp; Junk', style: CustomStyle.gameDetailsSubTitle),
  children: [
    ...['Skode', 'Junk', 'Putts', 'Closest To Pin', 'Longest Drive', 'Fairways']
        .map((category) =&gt; ListTile(
              title: Text(category, style: CustomStyle.otherTextStyle),
              trailing: const Icon(Icons.chevron_right),
              onTap: () =&gt; controller.openRewardPopup(category),
            ))
        .toList(),
  ],
))`);
  add("asslide-8", "flutter", "input_score_controller.dart", `// asslide-8: Skode &amp; Junk â€” openRewardPopup + saveReward (MADE/MISSED/EARNED).

void openRewardPopup(String category) {
  Get.bottomSheet(
    RewardPopupSheet(
      category:   category,
      players:    scorePlayers,
      hole:       currentHole.value,
      onSave:     (playerId, status) =&gt; saveReward(
        category: category, playerId: playerId, status: status),
    ),
    isScrollControlled: true,
  );
}

Future&lt;void&gt; saveReward({
  required String category,
  required String playerId,
  required String status,   // "made" | "missed" | "earned"
}) async {
  final response = await apiService.saveSkodeJunk(
    gameId:         gameId,
    foursomeId:     int.parse(foursomeid.value),
    hole:           currentHole.value,
    category:       category.toLowerCase(),
    playerId:       playerId,
    status:         status,
    organizationId: organizationId,
  );
  if (response.error == false) {
    isBetAdded[int.parse(foursomeid.value)] = true;
  }
}

RxList&lt;bool&gt; isBetAdded = &lt;bool&gt;[].obs;`);

  // -- asslide-9 : Step 10: Leaderboard â€” live standings (All game types) -- (2 files)
  add("asslide-9", "flutter", "leader_board_screen.dart", `// asslide-9: Leaderboard â€” live standings updated after each hole is scored.

Obx(() =&gt; SingleChildScrollView(
  child: Column(
    children: [
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        color: ColorCode.white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Leaderboard', style: CustomStyle.gameDetailsSubTitle),
            Text('Live', style: CustomStyle.otherTextStyle.copyWith(color: ColorCode.mainColor)),
          ],
        ),
      ),
      ListView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: controller.leaderboardRows.length,
        itemBuilder: (context, index) {
          var row = controller.leaderboardRows[index];
          return ListTile(
            leading: Text('\${index + 1}', style: CustomStyle.heading7Style),
            title: Text(row.playerName ?? '', style: CustomStyle.gameDetailsSubTitle),
            subtitle: Text('Strokes: \${row.totalStrokes}  Points: \${row.totalPoints}',
                style: CustomStyle.otherTextStyle),
          );
        },
      ),
    ],
  ),
))`);
  add("asslide-9", "flutter", "leader_board_screen_controller.dart", `// asslide-9: Leaderboard â€” live standings fetched after each hole save.

RxList&lt;LeaderboardRow&gt; leaderboardRows = &lt;LeaderboardRow&gt;[].obs;

Future&lt;void&gt; fetchLeaderboard() async {
  final response = await apiService.getLeaderboard(
      gameId: gameId, organizationId: organizationId);
  if (response.error == false) {
    leaderboardRows.assignAll(response.data ?? []);
  }
}

// Pusher event listener â€” auto-refreshes leaderboard on score updates:
// privateChannel?.bind('score.updated', (_) =&gt; fetchLeaderboard());
`);

})();