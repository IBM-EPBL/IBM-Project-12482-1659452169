import random
threshold_temperature=70
threshold_humidity=20
while True:
    temperature=random.randint(1,100)
    humidity=random.randint(1,50)
    print(humidity)
    print(temperature)
    if(temperature>threshold_temperature or humidity>threshold_humidity):
         print("HIGH TEMPERATURE & ALARM TRIGGERS")
    elif(humidity<threshold_humidity or temperature>threshold_temperature):
        print("LOW TEMPERATURE &ALARM TURNS OFF")
    else:
        print("NORMAL TEMPERATURE & ALARM TURNS OFF")

    

    
