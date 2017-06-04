#define BUTTON 8
#define BUSY 5
#define WIFI 4

#include "WiFiEsp.h"

// Emulate Serial1 on pins 6/7 if not present
#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
  SoftwareSerial Serial1(6, 7); // RX, TX
#endif

//CHANGE PARAMETERS
const char host[] = "host"; //ip or host
const char url[] = "/api/v1/visitors/meetingName"; //change meetingName
//Base64 encoded string user:password 
//Use this tool: http://www.motobit.com/util/base64-decoder-encoder.asp
String auth = "XXXXXXXXXXXXXX";
char ssid[] = "SSID"; //name of ssid   
char pass[] = "09AQ2GED"; //wifi password       


const int httpPort = 8080;
// We now create a URI for the request


// Initialize the Ethernet client object
int status = WL_IDLE_STATUS;     
WiFiEspClient client;

void setup()
{
  // Serial for monitor on PC
  Serial.begin(9600);
  //Serial for ESP8266 
  Serial1.begin(9600);

  //Assign Pin Behaviors
  pinMode(BUTTON, INPUT);
  pinMode(BUSY, OUTPUT);
  pinMode(WIFI, OUTPUT);

  connectWifi();
}

void loop()
{
  int button = digitalRead(BUTTON);
  if (button == LOW) {
  
    digitalWrite(BUSY, HIGH);
    restCall();
    delay(2000);
  }

  //Ping connection
  long rssi = WiFi.RSSI();

  //Reconnect if disconnect
  Serial.println(WiFi.status());
  if(WiFi.status()==WL_DISCONNECTED){
    Serial.println("Disconnected");
    connectWifi();
  }
  
  digitalWrite(BUSY, LOW);
}

void restCall() {
  Serial.println();
  Serial.println("Starting connection to server...");
  if (client.connect(host, httpPort)) {
    Serial.println("Connected to server");
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
      Serial.write(c);
    }

    // if the server's disconnected, stop the client
    if (!client.connected()) {
      Serial.println();
      Serial.println("Disconnecting from server...");
      client.stop();
    }
  }
}


void printWifiStatus()
{
  // print the SSID of the network you're attached to
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

void connectWifi() {
  status = WL_IDLE_STATUS;  
  digitalWrite(BUSY, HIGH);
  digitalWrite(WIFI, LOW);

  // initialize ESP module
  WiFi.init(&Serial1);

  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);
  }

  // you're connected now, so print out the data
  Serial.println("You're connected to the network");
  digitalWrite(BUSY, LOW);
  digitalWrite(WIFI, HIGH);

  printWifiStatus();
}

