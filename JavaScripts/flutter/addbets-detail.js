// ============================================================
// Flutter — Add Bets (addbets-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("addbets-detail", "flutter", "add_bet_bottom_sheet.dart", `
import 'package:bga_flutter_app/controllers/bets/add_bet_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_dropdown.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import '../../main.dart';
import '../../model/game_models/not_started_game_model.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/toast_message.dart';

class AddBetBottomSheet extends GetView<AddBetBottomSheetController> {
  const AddBetBottomSheet({super.key});

  List<String> _gameDropDownList() {
    if (controller.gameId.isNotEmpty || controller.gameName != null) {
      final selectedName = _selectedGameName();
      return selectedName == null ? [] : [selectedName];
    }

    return controller.gameList
        .map(_gameDropDownName)
        .where((name) => name.isNotEmpty)
        .toSet()
        .toList();
  }

  String? _selectedGameName() {
    if (controller.gameId.isNotEmpty || controller.gameName != null) {
      final selectedName = controller.gameName?.capitalizeFirstOfEach ?? controller.gameType;
      return selectedName.isEmpty ? null : selectedName;
    }

    final selectedItem = controller.selectedItem.value;
    if (selectedItem == null) return null;

    final selectedName = _gameDropDownName(selectedItem);
    return selectedName.isEmpty ? null : selectedName;
  }

  String _gameDropDownName(LatestUpcomingGame item) {
    return item.gameName?.capitalizeFirstOfEach ?? "";
  }

  void _onGameChanged(String? value) {
    if (value == null || value.isEmpty) return;

    if (controller.gameId.isNotEmpty || controller.gameName != null) {
      controller.isselectedGame.value = false;
      return;
    }

    final selectedGame = controller.gameList.firstWhere(
      (item) => _gameDropDownName(item) == value,
      orElse: () => LatestUpcomingGame(),
    );
    if (selectedGame.id == null) return;

    controller.selectedItem.value = selectedGame;
    print("${selectedGame.id}/,.,.,.,.,.,.,.,.id");
    print("${selectedGame.organizationId}/,.,.,.,.,.,.,.,.id");
    print("${controller.selectedItem.value?.id.toString()}/,.,.,.,.,.,.,.,.gameid");
    controller.selectedGameId = int.parse(controller.selectedItem.value!.id!.toString());
    controller.selectedOrganizerId = int.parse(controller.selectedItem.value!.organizationId!.toString());
    print("${controller.selectedGameId}");
    controller.getGameDetails(controller.selectedGameId);
    controller.isselectedGame.value = false;
    controller.resetCategory();

    print("reset");
  }

  @override
  Widget build(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    var width = MediaQuery.of(context).size.width;
    print("game gameType");
    print("tab value => ${controller.tabValue}");
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
      child: SafeArea(
        child: Column(children: [
          const SizedBox(height: 15),
          Padding(
            padding: const EdgeInsets.fromLTRB(15, 0, 15, 0),
            child: Row(mainAxisAlignment: MainAxisAlignment.start, children: [
              RippleClick(
                onTap: () {
                  Get.back();
                  print("Back ->All Select Data Reset");
                },
                child: const Icon(Icons.arrow_back, size: 25, color: ColorCode.appBackArrowColor),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                  "Bet ${controller.gameType != "" ? "- ${controller.gameType.capitalizeFirstOfEach}" : "- Game"}",
                  style:  CustomStyle.bottomSheetTitle),
              const Spacer(),
            ]),
          ),
          const Divider(color: ColorCode.divider),
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(15, 0, 15, 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    Obx(
                      () => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Select Game*',
                            style: CustomStyle.hintTextStyle,
                          ),
                          const SizedBox(
                            height: 8,
                          ),
                          CustomDropDown(
                            hintText: "Select",
                            borderColor: controller.isselectedGame.value ? Colors.red : Colors.white,
                            dropDownHeight: height * 0.5,
                            dropDownList: _gameDropDownList(),
                            selectedItem: _selectedGameName(),
                            onChanged: _onGameChanged,
                          ),
                          if (controller.isselectedGame.value == true)
                            const Padding(
                              padding: EdgeInsets.only(
                                left: 0,
                              ),
                              child: Text(
                                'Please Select A Game',
                                style: TextStyle(color: Colors.red, fontSize: 12),
                              ),
                            ),
                        ],
                      ),
                    ),
        
                    const SizedBox(height: 15),
        
                    Obx(
                      () => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CustomDropDown(
                            title: 'Select Category*',
                            hintText: 'Select',
                            borderColor: controller.isselectedCategory.value
                                ? Colors.red
                                : ColorCode.white,
                            dropDownList:
                                controller.categoryTypeMapList.values.toList(),
                            selectedItem:
                                controller.selectedCategory.value.isEmpty
                                    ? null
                                    : controller.categoryTypeMapList.keys
                                            .toList()
                                            .contains(
                                                controller.selectedCategory.value)
                                        ? controller.categoryTypeMapList[
                                            controller.selectedCategory.value]
                                        : null,
                            onChanged: (value) {
                              debugPrint("Select : $value");
                              if (controller.selectedCategory.value !=
                                  controller.categoryTypeMapList.entries
                                      .firstWhere((entry) => entry.value == value)
                                      .key) {
                                // reset values
                                controller.resetCategory();
                                print("reset");
                              }
        
                              controller.selectedCategory.value = controller
                                  .categoryTypeMapList.entries
                                  .firstWhere((entry) => entry.value == value)
                                  .key;
        
                              if (controller.selectedCategory.value ==
                                      "over_under" &&
                                  controller.selectedCategory.value !=
                                      controller.categoryTypeMapList.entries
                                          .firstWhere(
                                              (entry) => entry.value == value)
                                          .key) {
                                if (controller
                                        .forIndividual_AcrossAllGroup.value ==
                                    1) {
                                  controller.isPlayerORTeam.value = 1;
                                  controller.chooseSelection.value = "player";
                                  controller.teamSelectederror.value == false;
                                  controller.selectedPlayerError.value = false;
                                  controller.isIndividualOrAccross.value =
                                      "individual";
                                  print(
                                      "reset -> Indivial and across all group choice 1");
                                  print(
                                      "reset : player -> ${controller.isPlayerORTeam.value} : ${controller.chooseSelection.value}");
                                }
                              }
                              if (controller.selectedCategory.value ==
                                      "win_loss" &&
                                  controller.selectedCategory.value !=
                                      controller.categoryTypeMapList.entries
                                          .firstWhere(
                                              (entry) => entry.value == value)
                                          .key) {
                                controller.isPlayerORTeam.value = 1;
                                controller.chooseSelection.value = "player";
                                if (controller.gameType == "Wolf" ||
                                    controller.selectedGameType.value == "wolf") {
                                  controller.isPlayerORTeam.value = 1;
                                  controller.chooseSelection.value = "player";
                                  controller.isSelectedPlayer.value = false;
                                  controller.selectedPlayerListIndex.clear();
                                  controller.teamSelectederror.value == false;
                                }
                                controller.isSelectedPlayer.value = false;
                                controller.selectedPlayerListIndex.clear();
                                controller.selectedTeamAndPlayerName.value = '';
                                controller.teamSelectederror.value = false;
                                controller.selectedPlayerError.value = false;
        
                                print("reset -> Team");
                                print("reset -> Player");
                              }
                              if (controller.selectedCategory.value == '') {
                                controller.isselectedCategory.value = true;
                              } else {
                                controller.isselectedCategory.value = false;
                              }
                            },
                          ),
                          if (controller.isselectedCategory.value == true)
                            const Padding(
                              padding: EdgeInsets.only(
                                left: 0,
                              ),
                              child: Text(
                                'Please Select A Category',
                                style: TextStyle(color: Colors.red, fontSize: 12),
                              ),
                            ),
                        ],
                      ),
                    ),
        
                    const SizedBox(height: 15),
        
                    //What you are betting?*
                    Obx(
                      () => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          CustomDropDown(
                            key: Key(controller.betTypeDropdownKey.value),
                            title: 'What you are Betting?*',
                            hintText: 'Select bet type',
                            borderColor:
                                controller.isselectedBetType.value == false
                                    ? Colors.red
                                    : ColorCode.white,
                            dropDownList: controller.selectedCategory.value ==
                                    "over_under"
                                ? StaticData.overunderBetTypeMapList.values
                                    .toSet()
                                    .toList()
                                : (controller.selectedGameType.value ==
                                            "progressive_skins" ||
                                        controller.selectedGameType.value ==
                                            "regular_skins")
                                    ? StaticData.winloseBetTypeMapList2.values
                                        .toSet()
                                        .toList()
                                    : controller.selectedGameType.value ==
                                                "wolf" ||
                                            controller.selectedGameType.value ==
                                                "stableford" ||
                                            controller.selectedGameType.value ==
                                                "stroke_play"
                                        ? controller.winloseBetTypeMapList.values
                                            .toSet()
                                            .toList()
                                        : StaticData.winloseBetTypeMapList.values
                                            .toSet()
                                            .toList(),
                            selectedItem: controller.selectedCategory.value ==
                                    "over_under"
                                ? StaticData.overunderBetTypeMapList[
                                    controller.selectedBetType.value]
                                : (controller.selectedGameType.value ==
                                            "progressive_skins" ||
                                        controller.selectedGameType.value ==
                                            "regular_skins")
                                    ? StaticData.winloseBetTypeMapList2[
                                        controller.selectedBetType.value]
                                    : controller.selectedGameType.value ==
                                                "wolf" ||
                                            controller.selectedGameType.value ==
                                                "stableford"||
                                            controller.selectedGameType.value ==
                                                "stroke_play"
                                        ? controller.winloseBetTypeMapList[
                                            controller.selectedBetType.value]
                                        : StaticData.winloseBetTypeMapList[
                                            controller.selectedBetType.value],
                            onChanged: (value) {
                              debugPrint("Select : $value");
                              controller.selectedBetType.value = controller
                                          .selectedCategory.value ==
                                      "over_under"
                                  ? StaticData.overunderBetTypeMapList.entries
                                      .firstWhere((entry) => entry.value == value)
                                      .key
                                      .toString()
                                  : (controller.selectedGameType.value ==
                                              "progressive_skins" ||
                                          controller.selectedGameType.value ==
                                              "regular_skins")
                                      ? StaticData.winloseBetTypeMapList2.entries
                                          .firstWhere(
                                              (entry) => entry.value == value)
                                          .key
                                          .toString()
                                      : controller.selectedGameType.value ==
                                                  "wolf" ||
                                              controller.selectedGameType.value ==
                                                  "stableford"||
                                              controller.selectedGameType.value ==
                                                  "stroke_play"
                                          ? controller
                                              .winloseBetTypeMapList.entries
                                              .firstWhere(
                                                  (entry) => entry.value == value)
                                              .key
                                              .toString()
                                          : StaticData
                                              .winloseBetTypeMapList.entries
                                              .firstWhere(
                                                  (entry) => entry.value == value)
                                              .key
                                              .toString();
        
                              print(
                                  "Selected Bet Type => ${controller.selectedBetType.value}");
                              if (controller.selectedBetType.value == '') {
                                controller.isselectedBetType.value = false;
                              } else {
                                controller.isselectedBetType.value = true;
                              }
                              if (controller.selectedBetType.value !=
                                  'bet_on_hole') {
                                controller.holeController.text = '0';
                                controller.holeCounter.value = 0;
                                print("reset hole");
                              }
                              if (controller.selectedBetType.value ==
                                  "on_match") {
                                controller.isPlayerORTeam.value = 0;
                                controller.chooseSelection.value = "team";
                              }
                              if (controller.selectedBetType.value ==
                                      'bet_on_hole' ||
                                  controller.selectedBetType.value ==
                                      'skode_pool' ||
                                  controller.selectedBetType.value ==
                                      'junk_pool' ||
                                  controller.selectedBetType.value == 'on_game') {
                                controller.isPlayerORTeam.value = 1;
                                controller.chooseSelection.value = "player";
                              }
                              //reset the team id
                              controller.selectedTeamAndPlayerName.value = '';
                              controller.selectedTeamId.value = '';
                              controller.selectedMatchId.value = '';
                              controller.selectedPlayerListIndex.clear();
                              //reset the player id
                              controller.selectedPlayerId.value = '';
                            },
                          ),
                          if (controller.isselectedBetType.value == false)
                            const Padding(
                              padding: EdgeInsets.only(
                                left: 0,
                              ),
                              child: Text(
                                'Please Select A Bet Type',
                                style: TextStyle(color: Colors.red, fontSize: 12),
                              ),
                            ),
                        ],
                      ),
                    ),
        
                    const SizedBox(height: 15),
        
                    Obx(
                      () => Visibility(
                        visible:
                            controller.selectedBetType.value == "bet_on_hole",
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Select Hole*",
                                style: CustomStyle.hintTextStyle),
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: width * 0.10,
                                  height: height * 0.06,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: ColorCode.plusBgColor,
                                      padding: EdgeInsets.zero,
                                      shape: const RoundedRectangleBorder(
                                          borderRadius: BorderRadius.only(
                                            bottomLeft: Radius.circular(30),
                                            topLeft: Radius.circular(30),
                                          ),
                                          side:
                                              BorderSide(color: ColorCode.white)),
                                    ),
                                    onPressed: controller.dHoleCounter,
                                    child: const Icon(Icons.remove,
                                        color: ColorCode.mainColor),
                                  ),
                                ),
                                Container(
                                  width: width * 0.15,
                                  height: height * 0.06,
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(0),
                                    border: Border.all(color: Colors.white),
                                  ),
                                  child: Center(
                                    child: TextFormField(
                                      onChanged: (value) {
                                        controller.holeCounter.value =
                                            int.parse(value);
                                        if (controller.holeController.text ==
                                                '0' ||
                                            controller.holeCounter.value == 0) {
                                          controller.isholeController.value =
                                              true;
                                        } else {
                                          controller.isholeController.value =
                                              false;
                                        }
                                      },
                                      controller: controller.holeController,
                                      textAlignVertical: TextAlignVertical.center,
                                      textAlign: TextAlign.center,
                                      style:  CustomStyle.summaryTableText.copyWith(
                                        fontSize: appFontSize.value + 16,
                                        color: ColorCode.labelText),
                                      keyboardType: TextInputType.number,
                                      textInputAction: TextInputAction.done,
                                      inputFormatters: [
                                        LengthLimitingTextInputFormatter(2),
                                      ],
                                      decoration: const InputDecoration(
                                          border: InputBorder.none,
                                          contentPadding: EdgeInsets.zero,
                                          isCollapsed: true),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: width * 0.10,
                                  height: height * 0.06,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: ColorCode.plusBgColor,
                                      padding: EdgeInsets.zero,
                                      shape: const RoundedRectangleBorder(
                                          borderRadius: BorderRadius.only(
                                            topRight: Radius.circular(30),
                                            bottomRight: Radius.circular(30),
                                          ),
                                          side:
                                              BorderSide(color: ColorCode.white)),
                                    ),
                                    onPressed: controller.iHoleCounter,
                                    child: const Icon(Icons.add,
                                        color: ColorCode.mainColor),
                                  ),
                                ),
                              ],
                            ),
                            if (controller.isholeController.value == true)
                              const Padding(
                                padding: EdgeInsets.only(
                                  left: 0,
                                ),
                                child: Text(
                                  "Zero Not Allowed",
                                  style:
                                      TextStyle(color: Colors.red, fontSize: 12),
                                ),
                              ),
                            const SizedBox(height: 15),
                          ],
                        ),
                      ),
                    ),
                    //Choose Selection* player or team
                    Obx(() => Visibility(
                          visible:
                              controller.selectedCategory.value == "win_loss" ||
                                  (controller.selectedCategory.value == "" &&
                                      controller.selectedBetType.value != ""),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Choose Selection*",
                                style: CustomStyle.hintTextStyle,
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Flexible(
                                    child: Container(
                                      child: RadioListTile(
                                        value: 1,
                                        groupValue:
                                            controller.isPlayerORTeam.value,
                                        materialTapTargetSize:
                                            MaterialTapTargetSize.shrinkWrap,
                                        visualDensity: const VisualDensity(
                                          horizontal:
                                              -4.0, // Use more extreme values
                                          vertical:
                                              -4.0, // Use more extreme values
                                        ),
                                        contentPadding: EdgeInsets.zero,
                                        controlAffinity:
                                            ListTileControlAffinity.leading,
                                        dense: true,
                                        activeColor: ColorCode.mainColor,
                                        onChanged:
                                            (controller.selectedBetType.value ==
                                                    "on_match")
                                                ? null
                                                : (value) {
                                                    if (controller
                                                                .selectedGameType
                                                                .value ==
                                                            "progressive_skins" ||
                                                        controller
                                                                .selectedGameType
                                                                .value ==
                                                            "regular_skins" ||
                                                        controller
                                                                .selectedGameType
                                                                .value ==
                                                            "wolf") {
                                                      print(
                                                          "GameType :${controller.selectedGameType.value} for select only players");
                                                    } else {
                                                      if (controller
                                                              .selectedBetType
                                                              .value ==
                                                          "on_match") {
                                                        controller.isPlayerORTeam
                                                            .value = 0;
                                                        controller.chooseSelection
                                                            .value = "team";
                                                      } else {
                                                        //reset the team id
                                                        controller
                                                            .selectedTeamAndPlayerName
                                                            .value = '';
                                                        controller.selectedTeamId
                                                            .value = '';
                                                        controller.selectedMatchId
                                                            .value = '';
                                                        controller
                                                            .selectedPlayerListIndex
                                                            .clear();
        
                                                        controller.isPlayerORTeam
                                                            .value = 1;
                                                        controller.chooseSelection
                                                            .value = "player";
                                                        print(
                                                            "${controller.chooseSelection.value} -> ${controller.isPlayerORTeam.value}");
                                                      }
                                                    }
                                                  },
                                        title: Transform.translate(
                                            offset: const Offset(-12, 0),
                                            child: Text("Player",
                                                style: controller.isPlayerORTeam.value == 1
                                                            ? CustomStyle.onRadioButtonTitle
                                                : CustomStyle.offRadioButtonTitle)),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: Container(
                                      child: RadioListTile(
                                        value: 0,
                                        groupValue:
                                            controller.isPlayerORTeam.value,
                                        visualDensity: const VisualDensity(
                                          horizontal:
                                              -4.0, // Use more extreme values
                                          vertical:
                                              -4.0, // Use more extreme values
                                        ),
                                        contentPadding: EdgeInsets.zero,
                                        dense: true,
                                        activeColor: ColorCode.mainColor,
                                        materialTapTargetSize:
                                            MaterialTapTargetSize.shrinkWrap,
                                        controlAffinity:
                                            ListTileControlAffinity.leading,
                                        onChanged:
                                            (controller.selectedGameType.value !=
                                                            "progressive_skins" &&
                                                        controller.selectedGameType
                                                                .value !=
                                                            "regular_skins" &&
                                                        controller
                                                                .selectedGameType
                                                                .value !=
                                                            "stableford" &&
                                                        controller
                                                                .selectedGameType
                                                                .value !=
                                                            "wolf") &&
                                                    (controller.selectedBetType
                                                                .value !=
                                                            'bet_on_hole' &&
                                                        controller.selectedBetType
                                                                .value !=
                                                            'skode_pool' &&
                                                        controller.selectedBetType
                                                                .value !=
                                                            'junk_pool' &&
                                                        controller.selectedBetType
                                                                .value !=
                                                            'on_game' &&
                                                        controller.selectedBetType
                                                                .value !=
                                                            'on_top_3' &&
                                                        controller.selectedBetType
                                                                .value !=
                                                            'on_bottom_3')
                                                ? (value) {
                                                    if (controller
                                                                .selectedGameType
                                                                .value ==
                                                            "progressive_skins" ||
                                                        controller
                                                                .selectedGameType
                                                                .value ==
                                                            "regular_skins" ||
                                                        controller
                                                                .selectedGameType
                                                                .value ==
                                                            "stableford" ||
                                                        controller
                                                                .selectedGameType
                                                                .value ==
                                                            "wolf") {
                                                      print(
                                                          "GameType :${controller.selectedGameType.value} for select only players");
                                                    } else {
                                                      if (controller
                                                              .selectedBetType
                                                              .value ==
                                                          "on_match") {
                                                        controller.isPlayerORTeam
                                                            .value = 0;
                                                        controller.chooseSelection
                                                            .value = "team";
                                                      } else {
                                                        //reset the player id
                                                        controller
                                                            .selectedTeamAndPlayerName
                                                            .value = '';
                                                        controller
                                                            .selectedPlayerId
                                                            .value = '';
                                                        controller
                                                            .selectedPlayerListIndex
                                                            .clear();
        
                                                        controller.isPlayerORTeam
                                                            .value = 0;
                                                        controller.chooseSelection
                                                            .value = "team";
                                                        print(
                                                            "${controller.chooseSelection.value} -> ${controller.isPlayerORTeam.value}");
                                                      }
                                                    }
                                                  }
                                                : null,
                                        title: Transform.translate(
                                          offset: const Offset(-13, 0),
                                          child: Text("Team",
                                              style: controller.isPlayerORTeam.value == 0
                                                  ? CustomStyle.onRadioButtonTitle
                                                  : CustomStyle.offRadioButtonTitle),
                                        ),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ],
                          ),
                        )),
        
                    //choice Individual and 2 for Across All Group
                    Obx(
                      () => Visibility(
                        visible:
                            controller.selectedCategory.value == "over_under",
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Radio(
                                    value: 1,
                                    groupValue: controller
                                        .forIndividual_AcrossAllGroup.value,
                                    visualDensity: const VisualDensity(
                                      horizontal: VisualDensity.minimumDensity,
                                      vertical: VisualDensity.minimumDensity,
                                    ),
                                    materialTapTargetSize:
                                        MaterialTapTargetSize.shrinkWrap,
                                    fillColor:
                                        MaterialStateProperty.resolveWith<Color?>(
                                            (states) {
                                      if (states
                                          .contains(MaterialState.selected)) {
                                        return ColorCode
                                            .switchButton; // Color when selected
                                      }
                                      return null;
                                    }),
                                    onChanged: (value) {
                                      //reset the player id
                                      controller.selectedTeamAndPlayerName.value =
                                          '';
                                      controller.selectedPlayerId.value = '';
                                      controller.selectedPlayerListIndex.clear();
                                      controller.selectedPlayerError.value = true;
                                      controller.teamSelectederror.value == false;
                                      controller.isPlayerORTeam.value = 1;
                                      controller.chooseSelection.value = "player";
                                      controller.isSelectedPlayer.value = false;
                                      controller.isIndividualOrAccross.value =
                                          "individual";
                                      controller.forIndividual_AcrossAllGroup
                                          .value = value ?? 0;
                                      controller.selectedIndividual_AcrossAllGroup
                                          .value = "For Individual";
                                      print(
                                          "For Individual value => ${controller.forIndividual_AcrossAllGroup.value}");
                                    }),
                                Transform.translate(
                                    offset: const Offset(5, 0),
                                    child: Text("For Individual",
                                        style: controller.forIndividual_AcrossAllGroup.value == 1
                                            ? CustomStyle.onRadioButtonTitle
                                            : CustomStyle.offRadioButtonTitle)),
                              ],
                            ),
                            Row(
                              children: [
                                Radio(
                                    value: 0,
                                    groupValue: controller
                                        .forIndividual_AcrossAllGroup.value,
                                    visualDensity: const VisualDensity(
                                      horizontal: VisualDensity.minimumDensity,
                                      vertical: VisualDensity.minimumDensity,
                                    ),
                                    materialTapTargetSize:
                                        MaterialTapTargetSize.shrinkWrap,
                                    fillColor:
                                        MaterialStateProperty.resolveWith<Color?>(
                                            (states) {
                                      if (states
                                          .contains(MaterialState.selected)) {
                                        return ColorCode
                                            .switchButton; // Color when selected
                                      }
                                      return null;
                                    }),
                                    onChanged: controller
                                                .forIndividual_AcrossAllGroup
                                                .value ==
                                            1
                                        ? null
                                        : (value) {
                                            //reset the player id
                                            controller.selectedPlayerListIndex
                                                .clear();
                                            controller.selectedPlayerError.value =
                                                false;
                                            controller.teamSelectederror.value ==
                                                false;
                                            controller.isSelectedPlayer.value =
                                                false;
                                            controller
                                                .isIndividualOrAccross.value = "";
                                            controller
                                                .forIndividual_AcrossAllGroup
                                                .value = 0;
                                            controller
                                                .selectedIndividual_AcrossAllGroup
                                                .value = "For Across All Group";
                                            print(
                                                "For Across All Group value => ${controller.forIndividual_AcrossAllGroup.value}");
                                          }),
                                Transform.translate(
                                    offset: const Offset(5, 0),
                                    child: Text("For Across All Group",
                                        style:controller.forIndividual_AcrossAllGroup.value == 0
                                            ? CustomStyle.onRadioButtonTitle
                                            : CustomStyle.offRadioButtonTitle)),
                                const SizedBox(width: 8),
                                Card(
                                  elevation: 0,
                                  color: ColorCode.plusBgColor,
                                  child: Container(
                                      height: 30,
                                      child: Padding(
                                        padding: const EdgeInsets.only(left: 8.0,right: 8.0),
                                        child: Center(child: Text("Coming Soon",style: CustomStyle.paragraph2DarkStyle)),
                                      )
                                  ),
                                )
                              ],
                            ),
                            const SizedBox(height: 8),
                          ],
                        ),
                      ),
                    ),
        
                    //Select Match & Team
                    Obx(
                      () => Visibility(
                        visible:
                            controller.forIndividual_AcrossAllGroup.value != 0,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            if ((controller.selectedCategory.value ==
                                        "win_loss" ||
                                    controller.selectedCategory.value == "" ||
                                    controller.selectedBetType.value ==
                                        "on_match") &&
                                controller.chooseSelection.value == "team" &&
                                controller.isPlayerORTeam.value == 0)
                              Text(
                                "Team Selection*",
                                style: CustomStyle.hintTextStyle,
                              ),
                            if ((
                                    ((controller.selectedCategory.value == "" ||
                                            controller.selectedCategory.value ==
                                                "win_loss") &&
                                        controller.chooseSelection.value ==
                                            "player" &&
                                        controller.isPlayerORTeam.value == 1)) ||
                                (controller.selectedCategory.value ==
                                        "over_under" &&
                                    controller
                                            .forIndividual_AcrossAllGroup.value !=
                                        0))
                              Text(
                                "Player Selection*",
                                style: CustomStyle.hintTextStyle,
                              ),
                            const SizedBox(
                              height: 8,
                            ),
        
                            //drop-down button
                            if ((controller.selectedCategory.value == "") ||
                                (controller.chooseSelection.value == "team" &&
                                    controller.isPlayerORTeam.value == 0) ||
                                (controller.chooseSelection.value == "player" &&
                                    controller.isPlayerORTeam.value == 1) ||
                                controller.forIndividual_AcrossAllGroup.value ==
                                    1)
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Obx(
                                        () => GestureDetector(
                                        behavior: HitTestBehavior.opaque,
                                      onTap: () {
                                        if (controller.playerList.isNotEmpty &&
                                            controller
                                                .foursomeList.isNotEmpty) {
                                          controller.intialvalue.value == false
                                              ? controller.intialvalue.value =
                                          true
                                              : controller.intialvalue.value =
                                          false;
                                          print(
                                              "intialvalue ${controller.intialvalue.value}");
                                          print(
                                              "progressive_skins or regular_skins");
                                        } else if (controller
                                            .playerList.isNotEmpty) {
                                          controller.intialvalue.value == false
                                              ? controller.intialvalue.value =
                                          true
                                              : controller.intialvalue.value =
                                          false;
                                          print(
                                              "intialvalue ${controller.intialvalue.value}");
                                          print(
                                              "playerList ${controller.playerList}");
                                        }
                                        if (controller.chooseSelection.value ==
                                            "team" &&
                                            controller.foursomeList.isEmpty) {
                                          ToastMessage.error(
                                              message:
                                              "This game hase not declare teams yet");
                                        }
                                        print(
                                            "playerList ${controller.playerList}");
                                      },
                                      child: IgnorePointer(
                                        child: CustomDropDown(
                                          isReadOnly: true,
                                          hintText: controller.selectedTeamAndPlayerName.value == ''
                                              ? "Select"
                                              : controller.selectedTeamAndPlayerName.value,
                                          dropDownList: controller.selectedTeamAndPlayerName.value == ''
                                              ? const []
                                              : [controller.selectedTeamAndPlayerName.value],
                                          selectedItem: controller.selectedTeamAndPlayerName.value == ''
                                              ? null
                                              : controller.selectedTeamAndPlayerName.value,
                                          borderColor: (controller.teamSelectederror
                                              .value ==
                                              true ||
                                              controller.selectedPlayerError
                                                  .value ==
                                                  true)
                                              ? controller.selectedTeamAndPlayerName
                                              .value ==
                                              ''
                                              ? Colors.red
                                              : ColorCode.white
                                              : ColorCode.white,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            Visibility(
                              visible:
                                  (controller.chooseSelection.value == "team" &&
                                          (controller.selectedGameType.value !=
                                              "wolf") &&
                                          controller.selectedCategory.value !=
                                              "over_under") &&
                                      controller
                                              .selectedTeamAndPlayerName.value ==
                                          '' &&
                                      controller.teamSelectederror.value == true,
                              child: const Padding(
                                padding: EdgeInsets.only(
                                  left: 0,
                                ),
                                child: Text(
                                  'Please Select A Team Selection',
                                  style:
                                      TextStyle(color: Colors.red, fontSize: 12),
                                ),
                              ),
                            ),
                            Visibility(
                              visible: ((controller.selectedGameType.value ==
                                          "wolf") &&
                                      (controller.selectedTeamAndPlayerName
                                                  .value ==
                                              '' &&
                                          controller
                                                  .selectedPlayerError.value ==
                                              true)) ||
                                  (controller
                                              .selectedCategory.value ==
                                          "over_under" &&
                                      (controller.selectedTeamAndPlayerName
                                                  .value ==
                                              '' &&
                                          controller
                                                  .selectedPlayerError.value ==
                                              true)) ||
                                  controller
                                              .chooseSelection.value ==
                                          "player" &&
                                      controller
                                              .selectedTeamAndPlayerName.value ==
                                          '' &&
                                      controller.selectedPlayerError.value ==
                                          true,
                              child: const Padding(
                                padding: EdgeInsets.only(
                                  left: 0,
                                ),
                                child: Text(
                                  'Please Select A Player Selection',
                                  style:
                                      TextStyle(color: Colors.red, fontSize: 12),
                                ),
                              ),
                            ),
                            if (controller.intialvalue.value == false)
                              const SizedBox(
                                height: 8,
                              ),
                            //player
                            if (controller.intialvalue.value == false)
                              Obx(
                                () => Visibility(
                                  visible: ((controller.selectedCategory.value ==
                                                  "" ||
                                              controller.selectedCategory.value ==
                                                  "win_loss" ||
                                              controller.selectedBetType.value !=
                                                  "on_match") &&
                                          (controller.chooseSelection.value ==
                                                  "player" &&
                                              controller.isPlayerORTeam.value ==
                                                  1)) ||
                                      (controller.selectedCategory.value ==
                                              "over_under" &&
                                          controller.forIndividual_AcrossAllGroup
                                                  .value ==
                                              1),
                                  child: Container(
                                    decoration: const BoxDecoration(
                                      color: ColorCode.white,
                                      border: Border.fromBorderSide(BorderSide(
                                          color: Colors.white, width: 1)),
                                      borderRadius:
                                          BorderRadius.all(Radius.circular(15)),
                                    ),
                                    child: Column(
                                      mainAxisAlignment: MainAxisAlignment.start,
                                      children: [
                                        if (controller.playerList.isNotEmpty)
                                          ListView.builder(
                                            physics:
                                                const NeverScrollableScrollPhysics(),
                                            shrinkWrap: true,
                                            itemCount:
                                                controller.playerList.length,
                                            itemBuilder: (context, index) {
                                              var player =
                                                  controller.playerList[index];
        
                                              return Padding(
                                                padding:
                                                    const EdgeInsets.fromLTRB(
                                                        10, 5, 10, 5),
                                                child: GestureDetector(
                                                  onTap: () {
                                                    controller.selectPlayer(
                                                        index,
                                                        "${controller.playerList[index].name}",
                                                        "${player.id}");
                                                    print(
                                                        "Player id:  ${player.id}");
                                                  },
                                                  child: Container(
                                                    decoration:
                                                        const BoxDecoration(
                                                      color: ColorCode.bgColor,
                                                      border:
                                                          Border.fromBorderSide(
                                                              BorderSide(
                                                                  color: Colors
                                                                      .white,
                                                                  width: 1)),
                                                      borderRadius:
                                                          BorderRadius.all(
                                                              Radius.circular(
                                                                  15)),
                                                    ),
                                                    child: Row(
                                                      children: [
                                                        Padding(
                                                          padding:
                                                              const EdgeInsets
                                                                  .symmetric(
                                                                  horizontal: 10,
                                                                  vertical: 10),
                                                          child: ClipRRect(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(50),
                                                            child: Stack(
                                                              children: [
                                                                customCacheImage(
                                                                  url:
                                                                      "${player.profilePicture}",
                                                                  fit: BoxFit
                                                                      .cover,
                                                                  height: 60,
                                                                  width: 60,
                                                                ),
                                                                Obx(() {
                                                                  return controller
                                                                              .selectedPlayerListIndex
                                                                              .contains(
                                                                                  index) &&
                                                                          controller.isSelectedPlayer.value ==
                                                                              true
                                                                      ? Positioned
                                                                          .fill(
                                                                          child:
                                                                              Container(
                                                                            height:
                                                                                60,
                                                                            width:
                                                                                60,
                                                                            color: controller.selectedPlayerListIndex.contains(index) && controller.isSelectedPlayer.value == true
                                                                                ? ColorCode.check.withAlpha(150)
                                                                                : Colors.red.withAlpha(150),
                                                                            child:
                                                                                Icon(
                                                                              controller.selectedPlayerListIndex.contains(index) && controller.isSelectedPlayer.value == true
                                                                                  ? Icons.check
                                                                                  : Icons.close_rounded,
                                                                              color:
                                                                                  Colors.white,
                                                                              size:
                                                                                  40,
                                                                            ),
                                                                          ),
                                                                        )
                                                                      : const SizedBox
                                                                          .shrink();
                                                                })
                                                              ],
                                                            ),
                                                          ),
                                                        ),
                                                        Expanded(
                                                          child: Row(
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .spaceBetween,
                                                            children: [
                                                              Expanded(
                                                                child: Column(
                                                                  crossAxisAlignment:
                                                                      CrossAxisAlignment
                                                                          .start,
                                                                  children: [
                                                                    Text(
                                                                      player
                                                                          .name!,
                                                                      style: CustomStyle.playerNameStyle
                                                                    ),
                                                                    Container(
                                                                      height:
                                                                          Get.height *
                                                                              0.04,
                                                                      width:
                                                                          Get.width *
                                                                              0.55,
                                                                      child:
                                                                          SingleChildScrollView(
                                                                        scrollDirection:
                                                                            Axis.horizontal,
                                                                        child:
                                                                            Text(
                                                                          "${player.email}",
                                                                          style: CustomStyle.playerEmailStyle,
                                                                          overflow:
                                                                              TextOverflow.ellipsis,
                                                                        ),
                                                                      ),
                                                                    ),
                                                                  ],
                                                                ),
                                                              ),
                                                              Padding(
                                                                padding: EdgeInsets
                                                                    .only(
                                                                        right:
                                                                            15),
                                                                child: Column(
                                                                  mainAxisAlignment:
                                                                      MainAxisAlignment
                                                                          .center,
                                                                  children: [
                                                                    Text(
                                                                      "HCP",
                                                                      style: CustomStyle
                                                                          .t01Text
                                                                          .copyWith(
                                                                        color: Colors
                                                                            .black,
                                                                        fontSize:
                                                                            14,
                                                                      ),
                                                                      overflow:
                                                                          TextOverflow
                                                                              .ellipsis,
                                                                      maxLines: 1,
                                                                    ),
                                                                    Text(
                                                                      "${player.bgaHcp}",
                                                                      style: CustomStyle
                                                                          .t01Text
                                                                          .copyWith(
                                                                        color: Colors
                                                                            .black,
                                                                        fontSize:
                                                                            14,
                                                                      ),
                                                                      overflow:
                                                                          TextOverflow
                                                                              .ellipsis,
                                                                      maxLines: 1,
                                                                    )
                                                                  ],
                                                                ),
                                                              ),
                                                            ],
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ),
                                              );
                                            },
                                          ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
        
                            //team
                            if (controller.intialvalue.value == false)
                              Obx(
                                () => Visibility(
                                  visible: (controller.selectedCategory.value !=
                                          "over_under") &&
                                      ((controller.selectedCategory.value == "" ||
                                              controller.selectedCategory.value ==
                                                  "win_loss" ||
                                              controller.selectedBetType.value ==
                                                  "on_match") &&
                                          controller.chooseSelection.value ==
                                              "team" &&
                                          controller.isPlayerORTeam.value == 0),
                                  child: Container(
                                      decoration: const BoxDecoration(
                                        color: ColorCode.white,
                                        border: Border.fromBorderSide(BorderSide(
                                            color: Colors.white, width: 1)),
                                        borderRadius:
                                            BorderRadius.all(Radius.circular(15)),
                                      ),
                                      child: Column(
                                        children: [
                                          Obx(() => Visibility(
                                              visible:
                                                  controller.selectedGameType
                                                          .value ==
                                                      "calcutta",
                                              child:
                                                  controller
                                                          .foursomeList.isNotEmpty
                                                      ? ListView.builder(
                                                          shrinkWrap: true,
                                                          physics:
                                                              const NeverScrollableScrollPhysics(),
                                                          itemCount: controller
                                                              .foursomeList
                                                              .length,
                                                          padding:
                                                              EdgeInsets.zero,
                                                          itemBuilder:
                                                              (context, index) {
                                                            var dataItem = controller
                                                                    .foursomeList[
                                                                index];
                                                            return Container(
                                                              color: Colors.white,
                                                              child:
                                                                  Obx(
                                                                      () =>
                                                                          Column(
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
                                                                                      Text(dataItem.teeTime != null ? formatEventTime(dataItem.teeTime.toString()) : "12:20 (F)", style:CustomStyle.membersName.copyWith(color: ColorCode.mainColor, fontSize: appFontSize.value + 16)),
                                                                                      const SizedBox(width: 8),
                                                                                      Container(
                                                                                        height: 24,
                                                                                        constraints: const BoxConstraints(minWidth: 20),
                                                                                        decoration: BoxDecoration(
                                                                                          color: Colors.white,
                                                                                          border: Border.all(color: Colors.black, width: 1),
                                                                                          borderRadius: BorderRadius.circular(4),
                                                                                        ),
                                                                                        child: Center(
                                                                                          child: Text(
                                                                                            '${dataItem.fourSomeCardType} ',
                                                                                            textAlign: TextAlign.center,
                                                                                            style:  CustomStyle.summaryTableText.copyWith(
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
                                                                                                padding: const EdgeInsets.only(left: 8, right: 5),
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
                                                                                            for (int k = 0; k < dataItem.matches![i].teams![j].players!.length; k++) ...[
                                                                                              playerCard(
                                                                                                  playerName: dataItem.matches![i].teams![j].players![k].name.toString(),
                                                                                                  card: dataItem.matches![i].teams![j].players![k].card!,
                                                                                                  isSelected: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}" && controller.selectedTeamFoursomeId.value == dataItem.foursomeNo.toString(),
                                                                                                  onSelect: () {
                                                                                                    controller.selectTeam("F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}",
                                                                                                        // "${dataItem.matches![i].id}", dataItem.matches![i].teams![j].team.toString());
                                                                                                        "${dataItem.matches![i].teams![j].matchId}", dataItem.matches![i].teams![j].team.toString());
                                                                                                    print("Forsome : ${dataItem.foursomeNo}");
                                                                                                    controller.selectedTeamFoursomeId.value = dataItem.foursomeNo.toString();
        
                                                                                                    // print("match id :${dataItem.matches![i].id}");
                                                                                                    print("match id :${dataItem.matches![i].teams![j].matchId}");
                                                                                                    print("team  no :${dataItem.matches![i].teams![j].team}");
        
                                                                                                  }),
                                                                                            ],
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
                                                                                      if (i < dataItem.matches!.length - 1) const SizedBox(height: 5),
                                                                                      if (i == dataItem.matches!.length - 1) const SizedBox(height: 10)
                                                                                    ],
                                                                                  ],
                                                                                )
                                                                            ],
                                                                          )),
                                                            );
                                                          },
                                                        )
                                                      : const Text(""))),
                                          Obx(() => Visibility(
                                              visible:
                                                  controller.selectedGameType
                                                          .value ==
                                                      "ryder_cup",
                                              child:
                                                  controller
                                                          .foursomeList.isNotEmpty
                                                      ? ListView.builder(
                                                          shrinkWrap: true,
                                                          physics:
                                                              const NeverScrollableScrollPhysics(),
                                                          itemCount: controller
                                                              .foursomeList
                                                              .length,
                                                          padding:
                                                              EdgeInsets.zero,
                                                          itemBuilder:
                                                              (context, index) {
                                                            var dataItem = controller
                                                                    .foursomeList[
                                                                index];
                                                            return Container(
                                                              color: Colors.white,
                                                              child:
                                                                  Obx(
                                                                      () =>
                                                                          Column(
                                                                            children: [
                                                                              Container(
                                                                                color: ColorCode.thikness,
                                                                                height: 40,
                                                                                padding: const EdgeInsets.only(left: 15, right: 8),
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
                                                                                      Text(dataItem.teeTime != null ? formatTeeTime(dataItem.teeTime.toString()) : "", style: CustomStyle.junkbtn.copyWith(color: ColorCode.check, fontSize: appFontSize.value + 14)),
                                                                                      const SizedBox(width: 8),
                                                                                      Visibility(
                                                                                        visible: dataItem.fourSomeCardType != null && dataItem.fourSomeCardType != "",
                                                                                        child: Container(
                                                                                          height: 24,
                                                                                          constraints: const BoxConstraints(minWidth: 20),
                                                                                          decoration: BoxDecoration(
                                                                                            color: Colors.white,
                                                                                            border: Border.all(color: Colors.black, width: 1),
                                                                                            borderRadius: BorderRadius.circular(4),
                                                                                          ),
                                                                                          child: Center(
                                                                                            child: Text(
                                                                                              '${dataItem.fourSomeCardType} ',
                                                                                              textAlign: TextAlign.center,
                                                                                              style: const TextStyle(
                                                                                                color: Colors.black,
                                                                                                fontSize: 16,
                                                                                                fontWeight: FontWeight.w600,
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ),
                                                                                      ),
                                                                                      const Spacer(),
                                                                                      Icon(
                                                                                        controller.collapsedList[index] ? Icons.arrow_drop_down : Icons.arrow_drop_up,
                                                                                        size: 40,
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
                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
                                                                                  children: [
                                                                                    for (int i = 0; i < dataItem.matches!.length; i++) ...[
                                                                                      Padding(
                                                                                        padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
                                                                                        child: Row(
                                                                                          children: [
                                                                                            Text(
                                                                                              "Match - ${dataItem.matches![i].match}",
                                                                                              style: CustomStyle.gameDetailsSubTitle,
                                                                                            ),
                                                                                            const Spacer(),
                                                                                            Container(
                                                                                                height: 35,
                                                                                                width: Get.width * 0.35,
                                                                                                decoration: BoxDecoration(border: Border.all(color: ColorCode.borderColor, width: 1), borderRadius: BorderRadius.circular(30)),
                                                                                                padding: const EdgeInsets.only(left: 8, right: 5),
                                                                                                child: Row(
                                                                                                  children: [
                                                                                                    Text(controller.formatHolesToPlay(dataItem.matches![i].holesToPlay!),
                                                                                                        style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.titleText2, fontWeight: FontWeight.w500)),
                                                                                                    const Spacer(),
                                                                                                    const Icon(Icons.arrow_drop_down_sharp)
                                                                                                  ],
                                                                                                ))
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                      Container(
                                                                                        alignment: Alignment.centerLeft,
                                                                                        padding: const EdgeInsets.only(left: 5, right: 15, top: 3, bottom: 3),
                                                                                        child: SingleChildScrollView(
                                                                                          scrollDirection: Axis.horizontal,
                                                                                          child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                                                                            for (int j = 0; j < dataItem.matches![i].teams!.length; j++) ...[
                                                                                              if (dataItem.matches![i].teams![j].players!.length == 2 || dataItem.matches![i].teams![j].players!.length == 1)
                                                                                                Padding(
                                                                                                  padding: const EdgeInsets.only(left: 10),
                                                                                                  child: ryderPlayerCard(
                                                                                                      playerName: dataItem.matches![i].teams![j].players![0].name.toString(),
                                                                                                      player2Name: dataItem.matches![i].teams![j].players!.length == 1 ? "" : dataItem.matches![i].teams![j].players![1].name!.toString(),
                                                                                                      isSelected: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}" && controller.selectedTeamFoursomeId.value == dataItem.foursomeNo.toString(),
                                                                                                      onSelect: () {
                                                                                                        controller.selectTeam("F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}",
                                                                                                            // "${dataItem.matches![i].id}", dataItem.matches![i].teams![j].team.toString());
                                                                                                            "${dataItem.matches![i].teams![j].matchId}", dataItem.matches![i].teams![j].team.toString());
                                                                                                        print("Forsome : ${dataItem.foursomeNo}");
                                                                                                        controller.selectedTeamFoursomeId.value = dataItem.foursomeNo.toString();
                                                                                                        // print("match id :${dataItem.matches![i].id}");
                                                                                                        print("match id :${dataItem.matches![i].teams![j].matchId}");
                                                                                                        print("team  id :${dataItem.matches![i].teams![j].team}");
                                                                                                      }),
                                                                                                ),
                                                                                              if (j == 0) SizedBox(width: Get.width * 0.03),
                                                                                              Visibility(
                                                                                                visible: j == 0,
                                                                                                child: Image.asset(
                                                                                                  "assets/images/img_vs.png",
                                                                                                  height: 25,
                                                                                                  width: 25,
                                                                                                ),
                                                                                              ),
                                                                                            ],
                                                                                          ]),
                                                                                        ),
                                                                                      ),
                                                                                      if (i < dataItem.matches!.length - 1) const Divider(),
                                                                                      if (i < dataItem.matches!.length - 1)
                                                                                        const SizedBox(
                                                                                          height: 5,
                                                                                        ),
                                                                                      if (i == dataItem.matches!.length - 1)
                                                                                        const SizedBox(
                                                                                          height: 10,
                                                                                        )
                                                                                    ],
                                                                                  ],
                                                                                )
                                                                            ],
                                                                          )),
                                                            );
                                                          },
                                                        )
                                                      : const Text(""))),
                                          Obx(
                                            () => Visibility(
                                                visible:
                                                    controller.selectedGameType
                                                            .value ==
                                                        "horse_race",
                                                child:
                                                    controller.foursomeList
                                                            .isNotEmpty
                                                        ? ListView.builder(
                                                        itemCount: controller.foursomeList.length,
                                                        shrinkWrap: true,
                                                        padding: EdgeInsets.zero,
                                                        physics: const NeverScrollableScrollPhysics(),
                                                        itemBuilder: (context, index) {
                                                          var dataItem = controller.foursomeList[index];
                                                          return Container(
                                                          child: Obx(()=>
                                                          Column(
                                                              children: [
                                                                Padding(
                                                                  padding: const EdgeInsets.only(top:8.0,),
                                                                  child: Container(
                                                                    color: ColorCode.thikness,
                                                                    height: 40,
                                                                    padding: const EdgeInsets.only(left: 15, right: 8),
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
                                                                          InkWell(
                                                                            onTap: () {
                                                                              print("tee time ");
                                                                            },
                                                                            child: Text(dataItem.teeTime != null ? formatTeeTime(dataItem.teeTime.toString()) : "",
                                                                                style: CustomStyle.junkbtn.copyWith(color: ColorCode.check, fontSize: appFontSize.value + 14)),
                                                                          ),
                                                                          const SizedBox(width: 8),
                                                                          Visibility(
                                                                            visible: dataItem.fourSomeCardType != null && dataItem.fourSomeCardType != "",
                                                                            child: Container(
                                                                              height: 24,
                                                                              constraints: const BoxConstraints(minWidth: 20),
                                                                              decoration: BoxDecoration(
                                                                                color: Colors.white,
                                                                                border: Border.all(color: Colors.black, width: 1),
                                                                                borderRadius: BorderRadius.circular(4),
                                                                              ),
                                                                              child: Center(
                                                                                child: Text(
                                                                                  '${dataItem.fourSomeCardType} ',
                                                                                  textAlign: TextAlign.center,
                                                                                  style: const TextStyle(
                                                                                    color: Colors.black,
                                                                                    fontSize: 16,
                                                                                    fontWeight: FontWeight.w600,
                                                                                  ),
                                                                                ),
                                                                              ),
                                                                            ),
                                                                          ),
                                                                          const Spacer(),
                                                                          Icon(
                                                                            controller.collapsedList[index] ? Icons.arrow_drop_down : Icons.arrow_drop_up,
                                                                            size: 40,
                                                                          ),
                                                                        ],
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ),
                                                                if (!controller.collapsedList[index])
                                                                  ListView.builder(
                                                                        itemCount: controller.foursomeList[index].matches!.length,
                                                                        shrinkWrap: true,
                                                                        padding:
                                                                            const EdgeInsets
                                                                                .symmetric(
                                                                                horizontal:
                                                                                    5),
                                                                        physics:
                                                                            const NeverScrollableScrollPhysics(),
                                                                        // Prevent scrolling conflicts
                                                                        itemBuilder:
                                                                            (context,
                                                                                matchIndex) {
                                                                          var dataItem =
                                                                              controller
                                                                                      .foursomeList[
                                                                                  index];
                                                                          var items = controller
                                                                                  .foursomeList[
                                                                                      index]
                                                                                  .matches![
                                                                              matchIndex];
                                                                          var match = "";
                                                                          if (items
                                                                                  .matchType ==
                                                                              "hi_lo") {
                                                                            match =
                                                                                "Hi-Lo";
                                                                          }
                                                                          if (items
                                                                                  .matchType ==
                                                                              "sucker_in_bucket") {
                                                                            match =
                                                                                "Sucker in the Bucket";
                                                                          }
                                                                          if (items
                                                                                  .matchType ==
                                                                              "chapman") {
                                                                            match =
                                                                                "Chapman";
                                                                          }

                                                                          return Padding(
                                                                            padding: const EdgeInsets
                                                                                .only(
                                                                                left:
                                                                                    10.0,
                                                                                right:
                                                                                    10),
                                                                            child: Column(
                                                                              children: [
                                                                                const SizedBox(
                                                                                  height:
                                                                                      8,
                                                                                ),
                                                                                Row(
                                                                                  mainAxisAlignment:
                                                                                      MainAxisAlignment.spaceBetween,
                                                                                  children: [
                                                                                    Text(
                                                                                      match,
                                                                                      style: CustomStyle.gameDetailsSubTitle,
                                                                                    ),
                                                                                    Container(
                                                                                        width: Get.width * 0.35,
                                                                                        alignment: Alignment.centerLeft,
                                                                                        padding: const EdgeInsets.only(left: 10, right: 10),
                                                                                        height: 30,
                                                                                        decoration: BoxDecoration(
                                                                                            shape: BoxShape.rectangle,
                                                                                            border: Border.all(
                                                                                              width: 1,
                                                                                              color: ColorCode.borderColor,
                                                                                            ),
                                                                                            borderRadius: BorderRadius.circular(30)),
                                                                                        child: Row(
                                                                                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                                          children: [
                                                                                            Text(controller.formatHolesToPlay(controller.foursomeList[index].matches![matchIndex].holesToPlay!)),
                                                                                            const Icon(Icons.arrow_drop_down_sharp)
                                                                                          ],
                                                                                        )),
                                                                                  ],
                                                                                ),
                                                                                const SizedBox(
                                                                                    height:
                                                                                        8),
                                                                                Row(
                                                                                    mainAxisAlignment:
                                                                                        MainAxisAlignment.spaceBetween,
                                                                                    children: [
                                                                                      for (int j = 0;
                                                                                          j < items.teams!.length;
                                                                                          j++) ...[
                                                                                        if (items.teams![j].players!.length > 1)
                                                                                          GestureDetector(
                                                                                            onTap: () {
                                                                                              // controller.selectTeam("F${dataItem.foursomeNo} Match-${controller.foursomeList[index].matches![matchIndex].match} Team ${controller.foursomeList[index].matches![matchIndex].teams![j].team}", "${controller.foursomeList[index].matches![matchIndex].id}", "${controller.foursomeList[index].matches![matchIndex].teams![j].team}");
                                                                                              controller.selectTeam("F${dataItem.foursomeNo} Match-${controller.foursomeList[index].matches![matchIndex].match} Team ${controller.foursomeList[index].matches![matchIndex].teams![j].team}", "${controller.foursomeList[index].matches![matchIndex].teams![j].matchId}", "${controller.foursomeList[index].matches![matchIndex].teams![j].team}");
                                                                                              print("Forsome : ${controller.foursomeList[index].foursomeNo}");
                                                                                              controller.selectedTeamFoursomeId.value = controller.foursomeList[index].foursomeNo.toString();
                                                                                              // print("match id :${controller.foursomeList[index].matches![matchIndex].id}");
                                                                                              print("match id :${controller.foursomeList[index].matches![matchIndex].teams![j].matchId}");
                                                                                            },
                                                                                            child: Container(
                                                                                              width: Get.width * 0.38,
                                                                                              height: Get.height * 0.085,
                                                                                              decoration: BoxDecoration(
                                                                                                  color: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${controller.foursomeList[index].matches![matchIndex].match} Team ${controller.foursomeList[index].matches![matchIndex].teams![j].team}" && controller.selectedTeamFoursomeId.value == controller.foursomeList[index].foursomeNo.toString() ? ColorCode.mainColor : ColorCode.white,
                                                                                                  border: Border.all(
                                                                                                    color: ColorCode.borderColor,
                                                                                                    width: 1.5,
                                                                                                  ),
                                                                                                  borderRadius: BorderRadius.circular(8)),
                                                                                              padding: const EdgeInsets.only(left: 8, top: 5),
                                                                                              child: Column(
                                                                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                                                                mainAxisAlignment: MainAxisAlignment.start,
                                                                                                children: [
                                                                                                  Text(
                                                                                                    "${items.teams![j].groupName}",
                                                                                                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, fontFamily: 'inter', color: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${controller.foursomeList[index].matches![matchIndex].match} Team ${controller.foursomeList[index].matches![matchIndex].teams![j].team}" && controller.selectedTeamFoursomeId.value == controller.foursomeList[index].foursomeNo.toString() ? ColorCode.white : /*ColorCode.mainColor,*/ ColorCode.switchButton),
                                                                                                  ),
                                                                                                  const SizedBox(
                                                                                                    height: 6,
                                                                                                  ),
                                                                                                  SingleChildScrollView(
                                                                                                    scrollDirection: Axis.horizontal,
                                                                                                    child: Row(
                                                                                                      mainAxisAlignment: MainAxisAlignment.start,
                                                                                                      crossAxisAlignment: CrossAxisAlignment.center,
                                                                                                      children: [
                                                                                                        Container(
                                                                                                          height: 20,
                                                                                                          width: 20,
                                                                                                          decoration: const BoxDecoration(
                                                                                                              shape: BoxShape.circle),
                                                                                                          child: ClipOval(
                                                                                                            child: customCacheImage(url: items.teams![j].players![0].profilePicture, fit: BoxFit.cover),
                                                                                                          ),
                                                                                                        ),
                                                                                                        const SizedBox(
                                                                                                          width: 3,
                                                                                                        ),
                                                                                                        Text(
                                                                                                          getFormattedName(items.teams![j].players![0].name!),
                                                                                                          style: const TextStyle(fontSize: 11, color: ColorCode.labelText, fontFamily: 'inter', fontWeight: FontWeight.w500),
                                                                                                        ),
                                                                                                        Container(
                                                                                                          height: 20,
                                                                                                          width: 20,
                                                                                                          decoration: const BoxDecoration(shape: BoxShape.circle),
                                                                                                          child: ClipOval(
                                                                                                            child: customCacheImage(url: items.teams![j].players![1].profilePicture, fit: BoxFit.cover),
                                                                                                          ),
                                                                                                        ),
                                                                                                        const SizedBox(
                                                                                                          width: 3,
                                                                                                        ),
                                                                                                        Text(getFormattedName(items.teams![j].players![1].name!), style: const TextStyle(fontSize: 11, color: ColorCode.labelText, fontFamily: 'inter', fontWeight: FontWeight.w500)),
                                                                                                      ],
                                                                                                    ),
                                                                                                  ),
                                                                                                ],
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        if (j == 0)
                                                                                          Image.asset(
                                                                                            "assets/images/img_vs.png",
                                                                                            height: 25,
                                                                                            width: 25,
                                                                                          ),
                                                                                      ],
                                                                                    ]),
                                                                              ],
                                                                            ),
                                                                          );
                                                                        },
                                                                      )

                                                              ],
                                                            ),
                                                          ),
                                                        );
                                                        })
                                                        : const Text("")),
                                          ),
                                          Obx(
                                            () => Visibility(
                                              visible:
                                                  (controller.selectedGameType
                                                              .value ==
                                                          "3_2_1" ||
                                                      controller.selectedGameType
                                                              .value ==
                                                          "scramble" ||
                                                      controller.selectedGameType
                                                              .value ==
                                                          "vegas"),
                                              child:
                                                  controller
                                                          .foursomeList.isNotEmpty
                                                      ? ListView.builder(
                                                          shrinkWrap: true,
                                                          physics:
                                                              const NeverScrollableScrollPhysics(),
                                                          itemCount: controller
                                                              .foursomeList
                                                              .length,
                                                          padding:
                                                              EdgeInsets.zero,
                                                          itemBuilder:
                                                              (context, index) {
                                                            var dataItem = controller
                                                                    .foursomeList[
                                                                index];
                                                            return Container(
                                                              // height: Get.height*0.11,
                                                              color: Colors.white,
                                                              child:
                                                                  Obx(
                                                                      () =>
                                                                          Column(
                                                                            children: [
                                                                              Container(
                                                                                color: ColorCode.thikness,
                                                                                height: 40,
                                                                                padding: const EdgeInsets.only(left: 19, right: 8),
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
                                                                                      Text(dataItem.teeTime != null ? timeFormat(dataItem.teeTime.toString()) : "", style: CustomStyle.junkbtn.copyWith(color: ColorCode.check, fontSize: appFontSize.value + 14)),
                                                                                      const SizedBox(width: 8),
                                                                                      Visibility(
                                                                                        visible: dataItem.fourSomeCardType != null && dataItem.fourSomeCardType != "",
                                                                                        child: Container(
                                                                                          height: 24,
                                                                                          constraints: const BoxConstraints(minWidth: 20),
                                                                                          decoration: BoxDecoration(
                                                                                            color: Colors.white,
                                                                                            border: Border.all(color: Colors.black, width: 1),
                                                                                            borderRadius: BorderRadius.circular(4),
                                                                                          ),
                                                                                          child: Center(
                                                                                            child: Text(
                                                                                              '${dataItem.fourSomeCardType} ',
                                                                                              textAlign: TextAlign.center,
                                                                                              style: const TextStyle(
                                                                                                color: Colors.black,
                                                                                                fontSize: 16,
                                                                                                fontWeight: FontWeight.w600,
                                                                                              ),
                                                                                            ),
                                                                                          ),
                                                                                        ),
                                                                                      ),
                                                                                      const Spacer(),
                                                                                      Icon(
                                                                                        controller.collapsedList[index] ? Icons.arrow_drop_down : Icons.arrow_drop_up,
                                                                                        size: 40,
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
                                                                                  crossAxisAlignment: CrossAxisAlignment.start,
        
                                                                                  children: [
                                                                                    for (int i = 0; i < dataItem.matches!.length; i++) ...[
                                                                                      Padding(
                                                                                        padding: const EdgeInsets.fromLTRB(19, 10, 15, 10),
                                                                                        child: Row(
                                                                                          mainAxisAlignment: MainAxisAlignment.start,
                                                                                          children: [
                                                                                            Text(
                                                                                              "Match - ${dataItem.matches![i].match}",
                                                                                              style: CustomStyle.gameDetailsSubTitle,
                                                                                            ),
                                                                                            if (dataItem.matches![i].matchType != null)
                                                                                              Container(
                                                                                                  height: 35,
                                                                                                  width: Get.width * 0.15,
                                                                                                  decoration: BoxDecoration(border: Border.all(color: ColorCode.codColor, width: 1), shape: BoxShape.circle
                                                                                                      ),
                                                                                                  child: Row(
                                                                                                    mainAxisAlignment: MainAxisAlignment.center,
                                                                                                    children: [
                                                                                                      Text(dataItem.matches![i].matchType!,
                                                                                                          style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.codColor, fontWeight: FontWeight.w500)),
                                                                                                    ],
                                                                                                  )),
                                                                                            const Spacer(),
                                                                                            Container(
                                                                                                height: 35,
                                                                                                width: Get.width * 0.28,
                                                                                                decoration: BoxDecoration(border: Border.all(color: ColorCode.borderColor, width: 1), borderRadius: BorderRadius.circular(30)),
                                                                                                padding: const EdgeInsets.only(left: 8, right: 5),
                                                                                                child: Row(
                                                                                                  children: [
                                                                                                    Text(controller.formatHolesToPlay(dataItem.matches![i].holesToPlay!),
                                                                                                        style: CustomStyle.secondNameTextStyle.copyWith(color: ColorCode.titleText2, fontWeight: FontWeight.w500)),
                                                                                                    const Spacer(),
                                                                                                    const Icon(Icons.arrow_drop_down_sharp)
                                                                                                  ],
                                                                                                ))
                                                                                          ],
                                                                                        ),
                                                                                      ),
                                                                                      Container(
                                                                                        alignment: Alignment.centerLeft,
                                                                                        padding: const EdgeInsets.only(left: 5, right: 15, top: 3, bottom: 3),
                                                                                        child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                                                                                          for (int j = 0; j < dataItem.matches![i].teams!.length; j++) ...[
                                                                                            Column(
                                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                                              children: [
                                                                                                for (int k = 0; k < 2 && k < dataItem.matches![i].teams![j].players!.length; k++) ...[
                                                                                                  if (dataItem.matches![i].teams![j].players!.length == 1)
                                                                                                    Padding(
                                                                                                      padding: const EdgeInsets.only(left: 15),
                                                                                                      child: ryderPlayerCard(
                                                                                                          playerName: dataItem.matches![i].teams![j].players![k].name.toString(),
                                                                                                          player2Name: '',
                                                                                                          isSelected: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}" && controller.selectedTeamFoursomeId.value == dataItem.foursomeNo.toString(),
                                                                                                          onSelect: () {
                                                                                                            // controller.selectTeam("F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}", "${dataItem.matches![i].id}", "${dataItem.matches![i].teams![j].team}");
                                                                                                            controller.selectTeam("F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}",
                                                                                                                "${dataItem.matches![i].teams![j].matchId}", "${dataItem.matches![i].teams![j].team}");
                                                                                                            print("Forsome : ${dataItem.foursomeNo}");
                                                                                                            controller.selectedTeamFoursomeId.value = dataItem.foursomeNo.toString();
                                                                                                            // print("match id :${dataItem.matches![i].id}");
                                                                                                            print("match id :${dataItem.matches![i].teams![j].matchId}");
                                                                                                            print("team  id :${dataItem.matches![i].teams![j].team}");
                                                                                                          }),
                                                                                                    ),
                                                                                                ],
                                                                                              ],
                                                                                            ),
                                                                                            if (dataItem.matches![i].teams![j].players!.length == 2)
                                                                                              Padding(
                                                                                                padding: const EdgeInsets.only(left: 10),
                                                                                                child: ryderPlayerCard(
                                                                                                    playerName: dataItem.matches![i].teams![j].players![0].name.toString(),
                                                                                                    player2Name: dataItem.matches![i].teams![j].players![1].name!.toString(),
                                                                                                    isSelected: controller.selectedTeamAndPlayerName.value == "F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}" && controller.selectedTeamFoursomeId.value == dataItem.foursomeNo.toString(),
                                                                                                    onSelect: () {
                                                                                                      controller.selectTeam("F${dataItem.foursomeNo} Match-${dataItem.matches![i].match} Team ${dataItem.matches![i].teams![j].team}",
                                                                                                          "${dataItem.matches![i].teams![j].matchId}", dataItem.matches![i].teams![j].team.toString());
                                                                                                      print("Forsome : ${dataItem.foursomeNo}");
                                                                                                      controller.selectedTeamFoursomeId.value = dataItem.foursomeNo.toString();
                                                                                                      // print("match id :${dataItem.matches![i].match}");
                                                                                                      print("match id :${dataItem.matches![i].teams![j].matchId}");
                                                                                                      print("team  id :${dataItem.matches![i].teams![j].team}");
                                                                                                      controller.selectedTeamId.value = dataItem.matches![i].teams![j].team.toString();
        
                                                                                                    }),
                                                                                              ),
                                                                                            if (j == 0) SizedBox(width: Get.width * 0.03),
                                                                                            Visibility(
                                                                                              visible: j == 0,
                                                                                              child: Image.asset(
                                                                                                "assets/images/img_vs.png",
                                                                                                height: 25,
                                                                                                width: 25,
                                                                                              ),
                                                                                            ),
                                                                                          ],
                                                                                        ]),
                                                                                      ),
                                                                                      if (i < dataItem.matches!.length - 1) const Divider(),
                                                                                      if (i < dataItem.matches!.length - 1)
                                                                                        const SizedBox(
                                                                                          height: 5,
                                                                                        ),
                                                                                      if (i == dataItem.matches!.length - 1)
                                                                                        const SizedBox(
                                                                                          height: 10,
                                                                                        )
                                                                                    ],
                                                                                  ],
                                                                                )
                                                                            ],
                                                                          )),
                                                            );
                                                          },
                                                        )
                                                      : const Text(""),
                                            ),
                                          ),
                                        ],
                                      )),
                                ),
                              ),
        
                            if ((controller.selectedCategory.value == "" ||
                                controller.selectedCategory.value == "win_loss" ||
                                controller.selectedGameType.value == "wolf" ||
                                controller.selectedCategory.value ==
                                        "over_under" &&
                                    controller
                                            .forIndividual_AcrossAllGroup.value !=
                                        0))
                              const SizedBox(height: 15),
                          ],
                        ),
                      ),
                    ),
        
                    //Choose Over and Under and with Set Threshold
                    Obx(() => Visibility(
                        visible:
                            controller.selectedCategory.value == "over_under",
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Text("Set Threshold*",
                                        style: CustomStyle.hintTextStyle),
                                    const SizedBox(height: 8),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.start,
                                      children: [
                                        SizedBox(
                                          width: width * 0.10,
                                          height: height * 0.06,
                                          child: ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  ColorCode.plusBgColor,
                                              padding: EdgeInsets.zero,
                                              shape: const RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.only(
                                                    bottomLeft:
                                                        Radius.circular(30),
                                                    topLeft: Radius.circular(30),
                                                  ),
                                                  side: BorderSide(
                                                      color: ColorCode.white)),
                                            ),
                                            onPressed: controller.dCounter,
                                            child: const Icon(Icons.remove,
                                                color: ColorCode.mainColor),
                                          ),
                                        ),
                                        Container(
                                          width: width * 0.15,
                                          height: height * 0.06,
                                          padding: const EdgeInsets.all(8),
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius:
                                                BorderRadius.circular(0),
                                            border:
                                                Border.all(color: Colors.white),
                                          ),
                                          child: Center(
                                            child: TextFormField(
                                              /*onChanged: (value) {
                                                double parsedValue =
                                                    double.parse(value);
                                                // Only allow values ending with .5
                                                int intPart = parsedValue.floor();
                                                double decimalPart =
                                                    parsedValue - intPart;
        
                                                if (decimalPart == 0.0) {
                                                  // If whole number, add .5
                                                  parsedValue += 0.5;
                                                } else if (decimalPart != 0.5) {
                                                  // If not ending in .5, reset to 1.5
                                                  parsedValue = 1.5;
                                                }
                                                controller.thresholdController
                                                        .text =
                                                    parsedValue.toString();
                                                controller.thresholdCounter
                                                    .value = parsedValue;
                                                if (controller.thresholdController
                                                            .text ==
                                                        '0' ||
                                                    controller.thresholdCounter
                                                            .value ==
                                                        0.0 ||
                                                    controller.thresholdCounter
                                                            .value ==
                                                        0.5) {
                                                  controller.isThresholdController
                                                      .value = true;
                                                } else {
                                                  controller.isThresholdController
                                                      .value = false;
                                                }
                                              },*/
                                                onChanged: (value) {
                                                  // 1. If the user deleted everything, let it be empty (or reset to null)
                                                  if (value.isEmpty) {
                                                    controller.thresholdCounter.value = 0.0;
                                                    controller.isThresholdController.value = true; // Show error because it's empty
                                                    return;
                                                  }

                                                  // 2. Clean the input: Remove any existing ".5" or dots to get just the raw number
                                                  String cleanNumber = value.replaceAll('.5', '').replaceAll('.', '');

                                                  if (cleanNumber.isEmpty) {
                                                    // If they deleted the prefix but ".5" was still there
                                                    controller.thresholdController.text = "";
                                                    controller.thresholdCounter.value = 0.0;
                                                  } else {
                                                    // 3. Format the new string with the mandatory suffix
                                                    String newText = "$cleanNumber.5";
                                                    double parsedValue = double.tryParse(newText) ?? 0.5;

                                                    // 4. Update the Controller
                                                    controller.thresholdController.value = TextEditingValue(
                                                      text: newText,
                                                      selection: TextSelection.collapsed(offset: cleanNumber.length), // Cursor before dot
                                                    );

                                                    controller.thresholdCounter.value = parsedValue;

                                                    // 5. Validation: Error if value is below 1.5 (e.g., 0.5)
                                                    controller.isThresholdController.value = (parsedValue < 1.5);
                                                  }
                                                },
                                              style: CustomStyle.summaryTableText.copyWith(
                                                fontSize: appFontSize.value + 16,
                                                color: ColorCode.labelText),
                                              controller:
                                                  controller.thresholdController,
                                              textAlignVertical:
                                                  TextAlignVertical.center,
                                              textAlign: TextAlign.center,
                                              keyboardType:
                                                  TextInputType.numberWithOptions(
                                                      decimal: true),
                                              inputFormatters: [
                                                LengthLimitingTextInputFormatter(
                                                    6),
                                              ],
                                              decoration: const InputDecoration(
                                                  border: InputBorder.none,
                                                  contentPadding: EdgeInsets.zero,
                                                  isCollapsed: true),
                                            ),
                                          ),
                                        ),
                                        SizedBox(
                                          width: width * 0.10,
                                          height: height * 0.06,
                                          child: ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  ColorCode.plusBgColor,
                                              padding: EdgeInsets.zero,
                                              shape: const RoundedRectangleBorder(
                                                  borderRadius: BorderRadius.only(
                                                    topRight: Radius.circular(30),
                                                    bottomRight:
                                                        Radius.circular(30),
                                                  ),
                                                  side: BorderSide(
                                                      color: ColorCode.white)),
                                            ),
                                            onPressed: controller.iCounter,
                                            child: const Icon(Icons.add,
                                                color: ColorCode.mainColor),
                                          ),
                                        ),
                                      ],
                                    ),
                                    if (controller.isThresholdController.value ==
                                        true)
                                      const Padding(
                                        padding: EdgeInsets.only(
                                          left: 0,
                                        ),
                                        child: Text(
                                          'Below 1.5 is not allowed',
                                          style: TextStyle(
                                              color: Colors.red, fontSize: 12),
                                        ),
                                      ),
                                  ],
                                ),
                                SizedBox(
                                  width: Get.width * 0.02,
                                ),
                                //for over under bet on
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.only(left: 10.0),
                                      child: Text(
                                        "Bet On*",
                                        style: CustomStyle.hintTextStyle,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Obx(
                                      () => Padding(
                                        padding: const EdgeInsets.only(
                                            top: 4.0, left: 10.0),
                                        child: Row(
                                          children: [
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.center,
                                              children: [
                                                Radio(
                                                    value: 1,
                                                    groupValue: controller
                                                        .betOnOverUnder.value,
                                                    visualDensity:
                                                        const VisualDensity(
                                                      horizontal: VisualDensity
                                                          .minimumDensity,
                                                      vertical: VisualDensity
                                                          .minimumDensity,
                                                    ),
                                                    materialTapTargetSize:
                                                        MaterialTapTargetSize
                                                            .shrinkWrap,
                                                    fillColor:
                                                        MaterialStateProperty
                                                            .resolveWith<Color?>(
                                                                (states) {
                                                      if (states.contains(
                                                          MaterialState
                                                              .selected)) {
                                                        return ColorCode
                                                            .switchButton; // Color when selected
                                                      }
                                                      return null;
                                                    }),
                                                    onChanged: (value) {
                                                      controller.betOnOverUnder
                                                              .value =
                                                          1; // 1 for Over and 0 for under
                                                      controller
                                                              .selectedBetOnOverUnder =
                                                          "Over".obs;
                                                      print(
                                                          "Over value => ${controller.betOnOverUnder.value} , ${controller.isOver.value}");
                                                    }),
                                                Transform.translate(
                                                    offset: const Offset(5, 0),
                                                    child: Text("Over",
                                                        style: CustomStyle.summaryTableTitle.copyWith(
                                                            fontSize: appFontSize.value + 16,
                                                                color: controller
                                                                            .betOnOverUnder
                                                                            .value ==
                                                                        1
                                                                    ? ColorCode
                                                                        .labelText
                                                                    : ColorCode
                                                                        .paragraphLightColor))),
                                              ],
                                            ),
                                            SizedBox(
                                              width: Get.width * 0.09,
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.end,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.center,
                                              children: [
                                                Radio(
                                                    value: 0,
                                                    groupValue: controller
                                                        .betOnOverUnder.value,
                                                    visualDensity:
                                                        const VisualDensity(
                                                      horizontal: VisualDensity
                                                          .minimumDensity,
                                                      vertical: VisualDensity
                                                          .minimumDensity,
                                                    ),
                                                    materialTapTargetSize:
                                                        MaterialTapTargetSize
                                                            .shrinkWrap,
                                                    fillColor:
                                                        MaterialStateProperty
                                                            .resolveWith<Color?>(
                                                                (states) {
                                                      if (states.contains(
                                                          MaterialState
                                                              .selected)) {
                                                        return ColorCode
                                                            .switchButton; // Color when selected
                                                      }
                                                      return null;
                                                    }),
                                                    onChanged: (value) {
                                                      controller.betOnOverUnder
                                                              .value =
                                                          0; // 1 for Over and 0 for under
                                                      controller
                                                              .selectedBetOnOverUnder =
                                                          "Under".obs;
                                                      print(
                                                          "Under value => ${controller.betOnOverUnder.value} , ${controller.isUnder.value}");
                                                    }),
                                                Transform.translate(
                                                    offset: const Offset(5, 0),
                                                    child: Text("Under",
                                                        style:CustomStyle.summaryTableTitle.copyWith(
                                                            fontSize: appFontSize.value + 16,
                                                                color: controller
                                                                            .betOnOverUnder
                                                                            .value ==
                                                                        0
                                                                    ? ColorCode
                                                                        .labelText
                                                                    : ColorCode
                                                                        .paragraphLightColor))),
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 15),
                          ],
                        ))),
        
                    // max bet
                    Obx(() => Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Max Bet Allowed*",
                                style: CustomStyle.hintTextStyle),
                            const SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                SizedBox(
                                  width: width * 0.10,
                                  height: height * 0.06,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: ColorCode.plusBgColor,
                                      padding: EdgeInsets.zero,
                                      shape: const RoundedRectangleBorder(
                                          borderRadius: BorderRadius.only(
                                            bottomLeft: Radius.circular(30),
                                            topLeft: Radius.circular(30),
                                          ),
                                          side:
                                              BorderSide(color: ColorCode.white)),
                                    ),
                                    onPressed: controller.decrementCounter,
                                    child: const Icon(Icons.remove,
                                        color: ColorCode.mainColor),
                                  ),
                                ),
                                Container(
                                  width: width * 0.15,
                                  height: height * 0.06,
                                  padding: const EdgeInsets.all(8),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(0),
                                    border: Border.all(color: Colors.white),
                                  ),
                                  child: Center(
                                    child: TextFormField(
                                      onChanged: (value) {
                                        controller.counter.value =
                                            int.parse(value);
                                        if (controller.maxBetController.text ==
                                                '0' ||
                                            controller.counter.value == 0) {
                                          controller.isMaxBet.value = true;
                                        } else {
                                          controller.isMaxBet.value = false;
                                        }
                                      },
                                      style: CustomStyle.summaryTableText.copyWith(
                                          fontSize: appFontSize.value + 16,
                                          color: ColorCode.labelText),
                                      controller: controller.maxBetController,
                                      textAlignVertical: TextAlignVertical.center,
                                      textAlign: TextAlign.center,
                                      keyboardType: TextInputType.number,
                                      textInputAction: TextInputAction.done,
                                      inputFormatters: [
                                        LengthLimitingTextInputFormatter(6),
                                      ],
                                      decoration: const InputDecoration(
                                        border: InputBorder.none,
                                        contentPadding: EdgeInsets.zero,
                                        isCollapsed: true,
                                      ),
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: width * 0.10,
                                  height: height * 0.06,
                                  child: ElevatedButton(
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: ColorCode.plusBgColor,
                                      padding: EdgeInsets.zero,
                                      shape: const RoundedRectangleBorder(
                                          borderRadius: BorderRadius.only(
                                            topRight: Radius.circular(30),
                                            bottomRight: Radius.circular(30),
                                          ),
                                          side:
                                              BorderSide(color: ColorCode.white)),
                                    ),
                                    onPressed: controller.incrementCounter,
                                    child: const Icon(Icons.add,
                                        color: ColorCode.mainColor),
                                  ),
                                ),
                              ],
                            ),
                            if (controller.isMaxBet.value == true)
                              const Padding(
                                padding: EdgeInsets.only(
                                  left: 0,
                                ),
                                child: Text(
                                  'Zero not allowed',
                                  style:
                                      TextStyle(color: Colors.red, fontSize: 12),
                                ),
                              ),
                            const SizedBox(height: 15),
                          ],
                        )),
        
                    //Wager Amount
                    Form(
                      key: controller.formStateKeyWager,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Wager Amount*",
                            style: CustomStyle.hintTextStyle,
                          ),
                          CustomTextFormField2(
                            controller: controller.wafgerAmoutController,
                            style: CustomStyle.paragraph4LightStyle
                                .copyWith(color: ColorCode.labelText),
                            bgColor: ColorCode.white,
                            textInputAction: TextInputAction.done,
                            keyboardType: const TextInputType.numberWithOptions(
                                decimal: true, signed: true),
                            textAlign: TextAlign.start,
                            width: Get.width * 0.5,
        
                            prefixIcon: Container(
                              width: Get.width * 0.15,
                              child: Center(
                                child: Text(
                                  "\$",
                                  style: CustomStyle.hintTextStyle.copyWith(
                                      color: ColorCode.titleText2, fontSize: 18),
                                ),
                              ),
                            ),
                            contentPadding: const EdgeInsets.symmetric(
                              vertical: 15.0,
                            ),
                            validator: (value) {
                              if (RegExp(r'^[a-zA-Z]').hasMatch(value) ||
                                  RegExp(r'^[a-zA-Z]+[0-9]').hasMatch(value) ||
                                  RegExp(r'^[0-9]+[a-zA-Z]').hasMatch(value)) {
                                return "Characters Not Allowed";
                              }
        
                              if (RegExp(r'[!@#$%^&*(),?;`~_=[\]":{+}|<>/-]')
                                  .hasMatch(value)) {
                                return "Special Characters Not Allowed";
                              }
        
                              if (RegExp(r'^0+$').hasMatch(value)) {
                                return "Zero Not Allowed";
                              }
                              if (value != '') {
                                return dotsValidationNotAllow(value: value);
                              }
                              return emptyNotAllow(
                                  value: value,
                                  errorMessage: "Empty Not Allowed");
                            },
                            hintText: "Enter Amount",
                          ),
                        ],
                      ),
                    ),
        
                    //on bet
                    const SizedBox(height: 15),
                    Obx(() => Visibility(
                        visible: controller.selectedCategory.value == "" ||
                            controller.selectedCategory.value == "win_loss",
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "Bet On*",
                              style: CustomStyle.hintTextStyle,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Flexible(
                                  child: RadioListTile(
                                    value: 0,
                                    groupValue: controller.isBetOn.value,
                                    materialTapTargetSize:
                                        MaterialTapTargetSize.shrinkWrap,
                                    visualDensity: const VisualDensity(
                                        horizontal: VisualDensity.minimumDensity,
                                        vertical: VisualDensity.minimumDensity),
                                    contentPadding: EdgeInsets.zero,
                                    dense: true,
                                    activeColor: ColorCode.mainColor,
                                    onChanged: (value) {
                                      controller.isBetOn.value = value ?? 1;
                                    },
                                    title: Transform.translate(
                                        offset: const Offset(-12, 0),
                                        child: Text("Winning",
                                            style:  controller.isBetOn.value == 0
                                                        ? CustomStyle.onRadioButtonTitle
                                                        : CustomStyle.offRadioButtonTitle)),
                                  ),
                                ),
                                Flexible(
                                  child: RadioListTile(
                                    value: 1,
                                    groupValue: controller.isBetOn.value,
                                    visualDensity: const VisualDensity(
                                        horizontal: VisualDensity.minimumDensity,
                                        vertical: VisualDensity.minimumDensity),
                                    contentPadding: EdgeInsets.zero,
                                    dense: true,
                                    activeColor: ColorCode.mainColor,
                                    materialTapTargetSize:
                                        MaterialTapTargetSize.shrinkWrap,
                                    onChanged: (value) {
                                      controller.isBetOn.value = value ?? 0;
                                    },
                                    title: Transform.translate(
                                      offset: const Offset(-13, 0),
                                      child: Text("Losing",
                                          style: controller.isBetOn.value == 1
                                                      ? CustomStyle.onRadioButtonTitle
                                                      : CustomStyle.offRadioButtonTitle),
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ],
                        )))
                  ],
                ),
              ),
            ),
          ),
          Container(
            color: Colors.white,
            width: Get.width,
            padding: const EdgeInsets.fromLTRB(15, 10, 15, 15),
            child: CustomButtonNew(
              borderColor: ColorCode.borderColor,
              text: "SAVE",
              onPressed: () async {
                controller.save();
              },
            ),
          ),
        ]),
      ),
    );
  }

  Widget playerCard({
    required String playerName,
    required String card,
    required bool isSelected,
    required VoidCallback onSelect,
  }) {
    return GestureDetector(
      onTap: onSelect,
      child: Container(
        width: Get.width * 0.36,
        height: Get.height * 0.05,
        padding: const EdgeInsets.only(left: 10,right: 10),
        alignment: Alignment.centerLeft,
        decoration: BoxDecoration(
          border: Border.all(color: ColorCode.borderColor),
          borderRadius: BorderRadius.circular(10),
          color: isSelected ? ColorCode.mainColor : ColorCode.white,
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
                  style: TextStyle(
                      color: isSelected ? ColorCode.white : ColorCode.mainColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
              ),
            ),
            if (card.isNotEmpty) controller.formatCardText(card),
          ],
        ),
      ),
    );
  }

  Widget ryderPlayerCard({
    required String playerName,
    required String player2Name,
    required bool isSelected,
    required VoidCallback onSelect,
  }) {
    return GestureDetector(
      onTap: onSelect,
      child: Container(
        width: Get.width * 0.36,
        height: player2Name.isNotEmpty ? Get.height * 0.08 : Get.height * 0.05,
        padding: const EdgeInsets.only(left: 10),
        decoration: BoxDecoration(
          border: Border.all(color: ColorCode.borderColor),
          borderRadius: BorderRadius.circular(10),
          color: isSelected ? ColorCode.mainColor : ColorCode.white,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              playerName,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                  color: isSelected ? ColorCode.white : ColorCode.mainColor,
                  fontSize: 16,
                  fontWeight: FontWeight.w500),
            ),
            // Conditionally render the second player's name
            if (player2Name.isNotEmpty) ...[
              Text(
                player2Name,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                    color: isSelected ? ColorCode.white : ColorCode.mainColor,
                    fontSize: 16,
                    fontWeight: FontWeight.w500),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
`);
})();
