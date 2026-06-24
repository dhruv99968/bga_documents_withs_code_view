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
  add("asslide-ryder_cup-2", "flutter", "pick_player_bottom_sheet.dart", `

import 'package:bga_flutter_app/controllers/bottom_sheets_controller/single_player_select_bottom_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_single_player_bottom_sheet.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import '../../controllers/bottom_sheets_controller/pick_bottom_sheet_controller.dart';
import '../../main.dart';
import '../../model/game_models/pick_player_model.dart';
import '../../model/participants_list_model.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/capped_text_scaling.dart';
import '../../utils/utils_methods.dart';
import '../common_views/bottom_sheet_view.dart';

class PickPlayerBottomSheet extends GetView<PickBottomSheetController> {
  const PickPlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(children: [
          Expanded(
            child: Obx(
              () => ListView.builder(
                  itemCount: controller.pickPlayerList.length,
                  shrinkWrap: true,
                  itemBuilder: (context, mainIndex) {
                    var item = controller.pickPlayerList[mainIndex];
                    if(controller.foursomeList.isNotEmpty){
                      print("${controller.foursomeList[mainIndex].teeTime.toString()}timmme");
                      controller.foursomeTeeTimeMap[item.foursomeNo!.toInt()] = controller.foursomeList[mainIndex].teeTime.toString();
                    }else{
                      print("is Empty : ${controller.foursomeList}");
                    }
                    return Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: Get.width,
                          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                          color: ColorCode.thikness,
                          child: CappedTextScaling(
                            maxScale: 1.0,
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Pick Players for Foursome ${item.foursomeNo}",
                                  style: CustomStyle.hintTextStyle.copyWith(color: ColorCode.titleText),
                                ),
                                InkWell(
                                  onTap: () {
                                    showTimeSelectionPopup(context, int.parse(item.foursomeNo.toString()));
                                    // showTimeSelectionPopup(context,int.parse(mainIndex.toString()) );
                                  },
                                  child: Obx(() {
                                    final label = controller.getTeeTimeLabel(int.parse(item.foursomeNo.toString()));
                                    // final label = controller.getTeeTimeLabel(int.parse(mainIndex.toString()));
                                    final hasTime = label != "TEE TIME";
                                    return Text(
                                      // formatTime
                                      // controller.foursomeList[mainIndex].teeTime != null ?
                                      // formatTeeTime(controller.foursomeList[mainIndex].teeTime.toString())
                                      //     :
                                        label,
                                      // controller.formatNewTeeTime(label),
                                      style: CustomStyle.hyperLinkStyle,
                                    );
                                  }),
                                ),
                                // InkWell(
                                //   onTap: (){
                                //
                                //   },
                                //   child: Text("TEE TIME" ,
                                //       style: CustomStyle.hyperLinkStyle),
                                // )
                              ],
                            ),
                          ),
                        ),
                        ListView.builder(
                            itemCount: item.pickPlayerList?.length,
                            shrinkWrap: true,
                            padding: const EdgeInsets.symmetric(vertical: 10),
                            physics: const NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return InkWell(
                                onTap: () async {
                                  var sheetController = Get.put(SinglePlayerSelectBottomController());
                                  sheetController.selectedPlayerId = controller.selectedPlayerId;
                                  sheetController.selectedList.clear();
                                  sheetController.crossList.clear();
        
                                  for (PickPlayerModel pickItem in controller.pickPlayerList) {
                                    for (PickPlayerList player in pickItem.pickPlayerList ?? []) {
                                      if (pickItem.foursomeNo == item.foursomeNo && player.id == item.pickPlayerList![index].id && (item.pickPlayerList![index].id ?? "").isNotEmpty) {
                                        sheetController.selectedList.add(player.id ?? "");
                                      } else if (player.id != null && player.id!.isNotEmpty) {
                                        sheetController.crossList.add(player.id ?? "");
                                      }
                                    }
                                  }
                                  debugPrint("selectedList =>${sheetController.selectedList}");
                                  debugPrint("crossList =>${sheetController.crossList}");
        
                                  ParticipantsDataItem? result = await customBottomSheet(
                                    title: 'Player Selection',
                                    child: SelectSinglePlayerBottomSheet(),
                                  );;
                                  if (result != null) {
                                    item.pickPlayerList![index].setId = result.id;
                                    item.pickPlayerList![index].setName = result.firstName;
                                    item.pickPlayerList![index].setProfile = result.profilePicture;
                                    controller.pickPlayerList.refresh();
                                  }
                                },
                                child: Container(
                                  margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 5),
                                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
                                  decoration: BoxDecoration(
                                    color: ColorCode.white,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                      color: ColorCode.bottomSheetBg,
                                      width: 2,
                                    ),
                                  ),
                                  child:
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      if((item.pickPlayerList![index].name??"").isNotEmpty)
                                        Padding(
                                          padding: const EdgeInsets.only(right: 8.0),
                                          child: Icon(Icons.check_circle,color: ColorCode.mainColor,),
                                        ),
                                      CappedTextScaling(
                                        maxScale: 1.0,
                                        child: customMarquee(
                                            text: "Pick ${item.pickPlayerList![index].name ?? index + 1}: For ${mainIndex % 2 == 0 ? (index == 0 || index == 3 ? controller.captainA : controller.captainB) : (index == 0 || index == 3 ? controller.captainB : controller.captainA)}",
                                            width: Get.width * 0.7,
                                            textAlign: TextAlign.center,
                                            textStyle: CustomStyle.hintTextStyle.copyWith(color: ColorCode.mainColor)),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            }),
                      ],
                    );
                  }),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child: CustomButtonNew(
              borderColor: ColorCode.borderColor,
              text: "DONE",
              onPressed: () {
                final error = controller.getValidationError();
                if (error == null) {
                  Get.back(result: controller.pickPlayerList);
                } else {
                  ToastMessage.error(message: error);
                }

                // if(controller.checkPickPlayerCompleted()){
                //
                //   Get.back(result: controller.pickPlayerList);
                // }else{
                //   ToastMessage.error(message: "Please select all foursome players.");
                // }
              },
            ),
          ),
        ]);
  }
  void showTimeSelectionPopup(BuildContext context, int foursomeNo) {
    // If selected tee time is already set, preselect hour, minute, and position
    if (controller.selectedTeeTime.value.isNotEmpty && controller.selectedTeeTime.value.length > 3) {
      // Expected format: "HH:mm(F)" or "HH:mm(B)"
      final regex = RegExp(r"(\d{2}):(\d{2})\((F|B)\)");
      final match = regex.firstMatch(controller.selectedTeeTime.value);
      if (match != null) {
        final hour = int.parse(match.group(1)!);
        final minute = int.parse(match.group(2)!);
        final position = match.group(3) == "F" ? "Front" : "Back";

        controller.selectedHour.value = hour;
        controller.selectedMinute.value = minute;
        controller.selectedPosition.value = position;
      }
    }
    controller.preloadTeeTime(foursomeNo);

    print("foursome id => $foursomeNo");

    // Create scroll controllers so CupertinoPicker starts at the right spot
    FixedExtentScrollController hourController = FixedExtentScrollController(initialItem: controller.selectedHour.value);
    FixedExtentScrollController minuteController = FixedExtentScrollController(initialItem: controller.selectedMinute.value);

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SizedBox(
            width: Get.width,
            height: Get.height * 0.4,
            child: Column(
              children: [
                // Front / Back selection
                Container(
                  height: 40,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Obx(() => Radio<String>(
                        value: "Front",
                        groupValue: controller.selectedPosition.value,
                        fillColor: MaterialStateProperty.resolveWith<Color>((states) {
                          if (states.contains(MaterialState.selected)) {
                            return ColorCode.buttonBgColor; // active color
                          }
                          return ColorCode.dropArrow; // inactive color
                        }),
                        onChanged: (value) {
                          if (value != null) {
                            controller.selectedPosition.value = value;
                          }
                        },
                      )),
                      Obx(
                            () => Text("Front",
                            style: CustomStyle.expansionTileTitleStyle
                                .copyWith(fontWeight: FontWeight.bold, color: controller.selectedPosition.value == "Front" ? ColorCode.labelText : ColorCode.dropArrow)),
                      ),
                      Obx(() => Radio<String>(
                        value: "Back",
                        groupValue: controller.selectedPosition.value,
                        fillColor: MaterialStateProperty.resolveWith<Color>((states) {
                          if (states.contains(MaterialState.selected)) {
                            return ColorCode.buttonBgColor; // active color
                          }
                          return ColorCode.dropArrow; // inactive color
                        }),
                        onChanged: (value) {
                          if (value != null) {
                            controller.selectedPosition.value = value;
                          }
                        },
                      )),
                      Obx(
                            () => Text("Back",
                            style: CustomStyle.expansionTileTitleStyle
                                .copyWith(fontWeight: FontWeight.bold, color: controller.selectedPosition.value == "Back" ? ColorCode.labelText : ColorCode.dropArrow)),
                      ),
                    ],
                  ),
                ),
                // Time picker
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: SizedBox(
                        height: Get.height * 0.25,
                        child: CupertinoPicker(
                          scrollController: hourController,
                          itemExtent: 70.0,
                          diameterRatio: 2,
                          looping: true,
                          onSelectedItemChanged: (int value) {
                            controller.updateHour(value);
                          },
                          children: List<Widget>.generate(24, (int index) {
                            return Obx(() {
                              bool isSelected = index == controller.selectedHour.value;
                              return Center(
                                child: Text(
                                  index.toString().padLeft(2, '0'),
                                  style: CustomStyle.expansionTileTitleStyle.copyWith(fontSize: 34, color: isSelected ? ColorCode.switchButton : ColorCode.timeAgoBold),
                                ),
                              );
                            });
                          }),
                        ),
                      ),
                    ),
                    const Text(":", style: TextStyle(fontSize: 50)),
                    Expanded(
                      child: SizedBox(
                        height: Get.height * 0.25,
                        child: CupertinoPicker(
                          scrollController: minuteController,
                          itemExtent: 70.0,
                          looping: true,
                          diameterRatio: 2,
                          onSelectedItemChanged: (int value) {
                            controller.updateMinute(value);
                          },
                          children: List<Widget>.generate(60, (int index) {
                            return Obx(() {
                              bool isSelected = index == controller.selectedMinute.value;
                              return Center(
                                child: Text(
                                  index.toString().padLeft(2, '0'),
                                  style: CustomStyle.expansionTileTitleStyle.copyWith(fontSize: 34, color: isSelected ? ColorCode.switchButton : ColorCode.timeAgoBold),
                                ),
                              );
                            });
                          }),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                Center(
                  child: CustomButtonNew(
                    borderColor: ColorCode.borderColor,
                    text: "DONE",
                    onPressed: () {
                      controller.saveTeeTime(foursomeNo);

                      Get.back();

                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

}
`);
  add("asslide-ryder_cup-2", "flutter", "pick_bottom_sheet_controller.dart", `
import 'package:bga_flutter_app/model/game_models/pick_player_model.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import '../../model/game_models/game_details.dart';

class PickBottomSheetController extends GetxController{

  RxList<PickPlayerModel> pickPlayerList = <PickPlayerModel>[].obs;
  RxList<FourSomes> foursomeList = <FourSomes>[].obs;
  List<String> selectedPlayerId = [];
  var captainAID = "";
  var captainA = "";
  var captainB = "";
  var captainBID = "";
  int gameId = 0;

  List<FourSomes> fourSomeMatchList = <FourSomes>[].obs;

  var selectedTeeTime = "TEE TIME".obs;
  var selectedHour = 0.obs;
  var selectedMinute = 0.obs;
  var selectedPosition = "Front".obs;
  var teeTime = "".obs;
  RxMap<int, String> foursomeTeeTimeMap = <int, String>{}.obs;
  String formatNewTeeTime(String time) {
    try {
      // If API gives HH:mm
      final parsed = DateFormat("HH:mm").parse(time);
      // return DateFormat("hh:mm a").format(parsed);
      return DateFormat("hh:mm").format(parsed);
    } catch (e) {
      try {
        // If API gives HH:mm:ss
        final parsed = DateFormat("HH:mm:ss").parse(time);
        // return DateFormat("hh:mm a").format(parsed);
        return DateFormat("hh:mm").format(parsed);
      } catch (e) {
        // If already formatted or invalid
        return time;
      }
    }
  }
  void updateHour(int hour) {
    selectedHour.value = hour;
  }


  void updateMinute(int minute) {
    selectedMinute.value = minute;
  }

  String formatTime(int hour, int minute) {
    return '${hour.toString().padLeft(2, '0')}:${minute.toString().padLeft(
        2, '0')}';
  }

  // Get display label for a specific foursome's tee time
  String getTeeTimeLabel(int foursomeNo) {
    return foursomeTeeTimeMap[foursomeNo] ?? "TEE TIME";
  }

  // Save tee time for a specific foursome
  void saveTeeTime(int foursomeNo) {
    final position = selectedPosition.value == "Front" ? "F" : "B";
    final time = formatTime(selectedHour.value, selectedMinute.value);
    foursomeTeeTimeMap[foursomeNo] = "$time";
    foursomeTeeTimeMap.refresh();
  }
  // Pre-fill pickers when editing an existing tee time
  void preloadTeeTime(int foursomeNo) {
    final existing = foursomeTeeTimeMap[foursomeNo];
    if (existing != null && existing.isNotEmpty) {
      final regex = RegExp(r"(\d{2}):(\d{2})\((F|B)\)");
      final match = regex.firstMatch(existing);
      if (match != null) {
        selectedHour.value = int.parse(match.group(1)!);
        selectedMinute.value = int.parse(match.group(2)!);
        // selectedPosition.value = match.group(3) == "F" ? "Front" : "Back";
      }
    } else {
      // Reset to defaults
      selectedHour.value = 0;
      selectedMinute.value = 0;
      // selectedPosition.value = "Front";
    }
  }

  void generateFoursomesBasedOnPlayerCount() {
    int playerCount = selectedPlayerId.length;
    int foursomeCount = (playerCount / 4).floor(); // Each foursome has 4 players


    pickPlayerList.clear();
    foursomeTeeTimeMap.clear();

    for (int i = 0; i < foursomeCount; i++) {
      PickPlayerModel foursome = PickPlayerModel(
          foursomeNo: i + 1,
          pickPlayerList: []
      );

      // Create 4 empty player slots for each foursome
      for (int j = 0; j < 4; j++) {
        PickPlayerList player = PickPlayerList(
            id: null,
            name: null,
            profile: null
        );
        foursome.pickPlayerList!.add(player);
      }

      pickPlayerList.add(foursome);
    }

    // Refresh the observable list
    pickPlayerList.refresh();
  }

//   bool checkPickPlayerCompleted() {
//     var allPicked = true;
//     for (PickPlayerModel pickItem in pickPlayerList) {
//       for (PickPlayerList player in pickItem.pickPlayerList ?? []) {
//         if (player.id == null || player.id!.isEmpty) {
//           allPicked = false;
//         }
//       }
//     }
//     return allPicked;
//   }
// }

  bool checkPickPlayerCompleted() {
    var allPicked = true;
    for (PickPlayerModel pickItem in pickPlayerList) {
      for (PickPlayerList player in pickItem.pickPlayerList ?? []) {
        if (player.id == null || player.id!.isEmpty) {
          return false;
        }
      }
    }
    // Check all foursomes have a tee time
    for (PickPlayerModel pickItem in pickPlayerList) {
      final teeTime = foursomeTeeTimeMap[pickItem.foursomeNo];
      if (teeTime == null || teeTime.isEmpty) {
        return false;
      }
    }
    return true;
  }
  // Separate check to give specific error messages
  String? getValidationError() {
    for (PickPlayerModel pickItem in pickPlayerList) {
      for (PickPlayerList player in pickItem.pickPlayerList ?? []) {
        if (player.id == null || player.id!.isEmpty) {
          return "Please select all foursome players.";
        }
      }
    }
    for (PickPlayerModel pickItem in pickPlayerList) {
      final teeTime = foursomeTeeTimeMap[pickItem.foursomeNo];
      if (teeTime == null || teeTime.isEmpty) {
        return "Please select a tee time for Foursome ${pickItem.foursomeNo}.";
      }
    }
    return null;
  }

}
`);

  // ── Step 3 — Tee Time (reuses pick_player_bottom_sheet) ───
  add("asslide-ryder_cup-3", "flutter", "pick_player_bottom_sheet.dart",
    '// Ryder Cup — Tee Time\n// Reuses PickPlayerBottomSheet layout — see asslide-ryder_cup-2 for full source.\n// Each foursome row shows a time-picker instead of a captain icon.\n');
  add("asslide-ryder_cup-3", "flutter", "pick_bottom_sheet_controller.dart",
    '// Ryder Cup Controller — Tee Time\n// Extends PickBottomSheetController with tee-time saving.\n// See asslide-ryder_cup-2 for full controller source.\n');

  // ── Step 4 — Player Selection (Foursomes) ─────────────────
  add("asslide-ryder_cup-4", "flutter", "select_single_player_bottom_sheet.dart", `
import 'package:bga_flutter_app/views/bottem_sheets/player_card_item.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/bottom_sheets_controller/single_player_select_bottom_controller.dart';
import '../../main.dart';
import '../../model/game_models/game_details.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/toast_message.dart';
import '../common_views/no_data_view.dart';
import '../common_views/search_bar_view.dart';

class SelectSinglePlayerBottomSheet extends GetView<SinglePlayerSelectBottomController> {
  const SelectSinglePlayerBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    var keyboardHeight = MediaQuery.of(context).viewInsets.bottom;

    return Column(children: [
          SearchBarView(
            controller: controller.searchController,
            onChanged: (value) {
              controller.searchQuery.value = value;  // ← triggers Obx rebuild
            },
            onCrossTap: () {
              controller.searchQuery.value = "";
              controller.searchController.clear();
            },
          ),
          Flexible(
            child: Obx(() => controller.participantList.isNotEmpty
                ? ListView.builder(
                    itemCount: controller.getFilterMemberList().length,
                    // padding: const EdgeInsets.only(bottom: 70),
                    itemBuilder: (context, index) {
                      final player = controller.getFilterMemberList()[index];

                      return Obx(
                        () => PlayerCardItem(
                          dataItem: Players(id: player.id, name: player.firstName, email:  player.email, profilePicture: player.profilePicture,bgaHcp: int.parse(player.bgaHcp.toString())),
                          isSelected: controller.isSelected(player.id ?? ""),
                          isCross: controller.isCross(player.id ?? ""),
                          onTap: () => controller.toggleSelection(player.id ?? ""),
                        ),
                      );
                    },
                  )
                : SizedBox(
                    height: Get.height * 0.65,
                    child: NoDataView())),
          ),
          Container(
            color: Colors.white,
            width: Get.width,
            padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
            child: CustomButtonNew(
              borderColor: ColorCode.borderColor,
              text: "SELECT PLAYER",
              onPressed: () async {
                if (controller.selectedList.isEmpty) {
                  ToastMessage.error(message: "You must select exactly 1 players.");
                  return;
                } else {
                  Get.back(result: controller.participantList.firstWhere((element) => element.id == controller.selectedList.first));
                }
              },
            ),
          ),
        ]);
  }
}
`);
  add("asslide-ryder_cup-4", "flutter", "single_player_select_bottom_controller.dart", `
import 'package:flutter/cupertino.dart';
import 'package:get/get_rx/src/rx_types/rx_types.dart';
import 'package:get/get_state_manager/src/simple/get_controllers.dart';

import '../../apis/api_services.dart';
import '../../model/participants_list_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class SinglePlayerSelectBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<ParticipantsDataItem> participantList = <ParticipantsDataItem>[].obs;
  RxList<String> selectedList = <String>[].obs;
  RxList<String> crossList = <String>[].obs;
  List<String> selectedPlayerId = [];
  TextEditingController searchController = TextEditingController();
  var searchQuery = ''.obs;

  @override
  void onReady() {
    super.onReady();
    getParticipantsList();
  }

  void selectOption(int numberOfPlayersToSelect) {
    // Clear the current selection
    selectedList.clear();
    // Automatically select the first 'numberOfPlayersToSelect' players
    for (int i = 0; i < numberOfPlayersToSelect && i < participantList.length; i++) {
      selectedList.add(participantList[i].id ?? "");
    }
    selectedList.refresh();
  }

  Future<void> getParticipantsList() async {
    try {
      progressDialog.show();
      var response = await apiService.getMemberList();
      progressDialog.hide();

      if (response.error == false) {
        for(ParticipantsDataItem  player in response.data ?? []){
          if(selectedPlayerId.contains(player.id)){
            participantList.add(player);
          }
        }

      } else {
        ToastMessage.error(message: response.message);
        debugPrint("error : ${response.message}");
      }
    } catch (error) {
      ToastMessage.error(message: "$error");
      debugPrint("catch error : $error");
    }
  }

  bool isSelected(String id) {
    return selectedList.contains(id);
  }
  bool isCross(String id) {
    return crossList.contains(id);
  }


  List<ParticipantsDataItem> getFilterMemberList() {
    List<ParticipantsDataItem> tempMemberList1 =[];
    List<ParticipantsDataItem> tempMemberList2 =[];
    List<ParticipantsDataItem> finalMemberList =[];
// Apply search filter first
    final query = searchQuery.value.trim().toLowerCase();
    final filtered = query.isEmpty
        ? participantList
        : participantList.where((player) {
      final name = (player.firstName ?? '').toLowerCase();
      final email = (player.email ?? '').toLowerCase();
      return name.contains(query) || email.contains(query);
    }).toList();

    for(ParticipantsDataItem player in filtered){
      if(isCross(player.id ?? "")){
        tempMemberList1.add(player);
      }else{
        tempMemberList2.add(player);
      }
    }
    finalMemberList.addAll(tempMemberList2);
    finalMemberList.addAll(tempMemberList1);
    return finalMemberList;
  }

  void toggleSelection(String id) {
    debugPrint("participantList : $participantList");
    debugPrint("selectedList : $selectedList");
    if(crossList.contains(id)){
      ToastMessage.error(message: "This player is already selected.");
      return;
    }
    if (selectedList.contains(id)) {
      debugPrint("remove index : $id");
      selectedList.remove(id);
    } else if (selectedList.isEmpty) {
      selectedList.add(id);
      debugPrint("add index : $id");
    } else {
      ToastMessage.error(message: "You must select exactly 1 players.");
    }
    debugPrint("selectedList : $selectedList");
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
  add("asslide-ryder_cup-8", "flutter", "ryder_cup_custom_match_bottom.dart", `
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/svg.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/src/simple/get_view.dart';

import '../../controllers/bottom_sheets_controller/ryder_custom_match_bottom_controller.dart';
import '../../main.dart';
import '../../model/participants_list_model.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/ripple_click.dart';
import '../../utils/toast_message.dart';
import '../../utils/utils_methods.dart';
import '../common_views/two_player_view.dart';

class RyderCupCustomMatchBottom extends GetView<RyderCustomMatchBottomController> {
  const RyderCupCustomMatchBottom({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
          children: [
            Expanded(
              child: Obx(() => SingleChildScrollView(
                child: Column(
                  children: [
                   ListView.builder(
                     shrinkWrap: true,
                     physics: NeverScrollableScrollPhysics(),
                     itemCount: controller.rydercupMatchList.length,
                       itemBuilder: (context, index){
                       var matchData=controller.rydercupMatchList[index];
                       return Column(
                         children: [
                           Container(
                             color: ColorCode.thikness,
                             height: 40,
                             padding: const EdgeInsets.only(left: 15, right: 8),
                             child: GestureDetector(
                               onTap: () {
                                 // controller.toggleCollapsed(index);
                               },
                               child: Row(
                                 // mainAxisSize: MainAxisSize.min, // Prevents Row from taking up the full width
                                 crossAxisAlignment: CrossAxisAlignment.center,
                                 children: [
                                   Text(
                                     "foursome ${matchData.foursomeNo} ".allInCaps,
                                     style: CustomStyle.columnTitle.copyWith(fontSize: appFontSize.value + 16),
                                   ),
                                   const SizedBox(width: 8),
                                   // Text(matchData.foursomeNo != null ? formatTeeTime(controller.vegasCodData.value.teeTime.toString()) : "",
                                   //     style: CustomStyle.junkbtn.copyWith(color: ColorCode.check, fontSize: appFontSize.value + 14)),
                                   const SizedBox(width: 8),
                                   const Spacer(),
                                 ],
                               ),
                             ),
                           ),
                           Container(
                             color:ColorCode.white,
                             child: Column(
                               // mainAxisSize: MainAxisSize.min,
                               crossAxisAlignment: CrossAxisAlignment.start,

                               children: [
                                 for (int i = 0; i < (matchData.matches?.length ?? 0); i++) ...[
                                   Padding(
                                     padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
                                     child: Row(
                                       mainAxisAlignment: MainAxisAlignment.start,
                                       children: [
                                         Text(
                                           "Match - ${matchData.matches![i].match}",
                                           style: CustomStyle.name.copyWith(fontFamily: 'inter'),
                                         ),
                                         SizedBox(width: 5,),
                                         Container(
                                             height: 35,
                                             width: Get.width * 0.18,
                                             decoration: BoxDecoration(
                                                 border: Border.all(color: ColorCode.borderColor, width: 1),
                                                 borderRadius: BorderRadius.circular(30),
                                                 color: ColorCode.white
                                             ),
                                             alignment: Alignment.center,
                                             padding: const EdgeInsets.only(left: 8, right: 5),
                                             child: Text("2 vs 2",
                                                 style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.titleText2, fontWeight: FontWeight.w500))),
                                         const Spacer(),
                                         Container(
                                             height: 35,
                                             width: Get.width * 0.35,
                                             decoration: BoxDecoration(
                                                 border: Border.all(color: ColorCode.borderColor, width: 1),
                                                 borderRadius: BorderRadius.circular(30),
                                               color: ColorCode.white
                                             ),
                                             padding: const EdgeInsets.only(left: 8, right: 5),
                                             child: Row(
                                               children: [
                                                 Container(
                                                   width: Get.width * 0.24,
                                                   child: SingleChildScrollView(
                                                     scrollDirection: Axis.horizontal,

                                                     child: Text(controller.formatHolesToPlay(matchData.matches![i].holesToPlay!),
                                                         style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.titleText2, fontWeight: FontWeight.w500)),
                                                   ),
                                                 ),
                                                 const Spacer(),
                                                 const Icon(Icons.arrow_drop_down_sharp)
                                               ],
                                             ))
                                       ],
                                     ),
                                   ),
                                   // SizedBox(height: 5,),
                                   Container(
                                     // color: Colors.red,
                                     alignment: Alignment.centerLeft,
                                     padding: const EdgeInsets.only(left: 0, right: 15, top: 3, bottom: 3),
                                     child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                       for (int j = 0; j < matchData.matches![i].teams!.length; j++) ...[
                                         // Column(
                                         //   crossAxisAlignment: CrossAxisAlignment.start,
                                         //   children: [
                                         //     for (int k = 0; k < 2 && k < controller.vegasCodData.value.matches![i].teams![j].players!.length; k++) ...[
                                         //       if (controller.vegasCodData.value.matches![i].teams![j].players!.length == 1)
                                         //         Padding(
                                         //           padding: const EdgeInsets.only(left: 15),
                                         //           child: ryderPlayerCard(
                                         //             playerName: controller.vegasCodData.value.matches![i].teams![j].players![k].name.toString(),
                                         //             player2Name: '',
                                         //           ),
                                         //         ),
                                         //     ],
                                         //   ],
                                         // ),
                                         if (matchData.matches![i].teams![j].players!.length == 2)
                                           Padding(
                                             padding: const EdgeInsets.only(left: 10),
                                             child: TwoPlayerView(
                                               playerName: matchData.matches![i].teams![j].players![0].name.toString(),
                                               playerName2: matchData.matches![i].teams![j].players![1].name!.toString(),
                                             ),
                                           ),
                                         if (j == 0)
                                           SizedBox(
                                             width: Get.width * 0.015,
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
                                   if (i < matchData.matches!.length - 1) const Divider(),
                                   if (i < matchData.matches!.length - 1)
                                     const SizedBox(
                                       height: 5,
                                     ),
                                   if (i == matchData.matches!.length - 1)
                                     const SizedBox(
                                       height: 10,
                                     )
                                 ],
                               ],
                             ),
                           )
                         ],
                       );

                       }
                       )
                  ],
                ),
              )),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(15, 0, 15, 10),
              child: CustomButtonNew(
                borderColor: ColorCode.borderColor,
                text: "DONE",
                onPressed: () async {
                  Get.back(result: true);
                },
              ),
            ),
          ],
        );
  }
}
`);
  add("asslide-ryder_cup-8", "flutter", "ryder_custom_match_bottom_controller.dart", `
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../model/game_models/calcutta_foursome_model.dart';
import '../../model/game_models/game_details.dart';
import '../../model/game_models/match_config_model.dart';
import '../../model/game_models/rydercup_generate_match.dart';
import '../../model/tee_sheet_model/teesheet_only_player_model.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class RyderCustomMatchBottomController extends GetxController {
  var progressDialog = ShowProgressDialog();
  RxList<RydercupData> rydercupMatchList = <RydercupData>[].obs;  var apiService = ApiServices();
  String fourSomeId = "1";
  String gameId = "0";
  String fourSomeNo = "0";
  String gameType = "0";
  bool isBetAdded = false;
  RxList<CalcuttaPlayers> players = <CalcuttaPlayers>[].obs;
  List<FourSomes> fourSomeMatchList = <FourSomes>[].obs;

  RxList<TeesheetOnlyPlayerData> groupPlayerList = <TeesheetOnlyPlayerData>[].obs;
  RxList<TeesheetOnlyPlayerData> allGroupPlayerList = <TeesheetOnlyPlayerData>[].obs;

  RxList<MatchConfigModel> matchConfigList = <MatchConfigModel>[].obs;

  late List<String> holeOptions = ['1-2-3-4-5-6', '7-8-9-10-11-12', '13-14-15-16-17-18'];
  final List<String> matchTypeOptions = ['1 vs 1', '2 vs 2'];

  void onMatchTypeChanged(MatchConfigModel matchConfig, String type) {
    matchConfig.setMatchType = type;
    if (type == '1v1') {
      // Keep only first player, remove the second
      if (matchConfig.player.length > 1) {
        matchConfig.player.removeRange(1, matchConfig.player.length);
      }
      if (matchConfig.player2!.length > 1) {
        matchConfig.player2!.removeRange(1, matchConfig.player2!.length);
      }
      matchConfig.player3?.clear();
      matchConfig.player4?.clear();
    }
    matchConfigList.refresh();
  }

  Future<void> getTeeSheetGroup({bool progress = true,}) async {
    try {
      progressDialog.show();
      var response = await apiService.getFourSomePlayer(fourSomeId);
      groupPlayerList.clear();
      players.clear();
      matchConfigList.clear();
      progressDialog.hide();
      if (response.data != null) {
        groupPlayerList.addAll(response.data ?? []);

        players.addAll(groupPlayerList.map((playerData) => CalcuttaPlayers(name: playerData.name, playerId: playerData.playerId)));

          matchConfigList.addAll([

            MatchConfigModel(player: [], player2: [], player3: [], player4: [], holes: ['1-2-3-4-5-6'],matchType: "2v2"),
            MatchConfigModel(player: [], player2: [], player3: [], player4: [], holes: ['7-8-9-10-11-12'],matchType: "2v2"),
            MatchConfigModel(player: [], player2: [], player3: [], player4: [], holes: ['13-14-15-16-17-18'],matchType: "2v2"),
          ]);


        print("group player list : ${groupPlayerList.length}");
        update();
      } else {
        progressDialog.hide();
        debugPrint('Error msg: $response');
      }
    } catch (error) {
      progressDialog.hide();
      ToastMessage.error(message: "$error");
      debugPrint('Error fetching leaderboard: $error');
    }
  }

  String getSelectedHolesDisplayText(MatchConfigModel matchConfig) {
    final selectedHoles = matchConfig.holes;

    if (selectedHoles.isEmpty) {
      return "Select hole";
    }

    String holeRange = selectedHoles.first; // e.g. "1-2-3-4-5-6"
    List<String> parts = holeRange.split('-'); // ["1","2","3","4","5","6"]

    if (parts.length > 4) {
      return '${parts[0]}-${parts[1]}-...-${parts[parts.length - 2]}-${parts.last}'; // "1-2-...-5-6"
    }

    return holeRange;
  }

  bool isPlayerSelected(MatchConfigModel matchConfig, String id) {
    if (matchConfig.setSelected == true) {
      bool isPlayer1Selected = matchConfig.player.contains(id);
      bool isPlayer3Selected = matchConfig.player3!.contains(id);
      // Ensure both player 1 and player 3 are selected
      return isPlayer1Selected || isPlayer3Selected;
    }
    // Validate for player 2 and player 4
    else if (matchConfig.setSelected2 == true) {
      bool isPlayer2Selected = matchConfig.player2!.contains(id);
      bool isPlayer4Selected = matchConfig.player4!.contains(id);

      // Ensure both player 2 and player 4 are selected
      return isPlayer2Selected || isPlayer4Selected;
    }
    return false;
  }

  Future<void> toggleHoleSelection(MatchConfigModel matchConfig, String hole) async {
    await Future.delayed(const Duration(milliseconds: 300));
    if (hole == getSelectedHolesDisplayText(matchConfig)) {
      return;
    }
    debugPrint("Hole ==> $hole");

    // Find the current hole of this match (before swap)
    String currentHole = matchConfig.holes.isNotEmpty ? matchConfig.holes.first : "";

    // Find if another match already has this hole selected
    MatchConfigModel? matchWithTargetHole = matchConfigList.firstWhereOrNull(
          (m) => m != matchConfig && m.holes.isNotEmpty && m.holes.first == hole,
    );

    // Set the new hole for current match
    matchConfig.holes.clear();
    matchConfig.holes.add(hole);

    // If another match had this hole, give it the current match's old hole
    if (matchWithTargetHole != null && currentHole.isNotEmpty) {
      matchWithTargetHole.holes.clear();
      matchWithTargetHole.holes.add(currentHole);
    }
    matchConfigList.refresh();
  }

  void playerSelection(MatchConfigModel matchConfig, String id) {
    int maxPlayers = matchConfig.matchType == '2v2' ? 2 : 1;

    if (matchConfig.setSelected == true) {
      // Check if player exists in Team 2
      if (matchConfig.player2!.contains(id) || matchConfig.player4!.contains(id)) {
        ToastMessage.error(message: "Player is already selected in Team 2");
        return;
      }

      if (matchConfig.player.contains(id)) {
        matchConfig.player.remove(id);
        // Clear auto-selected Team 2 players when Team 1 changes
        matchConfig.player2!.clear();
        matchConfig.player4!.clear();
      } else if (matchConfig.player3!.contains(id)) {
        matchConfig.player3!.remove(id);
        // Clear auto-selected Team 2 players when Team 1 changes
        matchConfig.player2!.clear();
        matchConfig.player4!.clear();
      } else {
        if (matchConfig.player.isEmpty) {
          matchConfig.player.add(id);
        } else if (maxPlayers == 2 && matchConfig.player3!.isEmpty) {
          matchConfig.player3!.add(id);
        } else {
          ToastMessage.error(
            message: maxPlayers == 1
                ? "Team 1 can only have 1 player in 1 vs 1 match"
                : "Team 1 already has 2 players",
          );
          return;
        }
      }

      // ✅ Auto-select remaining players for Team 2 when Team 1 is complete
      if (matchConfig.matchType == '2v2' &&
          matchConfig.player.length == 1 &&
          matchConfig.player3!.length == 1) {
        _autoSelectTeam2(matchConfig);
      } else if (matchConfig.matchType == '1v1' && matchConfig.player.length == 1) {
        _autoSelectTeam2(matchConfig);
      }

    } else if (matchConfig.setSelected2 == true) {
      // Check if player exists in Team 1
      if (matchConfig.player.contains(id) || matchConfig.player3!.contains(id)) {
        ToastMessage.error(message: "Player is already selected in Team 1");
        return;
      }

      if (matchConfig.player2!.contains(id)) {
        matchConfig.player2!.remove(id);
      } else if (matchConfig.player4!.contains(id)) {
        matchConfig.player4!.remove(id);
      } else {
        if (matchConfig.player2!.isEmpty) {
          matchConfig.player2!.add(id);
        } else if (maxPlayers == 2 && matchConfig.player4!.isEmpty) {
          matchConfig.player4!.add(id);
        } else {
          ToastMessage.error(
            message: maxPlayers == 1
                ? "Team 2 can only have 1 player in 1 vs 1 match"
                : "Team 2 already has 2 players",
          );
        }
      }
    }
  }
  String? getPlayerName(MatchConfigModel matchConfig, int playerNumber) {
    String? playerId;

    // Determine the playerId based on playerNumber
    if (playerNumber == 1) {
      if (matchConfig.player.isNotEmpty) {
        playerId = matchConfig.player.first;
      }
    } else if (playerNumber == 2) {
      if (matchConfig.player2!.isNotEmpty) {
        playerId = matchConfig.player2!.first;
      }
    } else if (playerNumber == 3) {
      if (matchConfig.player3!.isNotEmpty) {
        playerId = matchConfig.player3!.first;
      }
    } else if (playerNumber == 4) {
      if (matchConfig.player4!.isNotEmpty) {
        playerId = matchConfig.player4!.first;
      }
    }

    // If playerId is null, return a default value
    if (playerId == null) {
      return "Select player"; // or handle it as needed
    }

    // Find the player in the participantList
    var player = groupPlayerList.firstWhere(
          (p) => p.playerId == playerId,
      orElse: () => TeesheetOnlyPlayerData(name: "Select player"), // Default player if not found
    );

    // Split the player's name into parts (first name and last name)
    List<String> nameParts = player.name!.split(" ");

    // Check if the name has more than one part (e.g., first name and last name)
    if (nameParts.length > 1) {
      // Display as "V. LastName"
      return "${nameParts[0][0]}. ${nameParts.sublist(1).join(' ')}";
    } else {
      // Display the first name as is
      return player.name;
    }
  }

  onSearch(String value) {
    groupPlayerList.clear();
    if (value.isEmpty) {
      groupPlayerList.addAll(allGroupPlayerList);
      return;
    }
    for (var item in allGroupPlayerList) {
      if (item.name!.toLowerCase().contains(value)) {
        groupPlayerList.add(item);
      }
    }
  }

  void printMatchData() {
    for (var foursomeData in fourSomeMatchList) {
      print("game id => ${foursomeData.gameId}");
      if (foursomeData.matches!.isNotEmpty && foursomeData.matches!.length != 0) {
        for (var matchData in foursomeData.matches!) {
          print("hole  => ${matchData.holeType}");
          for (var teamData in matchData.teams!) {
            print("player name  => ${teamData.players}");
            print("player name  => ${teamData.team}");
          }
        }
      }
    }
  }

  bool validateTeamSelections() {
    List<String> errorMessages = [];

    for (int i = 0; i < matchConfigList.length; i++) {
      var match = matchConfigList[i];
      bool team1Complete = match.player.length == 1 && match.player3!.length == 1;
      bool team2Complete = match.player2!.length == 1 && match.player4!.length == 1;

      // Check if the match has a selected hole
      if (match.holes.isEmpty) {
        continue; // Skip validation for matches without selected holes
      }

      if (!team1Complete) {
        errorMessages.add("Match ${i+1}: Team 1 must have exactly 2 players");
      }

      if (!team2Complete) {
        errorMessages.add("Match ${i+1}: Team 2 must have exactly 2 players");
      }
    }

    if (errorMessages.isNotEmpty) {
      // Show only the first error message
      ToastMessage.error(message: errorMessages.first);
      return false;
    }

    return true;
  }
  /// ✅ Auto-selects remaining players into Team 2 based on who is NOT in Team 1
  void _autoSelectTeam2(MatchConfigModel matchConfig) {
    List<String> team1Players = [
      ...matchConfig.player,
      ...matchConfig.player3!,
    ];

    List<String> remainingPlayers = groupPlayerList
        .map((p) => p.playerId ?? "")
        .where((id) => id.isNotEmpty && !team1Players.contains(id))
        .toList();

    matchConfig.player2!.clear();
    matchConfig.player4!.clear();

    if (matchConfig.matchType == '2v2') {
      if (remainingPlayers.length >= 2) {
        matchConfig.player2!.add(remainingPlayers[0]);
        matchConfig.player4!.add(remainingPlayers[1]);
      } else if (remainingPlayers.length == 1) {
        matchConfig.player2!.add(remainingPlayers[0]);
      }
    } else if (matchConfig.matchType == '1v1') {
      if (remainingPlayers.isNotEmpty) {
        matchConfig.player2!.add(remainingPlayers[0]);
      }
    }

    matchConfigList.refresh();
  }
  String formatHolesToPlay(List<num> holesToPlay) {
    if (holesToPlay.isEmpty) return '';

    int length = holesToPlay.length;

    // If list is small, show everything
    if (length <= 4) {
      return holesToPlay.join('-');
    }

    // First 2 and last 2 with ellipsis
    final firstPart = holesToPlay.take(2).join('-');
    final lastPart = holesToPlay.skip(length - 2).join('-');

    return '$firstPart-...-$lastPart';
  }
}
`);

  // ── Step 9 — Add Score Entry (shared) ────────────────────
  add("asslide-ryder_cup-9", "flutter", "add_score.dart",
    '// Ryder Cup — Add Score Entry\n// Reuses add_score.dart — see asslide-0 for full source.\n');
  add("asslide-ryder_cup-9", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Add Score Entry\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

})();
