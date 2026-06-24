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
  add("asslide-horse_race-1", "flutter", "horse_acrrosse_select_team_bottom.dart", `
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/horse_across_select_bottom_controller.dart';
import '../../controllers/bottom_sheets_controller/horse_race_group_team_bottom_controller.dart';
import '../../main.dart';
import '../../model/tee_sheet_model/horse_race_round_player_model.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/toast_message.dart';
import 'horse_race_group_team_bottom.dart';

class HorseAcrrosseSelectTeamBottom extends GetView<HorseAcrossSelectBottomController> {
  const HorseAcrrosseSelectTeamBottom({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
        color: ColorCode.thikness,
        height: 45,
        padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
        child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
          const SizedBox(
            width: 8,
          ),
          Text("Select Group", style: CustomStyle.summaryTableText),
          const Spacer(),
        ]),
      ),
      Flexible(
        child: Container(
          height: Get.height,
          color: Colors.white,
          child: Obx(
            () => ListView.builder(
              shrinkWrap: true,
              itemCount: controller.horseRacePlayer.length,
              itemBuilder: (context, index) {
                final member = controller.horseRacePlayer[index];
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
                                  member.playerName ?? "",
                                  style: CustomStyle.playerNameStyle,
                                ),
                                Container(
                                  width: Get.width * 0.65,
                                  child: SingleChildScrollView(
                                    scrollDirection: Axis.horizontal,
                                    child: Text(
                                      "${member.playerEmail}",
                                      style: CustomStyle.playerEmailStyle,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: const Color.fromRGBO(210, 234, 215, 1),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        'BGA HCP: ',
                                        style: CustomStyle.paragraph5Style,
                                        overflow: TextOverflow.ellipsis,
                                        maxLines: 1,
                                      ),
                                      Text(
                                        '${member.bgaHcp}',
                                        style: CustomStyle.paragraph5Style.copyWith(fontWeight: FontWeight.w700),
                                        overflow: TextOverflow.ellipsis,
                                        maxLines: 1,
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          // Conditionally render Select Teams button or selected group info
                          member.acrossFoursomeTeamList.isEmpty
                              ? CustomButtonNew(
                                  height: 40,
                                  width: Get.width * 0.35,
                                  borderWidth: 1,
                                  padding: EdgeInsets.only(left: 8, right: 8),
                                  borderColor: ColorCode.borderColor,
                                  text: "Select Teams",
                                  onPressed: () async {
                                    selectTeams(member);
                                  },
                                  style: CustomStyle.viewButton,
                                  radius: 6,
                                )
                              : GestureDetector(
                                  onTap: () {
                                    selectTeams(member);
                                  },
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: member.acrossFoursomeTeamList
                                              .map(
                                                (group) => Text(
                                                  "${group.teamName.toString()}(${group.status.toString().substring(0, 1)})",
                                                  style: CustomStyle.hyperLink2Style,
                                                ),
                                              )
                                              .toList(),
                                        ),
                                      )
                                    ],
                                  ),
                                ),
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
            if (controller.allTeamsConfigured()) {
              Get.back(result: true);
            } else {
              ToastMessage.error(message: "Please select teams for all players");
            }
          },
        ),
      ),
    ]);
  }

  Future<void> selectTeams(HorseRaceRoundPlayerData member) async {
    if (controller.courseId != "") {
      var sheetController = Get.put(HorseRaceGroupTeamBottomController());

      sheetController.gameId = controller.gameId;
      sheetController.ownerId = member.playerId!;

      sheetController.selectedAcrossGroupList = member.acrossFoursomeTeamList;

      sheetController.socketUtils.initializePusher(sheetController.onPusherInitialize);

      await sheetController.getTeeSheetGroup();
      var result = await Get.bottomSheet(
        SizedBox(
            height: Get.height * 0.9,
            child: HorseRaceGroupTeamBottom(
              gameId: controller.gameId,
              ownerId: member.playerId!,
            )),
        backgroundColor: ColorCode.bottomSheetBg,
        isScrollControlled: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20.0),
            topRight: Radius.circular(20.0),
          ),
        ),
        enterBottomSheetDuration: const Duration(milliseconds: 350),
        exitBottomSheetDuration: const Duration(milliseconds: 300),
      );

      // Handle the result when bottom sheet is closed
      if (result != null) {
        debugPrint("HorseRaceGroupTeamBottom : $result");
        member.setAcrossFoursomeTeamList = result;
        controller.horseRacePlayer.refresh();
      }
    } else {
      ToastMessage.error(message: "Please select course");
    }
  }
}
`);
  add("asslide-horse_race-1", "flutter", "horse_across_select_bottom_controller.dart", `


import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:pusher_client_socket/pusher_client_socket.dart';

import '../../apis/api_services.dart';
import '../../model/game_models/game_details.dart';
import '../../model/tee_sheet_model/horse_race_round_player_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/socket_utils.dart';

class HorseAcrossSelectBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<bool> selectedItems = RxList<bool>(); // Use RxList for reactivity
  String gameId = "";
  String courseId = "";
  String gameType = "";
  RxList<HorseRaceRoundPlayerData> horseRacePlayer = <HorseRaceRoundPlayerData>[].obs;
  RxList<FourSomes> horseMatchList = <FourSomes>[].obs;
  var socketUtils = SocketUtils();
  PrivateChannel? privateChannel;

  @override
  void onReady() {

    super.onReady();

  }

  Future<void> getTeeSheetGroup({bool progress = true,}) async {
    try {
      if(progress) {
        progressDialog.show();
      }
      var response = await apiService.getHorseRoundPlayer(gameId);

      horseRacePlayer.clear();
      if(progress) {progressDialog.hide();}

      if (response.error==false) {
        horseRacePlayer.addAll(response.data??[]);
      }
      else{
        print("response message => ${response.message}");
      }
    } catch (error,stacktrace) {
      if(progress) {progressDialog.hide();}
      print("error : $error");
      print("stacktrace : $stacktrace");
    }
  }

  String formatTime(String time) {
    // Parse the string into a DateTime object
    DateTime parsedTime = DateFormat("HH:mm:ss").parse(time);

    // Format the time to display as "HH:mm "
    String formattedTime = DateFormat("HH:mm").format(parsedTime);

    return formattedTime;
  }

  bool allTeamsConfigured() {

    for(var item in horseRacePlayer){
      if(item.acrossFoursomeTeamList.isEmpty){
        return false;
      }
    }
    return horseRacePlayer.isNotEmpty;
  }

  void onPusherInitialize(PusherClient pusherClient) {
    debugPrint("onPusherInitialize - socket-id: ${pusherClient.socketId}");

    privateChannel = pusherClient.private('game.status', subscribe: true);

    privateChannel?.bind('game.horse_race_team_select_percentage', (data) {
      var response = jsonDecode(jsonEncode(data));
      debugPrint('event received - .point_update - $gameId');
      debugPrint('event received - .point_update - $response');

    });
  }

}
`);

  // ── Step 2 — Assign Teams ─────────────────────────────────
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom.dart", `

import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/horse_race_group_team_bottom_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_dropdown.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/utils_methods.dart';
import '../common_views/no_data_view.dart';

class HorseRaceGroupTeamBottom extends GetView<HorseRaceGroupTeamBottomController> {
  final String gameId;
  final String ownerId;

  const HorseRaceGroupTeamBottom({super.key, required this.gameId, required this.ownerId});

  @override
  Widget build(BuildContext context) {
    debugPrint("game id => ${gameId}");
    debugPrint("game id => ${ownerId}");

    return Container(
      height: Get.height,
      width: Get.width,
      decoration: const BoxDecoration(
        color: ColorCode.bgColor,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20.0),
          topRight: Radius.circular(20.0),
        ),
      ),
      child: Column(children: [
        const SizedBox(height: 15),
        Padding(
          padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
          child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
            RippleClick(
              onTap: () {
                Get.back();
              },
              child: const Icon(Icons.arrow_back, size: 25,color: ColorCode.appBackArrowColor),
            ),
            const SizedBox(
              width: 8,
            ),
            Container( width: Get.width*0.81,child: SingleChildScrollView(scrollDirection: Axis.horizontal,child: Text("Select across foursome teams", style: CustomStyle.bottomSheetTitle))),
            const Spacer(),
          ]),
        ),
        const SizedBox(height: 10),
        Container(
          color: ColorCode.thikness,
          height: 45,
          padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
          child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
            const SizedBox(
              width: 8,
            ),
            Text("Select Group", style: CustomStyle.summaryTableText),
            const Spacer(),
          ]),
        ),

        Flexible(
            child: Obx(() => controller.groupList.isNotEmpty
                ? ListView.builder(
                    itemCount: controller.groupList.length,
                    padding: EdgeInsets.zero,
                    itemBuilder: (context, index) {
                      var dataItem = controller.groupList[index];
                      final GlobalKey tooltipKey = GlobalKey();

                      return Container(
                        // height: Get.height * 0.15,
                        decoration: const BoxDecoration(color: ColorCode.white, border: Border(bottom: BorderSide(color: ColorCode.borderColor))),
                        child: Padding(
                          padding: const EdgeInsets.only(right: 10.0),
                          child: Container(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Row(
                                  children: [
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment: MainAxisAlignment.start, // Aligns content to the start (left)
                                      children: [
                                        Padding(
                                          padding: const EdgeInsets.only(left: 5),
                                          child: Row(
                                            children: [
                                              Checkbox(
                                                    activeColor: ColorCode.switchButton,
                                                    
                                                    splashRadius: 10,
                                                    side: const BorderSide(color: ColorCode.paragraphLightColor, width: 2),
                                                    shape: ContinuousRectangleBorder(
                                                      borderRadius: BorderRadius.circular(10),
                                                    ),
                                                    value: controller.checkIsExist(dataItem.groupId),
                                                    onChanged: (value) {
                                                      controller.handleCheckboxChange(dataItem, value);
                                                    },
                                                  ),
                                              Text(
                                                dataItem.groupName!.allInCaps,
                                                style: CustomStyle.gameDetailsSubTitle,
                                              ),
                                              const SizedBox(
                                                width: 8,
                                              ),

                                            ],
                                          ),
                                        ),
                                        Container(
                                          width: Get.width * 0.95,
                                          // color: Colors.red,
                                          padding: const EdgeInsets.only(left: 20),
                                          child: SingleChildScrollView(
                                            scrollDirection: Axis.horizontal,
                                            child: Row(
                                              mainAxisSize: MainAxisSize.min,
                                              crossAxisAlignment: CrossAxisAlignment.center,
                                              children: [
                                                for (int i = 0; i < dataItem.players!.length; i++) ...[
                                                  Row(
                                                    mainAxisAlignment: MainAxisAlignment.start,
                                                    children: [
                                                      Text(
                                                        getFormattedName(dataItem.players![i].playerName!),
                                                        style: CustomStyle.paragraph5Style,
                                                      ),
                                                      const SizedBox(
                                                        width: 8,
                                                      ),
                                                      if (i < dataItem.players!.length - 1) // Divider except for the last item
                                                        Container(
                                                          width: 1.5,
                                                          height: 15,
                                                          color: ColorCode.borderColor,
                                                        ),
                                                      const SizedBox(
                                                        width: 8,
                                                      ),
                                                    ],
                                                  ),
                                                ],
                                              ],
                                            ),
                                          ),
                                        ),
                                        Padding(
                                          padding: const EdgeInsets.all(8.0),
                                          child: InkWell(
                                            child: Row(
                                              crossAxisAlignment: CrossAxisAlignment.center,
                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                              children: [
                                                Tooltip(
                                                  message: "Winner: ${dataItem.selectionPercentage!.winner}%\nLoser: ${dataItem.selectionPercentage!.loser}%",
                                                  padding: const EdgeInsets.all(12),
                                                  triggerMode: TooltipTriggerMode.tap,

                                                  margin: const EdgeInsets.symmetric(horizontal: 20),
                                                  decoration: BoxDecoration(
                                                    color: ColorCode.paragraphLightColor.withOpacity(0.95),
                                                    borderRadius: BorderRadius.circular(8),
                                                  ),
                                                  textStyle: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: appFontSize.value + 12,
                                                    fontWeight: FontWeight.w400,
                                                  ),
                                                  preferBelow: false,
                                                  verticalOffset: 10,
                                                  child: Row(
                                                    children: [
                                                      Padding(
                                                        padding: const EdgeInsets.only(left: 15,top: 5,bottom: 5)                                            ,
                                                        child: Container(
                                                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 7),
                                                          decoration: BoxDecoration(
                                                            color: ColorCode.switchButton.withOpacity(0.1),
                                                            borderRadius: BorderRadius.circular(12),
                                                            border: Border.all(color: ColorCode.switchButton, width: 1),
                                                          ),
                                                          child: Text(
                                                            "W:${dataItem.selectionPercentage!.winner}% | L:${dataItem.selectionPercentage!.loser}%",
                                                            style: CustomStyle.hyperLink2Style,
                                                          ),
                                                        ),
                                                      ),
                                                      Icon(
                                                        Icons.info_outline,
                                                        size: 18,
                                                        color: ColorCode.switchButton,
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                SizedBox(width: 13,),
                                                Visibility(
                                                    visible: controller.checkIsExist(dataItem.groupId),
                                                    child: CustomDropDown(
                                                      width: Get.width * 0.39,
                                                      height: 40,
                                                      dropDownHeight: Get.height * 0.4,
                                                      hintText: 'Select',
                                                      borderColor: ColorCode.profiledrop,
                                                      dropDownList:controller.winnerList,
                                                      selectedItem: controller.getStatus(dataItem.groupId),
                                                      onChanged: (value) {
                                                        controller.handleGroupSelection(dataItem.groupId, value);

                                                      },
                                                    )
                                                )
                                              ],
                                            ),
                                          ),
                                        )
                                      ],
                                    ),
                                    // Spacer(),

                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  )
                : SizedBox(
                    height: Get.height * 0.65,
                    child: NoDataView()))),

        Container(
          color: Colors.white,
          width: Get.width,
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: CustomButtonNew(
            borderColor: ColorCode.borderColor,
            text: "DONE",
            onPressed: () async {
              if (controller.validateGroupSelection()) {

                  try {
                    // Show progress dialog
                    controller.progressDialog.show();

                    // Call the API
                    var response = await controller.apiService.addPlayerTeam(
                      gameId: gameId,
                      groupId: controller.selectedAcrossGroupList.map((e) => e.teamId.toString()).toList(),
                      ownerId: ownerId,
                      winnerGroupId: controller.selectedAcrossGroupList.where((e) => e.status == 'Winner')
                          .map((e) => e.teamId.toString())
                          .toList()

                    );

                    // Hide progress dialog
                    controller.progressDialog.hide();

                    // Handle API response
                    if (response.error == false) {

                      // Close the bottom sheet and pass the result
                      ToastMessage.success(message: response.message);
                      Get.back(result: controller.selectedAcrossGroupList);
                    } else {
                      ToastMessage.error(message: response.message);
                      debugPrint("Error: ${response.message}");
                    }
                  } catch (e) {
                    // Hide progress dialog in case of exception
                    controller.progressDialog.hide();
                    debugPrint("Error: $e");
                  }
                }


            },
          ),
        ),
      ]),
    );
  }
}
`);
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom_controller.dart", `
import 'dart:convert';

import 'package:bga_flutter_app/model/tee_sheet_model/horse_race_round_player_model.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:pusher_client_socket/channels/private_channel.dart';
import 'package:pusher_client_socket/pusher_client_socket.dart';

import '../../apis/api_services.dart';
import '../../model/tee_sheet_model/horse_race_group_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/socket_utils.dart';
import '../../utils/toast_message.dart';

class HorseRaceGroupTeamBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  String gameId = "";
  String ownerId = "";
  String gameType = "";
  RxList<HorseRaceGroupData> groupList = <HorseRaceGroupData>[].obs;
  List<String> winnerList = ['Winner', 'Loser'];
  List<AcrossFoursomeTeamItem> selectedAcrossGroupList = [];
  var socketUtils = SocketUtils();
  PrivateChannel? privateChannel;
  final GlobalKey tooltipKey = GlobalKey();

  RxMap<String, Map<String, String>> selectionPercentages = <String, Map<String, String>>{}.obs;

  @override
  void onReady() {
    super.onReady();
  }

    Future<void> getTeeSheetGroup({bool progress = true}) async {
    if(groupList.isEmpty){
      try {
        if (progress) {
          progressDialog.show();
        }
        var response = await apiService.getHorseRaceGroup(gameId);

        groupList.clear();
        if (progress) {
          progressDialog.hide();
        }

        if (response.error == false) {
          groupList.addAll(response.data ?? []);
        } else {
          print("response message => ${response.message}");
        }
      } catch (error) {
        groupList.clear();
        if (progress) {
          progressDialog.hide();
        }
      }
    }

  }

  // Method to handle checkbox changes
  void handleCheckboxChange(HorseRaceGroupData dataItem, bool? value) {
    // Limit total selected groups to 4
    if (value == true && selectedAcrossGroupList.length >= 4) {
      ToastMessage.error(message: "You can select only 4 groups");
      return;
    }
    if(checkIsExist(dataItem.groupId)){
      selectedAcrossGroupList.removeWhere((element) => element.teamId == dataItem.groupId);
    }else{
      selectedAcrossGroupList.add(AcrossFoursomeTeamItem(teamId: dataItem.groupId,teamName: dataItem.groupName));
    }
    groupList.refresh();
  }

  bool checkIsExist(num? id){
    for(var item in selectedAcrossGroupList){
      if(item.teamId == id){
        return true;
      }
    }
    return false;
  }
  String? getStatus(num? id){
    for(var item in selectedAcrossGroupList){
      if(item.teamId == id){
        return item.status;
      }
    }
    return null;
  }

  String formatTime(String time) {
    // Parse the string into a DateTime object
    DateTime parsedTime = DateFormat("HH:mm:ss").parse(time);

    // Format the time to display as "HH:mm "
    String formattedTime = DateFormat("HH:mm").format(parsedTime);

    return formattedTime;
  }

  // Validate group selection with enhanced rules
  bool validateGroupSelection() {
    var loserCount = 0;
    var winnerCount = 0;
    for(var item in selectedAcrossGroupList){
      if(item.status == "Winner"){
        winnerCount++;
      }else if(item.status == "Loser"){
        loserCount++;
      }
    }

    // Validation rules
    if (selectedAcrossGroupList.length != 4) {
      ToastMessage.error(message: "You must select exactly 4 groups.");
      return false;
    }

    if (winnerCount != 3) {
      ToastMessage.error(message: "You must select exactly 3 winners.");
      return false;
    }

    if (loserCount != 1) {
      ToastMessage.error(message: "You must select exactly 1 loser.");
      return false;
    }

    return true;
  }

  // Enhanced dropdown selection method
  void handleGroupSelection(num? id, String? newValue) {

    var loserCount = 0;
    var winnerCount = 0;
    for(var item in selectedAcrossGroupList){
      if(item.status == "Winner"){
        winnerCount++;
      }else if(item.status == "Loser"){
        loserCount++;
      }
    }
    // Prevent duplicate selections
    if (newValue == 'Winner') {
      // Limit winners to 3
      if (winnerCount >= 3) {
        ToastMessage.error(message: "You can only select up to 3 winners");
        return;
      }
    }

    // Handle loser selection
    if (newValue == 'Loser') {
      // Check if a loser is already selected
      if (loserCount > 0) {
        ToastMessage.error(message: "You can only select one loser");
        return;
      }
    }
    for(var item in selectedAcrossGroupList){
      if(item.teamId == id){
        item.setStatus = newValue;
      }
    }
    groupList.refresh();

  }
  void onPusherInitialize(PusherClient pusherClient) {
    debugPrint("onPusherInitialize - socket-id: ${pusherClient.socketId}");

    privateChannel = pusherClient.private('game.status', subscribe: true);

    privateChannel?.bind('game.horse_race_team_select_percentage', (data) {
      var response = jsonDecode(jsonEncode(data));
      debugPrint('📡 Event received - game.horse_race_team_select_percentage - gameId: $gameId');
      debugPrint('📊 Response data: $response');

      // Update percentages in real-time
      updateSelectionPercentages(response);

    });
  }

  /// Update selection percentages from socket data
  void updateSelectionPercentages(Map<String, dynamic> socketData) {
    try {
      if (socketData['selection_percentage'] != null) {
        List<dynamic> percentages = socketData['selection_percentage'];

        // Create a map to store percentages by group ID
        Map<String, Map<String, String>> percentageMap = {};

        // Process socket data and aggregate by group ID
        for (var item in percentages) {
          String groupId = item['selected_game_group_id'].toString();
          String betType = item['bet_type']; // 'winner' or 'loser'
          String percentage = item['percentage'].toString();

          // Initialize if not exists
          if (!percentageMap.containsKey(groupId)) {
            percentageMap[groupId] = {'winner': '0.00', 'loser': '0.00'};
          }

          // Update the specific bet type percentage
          percentageMap[groupId]![betType] = percentage;
        }

        // Create a new list with updated percentages
        List<HorseRaceGroupData> updatedList = [];

        for (var group in groupList) {
          String groupIdStr = group.groupId.toString();

          if (percentageMap.containsKey(groupIdStr)) {
            // Create a new HorseRaceGroupData with updated percentages
            var updatedGroup = group.copyWith(
              selectionPercentage: SelectionPercentage(
                winner: percentageMap[groupIdStr]!['winner'],
                loser: percentageMap[groupIdStr]!['loser'],
              ),
            );
            updatedList.add(updatedGroup);
          } else {
            // Keep the group as is if no update
            updatedList.add(group);
          }
        }

        // Replace the entire list
        groupList.value = updatedList;

        debugPrint('✅ Updated selection percentages for ${percentageMap.length} groups');
      }
    } catch (e) {
      debugPrint('❌ Error updating selection percentages: $e');
    }
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
