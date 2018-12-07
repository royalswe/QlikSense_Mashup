# Climber KPI
>The Climber KPI is fully responsive and works for all screen sizes. Features include background trends for both actual and target, navigation and tooltip on hover to show values. It is also possible to include images as background or use the extension just to show images. Colors are completely flexible but have easy standard settings to allow quick and easy creation of nice looking KPIs. For more details take a look at the video found here: https://youtu.be/9zdfYshNel4

***Tested from Qlik Sense June 2017 (in the initial release of June 2017, extensions load slow. It's fixed in patch 1 )***

## Purpose and Description
The Climber KPI extension brings a clear presentation of KPIs including trendlines and navigation from your dashboard to details on other sheets. Getting started is extremely quick when using Master Items.  
![Alt text](./screenshots/samplevideo_CreateObject.gif?raw=true "Sample video of object creation")

The large number of options for the layout including the possibility to use an image background allows a flexible layout. Finetuning of graphs, colors and even margins are possible in the extensive settings menu.  
![Alt text](./screenshots/samplevideo_MainLayouts.gif?raw=true "Sample video of the main layout and hover options")

## Getting started
To get started (after installation) add one or two measures. To get the trendline, add a dimension in the Trend section of the extension settings. 

## Settings and Features
1. Target Mode - Target mode includes feedback on target fulfillment. This may include both color and icon. The target mode setting is found in the "Target" section of the settings.  
![Alt text](./screenshots/screenshot_TargetModeEnabledDisabled.PNG?raw=true "Target Mode Enabled/Disabled")
2. Layout Mode - Choose between Fill or Top. Settings are located in Appearance/Layout.   
![Alt text](./screenshots/screenshot_FillTopMode.PNG?raw=true "Fill or Top Layout Mode")
3. Text Layouts - Choose text layout you like. Or remove the text altogether for just graphs, icons or images. (Works well to use for navigation too!)  
![Alt text](./screenshots/screenshot_TextLayoutModes.PNG?raw=true "Text Layout Alternatives")
4. Hover modes - Select what you want to show "on mouse over" the object. This is also where you enable navigation mode. The setting is found in Appearance/Hover.  
![Alt text](./screenshots/screenshot_HoverModes.PNG?raw=true "Hover mode alternatives")
5. Color settings - Full control of color settings for both text and trend. You can choose to have quick access to banding for Target color mode (two or three colors) or you can use an expression to set the Target color. The trend color is independent of the target (icon) color and can also be set either to a specific color or an expression.  
![Alt text](./screenshots/screenshot_ColorSettings.PNG?raw=true "Color Settings")
5. When new versions of the extensions are released it is now possible to update (rather than recreate) the object to include any new properties. This will improve the maintainability of the extension between versions.  
![Alt text](./screenshots/screenshot_UpdateProperties.PNG?raw=true "Color Settings")

## Installation

1. Download the latest version
2. Qlik Sense Desktop
	* To install, copy all files in the .zip file to folder "C:\Users\\%Username%\Documents\Qlik\Sense\Extensions\cl-kpi"
3. Qlik Sense Server
	* See instructions [how to import an extension on Qlik Sense Server](http://help.qlik.com/en-US/sense/3.2/Subsystems/ManagementConsole/Content/import-extensions.htm)

## Climber Extensions
Like this extension? Check out the other Climber made extensions below.

**Custom Report**
* https://github.com/ClimberAB/ClimberCustomReport
* https://www.youtube.com/watch?v=mCb2t4aNppE

**Selection Bar**
* https://github.com/ClimberAB/ClimberSelectionBar
* https://www.youtube.com/watch?v=4fxrphADRKw

**Cards**
* https://github.com/ClimberAB/ClimberCards
* https://www.youtube.com/watch?v=k_IEt8TvB_c

## Change Log

See [CHANGELOG](CHANGELOG.yml)

## License & Copyright
The software is made available "AS IS" without any warranty of any kind under the MIT License (MIT).

See [Additional license information for this solution.](LICENSE.md)




