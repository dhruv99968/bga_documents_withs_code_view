// ============================================================
// CODE DATA - Flutter/Dart
// ============================================================
// Contains all Flutter/Dart code samples for the code preview viewer.
//
// FORMAT: add("slide-key", "flutter", "filename", `code`)
//   slide-key : slide identifier (e.g. "sslide-0")
//   stack     : "flutter"
//   filename  : displayed in file tab
//   code      : source in backtick literal
//
// TO EDIT: Find the section, edit code between backticks.
// Escape inside backticks: backtick as \`  backslash as \\
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function(){
  function add(k,s,n,c){
    window.CODE_DATA[k]=window.CODE_DATA[k]||{};
    window.CODE_DATA[k][s]=window.CODE_DATA[k][s]||[];
    window.CODE_DATA[k][s].push({name:n,code:c});
  }

  // These sections are now in separate files under JavaScripts/flutter/
~_=[\\]":{+}|<>/-]')
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
}`);
  
  
  // asslide-* (Add Score) are now in:
  //   JavaScripts/flutter/add-score.js
  
  
  
  
  
  
  
  
  
  
    
  
  
  
  
  

  // vlslide-* (View Ledger) and vrslide-* (View Results) are now in:
  //   JavaScripts/flutter/view-ledger.js
  //   JavaScripts/flutter/view-results.js
  
  // wslide-* (Quick Start Wizard) are now in:
  //   JavaScripts/flutter/quick-start-wizard.js

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Game-type-specific steps (calcutta, ryder_cup, horse_race) are now in:
  //   JavaScripts/flutter/add-score-calcutta.js
  //   JavaScripts/flutter/add-score-ryder-cup.js
  //   JavaScripts/flutter/add-score-horse-race.js
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€


})();