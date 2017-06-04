/*
  WiFiEsp example: WebClient

  This sketch connects to google website using an ESP8266 module to
  perform a simple web search.

  For more details see: http://yaab-arduino.blogspot.com/p/wifiesp-example-client.html
*/

#define BUTTON 8
#define BUSY 5
#define WIFI 4

#include "WiFiEsp.h"


char ssid[] = "Vodafone-BoniHouse";            // your network SSID (name)
char pass[] = "Jessica87";        // your network password
int status = WL_IDLE_STATUS;     // the Wifi radio's status

//API host
const char host[] = "api.tartarugamaori.it";
const int httpPort = 8080;
// We now create a URI for the request
const char url[] = "/api/v1/visitors/meet";
//Base64 encoded string user:password
String auth = "cGFzYWxpbm86cHdk";


// Initialize the Ethernet client object
WiFiEspClient client;

void setup()
{
  // initialize //Serial for debugging
  Serial.begin(9600);

  //Assign Pin
  pinMode(BUTTON, INPUT);
  pinMode(BUSY, OUTPUT);
  pinMode(WIFI, OUTPUT);

  digitalWrite(BUSY, HIGH);
  digitalWrite(WIFI, LOW);

  // initialize ESP module
  WiFi.init(&Serial);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    ////Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    //Serial.print("Attempting to connect to WPA SSID: ");
    //Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }

  // you're connected now, so print out the data
  //Serial.println("You're connected to the network");
  digitalWrite(BUSY, LOW);
  digitalWrite(WIFI, HIGH);

  printWifiStatus();

}

void loop()
{
  int button = digitalRead(BUTTON);
  if(button==HIGH){
    digitalWrite(BUSY, HIGH);
    restCall();
    delay(2000);
  }
  digitalWrite(BUSY, LOW);
}

void restCall() {
  //Serial.println();
  //Serial.println("Starting connection to server...");
  // if you get a connection, report back via //Serial
  if (client.connect(host, httpPort)) {
    //Serial.println("Connected to server");
    // Make a HTTP request
    client.println("PATCH " + String(url) + " HTTP/1.1");
    client.println("Host: " + String(host));
    client.println("Authorization: Basic " + auth);
    client.println("Connection: close");
    client.println();

    delay(1000);
    // if there are incoming bytes available
    // from the server, read them and print them
    while (client.available()) {
      char c = client.read();
      //Serial.write(c);
    }

    // if the server's disconnected, stop the client
    if (!client.connected()) {
      //Serial.println();
      //Serial.println("Disconnecting from server...");
      client.stop();
    }
  }
}


void printWifiStatus()
{
  // print the SSID of the network you're attached to
  //Serial.print("SSID: ");
  //Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  //Serial.print("IP Address: ");
  //Serial.println(ip);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  //Serial.print("Signal strength (RSSI):");
  //Serial.print(rssi);
  //Serial.println(" dBm");
}
