#com.reactnativeapp
#com.isadoratavare.expoapp

am force-stop com.isadoratavare.expoapp
am force-stop com.whatsapp
sleep 2
pm clear com.isadoratavare.expoapp
pm grant com.isadoratavare.expoapp android.permission.ACCESS_FINE_LOCATION
pm grant com.isadoratavare.expoapp android.permission.ACCESS_COARSE_LOCATION
sleep 2

monkey -p com.isadoratavare.expoapp -v 1
i=0

while [ $i -le 10000 ]; do
    echo "$(date +"%Y-%m-%d %H:%M:%S.%3N")"
    echo "cpu mem"
    #com.reactnative
    #com.isadoratava
    top -n 20 | grep "com.isadoratava" | awk '{print $9, $10}'
    i=$((i + 1))
done

