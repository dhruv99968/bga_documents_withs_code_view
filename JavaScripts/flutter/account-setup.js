// ============================================================
// Flutter — Account Setup (sslide-0 … sslide-3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("sslide-0", "flutter", "signup_screen.dart", `
//dhruv
import 'package:flutter/material.dart';

import 'package:flutter/services.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:intl_phone_field/intl_phone_field.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/custom_text_form_field2.dart';
import '../../resources/ripple_click.dart';
import '../../router/routs_names.dart';
import '../../controllers/auth_controller/signup_controller.dart';
import '../../utils/utils_methods.dart';
import '../../utils/validation_utils.dart';

class SignUpScreen extends GetView<SignUpController> {
  const SignUpScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return Scaffold(
      appBar: AppBar(
        key: controller.scaffoldKey,
        backgroundColor: Colors.white,
        toolbarHeight: height * 0.05,
        scrolledUnderElevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.white,
          statusBarIconBrightness: Brightness.dark,
        ),
      ),
      body: Container(
        height: height,
        padding: EdgeInsets.fromLTRB(isWebScreen()? width * 0.25 : 20, 0, isWebScreen()? width * 0.25 : 20, 10),
        decoration: const BoxDecoration(color: Colors.white),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.zero,
                alignment: Alignment.center,
                child: Image.asset(
                  "assets/images/sign_up.png",
                  width: width,
                  height: height * 0.25,
                  fit: BoxFit.contain,
                ),
              ),
              Container(
                width: width,
                padding: const EdgeInsets.only(top: 1.0),
                child: Text(
                  "Sign up",
                  style: CustomStyle.heading1Style,
                  textAlign: TextAlign.left,
                ),
              ),
              SizedBox(
                width: width,
                // padding: const EdgeInsets.only(top: 3.0),
                child: Text(
                  "Please Create your BGA Account",
                  style: CustomStyle.heading6Style,
                  textAlign: TextAlign.left,
                ),
              ),
              Container(
                  padding: const EdgeInsets.only(top: 10),
                  child:
                  Form(
                    key: controller.formStateKey,
                    child: Column(
                      children: [
                        CustomTextFormField2(
                          style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                          controller: controller.emailController,
                          keyboardType: TextInputType.emailAddress,
                          validator: (value) => validateEmail(value),
                          prefixIcon: const Icon(Icons.alternate_email, color: ColorCode.paragraphLightColor),
                          hintText: "Email*",
                        ),
                        SizedBox(
                          height: height * 0.001,
                        ),
                        CustomTextFormField2(
                          style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                          controller: controller.userController,
                          validator: (value) => emptyNotAllow(value: value),
                          prefixIcon: Container(
                              width: 10,
                              alignment: Alignment.center,
                              child: SvgPicture.asset(
                                "assets/icons/face_icon.svg",
                                height: 25, width: 25,
                                // colorFilter: const ColorFilter.mode(, BlendMode.srcIn),
                              )),
                          hintText: "Full name*",
                        ),
                        SizedBox(
                          height: height * 0.0001,
                        ),
                        Obx(()=> IntlPhoneField(
                          key: ValueKey(
                              '${controller.initialCountryCode.value}_${controller.initialPhoneNumber.value}'),
                          initialValue: controller.initialPhoneNumber.value,
                          initialCountryCode: controller.initialCountryCode.value,
                          controller: controller.phoneController,
                          style: CustomStyle.paragraph4LightStyle
                              .copyWith(color: ColorCode.labelText),
                          keyboardType:
                          TextInputType.numberWithOptions(
                              decimal: true, signed: true),
                          textInputAction: TextInputAction.done,
                          obscureText: false,
                          dropdownTextStyle: CustomStyle.paragraph1LightStyle,
                          validator: (value) => validateMobileNumbernew(value),
                          disableLengthCheck: true,
                          decoration: InputDecoration(
                            hintText: 'Phone number*',
                            counterText: "",
                            floatingLabelBehavior: FloatingLabelBehavior.never,
                           border: OutlineInputBorder(
                             borderSide: BorderSide(
                               color:  ColorCode.mainColor,
                             ),
                             borderRadius: BorderRadius.all(Radius.circular( 30.0)),
                           ),
                            enabledBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: ColorCode.textFieldBgColor,
                              ),
                              borderRadius: BorderRadius.all(Radius.circular( 30.0)),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(
                                color: ColorCode.mainColor,
                              ),
                              borderRadius: BorderRadius.all(Radius.circular( 30.0)),
                            ),
                              errorBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                  color: Colors.red,
                                ),
                                borderRadius: BorderRadius.all(Radius.circular( 30.0)),
                              ),
                              focusedErrorBorder: OutlineInputBorder(
                                borderSide: const BorderSide(
                                  color: Colors.red,
                                ),
                                borderRadius: BorderRadius.all(Radius.circular( 30.0)),
                              ),
                            errorStyle: TextStyle(color: Colors.red),
                            hintStyle: CustomStyle.paragraph1LightStyle,
                            fillColor: ColorCode.textFieldBgColor,
                            filled: true,
                          ),
                          onChanged: (phone) {
                            // fires when number text changes
                            controller.fullPhoneNumber = phone.completeNumber;
                            debugPrint('completeNumber: ${phone.completeNumber}');
                          },
                          onCountryChanged: (country) {
                            // fires when user picks a different country flag
                            debugPrint('country changed: ${country.dialCode}'); // e.g. 91
                            debugPrint('country iso: ${country.code}');          // e.g. IN

                            // rebuild fullPhoneNumber with new dial code + existing number
                            controller.fullPhoneNumber = '+${country.dialCode}${controller.phoneController.value}';
                            debugPrint('new fullPhoneNumber: ${controller.fullPhoneNumber}');
                          },

                        )),

                        SizedBox(
                          height: height * 0.01,
                        ),
                        CustomButtonNew(
                          height: height * 0.07,
                          // borderWidth: 1,
                          borderColor: ColorCode.borderColor,
                          margin: const EdgeInsets.symmetric(horizontal: 5),
                          text: "Sign Up".toUpperCase(),
                          onPressed: () {
                            FocusScope.of(context).unfocus();
                            controller.signUp();
                            // Get.toNamed(RoutsNames.otpScreen, );
                            // Get.toNamed(RoutsNames.changePassword);
                          },
                        ),
                      ],
                    ),
                  )
              ),
              Container(
                padding: const EdgeInsets.only(top: 10),
                width: width,
                alignment: Alignment.center,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text("Already have an Account? ", style: CustomStyle.paragraph3LightStyle),
                    RippleClick(
                        onTap: () {
                          Get.offNamed(RoutsNames.login);
                        },
                        child: Text("Log in", style: CustomStyle.signUpSmallColor)),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.only(top: 12),
                width: width,
                alignment: Alignment.center,
                child: RichText(
                    textAlign: TextAlign.center,
                    text: TextSpan(children: [
                      TextSpan(text: "© ${DateTime.now().year} Dasinfomedia. All rights reserved", style: CustomStyle.paragraph3LightStyle),
                    ])),
              ),
              SizedBox(
                height: height * 0.010,
              )
            ],
          ),
        ),
      ),
    );
  }
}
`);

  add("sslide-0", "flutter", "signup_controller.dart", `
import 'package:bga_flutter_app/apis/api_services.dart';
import 'package:bga_flutter_app/utils/show_progress_dialog.dart';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';

import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/toast_message.dart';

class SignUpController extends GetxController {
  TextEditingController userController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController phoneController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  GlobalKey<FormState> formStateKey = GlobalKey<FormState>();
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  var apiService = ApiServices();
  var progress = ShowProgressDialog();
  RxBool isShow = false.obs;
  RxString error = "".obs;
  var roles = <String>["Organizer", "Player"].obs;
  String? selectedRole ="Player";

  RxString initialCountryCode = ''.obs;
  RxString initialPhoneNumber = ''.obs;
  String fullPhoneNumber = '';

@override
  void onInit() {
    // TODO: implement onInit
  detectCountryFromLocation();
    super.onInit();
  }


  Future<void> signUp() async {
    if (formStateKey.currentState!.validate()) {
      if (selectedRole != null) {
        progress.show();
        var response = await apiService.userRegister(
            fullName: userController.text.trim(),
            email: emailController.text.trim(),
            password: passwordController.text.trim(),
            role: selectedRole!,
            phone: fullPhoneNumber);
        progress.hide();

        if (response.error == false) {
          GetStorageManager.setValue(prefLoginEmail,emailController.text.trim());
          ToastMessage.success(message: response.message);
          Get.toNamed(RoutsNames.otpScreen, arguments:{"viewType":"signUp"} );
        } else {
          ToastMessage.error(message: response.message);
        }
      } else {
        error.value = "please select role";
      }
    } else {
      if (selectedRole == null) {
        error.value = "please select role";
      }
    }
  }
  Future<void> detectCountryFromLocation() async {
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }

      if (permission == LocationPermission.whileInUse ||
          permission == LocationPermission.always) {
        Position position = await Geolocator.getCurrentPosition(
            desiredAccuracy: LocationAccuracy.low);

        List<Placemark> placemarks = await placemarkFromCoordinates(
            position.latitude, position.longitude);

        if (placemarks.isNotEmpty) {
          final country = placemarks.first.country;
          final code = placemarks.first.isoCountryCode;
          initialCountryCode.value = code ?? 'IN';
          debugPrint('Country: $country');       // India
          debugPrint('Country Code: $code');     // IN
        }
      }
    } catch (e) {
      debugPrint('Location error: $e');
      // fallback to device locale
      initialCountryCode.value = Get.deviceLocale?.countryCode ?? 'IN';
    }
  }



  void clearFields() {
    userController.clear();
    emailController.clear();
    phoneController.clear();
    passwordController.clear();
  }
  @override
  void onClose() {
    // TODO: implement onClose
    userController.dispose();
    emailController.dispose();
    phoneController.dispose();
    passwordController.dispose();
    super.onClose();
  }

}
`);

  add("sslide-1", "flutter", "otp_screen.dart", `

import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:pinput/pinput.dart';

import '../../controllers/auth_controller/otp_controller.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/tables_keys_values.dart';
import '../../utils/get_storage_manager.dart';

class OtpScreen extends GetView<OtpController>  {
  const OtpScreen({super.key});
  @override
  Widget build(BuildContext context) {
    print("email ====> ${GetStorageManager.getValue(prefLoginEmail, "")}");
    print("email => ${controller.email}");


    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;
    final defaultPinTheme = PinTheme(
      width: 55,
      height: 55,
      textStyle:CustomStyle.pinTitle,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color:ColorCode.textFieldBgColor,width: 2),
      ),
    );

    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.white,toolbarHeight: height * 0.05,
        scrolledUnderElevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle( statusBarColor: Colors.white,
          statusBarIconBrightness: Brightness.dark, ),),
      body: Container(
        height: height,
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 10),
        decoration: const BoxDecoration(color: Colors.white),
        child: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: height *0.05,),
              Container(
                width: width,
                padding: const EdgeInsets.only(top: 1.0),
                child: Text(/*(viewType=="Request Otp")?"Enter OTP":*/"Sign up",style:CustomStyle.heading1Style,textAlign: TextAlign.left,),
              ),
              Container(
                width: width,
                padding: const EdgeInsets.only(top: 3.0),
                child: Text("OTP is sent to your email.",style: CustomStyle.heading6Style,textAlign: TextAlign.left,),
              ),
              // if(viewType!="Request Otp")
                Container(
                width: width,
                padding: const EdgeInsets.only(top: 20.0),
                child: Text(/*(viewType=="Request Otp")?"":*/"Enter you OTP code here.",style:CustomStyle.heading6Style,textAlign: TextAlign.left,),
              ),
              Container(
                padding: const EdgeInsets.only(top: 25),
                child: Form(
                  child: Column(
                    children: [
                      Pinput(
                        length: 6,
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        controller: controller.pinController,
                        focusNode: controller.focusNode,
                        // listenForMultipleSmsOnAndroid: true,

                        defaultPinTheme: defaultPinTheme,
                        autofocus: true,
                        onCompleted: (value) {
                          debugPrint('value--$value');
                        },
                        onChanged: (value){
                          controller.code=value;

                          debugPrint("pin--${controller.pinController.text}");
                        },
                        // cursor: Column(
                        //   mainAxisAlignment: MainAxisAlignment.end,
                        //   children: [
                        //     Container(
                        //       margin: const EdgeInsets.only(bottom: 9),
                        //       width: 22,
                        //       height: 1,
                        //       color:Colors.white,
                        //     ),
                        //   ],
                        // ),
                        // focusedPinTheme: defaultPinTheme.copyWith(
                        //   decoration: defaultPinTheme.decoration!.copyWith(
                        //     borderRadius: BorderRadius.circular(12),
                        //     color:Color(0xFFF4F4F4),
                        //     border: Border.all(color: Color(0xFFF4F4F4)),
                        //   ),
                        // ),
                        submittedPinTheme: defaultPinTheme.copyWith(
                          decoration: defaultPinTheme.decoration!.copyWith(
                            color: ColorCode.textFieldBgColor,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: ColorCode.textFieldBgColor),
                          ),
                        ),
                      ),
                      SizedBox(height: height * 0.04,),
                      CustomButtonNew(
                        height:  height * 0.07,
                        // borderWidth: 1,
                        borderColor: ColorCode.borderColor,
                        margin: const EdgeInsets.symmetric(horizontal: 5),
                        text:"Verify OTP",
                        onPressed: () {
                          // Get.toNamed(RoutsNames.changePassword);
                          controller.verityOtp();
                        },
                      ),

                    ],
                  ),
                ),),
              Container(
                padding: const EdgeInsets.only(top: 15),
                width: width,
                alignment: Alignment.center,
                child: const Text("Didn’t Receive the Code",
                style: TextStyle(
                    fontSize: 13,color: ColorCode.paragraphLightColor,fontWeight: FontWeight.w400
                ),
                ),
              ),
              SizedBox(height: height * 0.010,),
              Container(
                width: width,
                alignment: Alignment.center,
                child: RippleClick(
                  onTap: (){
                    controller.resendOtp();
                  },
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Resend CODE",
                        style: TextStyle(
                            fontSize: 13,color: Color(0xFF248A3D),fontWeight: FontWeight.w600
                        ),
                      ),
                      Icon(
                          Icons.autorenew_outlined,
                          color: Color(0xFF248A3D)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`);

  add("sslide-1", "flutter", "otp_controller.dart", `
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/show_progress_dialog.dart';

class OtpController extends GetxController {
  TextEditingController userController = TextEditingController();
  TextEditingController pinController = TextEditingController();
  var isChecked = false.obs;


  final focusNode = FocusNode();
  var code = '';
  var email = '';
  var progress = ShowProgressDialog();
  var apiService = ApiServices();
  String viewType = '';

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
    var argument = Get.arguments ?? {};
    print("argument : ${argument}");
    if(argument!=null && argument["viewType"]=="forgotPassword" ){
      viewType=argument["viewType"] ??"";
      // isPlayerCourse.value=true;
    }
  }

  @override
  void onReady() {
    // var argument = Get.arguments;
    // if (argument != null) {
    //   email = argument;
    // }

    email=GetStorageManager.getValue(prefLoginEmail, "");
    super.onReady();
  }


  Future<void> verityOtp() async {
    if (code.length < 6) {
      ToastMessage.error(message: "Please enter OTP");
    } else {

      progress.show();
      var response = await apiService.verifyEmail(otp: code, email: email);
      progress.hide();

      if (response.error == false) {
        ToastMessage.success(message: response.message);


        if(viewType=="forgotPassword"){
          Get.offNamed(RoutsNames.changePassword,arguments: {"viewType":"forgotPassword"});
        }else{
          Get.offNamed(RoutsNames.changePassword);

          // Get.offAllNamed(RoutsNames.otpSuccessScreen);

        }
      } else {
        ToastMessage.error(message: response.message);
        print("error msg => ${response.message}");
      }
    }
  }
  Future<void> resendOtp() async {

      progress.show();
      var response = await apiService.resendOtp(email: email);
      progress.hide();

      if (response.error == false) {
        ToastMessage.success(message: response.message);
      } else {
        ToastMessage.error(message: response.message);
      }
    }
}
`);

  add("sslide-2", "flutter", "change_password_screen.dart", `
import 'package:bga_flutter_app/resources/ripple_click.dart';
import 'package:bga_flutter_app/utils/validation_utils.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/auth_controller/change_password_controller.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/custom_text_form_field2.dart';
import '../../utils/static_data.dart';

class ChangePasswordScreen extends GetView<ChangePasswordController> {
  const ChangePasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    print("email ==> ${controller.email}");
    return Scaffold(
      body: SafeArea(
        child: Container(
          height: height,
          padding: const EdgeInsets.fromLTRB(20, 2, 20, 10),
          decoration: const BoxDecoration(color: Colors.white),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                RippleClick(
                    onTap: () {
                      Get.back();
                    },
                    child: const Padding(
                      padding: EdgeInsets.all(0.0),
                      child: Icon(Icons.arrow_back_rounded),
                    )),
                Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Image.asset(
                    StaticData.defaultPlaceHolder,
                    width: width * 0.85,
                  ),
                ),
                Text("Set password", style: CustomStyle.heading1Style),
                Text("Set your password to continue.", style: CustomStyle.heading6Style),
                Container(
                  padding: const EdgeInsets.only(top: 15),
                  child: Form(
                    key: controller.formStateKey,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Obx(()=> CustomTextFormField2(
                            controller: controller.passwordController,
                            obscureText: controller.passwordVisibleOne.value,
                            validator: (value) => validatePassword(value),
                            prefixIcon: const Icon(Icons.lock_reset_rounded, color: ColorCode.paragraphLightColor),
                            suffixIcon: Container(
                              padding: const EdgeInsets.only(right: 5),
                              width: 10,
                              alignment: Alignment.centerRight,
                              child: IconButton(
                                icon: Icon(
                                  controller.passwordVisibleOne.value ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                                  size: 25,
                                  color: ColorCode.paragraphLightColor,
                                ),
                                onPressed: () {
                                  controller.passwordVisibleOne.value = !controller.passwordVisibleOne.value;
                                },
                              ),
                            ),
                            hintText: "New password",
                          ),
                        ),
                        Obx(()=>  CustomTextFormField2(
                            controller: controller.confirmPasswordController,
                            obscureText: controller.passwordVisible.value,
                            validator: (value) => matchPassword(value, controller.passwordController.text.trim()),
                            prefixIcon: const Icon(Icons.verified_user_outlined, color: ColorCode.paragraphLightColor),
                            hintText: "Confirm new password",
                            suffixIcon: Container(
                              padding: const EdgeInsets.only(right: 5),
                              width: 10,
                              alignment: Alignment.centerRight,
                              child: IconButton(
                                icon: Icon(
                                  controller.passwordVisible.value ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                                  size: 25,
                                  color: ColorCode.paragraphLightColor,
                                ),
                                onPressed: () {
                                  controller.passwordVisible.value = !controller.passwordVisible.value;
                                },
                              ),
                            ),
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Obx(()=>  Container(
                              // color: Colors.red,
                              child: Checkbox(
                                value: controller.isRemember.value,
                                onChanged: controller.toggleCheckbox,
                                materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                                visualDensity: const VisualDensity(horizontal: -4, vertical: -4),
                                activeColor: ColorCode.buttonBgColor,


                              ),
                            )),
                          Text("Remember me",style: CustomStyle.heading6Style.copyWith(color: ColorCode.buttonBgColor, fontSize: 16),
                  textAlign: TextAlign.right,),


                        ],),
                        // Obx(() => CheckboxListTile(
                        //   title: Text("Accept Terms"),
                        //   value: controller.isChecked.value,
                        //   onChanged: controller.toggleCheckbox,
                        // )),
                        SizedBox(height: height * 0.08),

                        CustomButtonNew(
                          text: "Done",
                          onPressed: () {
                            controller.changePassword();
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                // Container(
                //   padding: EdgeInsets.only(top: 40),
                //   width: width,
                //   alignment: Alignment.center,
                //   child: RichText(
                //       textAlign: TextAlign.center,
                //       text: TextSpan(children: [
                //         TextSpan(text: "© ${GetStorageManager.getValue(prefYear, 2023)} Dasinfomedia. All rights reserved", style: CustomStyle.signUpSmallText),
                //         TextSpan(text: " Terms & Conditions", style: CustomStyle.signUpSmallColor),
                //         TextSpan(text: " and ", style: CustomStyle.signUpSmallText),
                //         TextSpan(text: "Privacy Policy", style: CustomStyle.signUpSmallColor),
                //       ])),
                // ),
                SizedBox(
                  height: height * 0.010,
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`);

  add("sslide-2", "flutter", "change_password_controller.dart", `
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../model/profile_models/profile_data.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/payment_utils.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/toast_message.dart';

class ChangePasswordController extends GetxController{

  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  GlobalKey<FormState> formStateKey = GlobalKey<FormState>();
  var isRemember = true.obs;
  var apiService = ApiServices();
  var email= "";
  RxBool passwordVisibleOne = true.obs;
  RxBool passwordVisible = true.obs;

  ShowProgressDialog showProgressDialog = ShowProgressDialog();
  ProfileData getBioModel = ProfileData();
  String viewType = '';
  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();

    var argument = Get.arguments ?? {};
    print("argument : ${argument}");
    if(argument!=null && argument["viewType"]=="forgotPassword" ){
      viewType=argument["viewType"] ??"";
      // isPlayerCourse.value=true;
    }
  }

  @override
  void onReady() {

    email=GetStorageManager.getValue(prefLoginEmail, "");
    print("password email => $email");

    super.onReady();
  }


  void toggleCheckbox(bool? value) {

    isRemember.value = value ?? false;

    if(isRemember.value==true){
      GetStorageManager.setValue(prefIsRemember, true);
      GetStorageManager.setValue(prefLoginEmail, email);
      GetStorageManager.setValue(prefLoginPassword, confirmPasswordController.text);
    }
  }

  void changePassword() async{
    if(formStateKey.currentState!.validate()){

      // var loginEmail=GetStorageManager.getValue(prefLoginEmail, "");

      try {
          showProgressDialog.show();
          var response = await apiService.createPassword(email: email,password: confirmPasswordController.text.trim(),);

          // Debug prints
          print("response => $response");
          print("response.error => ${response.error}");
          print("response.error.runtimeType => ${response.error.runtimeType}");
          if (response.error == false) {


            await login();

            ToastMessage.success(message: response.message);



            // forgotEmailController.clear();
            // Get.back();
          } else {
            showProgressDialog.hide();

            ToastMessage.error(message: response.message);
            // Get.back();

          }
        } catch (error) {

          showProgressDialog.hide();
          print("error   => $error ");

          ToastMessage.error(message: "$error");
        }


    }
  }

  String _decodeBase64(String str) {
    String normalized = base64Url.normalize(str);
    return utf8.decode(base64Url.decode(normalized));
  }

  Future<void> login() async {
    // hideKeyboard();


        // isWrong.value = false;
        // debugPrint("email--${emailController.text.toString()}");
        // debugPrint("password-${passwordController.text.toString()}");

    // var loginEmail=GetStorageManager.getValue(prefLoginEmail, "");


    if(email!="" && confirmPasswordController.text.isNotEmpty){
      try {
        // showProgressDialog.show();
        var loginResponse = await apiService.loginUser(email: email, password: confirmPasswordController.text.trim());
        if (loginResponse!.error == null && loginResponse.accessToken != null) {
          final parts = loginResponse.accessToken!.split('.');
          if (parts.length != 3) {
            // throw Exception('Invalid token');
            ToastMessage.success(message: "Invalid token");
            return;
          }

          final payload = _decodeBase64(parts[1]);
          final decodedPayload = json.decode(payload);
          debugPrint('Decoded Payload: $decodedPayload');
          print("user verified ==> ${decodedPayload['user_verified']}");

          var verified = decodedPayload.containsKey('user_verified') ? decodedPayload['user_verified'] == "true" : true;
          print("user  ==> $verified");

          if (verified) {
            GetStorageManager.setValue(prefIsLogin, true);
            GetStorageManager.setValue(prefAccessToken, loginResponse.accessToken ?? "");
            GetStorageManager.setValue(prefExpiresIn, loginResponse.expiresIn ?? 0);
            GetStorageManager.setValue(prefRefreshExpiresIn, loginResponse.refreshExpiresIn ?? 0);
            GetStorageManager.setValue(prefRefreshToken, loginResponse.refreshToken ?? "");
            GetStorageManager.setValue(prefTokenType, loginResponse.tokenType ?? "");
            GetStorageManager.setValue(prefNotBeforePolicy, loginResponse.notbeforepolicy ?? "");
            GetStorageManager.setValue(prefSessionState, loginResponse.sessionState ?? "");
            GetStorageManager.setValue(notificationOffOn, true);

            if(isRemember.value==true){
              GetStorageManager.setValue(prefIsRemember, isRemember.value);
              GetStorageManager.setValue(prefLoginEmail, email);
              GetStorageManager.setValue(prefLoginPassword, confirmPasswordController.text);

              print("email => ${GetStorageManager.getValue(prefLoginEmail, "")}");
              print("password => ${GetStorageManager.getValue(prefLoginPassword, "")}");
              print("is remember => ${GetStorageManager.getValue(prefIsRemember, false)}");
            }
            else{
              GetStorageManager.setValue(prefIsRemember,false);
            }
            await getBio();
            showProgressDialog.hide();

            // emailController.clear();
            // passwordController.clear();
            PaymentUtils().setUpStripeKey();
            if(viewType=="forgotPassword"){
              Get.offAllNamed(RoutsNames.mainScreen);
            }
            else{
              Get.offAllNamed(RoutsNames.course,arguments: {"viewType":"playerCourse"});
            }

            ToastMessage.success(message: "Login Successfully");

            print('User is verified.');
          }
          else {
            ToastMessage.error(message: "Your sign in request is not approved yet");

            print('User is not verified yet.');
            showProgressDialog.hide();
          }
          showProgressDialog.hide();

          // ToastMessage.success(message: "Login Successfully");
          // decodeTokenManually(GetStorageManager.getValue(prefAccessToken, ""));
        } else {
          showProgressDialog.hide();
          ToastMessage.error(message: loginResponse.errorDescription);
        }
      } catch (error) {
        showProgressDialog.hide();
        print("error login => $error ");

        ToastMessage.error(message: "$error");
      }
    }
  }

  Future<void> getBio() async {
    try {
      showProgressDialog.show();
      var getData = await apiService.getUserProfile();
      var getBio = await apiService.getBio();
      showProgressDialog.hide();
      if (!getData.error!) {
        GetStorageManager.setValue(prefUserID, getData.data?.id ?? "");
        GetStorageManager.setValue(prefEmail, getData.data?.email ?? "");
        GetStorageManager.setValue(prefUserRole, getData.data?.role ?? "");
        GetStorageManager.setValue(prefName, getData.data?.firstName ?? "");
        GetStorageManager.setValue(prefProfile, getData.data?.profilePicture ?? "");
        GetStorageManager.setValue(prefPhone, getData.data?.phoneNumber ?? "");
        GetStorageManager.setValue(prefGender, getData.data?.gender ?? "");
        GetStorageManager.setValue(prefAge, getData.data?.age ?? "");
        GetStorageManager.setValue(prefProfession, getData.data?.profession ?? "");

        GetStorageManager.setValue(prefHandicap, getBio.data?.handicap ?? "");
        GetStorageManager.setValue(prefBestScore, getBio.data?.bestScore ?? "");
        GetStorageManager.setValue(prefBgaHandicap, getBio.data?.bgaHandicap ?? "");
        GetStorageManager.setValue(prefAvgScore, getBio.data?.avgScore ?? "");
        GetStorageManager.setValue(prefJacket, getBio.data?.jacket ?? "");
        GetStorageManager.setValue(prefSweater, getBio.data?.sweater ?? "");
        GetStorageManager.setValue(prefRookieOfTheYear, getBio.data?.rookieOfTheYear ?? "");
        GetStorageManager.setValue(prefRank, getBio.data?.rank ?? "");

        debugPrint("get user role : ${getData.data?.role}");
        debugPrint("dimg==${getData.data?.email}");
        // print("name--${profileData?.data?.email}");
      } else {
        ToastMessage.error(message: getData.message);
        // ToastMessage.error(message: getData.message);
      }
    } catch (e) {
      showProgressDialog.hide();
      debugPrint('$e');
      // ToastMessage.error(message: "Something Went Wrong.");
      // ToastMessage.error(message: "Something Went Wrong.");
    } finally {
      showProgressDialog.hide();
      update();
    }
  }

}
`);

  add("sslide-3", "flutter", "course_screen.dart", `
import 'package:bga_flutter_app/controllers/course_controller/course_controller.dart';
import 'package:bga_flutter_app/views/course/course_list_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';

import '../../main.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/utils_methods.dart';
import '../../voice_control/draggable_mic_view.dart';
import '../common_views/app_toolbar.dart';
import '../common_views/bottom_navigation_view.dart';
import '../common_views/drawer_screen.dart';

import '../common_views/no_data_view.dart';
import 'filter_course_list.dart';

class CoursesScreen extends GetView<CourseController> {
  const CoursesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    var width = MediaQuery.of(context).size.width;
    var height = MediaQuery.of(context).size.height;

    return Row(
      children: [
        if(isWebScreen())
          DrawerScreen(),
        Expanded(
          child: Stack(
            children: [
              Scaffold(
                key: controller.scaffoldKey,
                appBar: AppToolbar().get(
                    drawerOpen: controller.isPlayerCourse.value ? null :controller.onDrawerSelected,
                    showMenu: !controller.isPlayerCourse.value,
                    showArrow: true,
                    profile: !controller.isPlayerCourse.value,
                    backToHome: true,
                    elevation: 0,
                    title:!controller.isPlayerCourse.value? "Courses":"Select your home course"),
                body: Stack(
                  children: [
                    RefreshIndicator(
                      onRefresh: () {
                        return Future.delayed(const Duration(microseconds: 1), () {
                          final role = GetStorageManager.getValue(prefUserRole, "role");


                          if (role == "Player") {
                            controller.handlePlayerFlow();
                          } else {
                            controller.getCourseList();
                          }
                        });
                      },
                      child: Container(
                        width: width,
                        height: height,
                        decoration: const BoxDecoration(color: ColorCode.bgColor),
                        child: Stack(
                          children: [
                            Column(
                              children: [
                                Obx(()=> Container(
                                    margin: const EdgeInsets.fromLTRB(20, 20, 20, 15),
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                    decoration: BoxDecoration(color: ColorCode.white, borderRadius: BorderRadius.circular(25)),
                                    child: Row(
                                      children: [
                                        Container(
                                          width: 35,
                                          height: 35,
                                          margin: const EdgeInsets.only(right: 10),
                                          decoration: BoxDecoration(color: ColorCode.searchBg, borderRadius: BorderRadius.circular(25)),
                                          alignment: Alignment.center,
                                          child: SvgPicture.asset(
                                            "assets/icons/search.svg",
                                            width: 18,
                                            height: 18,
                                          ),
                                        ),
                                        Flexible(
                                          child: TextField(
                                            controller: controller.searchController,
                                              decoration:
                                                  InputDecoration(border: InputBorder.none, hintText: "Search...",
                                                      hintStyle: CustomStyle.heading5Style,
                                                    suffixIcon: controller.searchQuery.value != ""
                                                        ? IconButton(
                                                      icon: const Icon(Icons.clear),
                                                      onPressed: () {
                                                        controller.searchQuery.value = "";
                                                        controller.searchController.clear();
                                                        controller.onSearch(controller.searchQuery.value);
                                                        FocusScope.of(context).unfocus();
                                                      },
                                                    )
                                                        : null,
                                                  ),
                                              onChanged: (value){
                                                controller.searchQuery.value = value;
                                                controller.onSearch(value);
                                              }
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Obx(() => controller.coursesList.isNotEmpty
                                      ? ListView.builder(
                                          itemCount: controller.coursesList.length,
                                          padding: EdgeInsets.only(bottom: height * 0.1),
                                          itemBuilder: (context, index) {
                                            return  !controller.isPlayerCourse.value?
                                            CourseListItem(
                                                courseList: controller.coursesList[index],
                                                proshopTap: () {
                                                  controller.showProShopContactBottomSheet(Get.width*0.9,controller.coursesList[index]);
                                                }):
                                                Obx(()=>FilterCourseList(
                                                  courseList: controller.coursesList[index],
                                                  onDelete: () {
                                                    controller.deleteCourse(controller.coursesList[index].id.toString(), index);
                                                  },
                                                  onSelect: () {
                                                    controller.selectCourse(
                                                        controller.coursesList[index].id.toString());
                                                  },
                                                  isSelected: controller.selectedCourseId.value ==
                                                      controller.coursesList[index].id.toString(),
                                                ))
                                            ;
                                          },
                                        )
                                      : SizedBox(
                                          height: height * 0.65,
                                          child: NoDataView())),
                                ),
                              ],
                            ),
                            Visibility(
                              visible: !controller.isPlayerCourse.value,
                              child: Align(
                                alignment: Alignment.bottomCenter,
                                child: Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: CustomButtonNew(
                                    height: height * 0.07,
                                    width: width,
                                    // borderWidth: 1,
                                    // radius: 10,
                                    borderColor: ColorCode.borderColor,
                                    text: "CREATE COURSE",
                                    onPressed: () {
                                      Get.toNamed(RoutsNames.addCourse);
                                    },
                                  ),
                                ),
                              ),
                            ),

                            Visibility(
                              visible: controller.isPlayerCourse.value,
                              child: Align(
                                alignment: Alignment.bottomCenter,
                                child: Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      CustomButtonNew(
                                        height: height * 0.07,
                                        width: width,
                                        // borderWidth: 1,
                                        // radius: 10,
                                        borderColor: ColorCode.borderColor,
                                        text: "DONE",
                                        onPressed: () {
                                          controller.addPlayerCourse();
                                          // Get.toNamed(RoutsNames.addCourse);
                                        },
                                      ),
                                      SizedBox(height: 8,),
                                      CustomButtonNew(
                                        height: height * 0.07,
                                        width: width,
                                        // borderWidth: 1,
                                        // radius: 10,
                                        borderColor: ColorCode.borderColor,
                                        text: "IMPORT COURSE",
                                        onPressed: () {
                                          Get.toNamed(RoutsNames.addCourse,arguments: {"viewType":"ImportPlayerCourse"});
                                        },
                                      ),



                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
                bottomNavigationBar:
                Obx(() {
                  if (controller.isPlayerCourse.value) {
                    return const SizedBox.shrink();
                  }
                  return BottomNavigationView(
                    changeTabIndex: controller.changeTabIndex,
                    changeTabIndexValue: controller.tabIndex.value,
                  );
                }),
                // Obx(() => BottomNavigationView(changeTabIndex: controller.changeTabIndex, changeTabIndexValue: controller.tabIndex.value)),
                drawer:  Obx(() {
                  if (controller.isPlayerCourse.value) {
                    return const SizedBox.shrink(); // 👈 EMPTY widget
                  }
                  return DrawerScreen();
                }),
              ),
              // if(!isProduction)
              DraggableMicView(controller: controller)
            ],
            ),
        ),
      ],
    );
  }
}
`);

  add("sslide-3", "flutter", "course_controller.dart", `
import 'dart:math';

import 'package:bga_flutter_app/model/course/course_list_model.dart';
import 'package:bga_flutter_app/utils/toast_message.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get/get.dart';

import '../../apis/api_services.dart';
import '../../resources/color_code.dart';
import '../../resources/custom_button.dart';
import '../../resources/custom_style.dart';
import '../../resources/custom_text_form_field2.dart';
import '../../resources/tables_keys_values.dart';
import '../../router/routs_names.dart';
import '../../utils/get_storage_manager.dart';
import '../../utils/show_progress_dialog.dart';
import '../../utils/utils_methods.dart';
import '../../utils/validation_utils.dart';

class CourseController extends GetxController {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  TextEditingController searchController = TextEditingController();
  var searchQuery = ''.obs;

  var progressDialog = ShowProgressDialog();
  var apiService = ApiServices();
  RxList<CourseList> coursesList = <CourseList>[].obs;
  List<CourseList> allCourseList = [];

  var navigationId = Random().nextInt(100000);
  var tabIndex = 0.obs;
  final role = ''.obs;
  String viewType = '';
  String city = '';
  String state = '';
  String countryCode = '';
  RxBool isLocationReady = false.obs;
  bool isLocationDialogOpen = false;


  var isChecked = false.obs;
  Rx<String?> selectedCourseId = Rx<String?>(null); // Add this line

  void toggleCheckbox() {
    isChecked.value = !isChecked.value;
  }

  // Add this method
  void selectCourse(String courseId) {
    selectedCourseId.value = courseId;
    print("Selected Course ID: $courseId");
  }

  void changeTabIndex(int index) {
    debugPrint("changeTabIndex : $index");
    tabIndex.value = index;
    Get.offAllNamed(RoutsNames.mainScreen, arguments: {'index': index});
  }


  void onDrawerSelected(bool drawerOpen) {
    if (drawerOpen) {
      scaffoldKey.currentState?.openDrawer();
    } else {
      scaffoldKey.currentState?.openEndDrawer();
    }
  }

  RxBool isPlayerCourse=false.obs;
  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();

    var argument = Get.arguments ?? {};
    print("argument => $argument");

    if(argument!=null && argument["viewType"]=="playerCourse" ){
      viewType=argument["viewType"] ??"";
      isPlayerCourse.value=true;
    }
  }

  @override
  void onReady() {
    super.onReady();
    final role = GetStorageManager.getValue(prefUserRole, "role");


    if (viewType == "playerCourse") {
      handlePlayerFlow();
    } else {
      getCourseList();
    }
  }

  void showEnableLocationDialog() {
    if (isLocationDialogOpen) return;

    isLocationDialogOpen = true;

    Get.defaultDialog(
      title: "Location Required",
      middleText:
      "This app requires location access to continue. Please turn on location services.",
      barrierDismissible: false,
      textConfirm: "Enable Location",
      confirmTextColor: Colors.white,
      onConfirm: () async {
        await Geolocator.openLocationSettings();

        // 🔁 Wait and re-check when user comes back
        _waitForLocationEnable();
      },
    );
  }

  void _waitForLocationEnable() async {
    while (true) {
      await Future.delayed(const Duration(seconds: 1));

      bool enabled = await Geolocator.isLocationServiceEnabled();

      if (enabled) {
        isLocationDialogOpen = false;
        if (Get.isDialogOpen == true) {
          Get.back(); // close dialog
        }

        await handlePlayerFlow(); // fetch location + call course list
        break;
      }
    }
  }


  Future<Position?> getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    print("service is enabled => $serviceEnabled");

    // if (!serviceEnabled) {
    //   showEnableLocationDialog();
    //   return null;
    // }

    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
    }

    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      Get.snackbar(
        "Permission Required",
        "Please allow location permission",
        snackPosition: SnackPosition.BOTTOM,
      );
      return null;
    }

    return await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
  }

  Future<Map<String, String>?> getCityState() async {
    Position? position = await getCurrentLocation();
    if (position == null) return null;

    List<Placemark> placemarks = await placemarkFromCoordinates(
      position.latitude,
      position.longitude,
    );

    final place = placemarks.first;

    return {
      "city": place.locality ?? place.subLocality ?? "",
      "state": place.administrativeArea ?? "",
      "country": place.country ?? "",
      "countryCode": place.isoCountryCode ?? "",
    };
  }

  Future<bool> fetchLocation() async {
    final locationData = await getCityState();

    if (locationData == null) {
      debugPrint("Location not available");
      showEnableLocationDialog();
      isLocationReady.value = false;

      return false;
    }

    debugPrint("City: ${locationData['city']}");
    debugPrint("State: ${locationData['state']}");
    debugPrint("Country: ${locationData['country']}");
    debugPrint("countryCode: ${locationData['countryCode']}");
    city=locationData['city']!;
    state=locationData['state']!;
    // city=locationData['country']!;
    countryCode=locationData['countryCode']!;

    isLocationReady.value = true;
    return true;
  }

  // void showEnableLocationDialog() {
  //   if (isLocationDialogOpen) return;
  //
  //   isLocationDialogOpen = true;
  //
  //   Get.dialog(
  //     WillPopScope(
  //       onWillPop: () async => false, // 🚫 disable back button
  //       child: AlertDialog(
  //         title: const Text("Location Required"),
  //         content: const Text(
  //           "Location is mandatory to continue using this app. Please enable location services.",
  //         ),
  //         actions: [
  //           ElevatedButton(
  //             onPressed: () async {
  //               await Geolocator.openLocationSettings();
  //               _waitForLocationEnable();
  //             },
  //             child: const Text("Enable Location"),
  //           ),
  //         ],
  //       ),
  //     ),
  //     barrierDismissible: false, // 🚫 disable outside tap
  //   );
  // }


  Future<void> handlePlayerFlow() async {

    progressDialog.show();
    bool locationOk = await fetchLocation();

    if (locationOk) {
      progressDialog.hide();
      getFilterCourseList(showProgress: false);
    } else {
      debugPrint("Waiting for location to be enabled...");
      progressDialog.hide();
    }
    progressDialog.hide();
  }


  Future<void> getCourseList({bool showProgress = true}) async {
    try {
      if (showProgress) {
        progressDialog.show();
      }
      var response = await apiService.getCourseList();
      coursesList.clear();
      allCourseList.clear();
      if (response.error == false) {
        coursesList.addAll(response.data ?? []);
        allCourseList.addAll(response.data ?? []); // Initialize the filtered list

        if (showProgress) {
          progressDialog.hide();
        }
      } else {
        // ToastMessage.error(message: response.message);
        debugPrint("getMyEvents : ${response.message}");
        if (showProgress) {
          progressDialog.hide();
        }
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      if (showProgress) {
        progressDialog.hide();
      }
      // ToastMessage.error(message: "$error");
    }
  }
  Future<void> addPlayerCourse({bool showProgress = true,}) async {
    try {
      if (showProgress) {
        progressDialog.show();
      }
      var response = await apiService.addPlayerCourse(courseId: selectedCourseId.value!);

      if (response.error == false) {
        Get.offAllNamed(RoutsNames.mainScreen);
      } else {
        // ToastMessage.error(message: response.message);
        debugPrint("error : ${response.message}");
        if (showProgress) {
          progressDialog.hide();
        }
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      if (showProgress) {
        progressDialog.hide();
      }
      // ToastMessage.error(message: "$error");
    }
  }
  Future<void> getFilterCourseList({bool showProgress = true}) async {
    try {
      if (showProgress) {
        progressDialog.show();
      }
      var response = await apiService.getFilterCourseList(city: city, state: state, countryCode: countryCode);
      coursesList.clear();
      allCourseList.clear();
      if (response.error == false) {
        coursesList.addAll(response.data ?? []);
        allCourseList.addAll(response.data ?? []); // Initialize the filtered list

        if (showProgress) {
          progressDialog.hide();
        }
      } else {
        // ToastMessage.error(message: response.message);
        debugPrint("getMyEvents : ${response.message}");
        if (showProgress) {
          progressDialog.hide();
        }
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      if (showProgress) {
        progressDialog.hide();
      }
      // ToastMessage.error(message: "$error");
    }
  }

  Future<void> deleteCourse(String id, int index) async {
    try {
      progressDialog.show();
      var response = await apiService.deleteCourse(id: id);

      if (response.error == false) {
        ToastMessage.success(message: "Course deleted successfully");
        coursesList.removeAt(index);
        progressDialog.hide();

        // getCourseList();
      } else {
        // ToastMessage.error(message: response.message);
        ToastMessage.error(message: response.message);
        progressDialog.hide();
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      progressDialog.hide();
      // ToastMessage.error(message: "$error");
    }
  }

  Future<void> courseProShopDetails({required String courseId,
    String? directorOfGolf,
    String? headPro,
    String? golfCoach,
    String? proShoeEmail}) async {
    try {
      progressDialog.show();
      var response = await apiService.courseProShopDetails(courseId: courseId,directorOfGolf: directorOfGolf,golfCoach: golfCoach,headPro: headPro,proShoeEmail: proShoeEmail);

      if (response.error == false) {
        ToastMessage.success(message: response.message);
        progressDialog.hide();

        Get.back();
        // getCourseList();
      } else {
        // ToastMessage.error(message: response.message);
        ToastMessage.error(message: response.message);
        progressDialog.hide();
        Get.back();
      }
    } catch (error) {
      debugPrint("getMyEvents : $error");
      progressDialog.hide();
      // ToastMessage.error(message: "$error");
    }
  }

  void onSearch(String value) {
    coursesList.clear();
    if (value.isEmpty) {
      coursesList.addAll(allCourseList);
      return;
    }
    for (var event in allCourseList) {
      if (event.name!.toLowerCase().contains(value.toLowerCase())) {
        coursesList.add(event);
      }
    }
  }


  showProShopContactBottomSheet(double width, CourseList courseList) {
    final directorController = TextEditingController(text: courseList.directorOfGolf ?? '');
    final headProController = TextEditingController(text: courseList.headPro ?? '');
    final golfCoachController = TextEditingController(text: courseList.golfCoach ?? '');
    final proShopEmailController = TextEditingController(text: courseList.proShopEmail ?? '');
    final formKey = GlobalKey<FormState>();

    final fieldWidth = isWebScreen() ? width * 0.50 : width;

    Get.bottomSheet(
      isScrollControlled: true,
      ignoreSafeArea: false,
      Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
        ),
        padding: EdgeInsets.only(
          top: 15,
          bottom: MediaQuery.of(Get.context!).viewInsets.bottom + 25,
          left: 15,
          right: 15,
        ),
        child: SingleChildScrollView(
          child: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Drag handle
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),
                // Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Pro Shop Contact",
                      style: CustomStyle.heading3Style.copyWith(color: ColorCode.vs),
                    ),
                    InkWell(
                      onTap: () => Get.back(result: true),
                      child: SizedBox(
                        height: 40,
                        width: 40,
                        child: SvgPicture.asset(
                          'assets/icons/cross_icon.svg',
                          width: 20,
                          height: 24,
                          color: ColorCode.vs,
                        ),
                      ),
                    ),
                  ],
                ),
                Text("Automatically sends a tee sheet with foursomes and tee times to these addresses once pairings are set.",
                  style: CustomStyle.paragraph2LightStyle,
                ),
                const SizedBox(height: 15),
                Row(
                  children: [
                    Text("Pro Shop", style: CustomStyle.hintTextStyle),
                    Text("*", style: CustomStyle.hintTextStyle.copyWith(color: ColorCode.star)),
                  ],
                ),
                CustomTextFormField2(
                  controller: proShopEmailController,
                  width: fieldWidth,
                  style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                  keyboardType: TextInputType.emailAddress,
                  prefixIcon: const Icon(Icons.alternate_email, color: ColorCode.paragraphLightColor),
                  hintText: "Pro Shop Email*",
                  validator: (value) => validateEmail(value),
                ),
                const SizedBox(height: 12),
                CustomTextFormField2(
                  labelText: "Head Pro",
                  controller: headProController,
                  width: fieldWidth,
                  style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                  keyboardType: TextInputType.text,
                  radius: 10,
                  // prefixIcon: const Icon(Icons.person, color: ColorCode.paragraphLightColor),
                  hintText: "headpro@course.com",
                ),

                const SizedBox(height: 12),
                CustomTextFormField2(
                  labelText: "Director of Golf",
                  controller: directorController,
                  width: fieldWidth,
                  style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                  keyboardType: TextInputType.text,
                  prefixIcon: const Icon(Icons.manage_accounts, color: ColorCode.paragraphLightColor),
                  hintText: "director@course.com",
                ),
                const SizedBox(height: 12),
                CustomTextFormField2(
                  labelText: "Golf Coach",
                  controller: golfCoachController,
                  width: fieldWidth,
                  style: CustomStyle.paragraph4LightStyle.copyWith(color: ColorCode.labelText),
                  keyboardType: TextInputType.text,
                  prefixIcon: const Icon(Icons.sports_golf, color: ColorCode.paragraphLightColor),
                  hintText: "coach@course.com",
                ),
                // const SizedBox(height: 12),

                const SizedBox(height: 20),
                CustomButtonNew(
                  height: 50,
                  width: fieldWidth,
                  borderColor: ColorCode.borderColor,
                  text: "Save".toUpperCase(),
                  onPressed: () {
                    if (formKey.currentState!.validate()) {
                      courseProShopDetails(
                        courseId: courseList.id.toString(),
                        proShoeEmail: proShopEmailController.text,
                        headPro: headProController.text,
                        golfCoach: golfCoachController.text,
                        directorOfGolf: directorController.text,
                      );
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
`);
})();
