# bing-daily-wallpaper

This tool downloads the bing daily wallpaper by region and updates the desktop wallpaper.
This is a command line tool written in node.js

## Install
Download or clone this repository.

## Config file example
Json configuration file, change the `region` if you want images from a different region and change the `save_directory` property, to hold the desired location to save the images.
Properties:
`base_url` Specifies the website to download the wallpapers. **Only working for bing**
`region` Specifies the region from which the images must be downloaded. **This property is related to bing**
`format` Specifies the format of the webrequests **Only supporting json format**
`save_directory` Specifies the directory where the images will be saved

Example:
```
  "base_url": "https://www.bing.com",
  "region": "en-US",
  "format": "json",
  "save_directory": "C:\\Users\\Wallpapers"
```

## Usage
### Simple execution
Open the command line move to the project root directory and type:
`>node lib/bing-daily-wallpaper.js`

### Execute from any location with a bat file (windows)
Create a bat file on any location then add to the PATH environment variable the directory where this bat file is located.
Example of a bat file, `wallpaper.bat`:
```
@echo off
SET dir=%cd%
SET filedir=C:\Users\...\bing-daily-wallpaper\lib
cd %filedir%
node bing-daily-wallpaper.js
cd %dir%
```

### Execute it every day
Use task scheduler to execute the bat file when the machine starts.

## License
Licensed under MIT. See [LICENSE](LICENSE) for more information.