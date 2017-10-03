
/*
fft_adc.pde
guest openmusiclabs.com 8.18.12
example sketch for testing the fft library.
it takes in data on ADC0 (Analog0) and processes them
with the fft. the data is sent out over the serial
port at 115.2kb.  there is a pure data patch for
visualizing the data.
*/

#define LIN_OUT 1 // use the lin output function
#define FFT_N 256 // set to 256 point fft
#define SAMPLING_FREQUENCY 30000 // Sampling frequency Hz

#include <FFT.h> // include the library
unsigned int sampling_period_us;
long test1=0, test2=0;

void setup() {
  Serial.begin(250000); // use the serial port
  Serial.println(24380);
  Serial.println(FFT_N);
  //prescale clock to 16
  bitClear(ADCSRA,ADPS0);
  bitClear(ADCSRA,ADPS1);
  bitSet(ADCSRA,ADPS2);
  sampling_period_us = round(1000000*(1.0/SAMPLING_FREQUENCY));
}

void loop() {
  while(1) { // reduces jitter
    int m = analogRead(0);
    if(m > 530 || m < 470){
      //test1=millis();
      for(int j=0; j<10; j++){
        for (int i = 0 ; i < FFT_N*2 ; i += 2) { // save 256 samples
          test2=micros();
          //int k=1000*sin(2*PI*i*100/(2.0*FFT_N));
          int k = analogRead(0);
          k=(k-512)*10;
          fft_input[i] = k; // put real data into even bins
          fft_input[i+1] = 0; // set odd bins to 0
          while(micros() < (test2 + sampling_period_us)){
          } 
        }
        //Serial.println(millis()-test1);
        for(int i=0; i<2*FFT_N; i=i+2){
          Serial.println(fft_input[i]);
        }
        fft_window(); // window the data for better frequency response
        fft_reorder(); // reorder the data before doing the fft
        fft_run(); // process the data in the fft
        fft_mag_lin(); // take the output of the fft
        for(int i=0; i<FFT_N/2; i++){
          Serial.println(fft_lin_out[i]);
        }
      }
      delay(500);
    }
  }
}

//https://arduino.stackexchange.com/questions/28540/how-to-increase-sd-card-write-speed-in-arduino
//https://hackingmajenkoblog.wordpress.com/2016/03/25/fast-efficient-data-storage-on-an-arduino/

