// ============================================================
// Flutter — Agenda Detail (agenda-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("agenda-detail", "flutter", "home_screen.dart", `
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/views/games/game_item.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../resources/color_code.dart';
import '../../controllers/home/home_controller.dart';
import '../../main.dart';
import '../../resources/custom_button.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/capped_text_scaling.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/utils_methods.dart';
import '../../voice_control/draggable_mic_view.dart';
import '../common_views/drawer_screen.dart';

import '../common_views/menu_icon_view.dart';
import '../common_views/no_data_view.dart';
import '../events/event_item.dart';
import 'home_general_item.dart';

class HomeScreen extends GetView<HomeController> {
  final Function(bool) onDrawerSelected;

  const HomeScreen({
    super.key,
    required this.onDrawerSelected,
  });

  @override
  Widget build(BuildContext context) {
    var width = getWidth();
    var height = MediaQuery.of(context).size.height;

    print("email => ${GetStorageManager.getValue(prefLoginEmail, "")}");
    print("email => ${GetStorageManager.getValue(prefLoginPassword, "")}");
    print("email => ${GetStorageManager.getValue(prefIsRemember, false)}");
    final today = DateTime.now(); // Add this line inside Obx

    return GetBuilder<HomeController>(builder: (controller) {
      return Row(
        children: [
          if (isWebScreen()) DrawerScreen(),
          Expanded(
            child: Stack(
              children: [
                Scaffold(
                  backgroundColor: ColorCode.bgColor,
                  body: Column(
                    children: [
                      SizedBox(
                        height: (GetStorageManager.getValue(prefUserRole, "role") == "Guest") ? height * 0.50 : height * 0.26,
                        width: width,
                        child: Stack(
                          children: [
                            GetStorageManager.getValue(prefUserRole, "role") == "Guest"
                                ? SizedBox(
                                    height: height * 0.6,
                                    width: width,
                                    child: Obx(() => customCacheImage(
                                          height: (GetStorageManager.getValue(prefUserRole, "role") != "Guest") ? height * 0.50 : height * 0.46,
                                          width: width,
                                          fit: BoxFit.cover,
                                          url: controller.eventImg.value,
                                          placeHolder: "assets/images/golf_ball_flag.png",
                                        )),
                                  )
                                : Image.asset(
                                    "assets/images/golf_ball_flag.png",
                                    height: (GetStorageManager.getValue(prefUserRole, "role") != "Guest") ? height * 0.50 : height * 0.46,
                                    width: width,
                                    fit: BoxFit.cover,
                                  ),
                            if (GetStorageManager.getValue(prefUserRole, "role") == "Guest")
                              Positioned(
                                top: 0,
                                left: 0,
                                right: 0,
                                child: Container(
                                  height: height * 0.2,
                                  // Adjust this height for the gradient area
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter,
                                      colors: [
                                        Colors.white.withOpacity(0.7),
                                        // Darker color at the top
                                        Colors.transparent,
                                        // Transparent color towards the bottom
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: height * 0.05, horizontal: 15.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  if (!isWebScreen() && GetStorageManager.getValue(prefUserRole, "role") != "Guest") MenuIconView(onTap: () => onDrawerSelected(true)),
                                  if (GetStorageManager.getValue(prefUserRole, "role") == "Guest")
                                    RippleClick(
                                      onTap: () {
                                        if (GetStorageManager.getValue(prefUserRole, "role") != "Guest") {
                                          onDrawerSelected(true);
                                        } else {
                                          Get.offAllNamed(RoutsNames.welcomeScreen);
                                        }
                                      },
                                      child: Row(
                                        mainAxisAlignment: MainAxisAlignment.start,
                                        children: [
                                          Container(
                                            width: 40,
                                            height: 40,
                                            decoration: (GetStorageManager.getValue(prefUserRole, "role") != "Guest")
                                                ? BoxDecoration(
                                                    shape: BoxShape.circle,
                                                    border: Border.all(
                                                      color: ColorCode.profileBG,
                                                      // Border color
                                                      width: 2, // Border width
                                                    ),
                                                  )
                                                : const BoxDecoration(),
                                            child: ClipOval(
                                              child: (GetStorageManager.getValue(prefUserRole, "role") != "Guest")
                                                  ? Image.asset(
                                                      "assets/app_logo/app_logo.png",
                                                      width: 40,
                                                      // Set the width of the image
                                                      height: 40,
                                                      // Set the height of the image
                                                      fit: BoxFit.cover, // Ensure the image covers the circular area
                                                    )
                                                  : SvgPicture.asset(
                                                      "assets/icons/ic_guest_person.svg",
                                                      width: 35,
                                                      height: 35,
                                                    ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  RippleClick(
                                    onTap: () async {
                                      // controller.onSearch("", "search");
                                      // Scaffold.of(context).showBottomSheet(
                                      //       (context) => TapRegion(
                                      //     onTapOutside: (_) =>
                                      //         Navigator.of(context).pop(),
                                      //     child: SizedBox(
                                      //         height: MediaQuery.of(context)
                                      //             .viewInsets
                                      //             .bottom >
                                      //             0
                                      //             ? Get.height * 0.5
                                      //             : Get.height * 0.8,
                                      //         child: searchEvent("search")),
                                      //   ),
                                      // );
                                      if (GetStorageManager.getValue(prefUserRole, "role") == "Guest") {
                                        await controller.getAllEvents();
                                        Scaffold.of(context).showBottomSheet(
                                          (context) => TapRegion(
                                            onTapOutside: (_) => Navigator.of(context).pop(),
                                            child:
                                                SizedBox(height: MediaQuery.of(context).viewInsets.bottom > 0 ? Get.height * 0.5 : Get.height * 0.8, child: searchEvent("search")),
                                          ),
                                        );
                                      } else {
                                        Get.offNamed(
                                          RoutsNames.globalSearch,
                                        );
                                      }
                                    },
                                    child: Container(
                                      width: 40,
                                      height: 40,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: Colors.white,
                                        border: Border.all(
                                          color: ColorCode.menuBorderColor,
                                          // Border color
                                          width: 2, // Border width
                                        ),
                                      ),
                                      child: Container(
                                        width: 25,
                                        height: 25,
                                        alignment: Alignment.center,
                                        child: SvgPicture.asset(
                                          "assets/icons/search.svg",
                                          width: 20,
                                          height: 20,
                                        ),
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ),
                            if (GetStorageManager.getValue(prefUserRole, "role") == "Guest")
                              Positioned(
                                top: height * 0.18,
                                child: Container(
                                  width: width,
                                  height: 100,
                                  alignment: Alignment.center,
                                  decoration: const BoxDecoration(),
                                  child: ClipOval(
                                    child: Image.asset(
                                      "assets/app_logo/app_logo.png",
                                      width: 100, // Set the width of the image
                                      height: 100, // Set the height of the image
                                      fit: BoxFit.cover, // Ensure the image covers the circular area
                                    ),
                                  ),
                                ),
                              ),
                            if (GetStorageManager.getValue(prefUserRole, "role") != "Guest")
                              Positioned(
                                  left: width * 0.07,
                                  bottom: Get.height * 0.06,
                                  child: Container(
                                    width: width * 0.9,
                                    height: isWebScreen() ? 100 : Get.height * 0.095,
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.start,
                                      crossAxisAlignment: CrossAxisAlignment.center,
                                      children: [
                                        Center(
                                          child: InkWell(
                                            onTap: () {
                                              Get.toNamed(RoutsNames.profile);
                                            },
                                            child: Container(
                                              width: isWebScreen() ? 80 : width * 0.15,
                                              height: isWebScreen() ? 80 : width * 0.15,
                                              decoration: BoxDecoration(
                                                shape: BoxShape.circle,
                                                border: Border.all(
                                                  color: ColorCode.menuBorderColor,
                                                  // Border color
                                                  width: 1, // Border width
                                                ),
                                              ),
                                              child: ClipOval(
                                                child: customCacheImage(
                                                  url: "${GetStorageManager.getValue(prefProfile, "")}",
                                                  width: 50,
                                                  height: 50,
                                                  fit: BoxFit.cover,
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          padding: const EdgeInsets.only(left: 10),
                                          child: Column(
                                            crossAxisAlignment: CrossAxisAlignment.start,
                                            mainAxisAlignment: MainAxisAlignment.start,
                                            children: [
                                              InkWell(
                                                onTap: () {
                                                  Get.toNamed(RoutsNames.profile);
                                                },
                                                child: Text(
                                                  "${GetStorageManager.getValue(prefName, "")}",
                                                  style: CustomStyle.heading3Style,
                                                  textAlign: TextAlign.start,
                                                ),
                                              ),
                                              Row(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                children: [
                                                  Container(
                                                      decoration: BoxDecoration(
                                                          color: ColorCode.drawerColor,
                                                          border: Border.all(color: ColorCode.drawerColor, width: 1),
                                                          borderRadius: BorderRadius.circular(5)),
                                                      child: Padding(
                                                        padding: const EdgeInsets.only(left: 10.0, right: 10, top: 5, bottom: 5),
                                                        child: Center(
                                                            child: Row(
                                                          mainAxisAlignment: MainAxisAlignment.center,
                                                          children: [
                                                            Text(
                                                              "BGA HCP: ",
                                                              style: CustomStyle.paragraph5Style,
                                                            ),
                                                            Text("${GetStorageManager.getValue(prefBgaHandicap, "0")}",
                                                                style: CustomStyle.paragraph5Style.copyWith(
                                                                  fontWeight: FontWeight.w700,
                                                                )),
                                                          ],
                                                        )),
                                                      )),
                                                  const SizedBox(
                                                    width: 5,
                                                  ),
                                                  Container(
                                                      decoration: BoxDecoration(
                                                          color: ColorCode.drawerColor,
                                                          border: Border.all(color: ColorCode.drawerColor, width: 1),
                                                          borderRadius: BorderRadius.circular(5)),
                                                      child: Padding(
                                                        padding: const EdgeInsets.only(left: 10.0, right: 10, top: 5, bottom: 5),
                                                        child: Center(
                                                            child: Row(
                                                          mainAxisAlignment: MainAxisAlignment.center,
                                                          children: [
                                                            Text(
                                                              "RANK: ",
                                                              style: CustomStyle.paragraph5Style,
                                                            ),
                                                            Text("${GetStorageManager.getValue(prefRank, "0")}",
                                                                style: CustomStyle.paragraph5Style.copyWith(fontWeight: FontWeight.w700)),
                                                          ],
                                                        )),
                                                      )),
                                                ],
                                              )
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  )),
                            if (GetStorageManager.getValue(prefUserRole, "role") != "Guest")
                              Positioned(
                                  bottom: 0,
                                  child: Builder(builder: (context) {
                                    return Container(
                                      decoration: BoxDecoration(
                                        gradient: LinearGradient(
                                          begin: Alignment.topCenter,
                                          end: Alignment.bottomCenter,
                                          colors: [
                                            Colors.black.withOpacity(0.4),
                                            Colors.black.withOpacity(0.5),
                                            Colors.black.withOpacity(0.6),
                                          ],
                                        ),
                                      ),
                                      child: Row(
                                        children: [
                                          Obx(
                                            () => CustomButtonNew(
                                              height: height * 0.06,
                                              width: isWebScreen() ? width * 0.35 : width * 0.5,
                                              borderWidth: 0.5,
                                              radius: 0,
                                              style: controller.tab.value == "myagenda" ? CustomStyle.whiteTabWithUnderlineStyle : CustomStyle.whiteTabWithoutUnderlineStyle,
                                              backgroundColor: controller.tab.value == "myagenda" ? Colors.white.withOpacity(0.2) : Colors.white.withOpacity(0.005),
                                              borderColor: ColorCode.btnBorderColor,
                                              text: "My Agenda",
                                              onPressed: () {
                                                controller.tab.value = "myagenda";
                                                GetStorageManager.setValue(prefHomeTab, "myagenda");
                                                controller.getUpcomingAgenda();

                                                debugPrint("tab--${controller.tab.value}");
                                              },
                                            ),
                                          ),
                                          Obx(
                                            () => CustomButtonNew(
                                              height: height * 0.06,
                                              width: isWebScreen() ? width * 0.35 : width * 0.5,
                                              borderWidth: 0.5,
                                              radius: 0,
                                              style: controller.tab.value == "general" ? CustomStyle.whiteTabWithUnderlineStyle : CustomStyle.whiteTabWithoutUnderlineStyle,
                                              backgroundColor: controller.tab.value == "general" ? Colors.white.withOpacity(0.2) : Colors.white.withOpacity(0.005),
                                              borderColor: ColorCode.btnBorderColor,
                                              text: "General",
                                              onPressed: () {
                                                controller.tab.value = "general";
                                              },
                                            ),
                                          )
                                        ],
                                      ),
                                    );
                                  })),
                            if (GetStorageManager.getValue(prefUserRole, "role") == "Guest")
                              Positioned(
                                  left: 15,
                                  bottom: 10,
                                  right: 15,
                                  child: Obx(() {
                                    return Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment: MainAxisAlignment.start,
                                      children: [
                                        Container(
                                          // width: Get.wid,
                                          child: SingleChildScrollView(
                                            scrollDirection: Axis.horizontal,
                                            child: Text(
                                              controller.eventName.value,
                                              maxLines: 1,
                                              style: CustomStyle.heading1Style.copyWith(color: Colors.white),
                                            ),
                                          ),
                                        ),
                                        Container(
                                          alignment: Alignment.centerLeft,
                                          padding: EdgeInsets.zero,
                                          child: SingleChildScrollView(
                                            scrollDirection: Axis.horizontal,
                                            child: Row(
                                              mainAxisAlignment: MainAxisAlignment.center,
                                              children: [
                                                SvgPicture.asset(
                                                  "assets/icons/ic_location.svg",
                                                ),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  maxLines: 1,
                                                  overflow: TextOverflow.clip,
                                                  controller.eventLocation.value.allInCaps,
                                                  style: CustomStyle.paragraph3WhiteStyle.copyWith(fontSize: appFontSize.value + 16),
                                                ),
                                              ],
                                            ),
                                          ),
                                        ),
                                        const SizedBox(height: 8),
                                        Obx(() => Row(
                                              mainAxisAlignment: MainAxisAlignment.start,
                                              children: [
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  formatDateRange(controller.eventStartDate.value, controller.eventEndDate.value),
                                                  maxLines: 1,
                                                  overflow: TextOverflow.ellipsis,
                                                  textAlign: TextAlign.start,
                                                  style: CustomStyle.paragraph3WhiteStyle.copyWith(fontSize: appFontSize.value + 16),
                                                ),
                                              ],
                                            )),
                                      ],
                                    );
                                  })),
                          ],
                        ),
                      ),
                      Obx(
                        () => Visibility(
                          visible: controller.tab.value == "general",
                          child: Expanded(
                            child: Padding(
                              padding: const EdgeInsets.only(top: 10, left: 17.0, right: 17.0, bottom: 5),
                              child: SingleChildScrollView(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Visibility(
                                      visible: controller.homeGeneralList.isNotEmpty,
                                      child: GridView.builder(
                                        itemCount: controller.homeGeneralList.where((item) {
                                          // Filter out Courses and Tee Sheet for Players
                                          if (GetStorageManager.getValue(prefUserRole, "role") != "Organizer") {
                                            String title = item["title"]!;
                                            return title != "Courses" && title != "Tee Sheet";
                                          }
                                          return true;
                                        }).length,
                                        padding: EdgeInsets.zero,
                                        physics: const NeverScrollableScrollPhysics(),
                                        shrinkWrap: true,
                                        itemBuilder: (context, index) {
                                          // Get filtered list
                                          var filteredList = controller.homeGeneralList.where((item) {
                                            if (GetStorageManager.getValue(prefUserRole, "role") != "Organizer") {
                                              String title = item["title"]!;
                                              return title != "Courses" && title != "Tee Sheet";
                                            }
                                            return true;
                                          }).toList();

                                          var item = filteredList[index];
                                          Widget icon = item["icon"]!;
                                          String title = item["title"]!;
                                          return CappedTextScaling(
                                            child: HomeGeneralItem(
                                              onTap: () {
                                                print("Tapped: $title");
                                                switch (title) {
                                                  case "Events":
                                                    GetStorageManager.setValue(prefGETab, "event");
                                                    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                                                    break;
                                                  case "Games":
                                                    GetStorageManager.setValue(prefGETab, "game");
                                                    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                                                    break;
                                                  case "Courses":
                                                    Get.toNamed(RoutsNames.course);
                                                    break;
                                                  case "Tee Sheet":
                                                    Get.toNamed(RoutsNames.teeSheet);
                                                    break;
                                                  case "Bets":
                                                    Get.toNamed(RoutsNames.bets);
                                                    break;
                                                  case "Members":
                                                    Get.toNamed(RoutsNames.members, arguments: {'index': 2});
                                                    break;
                                                  case "Awards":
                                                    Get.toNamed(RoutsNames.awardScreen, arguments: {'index': 1});
                                                    break;
                                                  case "My Score":
                                                    Get.toNamed(RoutsNames.myScoreScreen, arguments: {'index': 2});
                                                    break;
                                                  default:
                                                    print("No route defined for $title");
                                                }
                                              },
                                              icon: icon,
                                              title: title,
                                            ),
                                          );
                                        },
                                        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                                          childAspectRatio: 1.07,
                                          crossAxisCount: isWebScreen() ? 3 : 2,
                                          crossAxisSpacing: 7,
                                          mainAxisSpacing: 7,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                      Obx(
                        () => Visibility(
                          visible: controller.tab.value == "myagenda",
                          child: Flexible(
                            child: Padding(
                              padding: const EdgeInsets.only(top: 0, left: 0, right: 0),
                              child: SingleChildScrollView(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Obx(() => controller.upcomingMyAgendaEventList.isNotEmpty
                                        ? ListView.builder(
                                            padding: EdgeInsets.zero,
                                            itemCount: controller.upcomingMyAgendaEventList.length,
                                            physics: const NeverScrollableScrollPhysics(),
                                            shrinkWrap: true,
                                            itemBuilder: (context, index) {
                                              var Item = controller.upcomingMyAgendaEventList[index];
                                              return Column(
                                                children: [
                                                  Container(
                                                    height: Get.height * 0.06,
                                                    color: ColorCode.thikness,
                                                    child: Padding(
                                                      padding: const EdgeInsets.only(left: 15, right: 15),
                                                      child: Row(
                                                        children: [
                                                          Text(
                                                            _getDateText(Item.date),
                                                            style: CustomStyle.drawerTitle.copyWith(color: ColorCode.vs, fontSize: appFontSize.value + 18),
                                                          ),
                                                          const Spacer(),
                                                        ],
                                                      ),
                                                    ),
                                                  ),
                                                  Container(
                                                    color: ColorCode.white,
                                                    child: ListView.builder(
                                                      itemCount: Item.items?.length,
                                                      padding: EdgeInsets.zero,
                                                      physics: const NeverScrollableScrollPhysics(),
                                                      shrinkWrap: true,
                                                      itemBuilder: (context, gameIndex) {
                                                        final gameItem = Item.items?[gameIndex];
                                                        String dayDisplay = "";
                                                        if (gameItem!.type == "event") {
                                                          try {
                                                            DateTime start = DateTime.parse(gameItem.date!);
                                                            DateTime end = DateTime.parse(gameItem.endDate!);
                                                            DateTime today = DateTime.now();

                                                            if (today.isAfter(end)) {
                                                              // ✅ Event is finished
                                                              dayDisplay = "Ended on ${DateFormat('MMM dd, yyyy').format(end)}";
                                                            } else if (today.isBefore(start)) {
                                                              // ✅ Event not started yet
                                                              dayDisplay = "Starts on ${DateFormat('MMM dd, yyyy').format(start)}";
                                                            } else {
                                                              // ✅ Event is ongoing → calculate day count
                                                              int dayNumber = today.difference(start).inDays + 1;
                                                              dayDisplay = "Day $dayNumber";
                                                              print("day data => ${dayDisplay}");
                                                            }
                                                          } catch (e) {
                                                            print("Date parse error: $e");
                                                          }
                                                        }

                                                        return Container(
                                                          decoration: const BoxDecoration(
                                                            border: Border(bottom: BorderSide(color: ColorCode.memberBorderColor)),
                                                            color: ColorCode.bgColor,
                                                          ),
                                                          child: Column(
                                                            children: [
                                                              Padding(
                                                                padding: const EdgeInsets.only(left: 15.0, right: 15, top: 13, bottom: 13),
                                                                child: Row(
                                                                  mainAxisAlignment: MainAxisAlignment.start,
                                                                  crossAxisAlignment: CrossAxisAlignment.center,
                                                                  children: [
                                                                    Column(
                                                                      children: [
                                                                        Padding(
                                                                          padding: const EdgeInsets.only(left: 2.0, right: 2.0),
                                                                          child: ClipRRect(
                                                                            child: SvgPicture.asset(
                                                                              gameItem.type == "game"
                                                                                  ? "assets/icons/golf_dashboard_games.svg"
                                                                                  : "assets/icons/golf_dashboard_events.svg",
                                                                              height: 45,
                                                                              width: 45,
                                                                            ),
                                                                          ),
                                                                        ),
                                                                        const SizedBox(
                                                                          height: 5,
                                                                        ),
                                                                        Text(gameItem.type!.allInCaps ?? "", style: CustomStyle.balanceLabelStyle2),
                                                                      ],
                                                                    ),
                                                                    const SizedBox(
                                                                      width: 8,
                                                                    ),
                                                                    Container(
                                                                      width: width * 0.47,
                                                                      child: Column(
                                                                        crossAxisAlignment: CrossAxisAlignment.start,
                                                                        children: [
                                                                          Container(
                                                                            width: width * 0.47,
                                                                            child: SingleChildScrollView(
                                                                              scrollDirection: Axis.horizontal,
                                                                              child: Row(
                                                                                children: [
                                                                                  Text(
                                                                                    "${gameItem.name}".capitalizeFirstOfEach ?? "",
                                                                                    style: CustomStyle.gameDetailsSubTitle,
                                                                                  ),
                                                                                ],
                                                                              ),
                                                                            ),
                                                                          ),
                                                                          if (gameItem.type == "game")
                                                                            Container(
                                                                              width: width * 0.49,
                                                                              child: SingleChildScrollView(
                                                                                scrollDirection: Axis.horizontal,
                                                                                child: Row(
                                                                                  children: [
                                                                                    if (gameItem.foursome!.no != null)
                                                                                      Text(
                                                                                        "Foursome ${gameItem.foursome!.no} : ${gameItem.foursome!.teeTime != null ? formatEventTime(gameItem.foursome!.teeTime.toString()) : ""} " ??
                                                                                            "",
                                                                                        style: CustomStyle.summaryTableText,
                                                                                      ),
                                                                                  ],
                                                                                ),
                                                                              ),
                                                                            ),
                                                                          if (gameItem.type == "event")
                                                                            Container(
                                                                              width: width * 0.49,
                                                                              child: SingleChildScrollView(
                                                                                scrollDirection: Axis.horizontal,
                                                                                child: Row(
                                                                                  children: [
                                                                                    Text(
                                                                                      "${dayDisplay} " ?? "",
                                                                                      style: CustomStyle.summaryTableText,
                                                                                    ),
                                                                                  ],
                                                                                ),
                                                                              ),
                                                                            ),
                                                                          SizedBox(height: 5),
                                                                          SingleChildScrollView(
                                                                            scrollDirection: Axis.horizontal,
                                                                            child: Row(
                                                                              crossAxisAlignment: CrossAxisAlignment.center,
                                                                              children: [
                                                                                SvgPicture.asset(
                                                                                    gameItem.type == "game"
                                                                                        ? "assets/icons/agenda_courses.svg"
                                                                                        : "assets/icons/agenda_location.svg",
                                                                                    height: 20,
                                                                                    width: 20),
                                                                                const SizedBox(
                                                                                  width: 5,
                                                                                ),
                                                                                Text(
                                                                                  gameItem.type == "game"
                                                                                      ? "${gameItem.courseName}".capitalizeFirstOfEach
                                                                                      : "${gameItem.location}".capitalizeFirstOfEach,
                                                                                  overflow: TextOverflow.fade,
                                                                                  style: CustomStyle.summaryTableText,
                                                                                ),
                                                                              ],
                                                                            ),
                                                                          ),
                                                                        ],
                                                                      ),
                                                                    ),
                                                                    const Spacer(),
                                                                    CustomButtonNew(
                                                                      width: isWebScreen() ? width * 0.15 : width * 0.25,
                                                                      height: 35,
                                                                      text: "View".allInCaps,
                                                                      backgroundColor: ColorCode.switchButton,
                                                                      borderColor: ColorCode.borderColor,
                                                                      radius: 5,
                                                                      borderWidth: 1,
                                                                      style: CustomStyle.viewButton,
                                                                      onPressed: () {
                                                                        if (gameItem.type == "game") {
                                                                          Get.toNamed(RoutsNames.gameDetails, arguments: {"id": gameItem.id,"organizationId":gameItem.organizationId.toString()}, preventDuplicates: false);
                                                                        } else {
                                                                          if (GetStorageManager.getValue(prefUserRole, "role") != "Guest") {
                                                                            Get.toNamed(RoutsNames.eventDetailsOrg, arguments: {"id": gameItem.id.toString(),"organizationId":gameItem.organizationId.toString()});
                                                                          } else {
                                                                            Get.toNamed(RoutsNames.eventDetails, arguments: gameItem.id);
                                                                          }
                                                                        }
                                                                      },
                                                                    ),
                                                                  ],
                                                                ),
                                                              ),
                                                            ],
                                                          ),
                                                        );
                                                      },
                                                    ),
                                                  )
                                                ],
                                              );
                                            },
                                          )
                                        : SizedBox(
                                            height: height * 0.65,
                                            child: NoDataView(),
                                          ))
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                DraggableMicView(controller: controller)
              ],
            ),
          ),
        ],
      );
    });
  }

  // Function to check date and return text
  String _getDateText(String? itemDate) {
    if (itemDate == null || itemDate.isEmpty) return "";

    try {
      // Parse your item date (adjust format if needed)
      DateTime parsedDate = DateFormat('yyyy-MM-dd').parse(itemDate);

      // Current date
      DateTime now = DateTime.now();

      // Compare only the date part (ignoring time)
      if (parsedDate.year == now.year && parsedDate.month == now.month && parsedDate.day == now.day) {
        return "Today’s Agenda";
      } else {
        return DateFormat('${GetStorageManager.getValue(prefDateFormate, "dd MMM, yyyy")}').format(parsedDate);
      }
    } catch (e) {
      print("Date parse error: $e");
      return itemDate; // fallback if parse fails
    }
  }

  Widget searchEvent(String type) {
    return Container(
      margin: const EdgeInsets.fromLTRB(15, 20, 15, 15),
      decoration: BoxDecoration(color: ColorCode.bgColor, borderRadius: BorderRadius.circular(18)),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: ColorCode.white, borderRadius: BorderRadius.circular(18)),
            child: Row(
              children: [
                Container(
                  width: 40,
                  height: 40,
                  margin: const EdgeInsets.only(right: 10),
                  decoration: BoxDecoration(color: ColorCode.searchBg, borderRadius: BorderRadius.circular(25)),
                  alignment: Alignment.center,
                  child: SvgPicture.asset(
                    "assets/icons/search.svg",
                    width: 20,
                    height: 20,
                  ),
                ),
                Flexible(
                  child: TextField(
                    textInputAction: TextInputAction.done,
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Search events...",
                      hintStyle: CustomStyle.hintTextStyle.copyWith(color: ColorCode.appTitleColor),
                    ),
                    onChanged: (value) => controller.onSearch(value, type),
                  ),
                )
              ],
            ),
          ),
          Flexible(
            child: Obx(
              () => controller.searchEventList.isNotEmpty
                  ? GridView.builder(
                      itemCount: controller.searchEventList.length,
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return EventGridItem(
                          eventDataItem: controller.searchEventList[index],
                          onDelete: () => controller.deleteEvent(id:controller.searchEventList[index].id.toString(), index: index,organizationId:controller.searchEventList[index].organizationId.toString() ),
                        );
                      },
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        childAspectRatio: 0.75,
                        crossAxisCount: isWebScreen() ? 3 : 2,
                        crossAxisSpacing: 10,
                        mainAxisSpacing: 1,
                      ),
                    )
                  : NoDataView(),
            ),
          )
        ],
      ),
    );
  }
}
`);

  add("agenda-detail", "flutter", "home_controller.dart", `
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import '../../apis/api_services.dart';
import '../../main.dart';
import '../../model/Home/my_agenda.dart';
import '../../model/event_models/event_list_model.dart';
import '../../model/game_list_model.dart';
import '../../model/settings_models/get_preference_model.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/static_data.dart';
import '../../utils/toast_message.dart';
import '../../utils/utils_methods.dart';

class HomeController extends GetxController {
  RxBool isShow = false.obs;
  RxString error = "".obs;
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  var tabIndex = 2.obs;
  RxInt index = 0.obs;
  RxString tab = "myagenda".obs;
  RxString role = "".obs;
  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();

  RxList<EventDataItem> upcomingEventList = <EventDataItem>[].obs;
  RxList<EventDataItem> pastEventList = <EventDataItem>[].obs;
  RxList<EventDataItem> searchEventList = <EventDataItem>[].obs;

  RxList<EventDataItem> myEventList = <EventDataItem>[].obs;
  RxList<GameDataItem> myGameList = <GameDataItem>[].obs;
  RxList<GameDataItem> myPlayerPastGameList = <GameDataItem>[].obs;
  RxList<GameDataItem> upcomingGameList = <GameDataItem>[].obs;
  RxList<GameDataItem> pastGameList = <GameDataItem>[].obs;
  RxString eventImg = "".obs;
  RxString eventName = "".obs;
  RxString eventStartDate = "".obs;
  RxString eventEndDate = "".obs;
  RxString eventStartTime = "".obs;
  RxString eventLocation = "".obs;

  RxList<Map<String, dynamic>> homeGeneralList = <Map<String, dynamic>>[
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_events.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
        width: Get.width * 0.25,
      ),
      "title": "Events"
    },
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_games.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.27,
        width: Get.width * 0.27,
      ),
      "title": "Games"
    },
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_course.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
        width: Get.width * 0.25,
      ),
      "title": "Courses"
    },
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_teesheet_1.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
        width: Get.width * 0.25,
      ),
      "title": "Tee Sheet"
    },
    {"icon": SvgPicture.asset("assets/icons/golf_dashboard_bets_1.svg", height: isWebScreen() ? Get.width * 0.07 : 100, width: 100), "title": "Bets"},
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_members.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
        width: Get.width * 0.25,
      ),
      "title": "Members"
    },
      {
        "icon": SvgPicture.asset(
          "assets/icons/golf_dashboard_award.svg",
          height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
          width: Get.width * 0.25,
        ),
        "title": "Awards"
      },
    {
      "icon": SvgPicture.asset(
        "assets/icons/golf_dashboard_my_score.svg",
        height: isWebScreen() ? Get.width * 0.1 : Get.width * 0.25,
        width: Get.width * 0.25,
      ),
      "title": "My Score"
    },
  ].obs;

  //agenda static
  RxList<Map<String, dynamic>> customList = <Map<String, dynamic>>[
    {
      "date": "2025-10-01",
      "games": [
        {
          "profile": "assets/icons/golf_dashboard_events.svg",
          "title": "Sunday Golf Game",
          "event": "Palm Beach Club",
          "course": "Green Valley Course",
        },
        {
          "profile": "assets/icons/golf_dashboard_games.svg",
          "title": "Weekly Tournament",
          "event": "",
          "course": "Sunset Hills",
        },
      ],
    },
    {
      "date": "2025-10-02",
      "games": [
        {
          "profile": "assets/icons/golf_dashboard_events.svg",
          "title": "Friendly Match",
          "event": "Sunset Club",
          "course": "Ocean View Course",
        },
        {
          "profile": "assets/icons/golf_dashboard_games.svg",
          "title": "Autumn Open",
          "event": "Green Valley Club",
          "course": "Pine Hill Course",
        },
        {
          "profile": "assets/icons/golf_dashboard_games.svg",
          "title": "Charity Golf Day",
          "event": "Royal Golf Club",
          "course": "Sunset Hills",
        },
      ],
    },
    {
      "date": "2025-10-03",
      "games": [
        {
          "profile": "assets/icons/golf_dashboard_events.svg",
          "title": "Pro-Am Tournament",
          "event": "Palm Beach Club",
          "course": "Green Valley Course",
        },
        {
          "profile": "assets/icons/golf_dashboard_games.svg",
          "title": "Club Championship",
          "event": "Royal Golf Club",
          "course": "Sunset Hills",
        },
      ],
    },
  ].obs;
  RxList<Upcoming> upcomingMyAgendaEventList = <Upcoming>[].obs;

  //scroller like game details
  final ScrollController scrollController = ScrollController();

  @override
  void onReady() {
    role.value = GetStorageManager.getValue(prefUserRole, "role");
    debugPrint("role--${role.value}");

    if (GetStorageManager.getValue(prefUserRole, "role") == "Guest") {
      tab.value = "event";
    } else {
      updateHomeGeneralList();
      tab.value = GetStorageManager.getValue(prefHomeTab, "myagenda");
    }
    getAllAgenda();
  }

  RxList<Map<String, dynamic>> filterHomeGeneralList = <Map<String, dynamic>>[].obs;

  void updateHomeGeneralList() {
    if (GetStorageManager.getValue(prefUserRole, "role") == "Player") {
      filterHomeGeneralList.value = homeGeneralList.where((item) => item["title"] != "Courses" && item["title"] != "Tee Sheet").toList();
    } else {
      filterHomeGeneralList.value = homeGeneralList;
    }
    print("filter agenda list => ${filterHomeGeneralList.length}");
  }

  Future<void> getAllAgenda() async {
    progressDialog.show();
    if (GetStorageManager.getValue(prefUserRole, "role") != "Guest") {
      await getUpcomingAgenda();
      await getUpcomingAgenda();
      if (upcomingMyAgendaEventList.isEmpty) {
        tab.value = "general";
      }
      // await getEvents();
    } else {
      await getEvents();
    }
    progressDialog.hide();
    getPreference();
  }

  Future<void> getUpcomingAgenda() async {
    try {
      var response = await apiService.getUpcomingAgenda();

      upcomingMyAgendaEventList.clear();
      if (response.error == false) {
        upcomingMyAgendaEventList.addAll(response.upcoming ?? []);
        sortAgendaList();
      } else {
        debugPrint("getUpcomingMyAgendaEvents : ${response.message}");
      }
    } catch (error) {
      debugPrint("getUpcomingMyAgendaEvents : $error");
    }
  }

  void sortAgendaList() {
    DateTime today = DateTime.now();

    upcomingMyAgendaEventList.sort((a, b) {
      DateTime? dateA = _parseDate(a.date);
      DateTime? dateB = _parseDate(b.date);

      if (dateA == null && dateB == null) return 0;
      if (dateA == null) return 1;
      if (dateB == null) return -1;

      int priorityA = _getDatePriority(dateA, today);
      int priorityB = _getDatePriority(dateB, today);

      if (priorityA != priorityB) return priorityA.compareTo(priorityB);

      // Future dates → ascending (24 before 25)
      if (priorityA == 1) return dateA.compareTo(dateB);

      // Past dates → descending (22 before 21 before 31/12/2025)
      if (priorityA == 2) return dateB.compareTo(dateA);

      return 0;
    });
  }

  int _getDatePriority(DateTime date, DateTime today) {
    bool isToday = date.year == today.year && date.month == today.month && date.day == today.day;

    if (isToday) return 0; // Today   → first
    if (date.isAfter(today)) return 1; // Future  → second
    return 2; // Past    → last
  }

  DateTime? _parseDate(String? date) {
    if (date == null || date.isEmpty) return null;
    try {
      return DateFormat('yyyy-MM-dd').parse(date);
    } catch (e) {
      return null;
    }
  }

  Future<void> getAllEvents() async {
    progressDialog.show();
    if (GetStorageManager.getValue(prefUserRole, "role") != "Guest") {
      await getUpcomingEvents();
      await getUpcomingGames();
      await getMyGames();

      getMyEvents();
    } else {
      getEvents();
    }
    progressDialog.hide();
  }

  void onDrawerSelected(bool drawerOpen) {
    if (drawerOpen) {
      scaffoldKey.currentState?.openDrawer();
    } else {
      scaffoldKey.currentState?.openEndDrawer();
    }
  }

  Future<void> getUpcomingEvents() async {
    try {
      var response = await apiService.upcomingEventList();

      upcomingEventList.clear();
      searchEventList.clear();
      pastEventList.clear();
      if (response.error == false) {
        upcomingEventList.addAll(response.upcomingEvents ?? []);
        searchEventList.addAll(response.upcomingEvents ?? []);
        pastEventList.addAll(response.pastEvents ?? []);

        eventImg.value = upcomingEventList[0].logo.toString();
        eventName.value = upcomingEventList[0].name!;
        eventStartDate.value = upcomingEventList[0].startDate.toString();
        eventEndDate.value = upcomingEventList[0].endDate.toString();
        eventStartTime.value = upcomingEventList[0].startTime.toString();
        eventLocation.value = upcomingEventList[0].location.toString();
      } else {
        debugPrint("getUpcomingEvents : ${response.message}");
      }
    } catch (error) {
      debugPrint("getUpcomingEvents : $error");
    }
  }

  Future<void> getEvents() async {
    try {
      var response = await apiService.eventList();

      upcomingEventList.clear();
      searchEventList.clear();
      pastEventList.clear();
      if (response.error == false) {
        upcomingEventList.addAll(response.data ?? []);
        searchEventList.addAll(response.data ?? []);

        eventImg.value = upcomingEventList[0].logo.toString();
        eventName.value = upcomingEventList[0].name!;
        eventStartDate.value = upcomingEventList[0].startDate.toString();
        eventEndDate.value = upcomingEventList[0].endDate.toString();
        eventStartTime.value = upcomingEventList[0].startTime.toString();
        eventLocation.value = upcomingEventList[0].location.toString();
      } else {
        debugPrint("getUpcomingEvents : ${response.message}");
      }
    } catch (error) {
      debugPrint("getUpcomingEvents : $error");
    }
  }

  Future<void> getMyEvents() async {
    try {
      var response = await apiService.getMyEventList();
      myEventList.clear();
      if (response.error == false) {
        myEventList.addAll(response.myEvents ?? []);
      } else {
        debugPrint("getMyEvents : ${response.message}");
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
    }
  }

  Future<void> getMyGames() async {
    try {
      var response = await apiService.getMyGameList();
      myGameList.clear();
      myPlayerPastGameList.clear();
      if (response.error == false) {
        myGameList.addAll(response.upcomingGames ?? []);
        myPlayerPastGameList.addAll(response.pastGames ?? []);
      } else {
        debugPrint("getMyGames : ${response.message}");
      }
    } catch (error) {
      debugPrint("getMyGames : $error");
    }
  }

  Future<void> getUpcomingGames() async {
    try {
      var response = await apiService.getUpcomingGameList();
      upcomingGameList.clear();
      pastGameList.clear();
      if (response.error == false) {
        upcomingGameList.addAll(response.upcomingGames ?? []);
        pastGameList.addAll(response.pastGames ?? []);
        debugPrint("getUpcomingGames : ${upcomingGameList.length}");
      } else {
        debugPrint("getUpcomingGames : ${response.message}");
      }
    } catch (error) {
      debugPrint("getUpcomingGames : $error");
    }
  }

  void onSearch(String value, String type) {
    searchEventList.clear();
    if (value.isEmpty) {
      if (type == "Past Events") {
        searchEventList.addAll(pastEventList);
      } else if (type == "Upcoming Events") {
        searchEventList.addAll(upcomingEventList);
      } else {
        searchEventList.addAll(upcomingEventList);
      }
      return;
    }
    debugPrint("pastEventList  : ${pastEventList.length}");
    for (var event in (type == "Past Events" ? pastEventList : upcomingEventList)) {
      if (event.name!.toLowerCase().contains(value.toLowerCase())) {
        searchEventList.add(event);
      }
    }
  }

  Future<void> deleteEvent({required String id ,required int index, required String organizationId,}) async {
    try {
      progressDialog.show();
      var response = await apiService.deleteEvent(id: id,organizationId: organizationId);

      if (response.error == false) {
        ToastMessage.success(message: response.message);
        upcomingEventList.removeAt(index);
        pastEventList.removeAt(index);
        myEventList.removeAt(index);
        searchEventList.removeAt(index);

        progressDialog.hide();
      } else {
        ToastMessage.error(message: response.message);
        progressDialog.hide();
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      progressDialog.hide();
    }
  }

  // Future<void> deleteGame(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteGame(id: id);
  //
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //       upcomingGameList.removeAt(index);
  //       pastGameList.removeAt(index);
  //       myGameList.removeAt(index);
  //
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> upcomingDeleteEvent(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteEvent(id: id);
  //
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //       upcomingEventList.removeAt(index);
  //
  //       int myEventIndex = myEventList.indexWhere((event) => event.id == int.parse(id));
  //
  //       if (myEventIndex != -1) {
  //         myEventList.removeAt(myEventIndex);
  //       }
  //       getUpcomingEvents();
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> myDeleteEvent(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteEvent(id: id);
  //
  //     if (response.error == false) {
  //       int myEventIndex = upcomingEventList.indexWhere((event) => event.id == int.parse(id));
  //       print("myEventList $myEventIndex");
  //       print("upcomingEventList $index");
  //       if (myEventIndex != -1) {
  //         upcomingEventList.removeAt(myEventIndex);
  //       }
  //       getUpcomingEvents();
  //       ToastMessage.success(message: response.message);
  //       myEventList.removeAt(index);
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> pastDeleteEvent(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteEvent(id: id);
  //
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //
  //       pastEventList.removeAt(index);
  //
  //       getUpcomingEvents();
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> myDeleteGame(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteGame(id: id);
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //       int myEventIndex = upcomingGameList.indexWhere((event) => event.id == int.parse(id));
  //
  //       if (myEventIndex != -1) {
  //         upcomingGameList.removeAt(myEventIndex);
  //       }
  //       getUpcomingGames();
  //       getMyGames();
  //       myGameList.removeAt(index);
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> upcomingDeleteGame(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteGame(id: id);
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //       int myEventIndex = myGameList.indexWhere((event) => event.id == int.parse(id));
  //
  //       if (myEventIndex != -1) {
  //         myGameList.removeAt(myEventIndex);
  //       }
  //       upcomingGameList.removeAt(index);
  //       getUpcomingGames();
  //       getMyGames();
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }
  //
  // Future<void> pastDeleteGame(String id, int index) async {
  //   try {
  //     progressDialog.show();
  //     var response = await apiService.deleteGame(id: id);
  //     if (response.error == false) {
  //       ToastMessage.success(message: response.message);
  //       pastGameList.removeAt(index);
  //       getUpcomingGames();
  //       getMyGames();
  //       progressDialog.hide();
  //     } else {
  //       ToastMessage.error(message: response.message);
  //       progressDialog.hide();
  //     }
  //   } catch (error) {
  //     debugPrint("getMyEvents : $error");
  //     progressDialog.hide();
  //   }
  // }

  Future<void> getPreference() async {
    try {
      // Call your API method
      if(!StaticData.updateChecked && isProduction){
        GetPreferenceModel preference = await apiService.getPreference();
        if (preference.error == false && preference.data != null) {
          for (PreferenceData item in preference.data ?? []) {
            if (item.key == "app_version") {
              var currentVersion = await getAppVersion();
              debugPrint("app_version : $currentVersion = ${item.value?[0]}");
              if (currentVersion != item.value?[0]) {
                for (PreferenceData item2 in preference.data ?? []) {
                  if (item2.key == "force_update") {
                    StaticData.updateChecked = false;
                    showForceUpdateDialog(isForce: item2.value?[0] == "true");
                    debugPrint("force_update : ${item2.value}");
                  }else{
                    StaticData.updateChecked = true;
                  }
                }
              }
            }
          }
        } else {
          debugPrint("no app_version");
        }
      }

    } catch (e) {
      debugPrint("Error fetching preference: $e");
    }
  }
}
`);
})();
