#### APPLICATION DETAIL 
Create EC2 instance (pem key attached).
User: ubuntu
Open HTTP Port
Open HTTPS Port
One ICMP v4 for ping
Open SSH (default)
Public IP: 18.xx9.xx.xxx
 

Create RDS with postgres
DB Instance : rdstestinstance
Master Username: rdspgtest
Master Password: rdstest#123456
Database name: rdsdb
Host: rdstestinstance.cyxfud1f8h9v.us-east-2.rds.amazonaws.com
Configure nodejs
sudo apt-get update
sudo apt-get install nodejs
sudo apt install npm  
sudo npm install pm2 http-server -g
sudo apt-get install nginx
sudo systemctl start nginx
sudo systemctl enable  nginx
sudo nano /etc/nginx/conf.d/reverse-proxy.conf  -> put following code in the file
server {

  listen 80;

  listen [::]:80;

  underscores_in_headers on;

 

  server_name 18.219.xx.1xxx;

 

  location / {

     proxy_pass http://localhost:5000/;

     proxy_http_version 1.1;

     proxy_set_header Upgrade $http_upgrade;

     proxy_set_header Connection 'upgrade';

     proxy_set_header Host $host;

     proxy_cache_bypass $http_upgrade;

 

  }

}

 

sudo nginx -s reload
 

Deployment
Copy the code to ~/app folder (this is where the code is present right now you can download it 
from http://XXXXXXX/app.zip )
Install dependencies using -> npm install
Start the application using npm start
Scale up/down the application using :
                                                              i.      pm2 scale pm2-test-app <number of instances>  (currently I have started 2 instances)

list all the instances -> pm2 list
Enable PM2 startup on restart:
                                                               i.      pm2 startup

                                                             ii.      pm2 save

 

Access Application:
Goto : http://XXXXXXXX
