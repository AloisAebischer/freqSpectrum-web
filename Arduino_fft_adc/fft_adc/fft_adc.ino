
/*
fft_adc.pde
guest openmusiclabs.com 8.18.12
example sketch for testing the fft library.
it takes in data on ADC0 (Analog0) and processes them
with the fft. the data is sent out over the serial
port at 115.2kb.  there is a pure data patch for
visualizing the data.
*/

#define SAMPLES 2048 // set to 256 point fft
#define SAMPLING_FREQUENCY 50000 // Sampling frequency Hz

unsigned int sampling_period_us;
long test1=0, test2=0;
int adc[SAMPLES];
int k = 0;

void setup() {
  Serial.begin(250000); // use the serial port
  Serial.println(41795);
  Serial.println(SAMPLES);
  //prescale clock to 16
  bitClear(ADCSRA,ADPS0);
  bitClear(ADCSRA,ADPS1);
  bitSet(ADCSRA,ADPS2);
  sampling_period_us = round(1000000*(1.0/SAMPLING_FREQUENCY));
}

void loop() {
  while(1) { // reduces jitter
    int m = analogRead(0);
    if(m > 515 || m < 485){
      for(int j=0; j<1; j++){
        //test1=millis();
        for (int i=0; i < SAMPLES; i++) { 
          test2=micros();
          k = analogRead(0);
          adc[i] = k; // put real data into even bins
          while(micros() < (test2 + sampling_period_us)){
          } 
        }
        //Serial.println(millis()-test1);
        for(int i=0; i<SAMPLES; i++){
          Serial.println(adc[i]);
        }
      }
      delay(500);
    }
  }
}

//https://arduino.stackexchange.com/questions/28540/how-to-increase-sd-card-write-speed-in-arduino
//https://hackingmajenkoblog.wordpress.com/2016/03/25/fast-efficient-data-storage-on-an-arduino/

