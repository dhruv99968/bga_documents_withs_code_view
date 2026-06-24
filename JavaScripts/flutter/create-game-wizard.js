// ============================================================
// Flutter — Create Game Wizard (cgslide-0 … cgslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("cgslide-0", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-0", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-1", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(width: 50)),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () { Get.toNamed(RoutsNames.profile); },
                child: Container(
                  width: 42, height: 42,
                  decoration: BoxDecoration(shape: BoxShape.circle, border: Border.all(color: ColorCode.menuBorderColor, width: 2)),
                  child: ClipOval(child: customCacheImage(url: "\${GetStorageManager.getValue(prefProfile, "")}", width: 50, height: 50, fit: BoxFit.cover)),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () => SafeArea(
              child: Container(
                width: Get.width, height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event step
                      Column(children: [const SizedBox(height: 20)]),
                      //tee sheet step
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() => Container(
                            width: Get.width * 0.9,
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: List.generate(10, (index) {
                                if (index == 8 && controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                final bool isOpened = index == controller.currentIndex.value;
                                final bool isPrevious = index < controller.currentIndex.value;
                                Widget indicator;
                                if (index == 9) {
                                  indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                } else if (isOpened) {
                                  indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                } else {
                                  final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                  indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                }
                                return indicator;
                              }),
                            ),
                          )),
                        ],
                      ),
                      //game name and game type
                      Column(crossAxisAlignment: CrossAxisAlignment.start, children: [const SizedBox(height: 20)]),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-1", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  // ... same fields as cgslide-0
}`);

  add("cgslide-2", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-2", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-3", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-3", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-4", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-4", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-5", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-5", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-6", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-6", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-7", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-7", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-8", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-8", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);

  add("cgslide-9", "flutter", "create_game.dart", `import 'package:bga_flutter_app/controllers/bottom_sheets_controller/select_wizard_player_bottom_sheet_controller.dart';
import 'package:bga_flutter_app/resources/color_code.dart';
import 'package:bga_flutter_app/resources/custom_button.dart';
import 'package:bga_flutter_app/resources/custom_style.dart';
import 'package:bga_flutter_app/resources/custom_text_form_field2.dart';
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/resources/tables_keys_values.dart';
import 'package:bga_flutter_app/router/routs_names.dart';
import 'package:bga_flutter_app/utils/get_storage_manager.dart';
import 'package:bga_flutter_app/utils/static_data.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:bga_flutter_app/views/bottem_sheets/select_wizard_player_bottom_sheet.dart';
import 'package:bga_flutter_app/views/games/game_create_wizard/toggle_tile.dart';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_switch/flutter_switch.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import '../../../controllers/games/create_game/create_game_controller.dart';
import '../../../main.dart';
import '../../../resources/custom_dropdown.dart';
import '../../../utils/capped_text_scaling.dart';
import '../../common_views/bottom_navigation_view.dart';
import '../../common_views/search_bar_view.dart';
import 'check_menu.dart';

class CreateGame extends GetView&lt;CreateGameController&gt; {
  const CreateGame({super.key});

  @override
  Widget build(BuildContext context) {
    bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;
    return WillPopScope(
      onWillPop: () async {
        if (controller.tabController.index > 0 && controller.currentIndex.value > 0) {
          controller.previousTab();
          return false;
        }
        return true;
      },
      child: CappedTextScaling(
        maxScale: 1.0,
        child: Scaffold(
          key: controller.scaffoldKey,
          resizeToAvoidBottomInset: true,
          appBar: AppBar(
            toolbarHeight: 68,
            backgroundColor: Colors.white,
            shadowColor: Colors.black,
            titleSpacing: 0,
            automaticallyImplyLeading: false,
            title: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Obx(() {
                  bool isCreateGame = controller.tabController.index >= 2 && controller.currentIndex.value >= 2;
                  return Row(
                    children: [
                      Visibility(
                        visible: (controller.currentIndex.value != controller.tabController.length - 1),
                        child: RippleClick(
                          onTap: () {
                            if (controller.currentIndex.value > 0 && controller.tabController.index > 0) {
                              debugPrint("IF -=&gt;\${controller.currentIndex.value}");
                              debugPrint("IF -=&gt;\${controller.tabController.index}");
                              controller.previousTab();
                            } else {
                              Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': 0});
                              debugPrint(" ESLE \${controller.currentIndex.value}");
                              debugPrint("ELSE \${controller.tabController.index}");
                            }
                          },
                          child: const Padding(
                            padding: EdgeInsets.only(left: 15, right: 10),
                            child: Icon(Icons.arrow_back, color: ColorCode.appBackArrowColor),
                          ),
                        ),
                      ),
                      Visibility(
                          visible: (controller.currentIndex.value == controller.tabController.length - 1),
                          child: const SizedBox(
                            width: 50,
                          )),
                      Text(
                        isCreateGame ? "Create Game" : controller.viewType,
                        style: CustomStyle.newAppBarTitle,
                      ),
                    ],
                  );
                }),
                const Spacer(),
              ],
            ),
            actions: [
              InkWell(
                onTap: () {
                  Get.toNamed(RoutsNames.profile);
                },
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: ColorCode.menuBorderColor,
                      width: 2,
                    ),
                  ),
                  child: ClipOval(
                    child: customCacheImage(
                      url: "\${GetStorageManager.getValue(prefProfile, "")}",
                      width: 50,
                      height: 50,
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 15)
            ],
          ),
          body: Obx(
            () =&gt; SafeArea(
              child: Container(
                width: Get.width,
                height: Get.height,
                color: ColorCode.bgColor,
                child: Form(
                  key: controller.formStateKey,
                  child: TabBarView(
                    controller: controller.tabController,
                    physics: const NeverScrollableScrollPhysics(),
                    children: [
                      //event
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 && controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 && controller.selectedGameType.value == "regular_skins" && controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;

                                    Widget indicator;

                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25,
                                        width: 25,
                                        child: SvgPicture.asset(
                                          "assets/icons/color_flag.svg",
                                          width: 26,
                                          height: 25,
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25,
                                        height: 23,
                                        child: SvgPicture.asset(
                                          "assets/icons/create_step_1.svg",
                                          fit: BoxFit.contain,
                                        ),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;

                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(
                                          height: Get.height * 0.005,
                                          width: Get.width * 0.075,
                                          color: stepColor,
                                        ),
                                      );
                                    }

                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    "\\u{1F3C6}What is The Event Name?",
                                    style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SingleChildScrollView(
                            scrollDirection: Axis.vertical,
                            child: SizedBox(
                              height: Get.height * 0.56,
                              child: Column(
                                children: [
                                  SearchBarView(
                                    controller: controller.searchEventController,
                                    onChanged: (value) {
                                      controller.searchQueryEvent.value = value;
                                      controller.filterEvents(value);
                                    },
                                    onCrossTap: () {
                                      controller.searchQueryEvent.value = "";
                                      controller.filterEvents("");
                                    },
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.only(left: 15, right: 15),
                                    child: GestureDetector(
                                      onTap: () async {
                                        var result = await Get.toNamed(RoutsNames.addEvent, arguments: {"editType": "wizard", "viewType": "Add Event"});
                                        debugPrint("Returned from Add Event screen, result: $result");
                                        debugPrint("Result type: \${result.runtimeType}");
                                        if (result != null &amp;&amp; result.toString().isNotEmpty) {
                                          debugPrint("Created event ID =&gt; $result");
                                          controller.selectedEventId.value = result.toString();
                                          await controller.getEventList();
                                          controller.selectEventById(result.toString());
                                        } else {
                                          debugPrint("Event creation cancelled or failed - result is null or empty");
                                        }
                                      },
                                      child: Padding(
                                        padding: const EdgeInsets.only(bottom: 10),
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            color: ColorCode.white,
                                            border: Border.fromBorderSide(BorderSide(color: Colors.white, width: 1)),
                                            borderRadius: BorderRadius.all(Radius.circular(15)),
                                          ),
                                          child: Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                                                child: ClipRRect(
                                                  borderRadius: BorderRadius.circular(50),
                                                  child: Container(
                                                      color: ColorCode.mainColor,
                                                      height: 40,
                                                      width: 40,
                                                      child: const Icon(
                                                        Icons.add,
                                                        color: ColorCode.white,
                                                      )),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment: CrossAxisAlignment.center,
                                                children: [
                                                  Text(
                                                    "Create Event",
                                                    style: CustomStyle.wizardGreenButtonStyle,
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Flexible(
                                    child: ListView.builder(
                                      itemCount: controller.allEventList.length,
                                      itemBuilder: (context, index) {
                                        var event = controller.allEventList[index];
                                        return Obx(
                                          () =&gt; CheckMenu(
                                            onTap: () {
                                              controller.selectEvent("\${event.id}", "\${event.name}", event.startDate.toString(), "", "");
                                              final startDate = DateTime.parse(event.startDate.toString());
                                              final endDate = DateTime.parse(event.endDate.toString());
                                              controller.generateDateListWithLabels(startDate, endDate);
                                            },
                                            icon: "\${event.logo}",
                                            selected: controller.isSelectedEvent.value &amp;&amp; controller.selectedEventId.value == event.id.toString(),
                                            title: "\${event.name}",
                                          ),
                                        );
                                      },
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      //course / tee sheet
                      Column(
                        children: [
                          const SizedBox(height: 20),
                          Obx(() =&gt; Container(
                                width: Get.width * 0.9,
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: List.generate(10, (index) {
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") {
                                      return const SizedBox.shrink();
                                    }
                                    if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") {
                                      return const SizedBox.shrink();
                                    }
                                    final bool isOpened = index == controller.currentIndex.value;
                                    final bool isPrevious = index &lt; controller.currentIndex.value;
                                    Widget indicator;
                                    if (index == 9) {
                                      indicator = SizedBox(
                                        height: 25, width: 25,
                                        child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain),
                                      );
                                    } else if (isOpened) {
                                      indicator = SizedBox(
                                        width: 25, height: 23,
                                        child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain),
                                      );
                                    } else {
                                      final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                      indicator = Padding(
                                        padding: const EdgeInsets.only(top: 15),
                                        child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor),
                                      );
                                    }
                                    return indicator;
                                  }),
                                ),
                              )),
                          const SizedBox(height: 30),
                          Container(
                            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10),
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  SvgPicture.asset('assets/icons/ic_tee_sheet.svg',
                                      colorFilter: const ColorFilter.mode(ColorCode.appTitleColor, BlendMode.srcIn)),
                                  const SizedBox(width: 5),
                                  Text("Create &amp; Select Tee Sheet",
                                      style: CustomStyle.heading6Style.copyWith(fontSize: appFontSize.value + 24)),
                                ],
                              ),
                            ),
                          ),
                          const SizedBox(height: 15),
                          SearchBarView(
                            controller: controller.searchTeesheetController,
                            onChanged: (value) { controller.searchQueryTeesheet.value = value; controller.filterTeeSheets(value); },
                            onCrossTap: () { controller.searchQueryTeesheet.value = ""; controller.filterTeeSheets(""); },
                          ),
                        ],
                      ),
                      //game name and game type
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          Center(
                            child: Obx(() =&gt; Container(
                                  width: Get.width * 0.9,
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: List.generate(10, (index) {
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "medal_play") { return const SizedBox.shrink(); }
                                      if (index == 8 &amp;&amp; controller.selectedGameType.value == "regular_skins" &amp;&amp; controller.selectedPlayType.value == "individual_across") { return const SizedBox.shrink(); }
                                      final bool isOpened = index == controller.currentIndex.value;
                                      final bool isPrevious = index &lt; controller.currentIndex.value;
                                      Widget indicator;
                                      if (index == 9) {
                                        indicator = SizedBox(height: 25, width: 25, child: SvgPicture.asset("assets/icons/color_flag.svg", width: 26, height: 25, fit: BoxFit.contain));
                                      } else if (isOpened) {
                                        indicator = SizedBox(width: 25, height: 23, child: SvgPicture.asset("assets/icons/create_step_1.svg", fit: BoxFit.contain));
                                      } else {
                                        final Color stepColor = isPrevious ? ColorCode.backTabs : ColorCode.mainColor;
                                        indicator = Padding(padding: const EdgeInsets.only(top: 15), child: Container(height: Get.height * 0.005, width: Get.width * 0.075, color: stepColor));
                                      }
                                      return indicator;
                                    }),
                                  ),
                                )),
                          ),
                        ],
                      ),
                      //handicap and type
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //date and time
                      Column(children: [const SizedBox(height: 20)]),
                      // Team Handicap Method
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //select total player and player list
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set amount for each
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //set points
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //thumbnail
                      SingleChildScrollView(scrollDirection: Axis.vertical, child: Column(children: [const SizedBox(height: 20)])),
                      //success
                      Stack(children: [Column(children: [const SizedBox(height: 20)])]),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget numberBox(String number, {bool isSelected = false, VoidCallback? onTap}) { return const SizedBox.shrink(); }
  Widget _buildPayoutField({required String label, required int index, required TextEditingController textController, required RxInt value, bool showArrows = true, VoidCallback? onIncrement, VoidCallback? onDecrement}) { return const SizedBox.shrink(); }
}`);

  add("cgslide-9", "flutter", "create_game_controller.dart", `import 'dart:io';
import 'dart:typed_data';
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/controllers/games/game_grid_controller.dart';
import 'package:bga_flutter_app/controllers/home/games_and_events_controller.dart';
import 'package:bga_flutter_app/controllers/home/home_controller.dart';
import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/model/event_models/event_list_model.dart';
import 'package:bga_flutter_app/model/game_models/match_config_model.dart';
import 'package:bga_flutter_app/model/participants_list_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/course_teams_model.dart';
import 'package:bga_flutter_app/model/tee_sheet_model/teesheet_group_model.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import '../../../model/course/tee_position_model.dart';
import '../../../model/tee_sheet_model/new_tee_sheet_model.dart';
import '../../../router/routs_names.dart';

class CreateGameController extends GetxController with GetSingleTickerProviderStateMixin {
  final GlobalKey&lt;ScaffoldState&gt; scaffoldKey = GlobalKey&lt;ScaffoldState&gt;();
  late TabController tabController;
  RxInt currentIndex = 0.obs;
  String viewType = "";
  bool isEventDetails = false;
  bool isEventTab = false;
  List&lt;String&gt; playerList = &lt;String&gt;[].obs;

  RxList&lt;NewTeeSheetData&gt; teeSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  RxList&lt;NewTeeSheetData&gt; allSheetDatList = &lt;NewTeeSheetData&gt;[].obs;
  var matchedTeeSheet = &lt;NewTeeSheetData&gt;[].obs;
  var isExpanded = &lt;bool&gt;[].obs;
  RxList&lt;int&gt; selectedTeeSheetListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTeeSheet = false.obs;
  RxString selectedTeeSheetId = "".obs;
  RxString selectedTeeSheetName = "".obs;
  RxBool selectedTeeSheetError = false.obs;

  RxList&lt;EventDataItem&gt; eventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;TeePositionData&gt; courseTeePostionsList = &lt;TeePositionData&gt;[].obs;
  RxString selectedTeeName = ''.obs;
  RxList&lt;EventDataItem&gt; allEventList = &lt;EventDataItem&gt;[].obs;
  RxList&lt;int&gt; selectedEventListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedEvent = false.obs;
  RxString selectedEventId = "".obs;
  RxString selectedEventName = "".obs;
  RxBool selectedEventError = false.obs;
  RxBool isPlayerRestrict = true.obs;
  RxBool isProshopeEmail = true.obs;
  RxBool isSkinsGame = true.obs;
  RxBool isGreenieGame = true.obs;
  RxBool isSkinsCarry = true.obs;
  RxBool isPlacesPaid = false.obs;
  RxBool isSkinsPaid = false.obs;
  final selectedPlaces = '3'.obs;
  var addEvent = TextEditingController(text: 'Create Event');

  var generatedDateList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateStringList = &lt;String&gt;[].obs;
  RxList&lt;String&gt; dateLabelStringList = &lt;String&gt;[].obs;
  RxString selectedDateLabel = ''.obs;
  Map&lt;String, String&gt; dateMapping = {};

  RxList&lt;CourseList&gt; searchCourseList = &lt;CourseList&gt;[].obs;
  RxList&lt;CourseList&gt; coursesList = &lt;CourseList&gt;[].obs;
  RxList&lt;int&gt; selectedCoursesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedCourses = false.obs;
  RxString selectedCoursesId = "".obs;
  RxString selectedCoursesName = "".obs;
  RxBool selectedCoursesError = false.obs;
  var addCourse = TextEditingController(text: 'Create Course');

  var gameNameController = TextEditingController();

  RxString selectedGameType = ''.obs;
  RxList&lt;int&gt; selectedGameTypeListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedGameType = false.obs;
  RxBool selectedGameTypeError = false.obs;
  RxBool isDateError = false.obs;

  var startDateController = TextEditingController();
  var startTimeController = TextEditingController();
  RxString timeFormated = "".obs;
  RxString pickedDate = "".obs;

  RxInt selectedHandicap = 0.obs;
  RxInt groupLength = 0.obs;

  RxString uniKey = UniqueKey().toString().obs;
  RxList&lt;ParticipantsDataItem&gt; calcuttaPlayersList = &lt;ParticipantsDataItem&gt;[].obs;
  RxInt courseID = 0.obs;
  var playerNewTotal = TextEditingController();
  var selectedPlayerCount = 32.obs;

  var medalHandicapCapPerController = TextEditingController(text: "85");

  var totalSkinPotController = TextEditingController(text: "150");
  var totalGreeniePotController = TextEditingController(text: "150");
  var prizingPoolController = TextEditingController(text: "300");
  var betPerGameController = TextEditingController();
  var skodePoolController = TextEditingController(text: "5");
  var junkPoolController = TextEditingController(text: "2");

  var amountPerPoint = TextEditingController();
  var pointsPerMatchWinController = TextEditingController(text: "0");
  var pointsPerHoleWinController = TextEditingController();
  var pointsUnchallengedCtrl = TextEditingController();
  var pointsChallengedCtrl = TextEditingController();
  var pointsMaxWolfPointCtrl = TextEditingController();

  var image = ''.obs;
  var imageName = ''.obs;
  Uint8List? imageBytes;
  RxBool isImage = false.obs;

  RxList&lt;int&gt; selectedTypesListIndex = &lt;int&gt;[].obs;
  RxBool isSelectedTypes = false.obs;
  RxString selectedOptionType = 'Cards'.obs;
  RxBool selectedTypesError = false.obs;

  final RxInt selectedValue = 32.obs;

  var selectedOption = "COD".obs;
  RxString selectedTeamHcp = 'avg'.obs;
  RxString selectedHolesMatch = "6".obs;
  RxString selectedHolesMatchIcon = "assets/icons/cod_types.svg".obs;
  var selectedOptionTypeImage = "".obs;

  bool get showTeamHandicapStep =&gt; selectedGameType.value == "scramble" &amp;&amp; selectedOption.value == "4v4";
  int get wizardStepCount =&gt; 11;

  List&lt;String&gt; otherOptions = [""];
  List&lt;String&gt; options = ["COD", "2v2 Teams", "Random"];
  List&lt;String&gt; optionsCalcutta = ["Cards"];
  List&lt;String&gt; optionsVegas = ["COD", "2v2"];

  var apiService = ApiServices();
  var progressDialog = ShowProgressDialog();
  final ScrollController scrollController = ScrollController();
  RxBool isNextButtonVisible = false.obs;
  final RxList&lt;int&gt; customValues = &lt;int&gt;[44].obs;

  void selectValue(int val) { selectedValue.value = val; }

  @override
  void onInit() {
    super.onInit();
    tabController = TabController(length: 11, vsync: this);
    tabController.addListener(() { currentIndex.value = tabController.index; });
    viewType = Get.arguments?['viewType'] ?? "Create Game";
  }

  @override
  void onReady() {
    super.onReady();
    var data = Get.arguments;
    if (data["eventId"] != null) {
      selectedEventId.value = data["eventId"];
      selectEventById(data["eventId"].toString());
    }
    if (data["eventDetails"] != null) { isEventDetails = data['eventDetails']; }
    if (data["eventTab"] != null) { isEventTab = data['eventTab']; }
    if (data != null &amp;&amp; data["index"] != null &amp;&amp; data["index"] != "") {
      currentIndex.value = data["index"];
      tabController.index = data["index"];
      tabController.animateTo(data["index"]);
    }
    getAllData();
  }

  var tabIndex = 1.obs;

  void changeTabIndex(int index) {
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }

  void nextTab() async {
    if (tabController.index &lt; tabController.length - 1) {
      // validation logic
      tabController.animateTo(tabController.index + 1);
    }
  }

  void previousTab() {
    if (tabController.index &gt; 0 &amp;&amp; currentIndex.value &gt; 0) {
      tabController.animateTo(tabController.index - 1);
    }
  }

  Future&lt;void&gt; getAllData() async {
    progressDialog.show();
    await fetchTeeGroup();
    await getEventList();
    selectedHandicap.value = 1;
    if (selectedEventId.value.isNotEmpty) { selectEventById(selectedEventId.value.toString()); }
    progressDialog.hide();
  }

  Future&lt;void&gt; getEventList() async {
    try {
      var response = await apiService.minimizeEventList();
      eventList.clear();
      allEventList.clear();
      if (response.error == false) {
        eventList.addAll(response.data ?? []);
        allEventList.addAll(response.data ?? []);
        if (selectedEventId.value != "") {
          try {
            var matchedEvent = allEventList.firstWhere((event) =&gt; event.id.toString() == selectedEventId.value);
            final startDate = DateTime.parse(matchedEvent.startDate.toString());
            final endDate = DateTime.parse(matchedEvent.endDate.toString());
            generateDateListWithLabels(startDate, endDate);
            selectedEventName.value = matchedEvent.name ?? "";
          } catch (e) { print("No matching event found"); }
        }
      }
    } catch (error) { ToastMessage.error(message: "$error"); }
  }

  void generateDateListWithLabels(DateTime startDate, DateTime endDate) {
    List&lt;String&gt; dateList = [];
    List&lt;String&gt; labelList = [];
    dateMapping.clear();
    for (DateTime date = startDate; date.isBefore(endDate.add(const Duration(days: 1))); date = date.add(const Duration(days: 1))) {
      String dateString = DateFormat('dd MMM,yyyy').format(date);
      String weekDayShort = DateFormat('EEE').format(date);
      String labelString = '$dateString - $weekDayShort';
      dateList.add(dateString);
      labelList.add(labelString);
      dateMapping[labelString] = dateString;
    }
    generatedDateList.value = dateList;
    dateStringList.assignAll(dateList);
    dateLabelStringList.assignAll(labelList);
  }

  void selectEvent(String eventId, String eventName, String date, String time, String timeAMPM) {
    if (isSelectedEvent.value &amp;&amp; selectedEventId.value == eventId) {
      selectedEventId.value = '';
      selectedEventName.value = '';
      isSelectedEvent.value = false;
    } else {
      selectedEventId.value = eventId;
      selectedEventName.value = eventName;
      isSelectedEvent.value = true;
    }
  }

  Future&lt;void&gt; fetchTeeGroup() async {
    try {
      var response = await apiService.getTeeList();
      teeSheetDatList.clear();
      allSheetDatList.clear();
      isExpanded.clear();
      if (response.error == false) {
        teeSheetDatList.addAll(response.data ?? []);
        allSheetDatList.addAll(response.data ?? []);
        isExpanded.addAll(List.filled(teeSheetDatList.length, false));
      }
    } catch (e) { debugPrint("Exception: $e"); }
  }

  void selectTeeSheet(int index, String TeeSheetName, String TeeSheetId) {
    if (isSelectedTeeSheet.value == true &amp;&amp; selectedTeeSheetName.value == TeeSheetName) {
      if (selectedTeeSheetListIndex.contains(index)) {
        selectedTeeSheetName.value = '';
        selectedTeeSheetId.value = '';
        selectedTeeSheetListIndex.remove(index);
        isSelectedTeeSheet.value = false;
      }
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetName.value = '';
      selectedTeeSheetId.value = '';
      isSelectedTeeSheet.value = false;
    } else {
      selectedTeeSheetListIndex.clear();
      selectedTeeSheetListIndex.add(index);
      selectedTeeSheetName.value = TeeSheetName;
      selectedTeeSheetId.value = TeeSheetId;
      isSelectedTeeSheet.value = true;
    }
  }

  void selectGameType(int index, String gameType) {
    if (isSelectedGameType.value == true &amp;&amp; selectedGameType.value == gameType) {
      selectedGameType.value = '';
      selectedGameTypeListIndex.remove(index);
      isSelectedGameType.value = false;
    } else {
      selectedGameTypeListIndex.clear();
      selectedGameTypeListIndex.add(index);
      selectedGameType.value = gameType;
      isSelectedGameType.value = true;
    }
  }
}`);
})();
