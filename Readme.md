# Meeting Counter

## Abstract
This project is a subset of main project [Meeting Counter](https://github.com/pasalino/MeetingCounter) for [IoT meetup Milano](https://www.meetup.com/it-IT/IoT-Meetup-Milano/) community.  
With Arduino and Node.js recreate a copy of Amazon Dash: one button for call a service.

## Mission
This project is created for [IoT meetup Milano](https://www.meetup.com/it-IT/IoT-Meetup-Milano/)

[PoT - Tocca con mano quello che scrivi](https://www.meetup.com/it-IT/IoT-Meetup-Milano/events/240049140/)

It's a basic example to use arduino with node.js REST and WebSocket

## [Online Example](http://api.tartarugamaori.it:8080/meetings)



## Electrical Scheme
In docs there is an Electrical scheme for build a device
Use Fritzing for open and look how connect all components
List of scheme:
* ESP8266_Programmer_schem.pdf Use for flash firmware or use with Arduino IDE
* Scheme for use Arduino Uno
* Scheme for use Arduino Pro Mini

### Components
* Arduino uno
* ESP8266 - Wifi
* 1 Red led diode
* 1 Blue led diode
* 1 switch
* 1 10k Ohm Resistor
* 1 220 Ohm Resistor
* 1 100 Ohm Resistor


## Architecture
* Arduino connect on Web with ESP8266. 
* The server expose a REST API with Http Basic Authentication
* The view is exposed on web and use Websocket to update numbers of visitors


## Usage

* Open meeting counter in web browser (optionally before click)
* Click button for start service increment counter on server


### Installation

#### Node.js
In server folder run command

```npm install```

#### ESP8266
**Important!!!** Change ESP8266 bound rate from 115200 to 9600 for use this module.

**Steps:**
* Connect arduino without program on memory
* Open serial monitor
* Write ```AT``` command and wait responde OK
* Write ```AT+CIOBAUD=9600``` and change boundrate

**Check:**
* Reboot arduino
* Open serial monitor and change bound rate in dropdownlist from 115200 to 9600
* Try to write AT and wait OK

## Dependences

### Arduino
* [WifiEsp](https://github.com/bportaluri/WiFiEsp)
* SoftwareSerial

#### Node.js
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html) 
## API AND WEB

* Use ```user:pwd@server:port/meetings``` for list of meetings
* Use PATCH METHOD and ```user:pwd@server:port/api/v1/visitors/[MeetingName]``` for add visitors on specific meeting
* Use DELETE METHOD and ```user:pwd@server:port/api/v1/visitors/[MeetingName]``` for add clear users in meetings

### Next Step

* Using babel for transpiling code in ES5