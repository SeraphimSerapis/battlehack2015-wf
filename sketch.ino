int RELAY1 = D0;

void setup() {
    pinMode(RELAY1, OUTPUT);
    digitalWrite(RELAY1, LOW);
    Spark.function("pay", handlePayment);
}

void loop() {
}

int handlePayment(String payload) {
    digitalWrite(RELAY1, HIGH);
    return 1;
}
