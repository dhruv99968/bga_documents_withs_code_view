// ============================================================
// Flutter — Welcome Detail (welcome-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("welcome-detail", "flutter", "welcome_screen.dart", `

import 'package:bga_flutter_app/utils/utils_methods.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/auth_controller/welcome_controller.dart';
import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/capped_text_scaling.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/static_data.dart';

class WelcomeScreen extends GetView<WelcomeController>  {
   const WelcomeScreen({super.key});
  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;
    debugPrint("appFontSize => ${appFontSize.value}");
    return Scaffold(
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          decoration: const BoxDecoration(color: Colors.white),
          child:CappedTextScaling(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Spacer(),
                Container(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  alignment: Alignment.center,
                  child: Image.asset(
                    StaticData.defaultPlaceHolder,
                    width: isWebScreen() ? height * 0.60 : width * 0.65,
                    fit: BoxFit.contain,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 8.0),
                  child: Text(
                    "Welcome to BGA",
                    style: CustomStyle.heading1Style,
                    textAlign: TextAlign.center,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 5.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "Welcome to the world of the BGA-bringing the joy of golf to everyone. We make scoring simple for individuals, groups, events, and leagues, so friends and family can join the fun too.",
                        style: CustomStyle.heading6Style.copyWith(fontSize: getFontSize(14)),
                        textAlign: TextAlign.center,
                      ),
                      // Text(
                      //   "in South Carolina, Pennsylvania, Illinois,",
                      //   style: CustomStyle.heading6Style.copyWith(fontSize: getFontSize(15)),
                      //   textAlign: TextAlign.center,
                      // ),
                      // Text(
                      //   "Wisconsin and Texas.",
                      //   style: CustomStyle.heading6Style.copyWith(fontSize: getFontSize(16)),
                      //   textAlign: TextAlign.center,
                      // ),
                    ],
                  ),
                ),
                Spacer(),
                CustomButtonNew(
                  height: height * 0.065,
                  width: isWebScreen() ? width * 0.3 : width,
                  // borderWidth: 1,
                  backgroundColor: Colors.white,
                  borderColor: ColorCode.borderColor,
                  margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                  text: "Sign In".allInCaps,
                  style: CustomStyle.signInText.copyWith(fontSize: 18),
                  onPressed: () {
                    Get.toNamed(RoutsNames.login);
                  },
                ),
                CustomButtonNew(
                  height: height * 0.065,
                  width: isWebScreen() ? width * 0.3 : width,
                  // borderWidth: 1,
                  style: CustomStyle.signUpText.copyWith(fontSize: 18),
                  borderColor: ColorCode.borderColor,
                  margin: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                  text: "Sign Up".allInCaps,
                  onPressed: () {
                    Get.toNamed(RoutsNames.signUp);
                  },
                ),
                // InkWell(
                //   onTap: () {
                //     GetStorageManager.setValue(prefRole, "Guest");
                //     GetStorageManager.setValue(prefAccessToken, "");
                //     GetStorageManager.setValue(prefIsLogin, true);
                //     Get.offAllNamed(RoutsNames.mainScreen);
                //     print("object");
                //   },
                //   child: Padding(
                //     padding: const EdgeInsets.all(8.0),
                //     child: Text(
                //       "Skip for now",
                //       style: CustomStyle.signUpSkipText,
                //     ),
                //   ),
                // ),
              ],
            ),
          ),
        ),
      ),
      // Container(
      //   padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
      //   decoration: const BoxDecoration(color: Colors.white),
      //   child: Column(
      //     children: [
      //       Expanded(child: Column(
      //         children: [
      //           Container(
      //             padding:const EdgeInsets.only(top: 25) ,
      //             alignment: Alignment.center,
      //             color: Colors.red,
      //             child: Image.asset(
      //               StaticData.defaultPlaceHolder,width: width *0.85,
      //             ),
      //           ),
      //           Padding(
      //             padding: const EdgeInsets.only(top: 9.0),
      //             child: Text("Welcome to BGA",style: CustomStyle.heading1Style,textAlign: TextAlign.center,),
      //           ),
      //           Container(
      //
      //             // constraints:  BoxConstraints(
      //             //     maxWidth: width,
      //             //     minWidth: width*0.5
      //             // ),
      //             padding: const EdgeInsets.only(top: 5.0,),
      //             child: Column(
      //               mainAxisAlignment: MainAxisAlignment.center,
      //               children: [
      //                 // Text("The BGA Tour holds a series of events each year in South Carolina, Pennsylvania,Illinois, Wisconsin and Texas.",style:CustomStyle.signUpSubText.copyWith(fontSize: getFontSize(15)),textAlign: TextAlign.center,maxLines: 3,),
      //                 Text("The BGA Tour holds a series of events each year",style:CustomStyle.heading6Style.copyWith(fontSize: getFontSize(16)),textAlign: TextAlign.center,),
      //                 Text("in South Carolina, Pennsylvania, Illinois,",style:CustomStyle.heading6Style.copyWith(fontSize: getFontSize(15)),textAlign: TextAlign.center,),
      //                 Text("Wisconsin and Texas.",style:CustomStyle.heading6Style.copyWith(fontSize: getFontSize(16)),textAlign: TextAlign.center,),
      //               ],
      //             ),
      //           ),
      //           SizedBox(height: height * 0.05,),
      //           CustomButtonNew(
      //             height:  height * 0.07,
      //             borderWidth: 1,
      //             backgroundColor:  Colors.white,
      //             borderColor: ColorCode.borderColor,
      //             margin: const EdgeInsets.symmetric(horizontal: 5),
      //             text: "Sign In".allInCaps,
      //             style: CustomStyle.signInText.copyWith(fontSize: 18),
      //             onPressed: () {
      //               Get.toNamed(RoutsNames.login);
      //               // controller.changePassword();
      //             },
      //           ),
      //           SizedBox(height: height * 0.02,),
      //           CustomButtonNew(
      //             height:  height * 0.07,
      //             borderWidth: 1,
      //             style: CustomStyle.signUpText.copyWith(fontSize: 18),
      //             borderColor: ColorCode.borderColor,
      //             margin: const EdgeInsets.symmetric(horizontal: 5),
      //             text: "Sign Up".allInCaps,
      //             onPressed: () {
      //               Get.toNamed(RoutsNames.signUp);
      //               // controller.changePassword();
      //             },
      //           ),
      //           InkWell(
      //               onTap: (){
      //                 GetStorageManager.setValue(prefRole, "Guest");
      //                 GetStorageManager.setValue(prefAccessToken, "");
      //                 GetStorageManager.setValue(prefIsLogin, true);
      //                 Get.offAllNamed(RoutsNames.mainScreen);
      //                 print("object");
      //               },
      //               child: Padding(
      //                 padding: const EdgeInsets.all(8.0),
      //                 child: Text("Skip for now",style: CustomStyle.signUpSkipText,),
      //               ),
      //             ),
      //
      //         ],
      //       )),
      //
      //
      //     ],
      //   ),
      // ),
    );
  }
}
`);

  add("welcome-detail", "flutter", "welcome_controller.dart", `
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../resources/tables_keys_values.dart';
import '../../utils/get_storage_manager.dart';

class WelcomeController extends GetxController{

  int currentYear=0;

  @override
  void onReady() {
    currentYear = DateTime.now().year;

    // Store the current year in a string
    String currentYearString = currentYear.toString();
    GetStorageManager.setValue(prefYear, currentYearString);
    debugPrint("year---$currentYearString");
  }


}
`);
})();
