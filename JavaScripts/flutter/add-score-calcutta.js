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
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet.dart", `
import 'dart:convert';

import 'package:bga_flutter_app/views/common_views/bottom_sheet_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import '../../controllers/bottom_sheets_controller/calcutta_round_one_bottom_sheet_controller.dart';
import '../../controllers/bottom_sheets_controller/calcutta_round_select_player_bottom_sheet_controller.dart';
import '../../main.dart';
import '../../model/game_models/round_players_selection_model.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/capped_text_scaling.dart';
import '../../utils/toast_message.dart';
import '../../utils/utils_methods.dart';
import '../common_views/search_bar_view.dart';
import 'calcutta_round_select_player_bottom_sheet.dart';

class CalcuttaRoundOneBottomSheet extends GetView<CalcuttaRoundOneBottomSheetController> {
  const CalcuttaRoundOneBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SearchBarView(
          controller: controller.searchController,
          onChanged: (value) {
            controller.searchQuery.value = value; // ← triggers Obx rebuild
            controller.onSearch(value);
          },
          onCrossTap: () {
            controller.searchQuery.value = "";
            controller.onSearch(controller.searchQuery.value);
          },
        ),
        const SizedBox(height: 5),
        Flexible(
          child: Container(
            height: Get.height,
            color: Colors.white,
            child: Obx(
              () => ListView.builder(
                key: Key(controller.listKey.value),
                shrinkWrap: true,
                itemCount: controller.memberList.length,
                itemBuilder: (context, mIndex) {
                  final member = controller.memberList[mIndex];
                  debugPrint("player id ${member.id} => ${controller.getBatType(member.id!)}");
                  return Padding(
                    padding: const EdgeInsets.all(10),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(right: 10),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(50),
                                child: Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    customCacheImage(
                                      url: member.profilePicture,
                                      fit: BoxFit.cover,
                                      height: 60,
                                      placeHolder: "assets/images/avatar.png",
                                      width: 60,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "${member.firstName ?? ""}  ${member.nickName != null ?  "(${member.nickName})" : ""}",
                                    style: CustomStyle.playerNameStyle,
                                  ),
                                  Container(
                                    width: Get.width * 0.65,
                                    child: SingleChildScrollView(
                                      scrollDirection: Axis.horizontal,
                                      child: Text(
                                        "${member.email}",
                                        style: CustomStyle.playerEmailStyle,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.only(left: 5, right: 5),
                                    decoration: BoxDecoration(
                                      color: (controller.getPlayerList(member.id!).length == 3) ? ColorCode.white : ColorCode.drawerColor,
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      'BGA HCP: ${member.bgaHcp}',
                                      style: CustomStyle.t01Text.copyWith(
                                        color: ColorCode.vs,
                                        fontSize: appFontSize.value + 14,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                    ),
                                  ),
                                  if (controller.getPlayerList(member.id!).length == 3)
                                    Container(
                                      height: 27,
                                      margin: const EdgeInsets.only(top: 5),
                                      decoration: BoxDecoration(
                                        color: const Color.fromRGBO(210, 234, 215, 1),
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: ListView.builder(
                                          itemCount: controller.betsTypeList.length,
                                          shrinkWrap: true,
                                          scrollDirection: Axis.horizontal,
                                          physics: const NeverScrollableScrollPhysics(),
                                          itemBuilder: (context, index) {
                                            return InkWell(
                                              onTap: () {},
                                              child: Container(
                                                margin: const EdgeInsets.all(2),
                                                padding: const EdgeInsets.all(2),
                                                decoration: BoxDecoration(
                                                  color: controller.getBatType(member.id!) != (controller.betsTypeList[index]).toLowerCase()
                                                      ? ColorCode.drawerColor
                                                      : ColorCode.mainColor,
                                                  borderRadius: BorderRadius.circular(4),
                                                ),
                                                child: Text(
                                                  controller.betsTypeList[index],
                                                  style: TextStyle(
                                                    color: controller.getBatType(member.id!) != (controller.betsTypeList[index]).toLowerCase() ? Colors.black : Colors.white,
                                                    fontSize: 14,
                                                  ),
                                                ),
                                              ),
                                            );
                                          }),
                                    )
                                ],
                              ),
                            ),
                            Obx(() {
                              if (controller.getPlayerList(member.id!).isNotEmpty) {
                                return Flexible(
                                  child: InkWell(
                                    onTap: () => onSelectClick(member, false),
                                    child: ListView.builder(
                                      itemCount: controller.getPlayerList(member.id!).length,
                                      shrinkWrap: true,
                                      padding: const EdgeInsets.only(right: 5),
                                      physics: const NeverScrollableScrollPhysics(),
                                      itemBuilder: (context, index) {
                                        var player = controller.getPlayerList(member.id!)[index];
                                        return Column(
                                          children: [
                                            Row(
                                              mainAxisAlignment: MainAxisAlignment.start,
                                              children: [
                                                ClipRRect(
                                                  borderRadius: BorderRadius.circular(15),
                                                  child: customCacheImage(
                                                    url: player.profile,
                                                    fit: BoxFit.cover,
                                                    placeHolder: "assets/images/avatar.png",
                                                    height: 30,
                                                    width: 30,
                                                  ),
                                                ),
                                                const SizedBox(width: 5),
                                                Flexible(
                                                  child: Text(
                                                    getFormattedName(player.name), // Display selected player’s name here
                                                    style: CustomStyle.paragraph5Style.copyWith(
                                                      color: ColorCode.vs,
                                                      fontSize: appFontSize.value + 12,
                                                    ),
                                                    maxLines: 1,
                                                    overflow: TextOverflow.ellipsis,
                                                  ),
                                                ),
                                                const SizedBox(width: 5),
                                                const Text('|'),
                                                const SizedBox(width: 5),
                                                Row(
                                                  children: [
                                                    Text(
                                                      '\$${player.money ?? ""}',
                                                      style: CustomStyle.paragraph5Style.copyWith(
                                                        color: ColorCode.vs,
                                                        fontSize: appFontSize.value + 12,
                                                      ),
                                                    ),
                                                    Container(
                                                      width: 20,
                                                      height: 20,
                                                      margin: const EdgeInsets.only(left: 5),
                                                      decoration: const BoxDecoration(
                                                        color: ColorCode.dividerColor,
                                                        borderRadius: BorderRadius.all(Radius.circular(20.0)),
                                                      ),
                                                      child: Center(
                                                        child: Text(
                                                          controller.getRoundName(member.id!, player.id!),
                                                          style: CustomStyle.paragraph5Style.copyWith(
                                                            color: ColorCode.vs,
                                                            fontSize: appFontSize.value + 12,
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ],
                                            ),
                                            if (controller.getPlayerList(member.id!).length < 3 && controller.getPlayerList(member.id!).length == (index + 1))
                                              Text(
                                                "+ Select Player", // Display selected player’s name here
                                                style: CustomStyle.hyperLink2Style,
                                              ),
                                          ],
                                        );
                                      },
                                    ),
                                  ),
                                );
                              } else {
                                return CustomButtonNew(
                                  height: 40,
                                  width: 120,
                                  borderWidth: 1,
                                  borderColor: ColorCode.borderColor,
                                  text: "Select Player",
                                  onPressed: () => onSelectClick(member, true),
                                  style: CustomStyle.summaryTableTitle.copyWith(color: Colors.white, fontSize: appFontSize.value + 14),
                                  radius: 6,
                                );
                              }
                            }),
                          ],
                        ),
                        const SizedBox(height: 10),
                        const Divider(color: ColorCode.divider),
                      ],
                    ),
                  );
                },
              ),
            ),
          ),
        ),
        Container(
          color: Colors.white,
          width: Get.width,
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: CustomButtonNew(
            borderColor: ColorCode.borderColor,
            text: "DONE",
            onPressed: () async {
              Get.back(result: controller.roundPlayerList);
            },
          ),
        ),
      ],
    );
  }

  Future<void> onSelectClick(member, bool selectMore) async {
    debugPrint("total player : ${controller.playerCount} < roundPlayerList length ${controller.roundPlayerList.length}");
    debugPrint("total existPlayerList : ${controller.existPlayerList.length}");

    if (selectMore && controller.playerCount <= controller.roundPlayerList.length) {
      ToastMessage.error(message: "You can buy only ${controller.playerCount} Players");
      return;
    }

    var sheetController = Get.put(CalcuttaRoundSelectPlayerBottomSheetController());
    sheetController.calcuttaRoundList.clear();
    sheetController.calcuttaRoundList.addAll(controller.calcuttaRoundList);
    sheetController.gameId = controller.gameId;
    sheetController.fourSomeList.clear();
    sheetController.fourSomeList.addAll(controller.fourSomeList);
    sheetController.roundPlayerList.clear();
    // Deep copy the roundPlayerList to avoid reference issues
    debugPrint("onSelectClick : ${controller.currentRoundName} =>${member.email} => ${jsonEncode(controller.roundPlayerList)}");

    sheetController.roundPlayerList.addAll(controller.roundPlayerList);
    sheetController.currentRoundName = controller.currentRoundName;
    sheetController.currentPlayer = member;
    sheetController.existPlayerList.clear();
    sheetController.existPlayerList.addAll(controller.existPlayerList);
    await sheetController.fetchMembers();
    sheetController.filterListMemberList.value = sheetController.getFilterMemberList();

    List<RoundPlayersSelectionModel>? selectedPlayer = await customBottomSheet(
      title: "Select Player",
      child: const CalcuttaRoundSelectPlayerBottomSheet(),
    );

    if (selectedPlayer != null && selectedPlayer.isNotEmpty) {
      debugPrint("selectedPlayer roundPlayerList 1 : ${controller.roundPlayerList.length}");

      controller.roundPlayerList.clear();
      controller.roundPlayerList.addAll(selectedPlayer);
      debugPrint("selectedPlayer roundPlayerList 2 : ${controller.roundPlayerList.length}");
      if (controller.currentRoundName == "1" || controller.currentRoundName == "2" || controller.currentRoundName == "3") {
        controller.getCalcuttaRounds();
      }
    }
    for (var item in controller.roundPlayerList) {
      item.roundPlayersList?.removeWhere((element) => element.money == null || element.money == "");
    }
    controller.memberList.refresh();
    // controller.roundPlayerList.refresh();
  }
}
`);
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet_controller.dart", `
import 'package:bga_flutter_app/model/game_models/calcutta_foursome_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../model/game_models/calcutta_rounds_model.dart';
import '../../model/game_models/round_players_selection_model.dart';
import '../../model/participants_list_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class CalcuttaRoundOneBottomSheetController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();

  TextEditingController searchController = TextEditingController();
  var searchQuery = ''.obs;

  RxList<ParticipantsDataItem> memberList = <ParticipantsDataItem>[].obs;
  RxList<ParticipantsDataItem> allMemberList = <ParticipantsDataItem>[].obs;

  RxList<RoundPlayersSelectionModel> roundPlayerList = <RoundPlayersSelectionModel>[].obs;
  Map<String, TextEditingController> memberAmountController = {};
  List<CalcuttaRoundItem> calcuttaRoundList = [];

  int playerCount = 0;
  String currentRoundName = "";
  String gameId = "";
  List<String> betsTypeList = ["Low", "      ", "High"];
  RxString listKey = UniqueKey().toString().obs;

  RxList<RoundPlayersSelectionModel> existPlayerList = <RoundPlayersSelectionModel>[].obs;

  List<CalcuttaFoursomeData> fourSomeList = [];

  @override
  void onReady() {
    if (currentRoundName == "1") {
      fetchMembers();
    }
  }

  bool isAssigned(String playerId) {
    bool isExist = false;
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        if (playerId == round.id) {
          isExist = true;
          break;
        }
      }
    }
    return isExist;
  }

  String getBatType(String playerId) {
    for (var round in roundPlayerList) {
      if (playerId == round.id) {
        return round.betType ?? "      ";
      }
    }

    for (var round in existPlayerList) {
      if (playerId == round.id) {
        return round.betType ?? "      ";
      }
    }

    return "      ";
  }

  int completedPlayer() {
    int completed = 0;
    for (var member in memberList) {
      if (getPlayerList(member.id ?? "").length == 3) {
        completed++;
      }
    }
    return completed;
  }

  List<RoundPlayersList> getPlayerList(String playerId) {
    List<RoundPlayersList> tempPlayerList = [];
    if (existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        if (playerId == round.id) {
          tempPlayerList.addAll(round.roundPlayersList ?? []);
        }
      }
    }
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        if (playerId == round.id) {
          tempPlayerList.addAll(round.roundPlayersList ?? []);
        }
      }
    }
    return tempPlayerList;
  }

  String getRoundName(String mainId, String playerId) {
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        if (round.id == mainId) {
          for (RoundPlayersList player in round.roundPlayersList ?? []) {
            if (playerId == player.id) {
              return round.roundName ?? "";
            }
          }
        }
      }
    }
    if (existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        if (round.id == mainId) {
          for (RoundPlayersList player in round.roundPlayersList ?? []) {
            if (playerId == player.id) {
              return round.roundName ?? "";
            }
          }
        }
      }
    }
    return "";
  }

  onSearch(String value) {
    memberList.clear();
    if (value.isEmpty) {
      memberList.addAll(allMemberList);
      return;
    }
    for (var member in allMemberList) {
      debugPrint("name ${member.firstName} => ${member.email}");
      if (member.firstName!.toLowerCase().contains(value.toLowerCase()) || (member.email != null && member.email!.toLowerCase().contains(value.toLowerCase())) || (member.nickName ?? "").toLowerCase().contains(value.trim().toLowerCase())) {
        memberList.add(member);
      }
    }
  }

  Future<void> fetchMembers() async {
    try {
      progressDialog.show();
      var response = await apiService.getMemberList();
      progressDialog.hide();

      if (response.error == false) {
        memberList.clear();
        allMemberList.clear();
        for (ParticipantsDataItem member in response.data ?? []) {
          var player = calcuttaRoundList.firstWhereOrNull((element) => element.playerId == member.id);
          if (player != null) {
            debugPrint("Member => ${member.email}");
            memberList.add(member);
            allMemberList.add(member);
          }
        }
        for (var member in memberList) {
          memberAmountController[member.id!] = TextEditingController();
        }
        memberList.refresh();
      } else {
        ToastMessage.error(message: response.message);
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
    }
  }

  Future<void> updateBetType({required String playerId, required String betType}) async {
    try {
      progressDialog.show();
      var response = await apiService.updatBetType(gameId: gameId, playerId: playerId, betType: betType);
      progressDialog.hide();

      if (response.error == false) {
        ToastMessage.success(message: response.message);
      } else {
        ToastMessage.error(message: response.message);
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
    }
  }

  Future<void> getCalcuttaRounds() async {
    try {
      List<CalcuttaRoundItem> calcuttaRoundList2 = [];
      List<RoundPlayersSelectionModel> roundPlayerList1 = [];
      List<RoundPlayersSelectionModel> roundPlayerList2 = [];
      List<RoundPlayersSelectionModel> roundPlayerList3 = [];

      calcuttaRoundList2.clear();
      // roundPlayerList1.clear();
      // roundPlayerList2.clear();
      // roundPlayerList3.clear();
      var response = await apiService.getCalcuttaRounds(gameId.toString());
      if (response.error == false) {
        calcuttaRoundList2.addAll(response.data ?? []);
        debugPrint("calcuttaRoundList : ${calcuttaRoundList2.length}");
        for (int i = 0; i < calcuttaRoundList2.length; i++) {
          var item = calcuttaRoundList2[i];
          debugPrint("name ${item.playerId} => type ${item.betType}");
          for (int k = 0; k < (item.selectedPlayers?.length ?? 0); k++) {
            var player = item.selectedPlayers![k];

            if (player.round == 1) {
              RoundPlayersSelectionModel? round1 = roundPlayerList1.firstWhereOrNull((element) => element.id == item.playerId);
              if (round1 != null) {
                print("rounds - player email => ${player.email}");
                round1.setRoundPlayersList?.add(RoundPlayersList(
                    id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString(), bgaHcp: player.bgaHcp, profile: player.profilePicture));
              } else {
                roundPlayerList1.add(RoundPlayersSelectionModel(
                    id: item.playerId,
                    name: item.playerName,
                    roundName: "1",
                    bgaHcp: item.bgaHcp,
                    profile: item.profilePicture,
                    betType: item.betType,
                    email: item.playerEmail,
                    roundPlayersList: [
                      RoundPlayersList(
                          id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString(), bgaHcp: player.bgaHcp, profile: player.profilePicture)
                    ]));
              }
            }
            else if (player.round == 2) {
              print("rounds - player email => ${player.email}");
              RoundPlayersSelectionModel? round2 = roundPlayerList2.firstWhereOrNull((element) => element.id == item.playerId);
              if (round2 != null) {
                round2.setRoundPlayersList?.add(RoundPlayersList(
                    id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString(), bgaHcp: player.bgaHcp, profile: player.profilePicture));
              } else {
                roundPlayerList2.add(RoundPlayersSelectionModel(
                    id: item.playerId,
                    name: item.playerName,
                    roundName: "2",
                    bgaHcp: item.bgaHcp,
                    profile: item.profilePicture,
                    betType: item.betType,
                    email: item.playerEmail,
                    roundPlayersList: [
                      RoundPlayersList(
                          id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString(), bgaHcp: player.bgaHcp, profile: player.profilePicture)
                    ]));
              }
            }
            else if (player.round == 3) {
              print("rounds - player email => ${player.email}");
              RoundPlayersSelectionModel? round3 = roundPlayerList3.firstWhereOrNull((element) => element.id == item.playerId);
              if (round3 != null) {
                round3.setRoundPlayersList?.add(RoundPlayersList(
                    id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString(), bgaHcp: player.bgaHcp, profile: player.profilePicture));
              } else {
                roundPlayerList3.add(RoundPlayersSelectionModel(
                    id: item.playerId,
                    name: item.playerName,
                    roundName: "3",
                    bgaHcp: item.bgaHcp,
                    profile: item.profilePicture,
                    betType: item.betType,
                    email: item.playerEmail,
                    roundPlayersList: [RoundPlayersList(id: player.playerId, name: player.name, email: player.email, money: player.bidAmount.toString())]));
              }
            }
          }
        }
        if (currentRoundName == "2") {
          roundPlayerList.value = roundPlayerList2;
          existPlayerList.clear();
          existPlayerList.addAll(roundPlayerList1);
          existPlayerList.addAll(roundPlayerList3);
        } else if (currentRoundName == "3") {
          roundPlayerList.value = roundPlayerList3;
          existPlayerList.clear();
          existPlayerList.addAll(roundPlayerList1);
          existPlayerList.addAll(roundPlayerList2);
        }
        memberList.refresh();
        allMemberList.refresh();
      } else {
        ToastMessage.error(message: response.message);
      }
    } catch (error) {
      ToastMessage.error(message: "$error");
    }
  }
}
`);

  // ── Step 2 — Select & Bid ──────────────────────────────────
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet.dart", `
import 'dart:convert';
import 'dart:developer';

import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import '../../main.dart';
import '../../model/game_models/round_players_selection_model.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../controllers/bottom_sheets_controller/calcutta_round_select_player_bottom_sheet_controller.dart';
import '../../utils/utils_methods.dart';
import '../common_views/search_bar_view.dart';


class CalcuttaRoundSelectPlayerBottomSheet extends GetView<CalcuttaRoundSelectPlayerBottomSheetController> {

  const CalcuttaRoundSelectPlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
          SearchBarView(
            controller: controller.searchController,
            onChanged: (value) {
              controller.searchQuery.value = value; // ← triggers Obx rebuild
              controller.onSearch(value);
            },
            onCrossTap: () {
              controller.searchQuery.value = "";
              controller.onSearch(controller.searchQuery.value);
            },
          ),
          Flexible(
            child: Container(
              height: Get.height,
              color: Colors.white,
              child: Obx(()=> ListView.builder(
                  shrinkWrap: true,
                  itemCount: controller.filterListMemberList.length,
                  itemBuilder: (context, index) {
                    final member = controller.filterListMemberList[index];
                    controller.memberAmountController[member.id!]?.text = controller.getMoney(member.id!);

                    return Padding(
                      padding: const EdgeInsets.only(left: 10, bottom: 10, top: 10),
                      child: GestureDetector(
                        onTap: () {
                          if(!controller.isAssigned(member.id!) || controller.isCurrentSession(member.id!)){
                            controller.toggleSelection(member);
                            controller.filterListMemberList.refresh();
                          }
                        },
                        child: Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(50),
                                child: Stack(
                                  children: [
                                    customCacheImage(
                                      url: member.profilePicture,
                                      fit: BoxFit.cover,
                                      height: 60,
                                      width: 60,
                                    ),
                                  controller.isAssigned(member.id!)
                                          ? Positioned.fill(
                                        child: Container(
                                          height: 60,
                                          width: 60,
                                          color: controller.isCurrentSession(member.id!) ? ColorCode.check.withAlpha(150) : Colors.red.withAlpha(150),
                                          child: Icon(
                                            controller.isCurrentSession(member.id!) ? Icons.check : Icons.close_rounded,
                                            color: Colors.white,
                                            size: 40,
                                          ),
                                        ),
                                      )
                                          : const SizedBox.shrink(),
                                  ],
                                ),
                              ),
                            ),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    member.firstName ?? "",
                                    style: CustomStyle.playerNameStyle,
                                    maxLines: 1,
                                  ),
                                  Container(
                                    width: Get.width*0.45,
                                    child: SingleChildScrollView(
                                      scrollDirection: Axis.horizontal,
                                      child: Text(
                                        "${member.email}",
                                        style: CustomStyle.playerEmailStyle,
                                        overflow: TextOverflow.ellipsis,

                                      ),
                                    ),
                                  ),
                                  Container(
                                    padding: EdgeInsets.symmetric(horizontal: controller.isAssigned(member.id!) ?0:5, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: controller.isAssigned(member.id!) ? ColorCode.white : const Color.fromRGBO(210, 234, 215, 1),
                                      borderRadius: BorderRadius.circular(4),
                                    ),
                                    child: Text(
                                      controller.isAssigned(member.id!)
                                          ? 'Acquired by ${controller.getAssignedPlayerName(member.id!)}': 'BGA HCP: ${member.bgaHcp}',
                                      style: CustomStyle.t01Text.copyWith(
                                        color: Colors.black,
                                        fontWeight: controller.isAssigned(member.id!) ? FontWeight.w500 : FontWeight.w700,
                                        fontSize: appFontSize.value + 14,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                      maxLines: 1,
                                    ),
                                  )

                                ],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(right: 30),
                              child: Row(
                                children: [
                                  Text('\$', style: CustomStyle.hintTextStyle.copyWith(fontSize: appFontSize.value + 16,color: ColorCode.memberSubColor)),
                                  Container(
                                    width: 60,
                                    height: 50,
                                    margin: const EdgeInsets.only(left: 10),
                                    decoration: BoxDecoration(
                                      border: Border.all(
                                        color: const Color.fromRGBO(0, 0, 0, 0.1),
                                        width: 1,
                                      ),
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: TextField(
                                      controller: controller.memberAmountController[member.id!],
                                      keyboardType: TextInputType.numberWithOptions(decimal: true, signed: true),
                                      textInputAction: TextInputAction.done,
                                      maxLength: 3,
                                      textAlign: TextAlign.center,
                                      readOnly: controller.isReadOnly(member.id!, controller.memberAmountController[member.id!]!.text.toString()),
                                      onChanged: (value) {
                                        // Regex: allows integers or decimals, but no alphabets or special chars
                                        final regex = RegExp(r'^\d+(\.\d+)?$');

                                        if (!regex.hasMatch(value.trim())) {
                                          ToastMessage.error(message: "Only digits values are allowed");
                                        }
                                        if(value.isNotEmpty && int.parse(value) > 500) {
                                          debugPrint("memberAmountController 1");
                                          ToastMessage.error(message: "Maximum 500 allowed");
                                          controller.memberAmountController[member.id!]?.text = "500";
                                          controller.setMoney(member.id!, "500");
                                          return;
                                        }else if(value.isNotEmpty && int.parse(value) > 0 && !controller.isAssigned(member.id!)) {
                                          debugPrint("memberAmountController 2");
                                          controller.toggleSelection(member);
                                        }else if(value.isEmpty && controller.isAssigned(member.id!)){
                                          debugPrint("memberAmountController 3");
                                          controller.toggleSelection(member);
                                        }
                                        debugPrint("memberAmountController 4 : ${controller.isAssigned(member.id!)}");
                                        if(controller.isAssigned(member.id!)){
                                          controller.setMoney(member.id!, value);
                                        }else{
                                          controller.setMoney(member.id!, "");
                                        }
                                      },
                                      scrollPhysics: AlwaysScrollableScrollPhysics(),
                                      decoration: const InputDecoration(
                                        border: InputBorder.none,
                                        hintText: '',
                                        counterText: "",
                                        contentPadding: EdgeInsets.symmetric(horizontal: 5, vertical: 8),
                                        filled: true,
                                        fillColor: Color.fromRGBO(240, 244, 253, 1),
                                      ),
                                      style: CustomStyle.summaryTableTitle.copyWith(
                                        fontSize: appFontSize.value + 16,
                                        color: controller.isCurrentSession(member.id!) ? ColorCode.vs: ColorCode.paragraphLightColor,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),
          Container(
            color: Colors.white,
            width: Get.width,
            padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
            child: CustomButtonNew(
              borderColor: ColorCode.borderColor,
              text: "SELECT PLAYER",
              onPressed: () async {
                var isError = false;
                List<RoundPlayersSelectionModel> tempPlayerList = [];
                if (controller.roundPlayerList.isNotEmpty) {
                  for (var round in controller.roundPlayerList) {
                    for (var i = 0; i < (round.roundPlayersList ?? []).length; i++) {
                      var player = round.roundPlayersList![i];
                      if (controller.isAssigned(player.id!)) {
                        var money = controller.memberAmountController[player.id!]!.text.trim();
                        if(money.isNotEmpty){
                          round.roundPlayersList![i].setMoney = money;
                          debugPrint("player name ${player.name} => amount $money");
                          // debugPrint("Player name ${player.name} => amount $money");
                          if(controller.isCurrentSession(player.id!)){
                            tempPlayerList.add(round);
                          }
                        }else{
                          isError = true;
                          debugPrint("${player.name} => $money");
                          ToastMessage.error(message: "Please insert value");
                        }
                        break;

                      }else{
                        // isError = true;
                        debugPrint("${player.email} => Not assigned");
                      }
                    }
                  }
                }
                if(!isError){
                  log("roundPlayerList : ${jsonEncode(controller.roundPlayerList)}");
                  if(tempPlayerList.isNotEmpty){
                    var result = await controller.postCalcuttaRoundGame(roundPlayerList: tempPlayerList);
                    if(result == false){
                      return;
                    }
                  }
                  Get.back(result: controller.roundPlayerList);
                }
              },
            ),
          ),
        ],
      );
  }
}
`);
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart", `
import 'package:bga_flutter_app/model/game_models/calcutta_foursome_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../model/default_model.dart';
import '../../model/game_models/calcutta_rounds_model.dart';
import '../../model/game_models/round_players_selection_model.dart';
import '../../model/participants_list_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class CalcuttaRoundSelectPlayerBottomSheetController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();

  TextEditingController searchController = TextEditingController();
  var searchQuery = ''.obs;

  RxList<ParticipantsDataItem> memberList = <ParticipantsDataItem>[].obs;
  RxList<ParticipantsDataItem> allMemberList = <ParticipantsDataItem>[].obs;
  RxList<ParticipantsDataItem> filterListMemberList = <ParticipantsDataItem>[].obs;
  var selectedOption = "".obs;
  Map<String, TextEditingController> memberAmountController = {};

  List<RoundPlayersSelectionModel> roundPlayerList = [];
  List<RoundPlayersSelectionModel> existPlayerList = [];
  List<CalcuttaRoundItem> calcuttaRoundList = [];

  String gameId = "";
  String currentRoundName = "";
  ParticipantsDataItem currentPlayer = ParticipantsDataItem();

  List<CalcuttaFoursomeData> fourSomeList = [];

  @override
  void onReady() {
    // fetchMembers();
  }

  onSearch(String value) {
    memberList.clear();
    if (value.isEmpty) {
      memberList.addAll(allMemberList);
      filterListMemberList.value = getFilterMemberList();
      return;
    }
    for (var member in allMemberList) {
      if (member.firstName!.toLowerCase().contains(value) || member.email!.toLowerCase().contains(value.toLowerCase())) {
        memberList.add(member);
      }
    }
    filterListMemberList.value = getFilterMemberList();
  }

  bool isReadOnly(String playerId, String text) {
    var currentSession = isCurrentSession(playerId);
    if (currentSession) {
      return false;
    }
    if (text.isNotEmpty) {
      return true;
    }
    return false;
  }

  bool isAssigned(String playerId) {
    bool isExist = false;
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (playerId == player.id) {
            isExist = true;
            break;
          }
        }
      }
    }
    if (!isExist && existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        if (round.id == currentPlayer.id) {
          for (RoundPlayersList player in round.roundPlayersList ?? []) {
            if (playerId == player.id) {
              isExist = true;
              break;
            }
          }
        }
      }
    }
    return isExist;
  }

  String getMoney(String playerId) {
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (playerId == player.id) {
            return player.money ?? "";
          }
        }
      }
    }
    if (existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        if (round.id == currentPlayer.id) {
          for (RoundPlayersList player in round.roundPlayersList ?? []) {
            if (playerId == player.id) {
              return player.money ?? "";
            }
          }
        }
      }
    }
    return "";
  }

  void setMoney(String playerId, String money) {
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (var i = 0; i < (round.roundPlayersList ?? []).length; i++) {
          var player = round.roundPlayersList![i];
          if (playerId == player.id) {
            player.setMoney = money;
          }
        }
      }
    }
    filterListMemberList.refresh();
  }

  int getPlayerCount() {
    int count = 0;
    if (existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        if (currentPlayer.id == round.id) {
          count += (round.roundPlayersList ?? []).length;
        }
      }
    }
    debugPrint("getPlayerCount : $count");
    return count;
  }

  String getAssignedPlayerName(String playerId) {
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (playerId == player.id) {
            return round.name ?? "";
          }
        }
      }
    }
    if (existPlayerList.isNotEmpty) {
      for (var round in existPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (playerId == player.id) {
            return "${round.name} | ${round.roundName}";
          }
        }
      }
    }
    return "";
  }

  bool isCurrentSession(String playerId) {
    bool isExist = false;
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (playerId == player.id && currentPlayer.id == round.id) {
            isExist = true;
            break;
          }
        }
      }
    }
    return isExist;
  }

  bool isFoursomeTeam({required String? playerId}) {
    bool isExist = false;
    List<CalcuttaPlayers> playerList = [];
    for (var foursome in fourSomeList) {
      for (CalcuttaPlayers player in foursome.players ?? []) {
        if (currentPlayer.id == player.playerId) {
          playerList = foursome.players ?? [];
          break;
        }
      }
    }
    for (var player in playerList) {
      if (playerId == player.playerId) {
        isExist = true;
        break;
      }
    }
    return isExist;
  }

  void toggleSelection(ParticipantsDataItem member) {
    bool isExist = false;
    RoundPlayersSelectionModel? tempRound;
    RoundPlayersList? tempPlayer;
    if (roundPlayerList.isNotEmpty) {
      for (var round in roundPlayerList) {
        for (RoundPlayersList player in round.roundPlayersList ?? []) {
          if (member.id == player.id) {
            tempRound = round;
            tempPlayer = player;
            isExist = true;
            break;
          }
        }
      }
    }
    debugPrint("tempRound : $tempRound");
    debugPrint("tempPlayer : $tempPlayer");
    debugPrint("isExist : $isExist");
    if (!isExist) {
      var isAdded = roundPlayerList.firstWhereOrNull((element) => element.id == currentPlayer.id);
      debugPrint("isAdded : $isAdded");
      if (isAdded == null) {
        if (currentRoundName == "3" && getPlayerCount() >= 3) {
          ToastMessage.error(message: "You can not pick more than three players");
        } else {
          roundPlayerList.add(RoundPlayersSelectionModel(
              id: currentPlayer.id,
              name: currentPlayer.firstName,
              roundName: currentRoundName,
              bgaHcp: num.parse((currentPlayer.bgaHcp ?? 0).toString()),
              profile: currentPlayer.profilePicture,
              betType: "",
              email: currentPlayer.email,
              roundPlayersList: [RoundPlayersList(id: member.id, name: member.firstName, money: memberAmountController[member.id]?.text.toString(), profile: member.profilePicture,email: member.email,bgaHcp: num.parse((member.bgaHcp ?? 0).toString()))]));
        }
      } else {
        if ((isAdded.roundPlayersList?.length ?? 0) == 0) {
          isAdded.setRoundPlayersList?.add(RoundPlayersList(id: member.id, name: member.firstName, money: memberAmountController[member.id]?.text.toString(), profile: member.profilePicture,email: member.email,bgaHcp: num.parse((member.bgaHcp ?? 0).toString())));
        } else if ((currentRoundName == "2" || currentRoundName == "3") && (isAdded.roundPlayersList?.length ?? 0) < 2) {
          isAdded.setRoundPlayersList?.add(RoundPlayersList(id: member.id, name: member.firstName, money: memberAmountController[member.id]?.text.toString(), profile: member.profilePicture,email: member.email,bgaHcp: num.parse((member.bgaHcp ?? 0).toString())));
        }
      }
    } else if (tempRound != null && tempPlayer != null) {
      tempRound.roundPlayersList?.remove(tempPlayer);
    }
    memberList.refresh();
  }

  Future<void> fetchMembers() async {
    try {
      progressDialog.show();
      var response = await apiService.getMemberList();
      progressDialog.hide();

      if (response.error == false) {
        memberList.clear();
        allMemberList.clear();
        for (ParticipantsDataItem member in response.data ?? []) {
          var player = calcuttaRoundList.firstWhereOrNull((element) => element.playerId == member.id);
          if (player != null) {
            memberList.add(member);
            allMemberList.add(member);
          }
        }
        debugPrint("response.data => ${(response.data ?? []).length}");
        debugPrint("calcuttaRoundList => ${calcuttaRoundList.length}");
        debugPrint("memberList => ${memberList.length}");
        debugPrint("allMemberList => ${allMemberList.length}");

        for (var member in memberList) {
          memberAmountController[member.id!] = TextEditingController();
        }
        filterListMemberList.value = getFilterMemberList();
      } else {
        ToastMessage.error(message: response.message);
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
    }
  }

  List<ParticipantsDataItem> getFilterMemberList(){
    List<ParticipantsDataItem> tempMemberList1 =[];
    List<ParticipantsDataItem> tempMemberList2 =[];
    List<ParticipantsDataItem> tempMemberList3 =[];
    List<ParticipantsDataItem> finalMemberList =[];
    for(var member in memberList){
      if(isCurrentSession(member.id!)){
        tempMemberList1.add(member);
      }else if(isAssigned(member.id!)){
        tempMemberList2.add(member);
      }else{
        tempMemberList3.add(member);
      }
    }
    finalMemberList.addAll(tempMemberList1);
    finalMemberList.addAll(tempMemberList3);
    finalMemberList.addAll(tempMemberList2);
    for(var member in finalMemberList){
      memberAmountController[member.id!]?.text = getMoney(member.id!);
    }
    return finalMemberList;
  }
  Future<bool> postCalcuttaRoundGame({required List<RoundPlayersSelectionModel> roundPlayerList}) async {
    progressDialog.show();
    DefaultModel response = DefaultModel();

    for (int i = 0; i < roundPlayerList.length; i++) {
      response = await apiService.postCalcuttaRoundGame(
        gameId: gameId,
        ownerId: roundPlayerList[i].id ?? "",
        round: currentRoundName,
        roundPlayerList: roundPlayerList[i].roundPlayersList ?? [],
      );
    }
    progressDialog.hide();

    if (response.error == false) {
      ToastMessage.success(message: response.message);
      return true;
    } else {
      ToastMessage.error(message: response.message);
      return false;
    }
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
  add("asslide-calcutta-5", "flutter", "caluctta_select_player_bottom_sheet.dart", `
import 'dart:convert';

import 'package:bga_flutter_app/controllers/bottom_sheets_controller/calcutta_player_select_bottom_controller.dart';
import 'package:bga_flutter_app/views/bottem_sheets/player_card_item.dart';
import 'package:bga_flutter_app/views/bottem_sheets/shuffle_cards_bottom_sheet.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/shuffle_cards_bottom_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/toast_message.dart';
import '../common_views/bottom_sheet_view.dart';
import '../common_views/no_data_view.dart';

class CalcuttaSelectPlayerBottomSheet extends GetView<CalcuttaPlayerSelectBottomController> {
  final String gameId;

  const CalcuttaSelectPlayerBottomSheet({super.key, required this.gameId});

  @override
  Widget build(BuildContext context) {
    var keyboardHeight = MediaQuery.of(context).viewInsets.bottom;

    return Column(children: [
      Flexible(
        child: Obx(() => controller.participantList.isNotEmpty
            ? ListView.builder(
                itemCount: controller.participantList.length,
                itemBuilder: (context, index) {
                  debugPrint("participantList => ${jsonEncode(controller.participantList[index])}");
                  return Obx(
                    () => PlayerCardItem(
                      dataItem: controller.participantList[index],
                      isSelected: controller.isSelected(controller.participantList[index].id ?? ""),
                      onTap: () => controller.toggleSelection(controller.participantList[index].id ?? ""),
                    ),
                  );
                },
              )
            : SizedBox(height: Get.height * 0.65, child: NoDataView())),
      ),
      Container(
        color: Colors.white,
        width: Get.width,
        padding: EdgeInsets.fromLTRB(15, 10, 15, 10),
        child: CustomButtonNew(
          borderColor: ColorCode.borderColor,
          text: "SELECT CARDS",
          onPressed: () async {
            int numberOfPlayersToSelect = controller.selectedOption;

            // Validate the selection
            if (controller.selectedList.length != numberOfPlayersToSelect) {
              // Show an error message
              ToastMessage.error(message: "You must select exactly $numberOfPlayersToSelect players.");
              return; // Exit the function early if validation fails
            } else {
              print("Selected Player IDs: ${controller.selectedList}");
              print("Selected Player IDs: ${controller.selectedList.length}");
              bool isGenerate = await controller.updatePlayer(playerId: controller.selectedList, gameId: gameId);

              if (!isGenerate) {
                return;
              }
              var sheetController = Get.put(ShuffleCardsBottomController());
              var result = await customBottomSheet(
                title: "Card Distribution",
                child: ShuffleCardsBottomSheet(
                  gameId: gameId,
                ),
              );
              Get.back(result: result);
            }
          },
        ),
      ),
    ]);
  }
}
`);
  add("asslide-calcutta-5", "flutter", "calcutta_player_select_bottom_controller.dart", `
import 'package:flutter/cupertino.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';

import '../../apis/api_services.dart';
import '../../model/game_models/game_details.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class CalcuttaPlayerSelectBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<Players> participantList = <Players>[].obs;
  List<Players> allParticipantList = [];
  RxList<String> selectedList = <String>[].obs;

  int selectedOption = 0;

  @override
  void onReady() {
    super.onReady();
  }

  void selectOption(int numberOfPlayersToSelect) {
    selectedOption = numberOfPlayersToSelect;
    // Clear the current selection
    selectedList.clear();
    // Automatically select the first 'numberOfPlayersToSelect' players
    for (int i = 0; i < numberOfPlayersToSelect && i < participantList.length; i++) {
      selectedList.add(participantList[i].id ?? "");
    }
    selectedList.refresh();
  }


  bool isSelected(String id) {
    return selectedList.contains(id);
  }

  void toggleSelection(String id) {
    int numberOfPlayersToSelect = selectedOption;

    if (selectedList.contains(id)) {
      debugPrint("remove index : $id");
      selectedList.remove(id);
    } else {
      if (selectedList.length < numberOfPlayersToSelect) {
        debugPrint("add index : $id");
        selectedList.add(id);
      } else {
        ToastMessage.error(message: "You must select exactly $numberOfPlayersToSelect players.");
      }
    }
  }

  onSearch(String value) {
    participantList.clear();
    if (value.isEmpty) {
      participantList.addAll(allParticipantList);
      return;
    }
    for (var item in allParticipantList) {
      if (item.name!.toLowerCase().contains(value)) {
        participantList.add(item);
      }
    }
  }

  Future<bool> updatePlayer({required List<String> playerId, required String gameId}) async {
    try {
      progressDialog.show();
      var response = await apiService.updatePlayers(playerId: playerId, gameId: gameId);
      progressDialog.hide();

      if(response.data != null && response.data!.isNotEmpty){
        return true;
      }else{
        ToastMessage.error(message: response.message);
        return false;
      }
    } catch (error) {
      progressDialog.hide();
      debugPrint("getGameDetails : $error");
      ToastMessage.error(message: "$error");
      return false;
    }
  }
}
`);

  // ── Step 6 — Card Distribution ────────────────────────────
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_sheet.dart", `
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/Calcutta_foursome_match_config_bottom_sheet_controller.dart';
import '../../controllers/bottom_sheets_controller/shuffle_cards_bottom_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/utils_methods.dart';
import '../common_views/bottom_sheet_view.dart';
import '../common_views/no_data_view.dart';
import 'Calcutta_foursome_match_config_bottom_sheet.dart';

class ShuffleCardsBottomSheet extends GetView<ShuffleCardsBottomController> {
  final String gameId;

  const ShuffleCardsBottomSheet({
    super.key,
    required this.gameId,
  });

  @override
  Widget build(BuildContext context) {
    controller.gameId = gameId;

    return Column(
      children: [
        InkWell(
          onTap: () async {
            await controller.getShuffle();
          },
          child: Container(
            color: ColorCode.drawerColor,
            width: Get.width,
            height: 40,
            padding: const EdgeInsets.fromLTRB(15, 5, 15, 5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                RotationTransition(
                  turns: controller.animationController,
                  child: SvgPicture.asset(
                    'assets/icons/ic_shuffle.svg',
                    alignment: Alignment.center,
                  ),
                ),
                const Text(
                  " Tap to shuffle cards",
                  style: TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 16,
                    fontFamily: 'inter',
                    color: ColorCode.check,
                  ),
                ),
              ],
            ),
          ),
        ),
        Flexible(
          child: Obx(
            () => controller.shuffleList.isNotEmpty
                ? ListView.builder(
                    itemCount: controller.shuffleList.length,
                    padding: EdgeInsets.zero,
                    itemBuilder: (context, index) {
                      final dataItem = controller.shuffleList[index];
                      return Container(
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: const BoxDecoration(
                          border: Border(bottom: BorderSide(color: Colors.grey)),
                        ),
                        child: Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(50),
                                child: Stack(
                                  alignment: Alignment.center,
                                  children: [
                                    customCacheImage(
                                      url: dataItem.profilePicture,
                                      fit: BoxFit.cover,
                                      height: 60,
                                      width: 60,
                                    ),
                                    Container(
                                      height: 60,
                                      width: 60,
                                      color: ColorCode.check.withOpacity(0.7),
                                      child: const Icon(
                                        Icons.check,
                                        color: Colors.white,
                                        size: 50,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              width: Get.width * 0.4,
                              alignment: Alignment.topLeft,
                              margin: const EdgeInsets.only(left: 5),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.symmetric(vertical: 2),
                                    child: Text(
                                      dataItem.playerName ?? "",
                                      style: CustomStyle.summaryTableTitle.copyWith(fontSize: appFontSize.value + 16),
                                    ),
                                  ),
                                  SizedBox(
                                    width: Get.width * 0.6,
                                    child: SingleChildScrollView(
                                      scrollDirection: Axis.horizontal,
                                      child: Text(
                                        "${dataItem.playerEmail}",
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: CustomStyle.timeAgo.copyWith(
                                          color: ColorCode.appTitleColor,
                                          fontSize: appFontSize.value + 14,
                                        ),
                                      ),
                                    ),
                                  ),
                                  Container(
                                    padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 10),
                                    decoration: BoxDecoration(
                                      color: ColorCode.drawerColor,
                                      borderRadius: BorderRadius.circular(5),
                                    ),
                                    child: Text(
                                      "BGA HCP: ${dataItem.bgaHcp ?? 0}",
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: CustomStyle.t01Text.copyWith(
                                        color: ColorCode.vs,
                                        fontSize: appFontSize.value + 14,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const Spacer(),
                            Container(
                              alignment: Alignment.topRight,
                              padding: const EdgeInsets.only(right: 8),
                              child: InkWell(
                                onTap: () => _showCardSelectionBottomSheet(
                                  playerIndex: index,
                                  currentCard: dataItem.card ?? '',
                                ),
                                borderRadius: BorderRadius.circular(12),
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: ColorCode.borderColor),
                                    boxShadow: const [
                                      BoxShadow(
                                        color: Color.fromRGBO(0, 0, 0, 0.08),
                                        blurRadius: 8,
                                        offset: Offset(0, 3),
                                      ),
                                    ],
                                  ),
                                  child: controller.formatCardText(dataItem.card!),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  )
                : SizedBox(
                    height: Get.height * 0.65,
                    child: NoDataView(),
                  ),
          ),
        ),
        Container(
          color: Colors.white,
          width: Get.width,
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: CustomButtonNew(
            borderColor: ColorCode.borderColor,
            text: "GENERATE FOURSOMES",
            onPressed: () async {
              if (!controller.validateCardsForFoursomes()) {
                return;
              }

              Get.put(CalcuttaFoursomeMatchConfigBottomSheetController());

              final sheetController = Get.find<CalcuttaFoursomeMatchConfigBottomSheetController>();

              await sheetController.refreshData(gameId);
              var result = await customBottomSheet(
                title: "Match Configuration",
                child: CalcuttaFoursomeMatchConfigBottomSheet(
                  gameId: gameId,
                ),
              );
              Get.back(result: result);
            },
          ),
        ),
      ],
    );
  }

  Future<void> _showCardSelectionBottomSheet({
    required int playerIndex,
    required String currentCard,
  }) async {
    final availableCards = controller.availableCardsForPlayerCount;
    String selectedCard = currentCard.isNotEmpty && availableCards.contains(currentCard)
        ? currentCard
        : availableCards.isNotEmpty
            ? availableCards.first
            : '';

    await Get.bottomSheet(
      StatefulBuilder(
        builder: (context, setModalState) {
          return Container(
            height: Get.height * 0.82,
            width: Get.width,
            decoration: const BoxDecoration(
              color: ColorCode.bgColor,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20.0),
                topRight: Radius.circular(20.0),
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  const SizedBox(height: 14),
                  Container(
                    width: 48,
                    height: 5,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade400,
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      children: [
                        Text(
                          "Select Card (${availableCards.length})",
                          style: CustomStyle.summaryTableTitle.copyWith(fontSize: appFontSize.value + 20),
                        ),
                        const Spacer(),
                        if (selectedCard.isNotEmpty) _buildSelectedCardPreview(selectedCard),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                    child: GridView.builder(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                      itemCount: availableCards.length,
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 4,
                        mainAxisSpacing: 12,
                        crossAxisSpacing: 12,
                        childAspectRatio: 0.74,
                      ),
                      itemBuilder: (context, index) {
                        final card = availableCards[index];
                        final isSelected = selectedCard == card;
                        return InkWell(
                          onTap: () {
                            setModalState(() {
                              selectedCard = card;
                            });
                          },
                          borderRadius: BorderRadius.circular(14),
                          child: _buildDeckCard(
                            card: card,
                            isSelected: isSelected,
                          ),
                        );
                      },
                    ),
                  ),
                  Container(
                    color: Colors.white,
                    width: Get.width,
                    padding: const EdgeInsets.fromLTRB(16, 12, 16, 16),
                    child: CustomButtonNew(
                      borderColor: ColorCode.borderColor,
                      text: "UPDATE",
                      onPressed: () {
                        if (selectedCard.isEmpty) {
                          return;
                        }

                        controller.updatePlayerCard(
                          index: playerIndex,
                          card: selectedCard,
                        );
                        Get.back();
                      },
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      backgroundColor: ColorCode.bottomSheetBg,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20.0),
          topRight: Radius.circular(20.0),
        ),
      ),
      enterBottomSheetDuration: const Duration(milliseconds: 250),
      exitBottomSheetDuration: const Duration(milliseconds: 220),
    );
  }

  Widget _buildSelectedCardPreview(String card) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: ColorCode.borderColor),
      ),
      child: controller.formatCardText(card),
    );
  }

  Widget _buildDeckCard({
    required String card,
    required bool isSelected,
  }) {
    final cardData = controller.getCardDisplayData(card);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: isSelected ? ColorCode.mainColor : ColorCode.borderColor,
          width: isSelected ? 2 : 1,
        ),
        boxShadow: [
          BoxShadow(
            color: isSelected ? const Color.fromRGBO(68, 160, 71, 0.18) : const Color.fromRGBO(0, 0, 0, 0.06),
            blurRadius: isSelected ? 10 : 6,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Stack(
        children: [
          if (isSelected)
            const Positioned(
              top: 8,
              right: 8,
              child: Icon(
                Icons.check_circle,
                color: ColorCode.mainColor,
                size: 18,
              ),
            ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  cardData['value'] as String,
                  style: TextStyle(
                    color: cardData['color'] as Color,
                    fontSize: appFontSize.value + 16,
                    fontWeight: FontWeight.w700,
                    fontFamily: 'Inter',
                  ),
                ),
                Text(
                  cardData['suit'] as String,
                  style: TextStyle(
                    color: cardData['color'] as Color,
                    fontSize: appFontSize.value + (cardData['suit'] == '\u2665' ? 20 : 16),
                    fontWeight: FontWeight.w700,
                    fontFamily: 'Inter',
                  ),
                ),
                const Spacer(),
                Align(
                  alignment: Alignment.bottomRight,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Text(
                        '${cardData['value']}',
                        style: TextStyle(
                          color: cardData['color'] as Color,
                          fontSize: appFontSize.value + 20,
                          fontWeight: FontWeight.w700,
                          fontFamily: 'Inter',
                        ),
                      ),
                      Text(
                        '${cardData['suit']}',
                        style: TextStyle(
                          color: cardData['color'] as Color,
                          fontSize: appFontSize.value + (cardData['suit'] == '\u2665' ? 24 : 20),
                          fontWeight: FontWeight.w700,
                          fontFamily: 'Inter',
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
`);
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_controller.dart", `
import 'package:flutter/material.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_ticket_provider_mixin.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';

import '../../apis/api_services.dart';
import '../../main.dart';
import '../../model/game_models/shuffle_card_model.dart';
import '../../resources/color_code.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class ShuffleCardsBottomController extends GetxController with GetSingleTickerProviderStateMixin {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<ShuffleData> shuffleList = <ShuffleData>[].obs;
  RxList<String> selectedList = <String>[].obs;
  late AnimationController animationController;

  String gameId = "";
  final List<String> _cardSuits = const ['S', 'H', 'D', 'C'];
  final List<String> _cardRanks = const ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

  @override
  void onInit() {
    animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );
    super.onInit();
  }

  @override
  void onReady() {
    super.onReady();
    getShuffle();
  }

  void startAnimation() {
    animationController.repeat();
  }

  void stopAnimation() {
    animationController.stop();
    animationController.reset();
  }

  void onShuffleTap() {
    startAnimation();

    Future.delayed(const Duration(seconds: 1), () {
      stopAnimation();
    });
  }

  Future<void> getShuffle() async {
    try {
      progressDialog.show();
      var response = await apiService.shuffleCards(gameId);

      shuffleList.clear();
      progressDialog.hide();

      if (response.error == false) {
        shuffleList.addAll(response.data ?? []);
      } else {
        ToastMessage.error(message: response.message);
        print("error => ${response.message}");
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
      print("error : $error");
    }
  }
  Future<void> assignCard({required String card, required String playerId}) async {
    try {
      progressDialog.show();
      var response = await apiService.assignCard(gameID: gameId,card: card,playerId: playerId);
      progressDialog.hide();

      if (response.error == false) {
        ToastMessage.success(message: response.message);

      } else {
        ToastMessage.error(message: response.message);
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
    }
  }

  bool isSelected(String id) {
    return selectedList.contains(id);
  }

  List<String> get allCards => [
        for (final suit in _cardSuits)
          for (final rank in _cardRanks) '$suit$rank',
      ];

  List<String> get availableCardsForPlayerCount {
    final playerCount = shuffleList.length;
    if (playerCount <= 0) return [];

    final cardsPerSuit = playerCount ~/ _cardSuits.length;
    final extraCards = playerCount % _cardSuits.length;
    final cards = <String>[];

    for (var suitIndex = 0; suitIndex < _cardSuits.length; suitIndex++) {
      final takeCount = cardsPerSuit + (suitIndex < extraCards ? 1 : 0);
      for (var rankIndex = 0;
          rankIndex < takeCount && rankIndex < _cardRanks.length;
          rankIndex++) {
        cards.add('${_cardSuits[suitIndex]}${_cardRanks[rankIndex]}');
      }
    }

    return cards;
  }

  bool validateCardsForFoursomes() {
    final selectedCards = shuffleList
        .map((player) => player.card ?? "")
        .where((card) => card.isNotEmpty)
        .toList();
    final availableCards = availableCardsForPlayerCount.toSet();

    if (selectedCards.length != shuffleList.length) {
      ToastMessage.error(message: "Please select one card for each player");
      return false;
    }

    if (selectedCards.any((card) => !availableCards.contains(card))) {
      ToastMessage.error(message: "Please select cards from the available list");
      return false;
    }

    if (selectedCards.toSet().length != selectedCards.length) {
      ToastMessage.error(message: "Duplicate cards are not allowed");
      return false;
    }

    return true;
  }

  Map<String, dynamic> getCardDisplayData(String card) {
    String suit;
    String value;
    Color color;

    if (card.length == 3) {
      value = card.substring(1);
      suit = card[0];
    } else {
      value = card[1];
      suit = card[0];
    }

    switch (suit) {
      case 'H':
        suit = '\u2665';
        color = Colors.red;
        break;
      case 'D':
        suit = '\u2666';
        color = Colors.red;
        break;
      case 'C':
        suit = '\u2663';
        color = Colors.black;
        break;
      case 'S':
        suit = '\u2660';
        color = Colors.black;
        break;
      default:
        color = Colors.black;
    }

    return {
      'value': value,
      'suit': suit,
      'color': color,
    };
  }

  void updatePlayerCard({
    required int index,
    required String card,
  }) {
    if (index < 0 || index >= shuffleList.length) return;
    if (!availableCardsForPlayerCount.contains(card)) return;

    shuffleList[index].setCard = card;

    debugPrint("playerId => ${shuffleList[index].playerId}");
    debugPrint("card => ${shuffleList[index].card}");
    assignCard(card: shuffleList[index].card ?? "", playerId: shuffleList[index].playerId ?? "");
    shuffleList.refresh();
  }

  @override
  void onClose() {
    animationController.dispose();
    super.onClose();
  }

  Widget formatCardText(String card) {
    final cardData = getCardDisplayData(card);

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          cardData['value'] as String,
          style: TextStyle(
            color: ColorCode.appTitleColor,
            fontSize: appFontSize.value + 28,
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
          ),
        ),
        Text(
          ' ${cardData['suit']}',
          style: TextStyle(
            color: cardData['color'] as Color,
            fontSize: appFontSize.value + 28,
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
          ),
        ),
      ],
    );
  }
}
`);

  // ── Step 7 — Foursomes ────────────────────────────────────
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet.dart", `
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/bottom_sheets_controller/Calcutta_foursome_match_config_bottom_sheet_controller.dart';
import '../../controllers/bottom_sheets_controller/calcutta_generate_match_config_bottom_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../common_views/bottom_sheet_view.dart';
import 'calcutta_genrate_match_config_bottom_sheet.dart';

class CalcuttaFoursomeMatchConfigBottomSheet extends GetView<CalcuttaFoursomeMatchConfigBottomSheetController> {
  final String gameId;

  const CalcuttaFoursomeMatchConfigBottomSheet({
    super.key,
    required this.gameId,
  });

  @override
  Widget build(BuildContext context) {
    controller.gameId = gameId;
    print("game Id : ${controller.gameId}");

    return Column(children: [
      Flexible(
        child: Obx(() => ListView.builder(
              itemCount: controller.fourSomeList.length,
              padding: EdgeInsets.zero,
              itemBuilder: (context, index) {
                var dataItem = controller.fourSomeList[index];
                return Container(
                  height: Get.height * 0.11,
                  decoration: const BoxDecoration(color: ColorCode.white, border: Border(bottom: BorderSide(color: ColorCode.borderColor))),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center, // Aligns content to the start (left)
                    children: [
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Container(
                            padding: EdgeInsets.zero,
                            child: Checkbox(
                              checkColor: Colors.white,
                              value: true,
                              activeColor: ColorCode.mainColor,
                              shape: const RoundedRectangleBorder(
                                borderRadius: BorderRadius.all(Radius.circular(5.0)),
                              ),
                              onChanged: (bool? value) {},
                            ),
                          ),
                          Text("foursome ${dataItem.foursomeNo}".allInCaps, style: CustomStyle.foursomeIndexTitle),
                          const SizedBox(width: 8),
                          Text(dataItem.teeTime != null ? formatTeeTime(dataItem.teeTime.toString()) : "",
                              style: CustomStyle.membersName.copyWith(color: ColorCode.mainColor, fontSize: appFontSize.value + 16)),
                          const SizedBox(width: 8),
                          Container(
                            height: 24,
                            constraints: const BoxConstraints(
                              minWidth: 20,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.transparent,
                              border: Border.all(color: Colors.black, width: 1),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Center(
                              child: Text(
                                '${dataItem.foursomeCardType} ',
                                textAlign: TextAlign.center,
                                style: CustomStyle.summaryTableText.copyWith(fontSize: appFontSize.value + 16),
                              ),
                            ),
                          ),
                        ],
                      ),
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            for (int i = 0; i < dataItem.players!.length; i++) ...[
                              Padding(
                                padding: const EdgeInsets.only(left: 8.0),
                                child: Row(
                                  children: [
                                    Text(
                                      getFormattedName(dataItem.players![i].name!),
                                      style: CustomStyle.summaryTableText.copyWith(fontSize: appFontSize.value + 16),
                                    ),
                                    controller.formatCardText(dataItem.players![i].card!),
                                    const SizedBox(
                                      width: 5,
                                    ),
                                    if (i < dataItem.players!.length - 1) // Divider except for the last item
                                      Container(
                                        width: 1.5,
                                        height: 15,
                                        color: ColorCode.borderColor,
                                      )
                                  ],
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 10,
                      )
                    ],
                  ),
                );
              },
            )),
      ),
      Container(
        color: Colors.white,
        width: Get.width,
        padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
        child: CustomButtonNew(
          borderColor: ColorCode.borderColor,
          text: "GENERATE MATCHES",
          onPressed: () async {
            Get.put(CalcuttaGenerateMatchConfigBottomController());
            var sheetController = Get.find<CalcuttaGenerateMatchConfigBottomController>();

            await sheetController.refreshData(gameId);

            var result = await customBottomSheet(
              title: "Match Configuration",
              child: CalcuttaGenrateMatchConfigBottomSheet(
                gameId: controller.gameId,
              ),
            );
            Get.back(result: result);
          },
        ),
      ),
    ]);
  }
}
`);
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet_controller.dart", `
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../main.dart';
import '../../model/game_models/calcutta_foursome_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class CalcuttaFoursomeMatchConfigBottomSheetController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<CalcuttaFoursomeData> fourSomeList = <CalcuttaFoursomeData>[].obs;
  String gameId = "";

  var selectedHour = 0.obs;
  var selectedMinute = 0.obs;

  var selectedTimeList = <int, String>{}.obs; // Map to store selected time for each index
  var selectedOptionList = <int, String>{}.obs; // Map to store selected radio button option for each index

  var selectedPosition = "Front".obs;

  @override
  void onReady() {
    // TODO: implement onReady
    super.onReady();
  }

  var selectedCheckboxes = List<bool>.filled(9, true).obs;
  void toggleCheck(int index) {
    selectedCheckboxes[index] = !selectedCheckboxes[index];
  }

  // Update selected time
  void updateHour(int hour) {
    selectedHour.value = hour;
  }

  void updateMinute(int minute) {
    selectedMinute.value = minute;
  }
  // Update selected position (Front or Back)
  void updatePosition(String position) {
    selectedPosition.value = position;
  }
  void updateSelectedOption(int index, String option) {
    selectedOptionList[index] = option;
  }


  Future<void> refreshData(String gameId) async {
    await getFourSome( gameId);
  }
  Future<void> getFourSome(String gameId) async {
    try {
      progressDialog.show();
      var response = await apiService.generateFoursome(gameId);
      fourSomeList.clear();
      progressDialog.hide();

      if (response.error == false) {
        progressDialog.hide();
        fourSomeList.addAll(response.data??[] );


      } else {
        progressDialog.hide();
        ToastMessage.error(message: response.message);
        print("error => ${response.message}");
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
      print("error : $error");
    }
  }



  void updateSelectedTime(int index, String time) {
    selectedTimeList[index] = time;
  }

  // Example function to format selected hour and minute
  String formatTime(int hour, int minute) {
    return '${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')}';
  }

  Widget formatCardText(String card) {
    String suit;
    Color color;

    // Extract suit and value from the card string
    if (card.length == 3) {
      // Handle cases where the card has a two-character value, like "10"
      suit = card[0];
    } else {
      // Handle single-character values, like "A", "K", "Q"
      suit = card[0];
    }

    // Map suit to readable symbols and set color
    switch (suit) {
      case 'H':
        suit = '♥';
        color = Colors.red;
        break;
      case 'D':
        suit = '♦';
        color = Colors.red;
        break;
      case 'C':
        suit = '♣';
        color = Colors.black;
        break;
      case 'S':
        suit = '♠';
        color = Colors.black;
        break;
      default:
        color = Colors.black; // Default color if suit is unknown
    }

    // Return a Text widget with formatted card text and color
    return Text(
      suit,
      style: TextStyle(
        color:color,
        fontSize: appFontSize.value + 14,
        fontWeight:FontWeight.w700,
        fontFamily: 'Inter',
      ),
    );
  }

  Future<void> adminReqReject(String gameId,String foursomeId,String teeTime)async{
    try {
      progressDialog.show();
      var response = await apiService.addTeeTime(gameId: gameId, foursomeId: foursomeId, teeTime: teeTime);

      if (response.error == false) {
        progressDialog.hide();
        ToastMessage.success(message: response.message);

      } else {
        ToastMessage.error(message: response.message);

        debugPrint("request message : ${response.message}");
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: error.toString());

      debugPrint("request error : $error");

    }
  }

}
`);

  // ── Step 8 — Generate Matches ─────────────────────────────
  add("asslide-calcutta-8", "flutter", "calcutta_genrate_match_config_bottom_sheet.dart", `
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/calcutta_generate_match_config_bottom_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';

class CalcuttaGenrateMatchConfigBottomSheet extends GetView<CalcuttaGenerateMatchConfigBottomController> {
  final String gameId;

  const CalcuttaGenrateMatchConfigBottomSheet({
    super.key,
    required this.gameId,
  });

  @override
  Widget build(BuildContext context) {
    controller.gameId = gameId;
    return Column(children: [
        Flexible(
          child: Obx(() => ListView.builder(
                itemCount: controller.matchList.length,
                padding: EdgeInsets.zero,
                itemBuilder: (context, index) {
                  var dataItem = controller.matchList[index];
                  return Container(
                    color: Colors.white,
                    child: Obx(() => Column(
                          children: [
                            Container(
                              color: ColorCode.thikness,
                              height: 40,
                              padding: const EdgeInsets.only(left: 15),
                              child: GestureDetector(
                                onTap: () {
                                  controller.toggleCollapsed(index);
                                },
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Text(
                                      "foursome ${dataItem.foursomeNo} ".allInCaps,
                                      style: CustomStyle.foursomeIndexTitle,
                                    ),
                                    const SizedBox(width: 8),
                                    Text(dataItem.teeTime!=null ? formatTeeTime(dataItem.teeTime):"", style: CustomStyle.membersName.copyWith(color: ColorCode.mainColor, fontSize: appFontSize.value + 16)),
                                    const SizedBox(width: 8),
                                    Container(
                                      height: 24,
                                      constraints: const BoxConstraints(minWidth: 20),
                                      decoration: BoxDecoration(
                                        color: Colors.transparent,
                                        border: Border.all(color: Colors.black, width: 1),
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: Center(
                                        child: Text(
                                          '${dataItem.foursomeCardType} ',
                                          textAlign: TextAlign.center,
                                          style: CustomStyle.summaryTableText.copyWith(
                                              fontSize: appFontSize.value + 16
                                          ),
                                        ),
                                      ),
                                    ),
                                    const Spacer(),
                                    Icon(
                                      controller.collapsedList[index] ? Icons.arrow_drop_down : Icons.arrow_drop_up,
                                      size: 40,color: ColorCode.appBackArrowColor,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            if (controller.collapsedList[index])
                              SizedBox(
                                height: Get.height * 0.01,
                              ),
                            if (!controller.collapsedList[index])
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  for (int i = 0; i < dataItem.matches!.length; i++) ...[
                                    Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Row(
                                        children: [
                                          Text(
                                            "Match - ${dataItem.matches![i].match}",
                                            style: CustomStyle.gameDetailsSubTitle,
                                          ),
                                          const Spacer(),
                                          Container(
                                              height: 35,
                                              width: Get.width * 0.4,
                                              decoration: BoxDecoration(border: Border.all(color: ColorCode.borderColor, width: 1), borderRadius: BorderRadius.circular(30)),
                                              padding: const EdgeInsets.only(left: 8, right: 3),
                                              child: Row(
                                                children: [
                                                  Text(controller.formatHoles(dataItem.matches![i].holesToPlay?.map((e) => e.toString()).toList() ?? []),
                                                      style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.titleText2, fontWeight: FontWeight.w500)),
                                                  const Spacer(),
                                                  const Icon(Icons.arrow_drop_down_sharp,color: ColorCode.appBackArrowColor)
                                                ],
                                              ))
                                        ],
                                      ),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.only(left: 8.0, right: 8.0, top: 3, bottom: 3),
                                      child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                        for (int j = 0; j < dataItem.matches![i].teams!.length; j++) ...[
                                          Row(
                                            children: [
                                              for (int k = 0; k < dataItem.matches![i].teams![j].players!.length; k++) ...[
                                                Row(
                                                  children: [
                                                    playerCard(
                                                        playerName: dataItem.matches![i].teams![j].players![k].name.toString(),
                                                        card: dataItem.matches![i].teams![j].players![k].card.toString() ),

                                                  ],
                                                ),
                                              ],
                                            ],
                                          ),
                                          if (j == 0)
                                            Image.asset(
                                              "assets/images/img_vs.png",
                                              height: 25,
                                              width: 25,
                                            ),
                                        ],
                                      ]),
                                    ),
                                    if (i < dataItem.matches!.length - 1) const Divider(),
                                    if (i < dataItem.matches!.length - 1) const SizedBox(height: 5,),
                                    if (i == dataItem.matches!.length - 1) const SizedBox(height: 10,)
                                  ],
                                ],
                              )
                          ],
                        )),
                  );
                },
              )),
        ),
        Container(
          color: Colors.white,
          width: Get.width,
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: CustomButtonNew(
            borderColor: ColorCode.borderColor,
            text: "Done",
            onPressed: () async {
              Get.back(result: controller.matchList);
            },
          ),
        ),
      ]);
  }

  Widget playerCard({
    required String playerName,
    required String card,
  }) {
    return Container(
      width: Get.width * 0.40,
      height: Get.height * 0.05,
      padding: const EdgeInsets.only(left: 10,right: 10),
      alignment: Alignment.centerLeft,
      decoration: BoxDecoration(
        border: Border.all(color: ColorCode.borderColor),
        borderRadius: BorderRadius.circular(10),
        color: ColorCode.white,
      ),
      child: Row(
        children: [
          Expanded(
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Text(
                getFormattedName(playerName),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: CustomStyle.summaryTableTitle.copyWith(fontSize: appFontSize.value + 16,color: ColorCode.mainColor),
              ),
            ),
          ),
          controller.formatCardText(card)
        ],
      ),
    );
  }
}
`);
  add("asslide-calcutta-8", "flutter", "calcutta_generate_match_config_bottom_controller.dart", `
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../main.dart';
import '../../model/game_models/calcutta_match_generat_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class CalcuttaGenerateMatchConfigBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<CalcuttaMatchData> matchList = <CalcuttaMatchData>[].obs;
  RxList<bool> collapsedList = <bool>[].obs;


  String gameId = "";

  @override
  void onReady() {
    // TODO: implement onReady
    super.onReady();
  }

  Future<void> refreshData(String gameId) async {
    await getGeneratedMatch(gameId);
  }

  Future<void> getGeneratedMatch(String gameId) async {
    try {
      progressDialog.show();
      var response = await apiService.getGenerateMatches(gameId);
      matchList.clear();
      progressDialog.hide();

      if (response.error == false) {
        progressDialog.hide();
        matchList.addAll(response.data??[] );
        collapsedList.value = List.generate(matchList.length, (_) => false);





      } else {
        progressDialog.hide();
        ToastMessage.error(message: response.message);
        print("error => ${response.message}");
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
      print("error : $error");

    }
  }
  void toggleCollapsed(int index) {
    if (index >= 0 && index < collapsedList.length) {
      collapsedList[index] = !collapsedList[index];
    }
  }

  Widget formatCardText(String card) {
    String suit;
    Color color;

    // Extract suit and value from the card string
    if (card.length == 3) {
      // Handle cases where the card has a two-character value, like "10"
      suit = card[0];
    } else {
      // Handle single-character values, like "A", "K", "Q"
      suit = card[0];
    }

    // Map suit to readable symbols and set color
    switch (suit) {
      case 'H':
        suit = '♥';
        color = Colors.red;
        break;
      case 'D':
        suit = '♦';
        color = Colors.red;
        break;
      case 'C':
        suit = '♣';
        color = Colors.black;
        break;
      case 'S':
        suit = '♠';
        color = Colors.black;
        break;
      default:
        color = Colors.black; // Default color if suit is unknown
    }

    // Return a Text widget with formatted card text and color
    return Text(
      '$suit',
      style: TextStyle(
        color:color,
        fontSize: appFontSize.value + 14,
        fontWeight:FontWeight.w700,
        fontFamily: 'Inter',
      ),
    );
  }

  String formatHoles(List<String> holes) {
    if (holes.isEmpty) return '';

    // Convert the list of strings to integers
    List<int> intHoles = holes.map(int.parse).toList();

    // Sort the list just in case
    intHoles.sort();

    List<List<int>> groupedHoles = [];
    List<int> currentGroup = [intHoles[0]];

    for (int i = 1; i < intHoles.length; i++) {
      if (intHoles[i] == intHoles[i - 1] + 1) {
        currentGroup.add(intHoles[i]);
      } else {
        groupedHoles.add(currentGroup);
        currentGroup = [intHoles[i]];
      }
    }
    // Add the last group
    groupedHoles.add(currentGroup);

    // Convert each group to the desired format and join with " | "
    return groupedHoles.map((group) => group.join("-")).join(" | ");
  }
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
