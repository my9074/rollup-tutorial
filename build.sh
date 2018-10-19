npm i
npm run build

mkdir -p output/html/subaccount-monitor
cp -r dist/* output/html/subaccount-monitor

mkdir -p output/html/subaccount-monitor/map
mv output/html/subaccount-monitor/*.js.map output/html/subaccount-monitor/map/
